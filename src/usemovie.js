import { useState, useEffect } from "react";
export function useMovie(query) {
  const [load, setLoad] = useState(false);
  const [movies, setMovies] = useState([]);
  const [errst, seterror] = useState("");
  const yourkeys = "f9b67381";

  useEffect(
    function () {
      const controller = new AbortController();
      async function filmApi() {
        try {
          setLoad(true);
          seterror("");
          const resp = await fetch(
            `http://www.omdbapi.com/?apikey=${yourkeys}&s=${query}`,
            { signal: controller.signal }
          );
          if (!resp.ok) throw new Error(`can't fetch data🙄`);
          const data = await resp.json();
          if (data.Response == "False") throw new Error(`movie is not found`);
          setMovies(data.Search);
          seterror("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            seterror(err.message);
          }
        } finally {
          setLoad(false);
        }
      }
      if (query.length < 3) {
        seterror("");
        setMovies([]);
        return;
      }
      filmApi();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { load, movies, errst };
}
