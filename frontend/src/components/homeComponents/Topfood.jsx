import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Topfood.module.css";

export default function Topfood() {
  const [foods, setFoods] = useState([]);

  const getFood = async () => {
    return await axios.get("http://localhost:3000/res/topfood");
  };

  useEffect(() => {
    const fetchFood = async () => {
      const response = await getFood();
      setFoods(response.data);
    };

    fetchFood();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {foods.map((food, index) => (
        <div className={styles.card} key={index}>
          <img
            src={food.hotelImage}
            alt={`${food.hotelName} image`}
            className={styles.cardImage}
          />
          <div className={styles.cardInfo}>
            <div>{food.foodName}</div>
            <div>{food.hotelName}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
