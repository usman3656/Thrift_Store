import { Button } from "@mui/material";
import React, { useState } from "react";

export const Item = () => {
  return (
    <div>
      <h1>Item</h1>
      <Modification />
    </div>
  );
};
export const Modification = () => {
  const [value, setvalue] = useState(Array(5).fill(0));

  const buttonarray = [...value];

  function OnINC(index) {
    buttonarray[index]++;
    setvalue(buttonarray);
  }
  function OnDEC(index) {
    if (buttonarray[index] !== 0) {
      buttonarray[index]--;
      setvalue(buttonarray);
    }
  }
  function onDelete(index) {
    buttonarray.splice(index, 1);
    setvalue(buttonarray);
  }

  return (
    <div>
      {buttonarray.map((value, index) => {
        return (
          <div key={index}>
            <button onClick={() => OnINC(index)}>+</button>
            <button>{value}</button>
            <button onClick={() => OnDEC(index)}>-</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};
