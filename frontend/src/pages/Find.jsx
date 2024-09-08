import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Card } from "../components/Card";
import SearchButton from "../components/SearchButton";
import "./FindCss.css";
import { useNavigate } from "react-router-dom";

const hotelIds = new Set();

export default function Find() {
    const [hotels, setHotels] = useState([]);
    const [page] = useState(1);
    const navigate = useNavigate()
    const onclickHandle = (e) => {
        console.log("gooooooooooooootttt ittttt",e._id)
        navigate("/reserve", { state: { foodId: e._id } })
    };
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3000/res/get-image?page=${page}`);
            const hotelData = response.data;
            console.log(hotelData)
            if (hotelData && Array.isArray(hotelData)) {
                const newHotels = hotelData.filter(hotel => !hotelIds.has(hotel.id));
                newHotels.forEach(hotel => hotelIds.add(hotel.id));
                setHotels(prevHotels => [...prevHotels, ...newHotels]);
            }
        } catch (error) {
            console.error("Error fetching hotel data:", error);
        }
    }, [page]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className="background">
            <SearchButton />
            <div  className="card-container">
                {hotels.map((hotel) => (
                     <div key={hotel.id} onClick={() => onclickHandle(hotel)}>
                        <Card key={hotel.id} hotel={hotel} />
                    </div>
                ))}
            </div>
        </div>
    );
}
