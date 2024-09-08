import styles from './Button.module.css';

export default function Button({onclick, placeholder}) {
  return (
    <div>
      <button className={styles.button} onClick={onclick} >{placeholder}</button>
    </div>
  );
}
