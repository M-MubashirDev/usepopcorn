import { useEffect, useRef, useState } from "react";
import { Star } from "./Star";
import { useMovie } from "./usemovie";
import { useKey } from "./useKey";
import { useLocalStorage } from "./useLocStorage";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
// const yourkey = "15168c2";
const yourkeys = "f9b67381";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [IDdetail, setIDdetail] = useState("");
  const [watched, setWatched] = useLocalStorage("watched", []);
  console.log(watched);
  const { load, movies, errst } = useMovie(query);
  function details(id) {
    setIDdetail((IDdetail) => (IDdetail === id ? null : id));
  }
  function detailsClose(id) {
    setIDdetail(null);
  }

  function deletefromlist(id) {
    setWatched(watched.filter((val) => val.imdbID !== id));
  }
  return (
    <>
      <NaviBar>
        <Search query={query} setQuery={setQuery} />
        <TextLen movies={movies} />
      </NaviBar>
      <Main>
        <MovieBox>
          {/* {load ? (
            <LoadFun />
          ) : (
            <DataList key={tempMovieData.imdbID} load={load} movies={movies} />
          )} */}
          {load && <LoadFun />}
          {!errst && !load && (
            <DataList
              key={tempMovieData.imdbID}
              details={details}
              movies={movies}
            />
          )}
          {errst && <ErrorFun errst={errst} />}
        </MovieBox>
        <MovieBox>
          {IDdetail ? (
            <DetailFUn
              watched={watched}
              setWatched={setWatched}
              IDdetail={IDdetail}
              detailsClose={detailsClose}
            />
          ) : (
            <>
              <Watchedfirst watched={watched} />
              <WatchedUL watched={watched} deletefromlist={deletefromlist} />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
}
function DetailFUn({ watched, setWatched, IDdetail, detailsClose }) {
  const [isload, setisload] = useState(false);
  const [userRating, onSetUserRating] = useState("");
  const [mov, setmov] = useState({});
  useEffect(
    function () {
      async function detailAwaite() {
        setisload(true);

        const resp = await fetch(
          `http://www.omdbapi.com/?apikey=${yourkeys}&i=${IDdetail}`
        );
        const data = await resp.json();
        setmov(data);
        setisload(false);
      }
      detailAwaite();
    },
    [IDdetail]
  );
  const {
    Title: title,
    Year: year,
    Rated: rated,
    Released: released,
    Poster: poster,
    Director: director,
    imdbID,
    Genre: genre,
    Actors: actors,
    Plot: plot,
    Runtime: runtime,

    imdbRating,
  } = mov;
  const sendOBj = {
    title,
    imdbID: IDdetail,
    year,
    poster,
    runtime: Number(runtime?.split(" ")[0]),
    imdbRating: Number(imdbRating),
    userRating,
  };
  function funAdd() {
    console.log(sendOBj);
    setWatched((watched) => [...watched, sendOBj]);
    detailsClose();
  }
  // useLocalStorage("watched");
  const findUserRating = watched.find(
    (val) => val.imdbID == IDdetail
  )?.userRating;
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie|${title}`;
      return function () {
        document.title = `usePopcorn`;
      };
    },
    [title]
  );
  useKey("Escape", detailsClose);

  return (
    <>
      <div className="details">
        {isload ? (
          <LoadFun />
        ) : (
          <>
            {" "}
            <header>
              <button className="btn-back" onClick={detailsClose}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${title}`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull;{runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐</span>
                  {imdbRating}IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {watched.some((val) => val.imdbID == IDdetail) ? (
                  <p style={{ textAlign: "center" }}>
                    you have already rated <em>{findUserRating}⭐</em>
                  </p>
                ) : (
                  <>
                    <Star
                      nums={10}
                      size={2}
                      onSetUserRating={onSetUserRating}
                    />
                    {userRating ? (
                      <button onClick={funAdd} className="btn-add">
                        + Add
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
              <div>
                <em>{plot}</em>
                <p>starring {actors}</p>
                <p>Directed by {director}</p>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
function LoadFun() {
  return (
    <>
      <p className="loading">Loading....</p>
    </>
  );
}
function ErrorFun({ errst }) {
  return (
    <>
      <p className="loading">⛔{errst}</p>
    </>
  );
}
function NaviBar({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </>
  );
}
function Logo() {
  return (
    <>
      {" "}
      <div className="logo">
        <span role="img">
          <img className="imgPOP" src="popimg copy.png" alt="popcorn" />
        </span>
        <h1>usePopcorn</h1>
      </div>
    </>
  );
}
function Search({ query, setQuery }) {
  const ref = useRef(null);
  useKey("Enter", function () {
    if (document.activeElement == ref.current) return;
    ref.current.focus();
    setQuery("");
  });

  return (
    <>
      {" "}
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={ref}
      />
    </>
  );
}
function TextLen({ movies }) {
  return (
    <>
      <p className="num-results">
        Found <strong>{movies.length ? movies.length : 0}</strong> results
      </p>
    </>
  );
}
//.............................................../main /.....................................
function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}
function MovieBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen1((open) => !open)}
        >
          {isOpen1 ? "–" : "+"}
        </button>
        {isOpen1 && children}
      </div>
    </>
  );
}
// function WatchedData() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {isOpen2 && (
//           <>
//             <Watchedfirst watched={watched} />
//             <WatchedUL watched={watched} />
//           </>
//         )}
//       </div>
//     </>
//   );
// }

function DataList({ movies, details }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <MovieDataList key={movie.imdbID} details={details} movie={movie} />
        ))}
      </ul>
    </>
  );
}

function MovieDataList({ movie, details }) {
  return (
    <>
      <li onClick={() => details(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
}

function Watchedfirst({ watched }) {
  console.log(watched);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      {" "}
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime.toFixed(2)} min</span>
          </p>
        </div>
      </div>
    </>
  );
}
function WatchedUL({ watched, deletefromlist }) {
  const [keys, setkeys] = useState(0);
  return (
    <>
      {" "}
      <ul className="list">
        {watched.map((movie) => (
          <Watchedmap
            key={movie.imdbID}
            deletefromlist={deletefromlist}
            movie={movie}
          />
        ))}
      </ul>
    </>
  );
}
function Watchedmap({ movie, deletefromlist }) {
  return (
    <>
      {" "}
      <li key={movie.imdbID}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
          <button
            onClick={() => deletefromlist(movie.imdbID)}
            className="btn-delete"
          >
            X
          </button>
        </div>
      </li>
    </>
  );
}
