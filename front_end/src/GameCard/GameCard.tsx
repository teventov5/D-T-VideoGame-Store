import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FullGameInfo } from "../I_FullGameInfo/FullGameInfo";
import "./GameCard.css";

export function GameCard(props: {
  itemsCount: number;
  setItemsToCart: Function;
}) {
  let params = useParams();
  const { itemsCount, setItemsToCart } = { ...props };

  const [gameCard, setGameCard] = useState<FullGameInfo[]>([]);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("userLoggedIn");
    const addGameToCartClass = document.querySelector(
      ".addGameToCart"
    ) as HTMLElement;
    if (addGameToCartClass) {
      if (loginStatus === "True") {
        addGameToCartClass.style.display = "block";
      } else {
        addGameToCartClass.style.display = "none";
      }
    }
  });

  useEffect(() => {
    const axiosGet = async () => {
      const response = await axios(
        `https://localhost:7210/api/myGames/GameDetails/${params.my_game_id}`
      );
      // console.log(response);

      setGameCard(response.data);
    };
    axiosGet();
  }, [params.my_game_id]);
  // console.log(gameCard);

  if (gameCard[0]) {
    return (
      <div className="gameCard minHeightClass">
        <h1 className="title"> {gameCard[0].gameName} </h1>
        <div className="gameCardWrapper">
          <div className="picDiv">
            <img src={gameCard[0].picUrl} alt="GamePic" />
          </div>
          <div className="detailsDiv">
            <h2> Release Year: {gameCard[0].releaseYear} </h2>
            <h2> Platform: {gameCard[0].platformName} </h2>
            <h2> Genre: {gameCard[0].genreName} </h2>
            <h2> Publisher: {gameCard[0].publisherName} </h2>
            <h2> Price: {gameCard[0].price}$ </h2>

            <div className="addGameToCartDiv">
              <button
                className="addGameToCartButton"
                onClick={() => {
                  axios({
                    method: "post",
                    url: `https://localhost:7210/api/myGames/addGameToUserCart/${sessionStorage.getItem(
                      "userId"
                    )}&${gameCard[0].id}`,
                  })
                    .then(function (response) {
                      //   console.log(response);
                      setItemsToCart(itemsCount + 1);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                  alert("Game was added to Cart");
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="descriptionDiv">
          <h1>Game Description</h1>
          <h2> {gameCard[0].gameDescription} </h2>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
