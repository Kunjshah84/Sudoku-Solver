import logo from './logo.svg';
import './App.css';
import Navbar from './components/AppNavbar.js';
import Home from './components/Home.js';
import About from './components/About.js';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import SolverPage from './components/SolverPage';
import AppNavbar from './components/AppNavbar.js';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar/>
      {/* Thsi is the comman thing in the all of the gothrough pages! */}
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/solver" element={<SolverPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
