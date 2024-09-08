import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Navimage from "../components/Navimage";
import Scrolling from "../components/Scrolling";
import Button from "../components/homeComponents/Button";
import TopRes from "../components/homeComponents/TopRes";
import Topfood from "../components/homeComponents/Topfood";
import Font from "../components/homeComponents/Font";
import  styles from "./Landing.module.css";
import Footer from "../components/footer/Footer";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.container}>
        <Navbar></Navbar>
        <Navimage></Navimage>
        <Scrolling></Scrolling>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <Font text="MAKE YOUR DINING EXPERIENCE HASSLE-FREE" />
          <center>
            <br></br>
            <br></br>
            <br></br>
            <Button
              onclick={() => navigate("/find")}
              placeholder="Find Your Restaurant"
            />
            <br></br>
            <br></br>
            

            <p className="trending-text"> Trending </p>
          </center>
          <br></br>
          <br></br>
          <br></br>
          <TopRes />
          <br></br>
            <br></br><br></br>
            <br></br>
          <Font text="THEY TRANSFORM MEALS INTO MEMORABLE MOMENTS."></Font><br></br>
          <br></br><br></br>
          <br></br>
          <Topfood />
          <Footer />
        </div>
      </div>
    </div>
  );
}
