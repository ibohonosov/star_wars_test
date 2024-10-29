import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Hero from "./pages/Hero/Hero.jsx";

function App() {
  return (
      <div className="App">
          <div className="background"></div>
          <div className="flickering"></div>
          <div className="logo">
              <p>STAR</p>
              <p>WARS</p>
          </div>
          <Router>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/hero/:id" element={<Hero />}></Route>
            </Routes>
          </Router>
      </div>
  )
}

export default App
