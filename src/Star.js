import { useState } from "react";
export function Star({
  nums = 5,
  color = "yellow",
  size = 1,
  messsege = [],
  onSetUserRating,
}) {
  const starcontainer = {
    boxSizing: "border-box",
    // height: "0",
    margin: "0",
    padding: "0",
    display: "flex",
    gap: "1rem",
    // flexDirection: "column",
    alignItems: "center",
    color,
    fontSize: `${size / 1.5}rem`,
  };
  const [num, setnum] = useState(0);
  const [hover, sethover] = useState(0);
  const [getlen, setgetlen] = useState(0);
  // const set=function(){
  onSetUserRating(num);
  //   setnum()
  // }
  return (
    <>
      <div style={starcontainer}>
        <div>
          {Array.from({ length: nums }, (_, ind) => (
            <Iconstar
              val={hover >= ind + 1 || num >= ind + 1}
              hover={() => sethover(ind + 1)}
              set={() => setnum(ind + 1)}
              reset={() => sethover(0)}
              color={color}
              size={size}
              key={ind}
            />
          ))}
        </div>{" "}
        <p>
          {messsege.length == nums
            ? messsege[hover - 1] || messsege[num - 1]
            : hover || num}
        </p>
      </div>
    </>
  );
}
function Iconstar({ set, val, hover, reset, color, size }) {
  const IconStyle = {
    width: `${size}rem`,
    height: `${size}rem`,
  };
  return (
    <>
      <span onClick={set} onMouseEnter={hover} onMouseLeave={reset}>
        {val ? (
          <svg
            style={IconStyle}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke={color}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            // onClick={set}
            style={IconStyle}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
      </span>
    </>
  );
}
/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
