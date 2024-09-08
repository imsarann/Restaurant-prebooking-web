import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <a href="../pages/contactUs.css">
      <button className={styles.button}>
        <p>Contact Us</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </button>
      </a>
      
    </div>
  );
}
