import image1 from "../assets/burgerkingg.png";
import image2 from "../assets/kfc.png";
import image3 from "../assets/mcdonalds.png";
import image4 from "../assets/pizzahut.png";
import image5 from "../assets/starbucks.png";
import image6 from "../assets/tacobell.png";
import './ScrollingCss.css';

export default function Scrolling() {
  const images = [
    { src: image1, alt: "Burger King" , className: "Burger-King", style : { width: '100px', height: '40px',   paddingTop: '10px' } },
    { src: image2, alt: "KFC" , className: "KFC",style : { width: '80px', height: '60px',   paddingTop: '0px' }  },
    { src: image3, alt: "McDonald's", style : { width: '40px', height: '30px',   paddingTop: '15px' } },
    { src: image4, alt: "Pizza Hut" , className: "Pizza-Hut",style : { width: '100px', height: '40px',   paddingTop: '8px'  } },
    { src: image5, alt: "Starbucks", style : { width: '160px', height: '60px' }  },
    { src: image6, alt: "Taco Bell", className: "Taco-Bell" ,style : { width: '110px', height: '45px',   paddingTop: '5px' } },
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <div>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={image.className || ""}
              style={image.style || {}}
            />
          ))}
        </div>
        <div>
          {images.map((image, index) => (
            <img
              key={index + images.length}
              src={image.src}
              alt={image.alt}
              className={image.className || ""}
              style={image.style || {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
