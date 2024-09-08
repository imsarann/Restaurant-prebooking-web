import styles from './Foodcard.module.css'; // Import the styles object

export default function Foodcard({ image, foodname, hotelname }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Card Image" className={styles.cardImage} />
      <div className={styles.cardInfo}>
        <h2>{foodname}</h2>
        <p>{hotelname}</p>
        <a href="#" className={styles.button}>
          Find out more
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </a>
      </div>
    </div>
  );
}
