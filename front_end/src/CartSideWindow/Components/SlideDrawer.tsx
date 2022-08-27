import axios from "axios";
import React, { useEffect, useState } from "react";
import { CartGameListItem } from "../CartGameListItem/CartGameListItem";
import "./SlideDrawer.css";

export function SlideDrawer(props: { show: boolean; userDetails: any }) {
  const { show, userDetails } = { ...props };
  const [gamesArray, setgamesArray] = useState<any[]>([]);

  let drawerClasses = show ? "side-drawer open" : "side-drawer";

  useEffect(() => {
    if (drawerClasses === "side-drawer open") {
      const axiosGet = async () => {
        const response = await axios(
          `https://localhost:7210/api/myGames/userCart/${userDetails.id}`
        );
        // console.log(response);

        setgamesArray(response.data);
      };
      axiosGet();
    }
  }, [drawerClasses]);
  console.log(gamesArray);

  return (
    <div className={drawerClasses}>
      <h1>{userDetails?.fname}'s Cart:</h1>

      {gamesArray.map((currGame, i) => (
        <CartGameListItem key={i} gameName={currGame.gameNameInCart} />
      ))}
    </div>
  );
}
