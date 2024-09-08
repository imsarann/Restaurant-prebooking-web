import image1 from "../assets/navimage1.jpg"
import image2 from "../assets/navimage2.jpg"
import image3 from "../assets/navimage3.jpg"
import "./NavimageCss.css"
export default function Navimage(){
    return (
    <div className="navimage">
        <img src={image3}/>
        <img src={image1}/>
        <img src={image2}/>
    </div>
    )
}