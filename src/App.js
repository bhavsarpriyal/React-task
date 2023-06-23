import logo from './logo.svg';
import './App.css';
import {Route, Routes, } from "react-router-dom"
import Registrationform from './home/registrationform';
import UserData from './userData/UserData';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Registrationform />} />  
      <Route path='/userdata' element={<UserData/>} />  
      </Routes>
    </div>
  );
}

export default App;
