import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './HomePage';
import NamePage from './NamePage';
import Footer from './Footer';
import SelectionPage from './SelectionPage';
import Help from './Help';
import Reference from './Reference'
import Protocol from './ProtocolPage'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

/**
 * Contains the main logic for the application
 */

class App extends React.Component 
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      name:"",
      breed:"",
      cowType:"",
      id:"",
      semen:"",
      systemType:"",
      gnrh:"",
      pg:"",

    }
    this.setName = this.setName.bind(this);
    this.setCowType = this.setCowType.bind(this);
    this.setBreed = this.setBreed.bind(this);
    this.setSystemType = this.setSystemType.bind(this);
  }

  /**
   * Sets the name of the protocol plan in the state based on the given name
   * @param {the new name to be set} name 
   */
  setName(name)
  {
    this.setState({name:name});
    console.log(this.state.name);
  }

  setCowType(cowType)
  {
    this.setState({cowType:cowType});
    console.log(this.state.cowType)
  }

  setBreed(breed)
  {
    this.setState({breed:breed});
    console.log(this.state.breed)

  }

  setSystemType(sys)
  {
    this.setState({systemType:sys});
    console.log(this.state.systemType)

  }

  /**
   * Render function for the class which includes all of the routes
   */
  render()
  {
      return(
        <Router>
        <div className="App">
          <Header/>
          <Route path = "/namepage" component ={()=><NamePage name = {this.state.name} setName = {this.setName}/>}/>
          <Route path = "/" exact component = {HomePage}/>
          <Route path = "/selectionpage" 
          component = {()=><SelectionPage breed = {this.state.breed} systemType = {this.state.systemType} cowType ={this.state.cowType} setBreed = {this.setBreed} setCowType = {this.setCowType} setSystemType = {this.setSystemType}/>}/>
          <Route path = "/help" component = {Help}/>
          <Route path = "/reference" component = {Reference}/>
          <Route path = "/protocol" component = 
          {()=><Protocol breed = {this.state.breed} systemType = {this.state.breedType} cowType={this.state.cowType} name = {this.state.name} 
          />}/>
          <Footer/>
        </div>
        </Router>);
  }
}

export default App;
