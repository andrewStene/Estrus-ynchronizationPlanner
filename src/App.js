import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './HomePage';
import NamePage from './NamePage';
import Footer from './Footer';
import SelectionPage from './SelectionPage';
import Help from './Help';
import Reference from './Reference'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";


function App() {
  return(
    <Router>
    <div className="App">
      <Header/>
      <Route path = "/namepage" component ={NamePage}/>
      <Route path = "/" exact component = {HomePage}/>
      <Route path = "/selectionpage" component = {SelectionPage}/>
      <Route path = "/help" component = {Help}/>
      <Route path = "/reference" component = {Reference}/>
      <Footer/>
    </div>
    </Router>


  );

}

export default App;
