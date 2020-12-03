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
    this.setSelection = this.setSelection.bind(this);
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

  /**
   * Sets the options determind by the SelectionPage component in the state
   * @param {*breed of cattle} breed 
   * @param {*type of system} systemType 
   * @param {*cow or hiefer} cowType 
   */
  setSelection(breed, systemType, cowType)
  {
    this.setState({breed:breed}, {systemType:systemType}, {cowType:cowType});
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
          component = {()=><SelectionPage breed = {this.state.breed} systemType = {this.state.systemType} cowType ={this.state.cowType} setSelection = {this.setSelection}/>}/>
          <Route path = "/help" component = {Help}/>
          <Route path = "/reference" component = {Reference}/>
          <Route path = "/protocol" component = 
          {()=><Protocol breed = {this.state.breed} systemType = {this.state.breedType} cowType={this.state.cowType} name = {this.state.name}/>}/>
          <Footer/>
        </div>
        </Router>);
  }
}

export default App;
