// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import AddMed from "./Pages/AddMed";
import Supply from "./Pages/Supply";
import Track from "./Pages/Track";
import HomePage from "./Pages/HomePage";
import Nav from "./component/Nav";
import Banner from "./component/Banner/Banner";
import Footer from "./component/Footer";
import Contact from "./component/Contact";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Banner />
        <Routes>
          {/* <Route path="/" exact element={<LoginPage_2 />} /> */}
          {/* <Route path="/" exact element={<LoginPage />} /> */}
          <Route path="/" exact element={<HomePage />} className="min-h" />
          <Route
            path="/register"
            exact
            element={<RegisterPage />}
            className="min-h"
          />
          <Route path="/addmed" exact element={<AddMed />} className="min-h" />
          <Route path="/supply" exact element={<Supply />} className="min-h" />
          <Route path="/track" exact element={<Track />} className="min-h" />
          <Route
            path="/inventory"
            exact
            element={<Track />}
            className="min-h"
          />
          {/* <Route path="/owner" exact element={<OwnerPage />} />
          <Route path="/rms" exact element={<RMSPage />} />
          <Route path="/man" exact element={<MANPage />} />
          <Route path="/dis" exact element={<DISPage />} />
          <Route path="/ret" exact element={<RETPage />} /> */}
        </Routes>
        <Contact />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
