import { useState, useEffect } from 'react';
import styles from './Reservation.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Font from "../homeComponents/Font";

const Reservation = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [foodOrder, setFoodOrder] = useState([]);
  const [reservations, setReservations] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [foods, setFoods] = useState([]);

  const location = useLocation();
  const { foodId } = location.state || {};
  console.log("Received foodId:", foodId);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/res/getfood`, {
          params: { foodId }
        });
        setFoods(response.data);
        console.log("Food data:", response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFood();
  }, [foodId]);

  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('reservations')) || {};
    setReservations(savedReservations);
  }, []);

  const isDateValid = (selectedDate) => {
    const today = new Date();
    const selected = new Date(selectedDate);
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(today.getMonth() + 1);

    if (selected < today) {
      return 'The date cannot be in the past.';
    } else if (selected > oneMonthFromToday) {
      return 'The date cannot be more than a month from today.';
    }
    return '';
  };

  const isTimeValid = (selectedTime) => {
    const selectedDate = new Date(`${date}T${selectedTime}`);
    const now = new Date();
    const hour = selectedDate.getHours();

    if (selectedDate < now) {
      return 'The time cannot be in the past.';
    } else if (hour >= 23 || hour < 11) {
      return 'The time cannot be between 11 PM and 11 AM.';
    }
    return '';
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const validationResult = isDateValid(selectedDate);
    setDateError(validationResult);
    if (!validationResult) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const validationResult = isTimeValid(selectedTime);
    setTimeError(validationResult);
    if (!validationResult) {
      setTime(selectedTime);
    }
  };

  const handleFoodOrderChange = (e) => {
    const { value, checked, dataset } = e.target;
    if (checked) {
      setFoodOrder([...foodOrder, { name: value, price: dataset.price }]);
    } else {
      setFoodOrder(foodOrder.filter(item => item.name !== value));
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (dateError || timeError) {
      return;
    }

    const datetime = `${date} ${time}`;
    const newReservation = {
      name,
      date,
      time,
      numPeople,
      foodOrder,
    };

    const updatedReservations = { ...reservations };
    if (!updatedReservations[datetime]) {
      updatedReservations[datetime] = [];
    }
    updatedReservations[datetime].push(newReservation);
    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
    loadReservations();
    setShowConfirmation(true);
    setOrderDetails(newReservation);

    // Send reservation details to the backend
    try {
      await axios.post('http://localhost:3000/res/book', newReservation);
      console.log('Reservation successfully sent to the backend');
    } catch (error) {
      console.error('Error sending reservation to the backend:', error);
    }
  };

  const loadReservations = () => {
    setReservations(JSON.parse(localStorage.getItem('reservations')) || {});
  };

  const cancelReservation = (name, datetime) => {
    const updatedReservations = { ...reservations };
    if (updatedReservations[datetime]) {
      updatedReservations[datetime] = updatedReservations[datetime].filter(res => res.name !== name);
      if (updatedReservations[datetime].length === 0) {
        delete updatedReservations[datetime];
      }
      setReservations(updatedReservations);
      localStorage.setItem('reservations', JSON.stringify(updatedReservations));
      loadReservations();
    }
  };

  const handleNumPeopleClick = (people) => {
    setNumPeople(people);
  };

  return (
    <div className={styles.container}>
      <Font text="Reservify Your Table "></Font>
      <form onSubmit={handleReservationSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={handleDateChange} required />
        {dateError && <div className={styles.error}>{dateError}</div>}

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" value={time} onChange={handleTimeChange} required />
        {timeError && <div className={styles.error}>{timeError}</div>}

        <label htmlFor="numPeople">Number of People:</label>
        <div>
          <button type="button" onClick={() => handleNumPeopleClick(2)} className={numPeople >= 2 && numPeople <= 4 ? styles.active : ''}>2-4</button>
          <button type="button" onClick={() => handleNumPeopleClick(5)} className={numPeople >= 5 && numPeople <= 8 ? styles.active : ''}>5-8</button>
          <button type="button" onClick={() => handleNumPeopleClick(9)} className={numPeople >= 9 && numPeople <= 12 ? styles.active : ''}>9-12</button>
        </div>

        <label htmlFor="foodOrder">Food Order:</label>
        <div id="foodOrder">
          {foods.map((food, index) => (
            <div key={index} className={styles.foodItem}>
              <input
                type="checkbox"
                id={`food-${index}`}
                value={food.foodName}
                data-price={food.foodPrice}
                onChange={handleFoodOrderChange}
              />
              <label htmlFor={`food-${index}`}>
                <img src={food.foodImage} alt={food.foodName} className={styles.foodImage}/>
                {food.foodName} <span>${food.foodPrice}</span>
              </label>
            </div>
          ))}
        </div>

        <button type="submit">Make Reservation</button>
      </form>

      <div id="reservations" className={styles.reservations}>
        <h2>Reservations</h2>
        <div id="reservationList">
          {Object.entries(reservations).map(([datetime, reservationsArray]) =>
            reservationsArray.map((reservation, index) => (
              <div className={styles.reservation} key={index}>
                <strong>{reservation.name}</strong> - {datetime} - {reservation.numPeople} people
                <div className={styles.foodOrder}>
                  <strong>Food Order:</strong> {reservation.foodOrder.map(item => `${item.name} ($${item.price})`).join(', ')}
                </div>
                <button onClick={() => cancelReservation(reservation.name, datetime)}>Cancel</button>
              </div>
            ))
          )}
        </div>
      </div>

      {showConfirmation && (
        <>
          <div id="orderConfirmation" className={styles.orderConfirmation}>
            <h2>Order Confirmation</h2>
            <div id="orderSummary">
              <p><strong>Name:</strong> {orderDetails.name}</p>
              <p><strong>Date:</strong> {orderDetails.date}</p>
              <p><strong>Time:</strong> {orderDetails.time}</p>
              <p><strong>Number of People:</strong> {orderDetails.numPeople}</p>
              <p><strong>Food Order:</strong> {orderDetails.foodOrder.map(item => `${item.name} ($${item.price})`).join(', ')}</p>
            </div>
            <button onClick={() => setShowConfirmation(false)}>Confirm</button>
            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
          </div>
          <div id="overlay" className={styles.overlay}></div>
        </>
      )}
    </div>
  );
};

export default Reservation;
