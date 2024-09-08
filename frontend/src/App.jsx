import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Landing from "./pages/Landing";
import Find from "./pages/Find";
import Update from "./pages/Update";
import ReservationPage from "./pages/ReservationPage";


function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={ <Signup/> } />
      <Route path="/signin" element={ <Signin/> } />
      <Route path="/" element={ <Landing/> }/>
      <Route path="/find" element={ <Find/> }   />
      <Route path="/update" element={ <Update/> } />
      <Route path="/reserve" element={ <ReservationPage/> }/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
