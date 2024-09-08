import PropTypes from 'prop-types';
import "./CardCss.css";
import { useState } from 'react';

export function Card({ hotel }) {
  const { _id , hotelImage, hotelName , hotelAddress } = hotel;
  console.log("id:", _id)
  console.log("address :",hotelName)
  console.log("name :",hotelName)

  const [foods, setFoods] = useState(null)
  const onclickHandle = (id) => {
    setFoods(id); console.log("got the id :",id) 
  }
    return (
    <div className="card" onClick={()=>onclickHandle(_id)}>
      <div className="card-image" style={{ backgroundImage: `url(${hotelImage})` }}></div>
      <div className="category"></div>
      <div className="heading">{hotelName ? hotelName : 'Unnamed Hotel' }</div>
      <div className="address">{hotelAddress ? hotelAddress : 'No address available'}</div>
    </div>
  );
}

Card.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hotelImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
