
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieData from './pages/MovieData';
function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route  path="/" element={<HomePage/>} />
        <Route path="/movies/:id" element={<MovieData/>} />
      </Routes>
    </Router>
    <ToastContainer/>
    
    </div>
  );
}

export default App;
