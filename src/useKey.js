import { useState, useEffect } from "react";
export function useKey(key, keyFun) {
  useEffect(() => {
    function Close(e) {
      console.log("infun");
      if (e.code == key) {
        console.log("outfi");
        keyFun();
      }
    }
    document.addEventListener("keydown", Close);
    return function () {
      document.removeEventListener("keydown", Close);
    };
  }, [key, keyFun]);
}
