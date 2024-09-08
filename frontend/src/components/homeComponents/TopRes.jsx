import { useEffect, useState } from 'react';
import styles from './TopRes.module.css';
import axios from 'axios';

export default function TopRes() {
  const [top5, setTop5] = useState([]);

  const fetchingHotel = async () => {
    try {
      const top5hotels = await axios.get('http://localhost:3000/res/topres');
      console.log('after fetching', top5hotels.data);
      return top5hotels.data;
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchingHotel();
      setTop5(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.allimage}>
        {console.log('before map', top5)}
        {top5.map((hotel, index) => (
          <div key={index} className={styles.imageContainer}>
            <img src={hotel.hotelImage} alt={`Top ${index + 1}`} />
            <div className={styles.hotelName}>{hotel.hotelName}</div>
            <div className={styles.hotelName}>{hotel.hotelAddress}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
