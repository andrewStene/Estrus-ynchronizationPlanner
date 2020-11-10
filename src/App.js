import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './HomePage';
import NamePage from './NamePage';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return(
    <Router>
    <div className="App">
      <Header/>
      <Route path = "/namepage" component ={NamePage}/>
      <Route path = "/" exact component = {HomePage}/>
      <Footer/>
    </div>
    </Router>


  );

}

export default App;
