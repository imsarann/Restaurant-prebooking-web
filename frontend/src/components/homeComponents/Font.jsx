import PropTypes from 'prop-types';
import styles from './Font.module.css'; // Import the CSS file

export default function Font({ text }) {
  const inlineStyles = {
    fontSize: '46px',
    color: '#000000', // Corrected color code
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
  };

  return (
    <div className={styles.jersey} style={inlineStyles}> {/* Correct className usage */}
      {text}
    </div>
  );
}

Font.propTypes = {
  text: PropTypes.string.isRequired,
};
