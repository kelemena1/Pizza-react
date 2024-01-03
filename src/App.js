import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
import { PizzaListPage } from "./PizzaListPage";
import { PizzaSinglePage} from "./PizzaSinglePage";
import { PizzaCreatePage } from "./PizzaCreatePage";
import PizzaModPage from './PizzaModPage';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
           <NavLink to={`/PizzaList`} className="nav-link">
              <span className="nav-link">Pizzáink</span>
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to={`/New-Pizza`} className="nav-link">
              <span className="nav-link">Pizza felvétele az étlapra</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
          <Route path="/PizzaList" element={<PizzaListPage/>} />
          <Route path="/Pizza/:pizzaId" element={< PizzaSinglePage />} />
          <Route path="New-Pizza" element={<PizzaCreatePage />} />
          <Route path="mod-pizza/:pizzaId" element={<PizzaModPage />} />
         
          
      </Routes>
    </Router>
  );
}

export default App;
