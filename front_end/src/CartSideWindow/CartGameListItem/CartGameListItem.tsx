import React from "react";
import "./CartGameListItem.css";

export function CartGameListItem(props: { gameName: any }) {
  const { gameName } = { ...props };
  return (
    <div className="cartGameListItem">
      <p
        onClick={() => {
          alert("go to specific game page");
        }}
      >
        {gameName}
      </p>
      <button
        className="removeGameButton"
        onClick={() => {
          alert("remove game from users cart");
        }}
      >
        Rremove
      </button>
    </div>
  );
}
