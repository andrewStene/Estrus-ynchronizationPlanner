/**
 *  App.js
 *  Copyright (C) 2021  Andrew Stene
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *   
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
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
import { Database } from './Database.js';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

/**
 * The class that contains the main logic for the application
 */
class App extends React.Component 
{
  constructor(props)
  {
    super(props);
    /**
     * The different components of a protocol are stored in the state of the main 
     * react component and passed to other components or updated as needed
     */
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
      startDateTime:"",


      database:   new Database()      
    }
    /**
     * The bindings for the functions to update the state
     */

    this.setName = this.setName.bind(this);
    this.setCowType = this.setCowType.bind(this);
    this.setBreed = this.setBreed.bind(this);
    this.setSystemType = this.setSystemType.bind(this);
    this.setStartDateTime = this.setStartDateTime.bind(this);
    this.setProtocol = this.setProtocol.bind(this);
  }

  /**
   * Sets the name of the protocol plan in the state based on the given Name
   * @param {The new Name to be set} name 
   */
  setName(name)
  {
    this.setState({name:name});
    console.log(this.state.name); //Makes sure that the correct value is stored in the state
  }
  
  /**
   * Updates the state to the proper value of Cow or Heifer 
   * based on what is given in the SelectionPage
   * @param {Either a value of Cow or Heifer} cowType 
   */
  setCowType(cowType)
  {
    this.setState({cowType:cowType});
    console.log(this.state.cowType); //Makes sure that the correct value is stored in the state
  }

  /**
   * Updates the state to the proper type of Cattle Breed
   * based on what is given in the SelectionPage
   * @param {The Breed value to update the state with} breed 
   */
  setBreed(breed)
  {
    this.setState({breed:breed});
    console.log(this.state.breed); //Makes sure that the correct value is stored in the state
  }

  /**
   * Updates the state to the proper System Type
   * based on what is given in the SelectionPage
   * @param {The System Type being used to be stored in the state} sys 
   */
  setSystemType(sys)
  {
    this.setState({systemType:sys});
    console.log(this.state.systemType); //Makes sure that the correct value is stored in the state
  }

 

  /**
   * Updates the state to the selected breeding protocol
   * based on what is given in the ProtocolPage
   * @param {The ID assigned to the selected protocol} protocol 
   */
  setProtocol(protocol)
  {
    this.setState({id:protocol});
    console.log(protocol)
  }

  /**
   * Updates the state to the selected starting date and time
   * based on what is given in the ProtocolPage
   * @param {The intended starting date and time} date 
   */
  setStartDateTime(date)
  {
    this.setState({startDateTime:date});
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

          <Route path = "/namepage" 
          component ={()=><NamePage database = {this.state.database} name = {this.state.name}
          setName = {this.setName}/>}/>
        
          <Route path = "/selectionpage" 
          component = {()=><SelectionPage database = {this.state.database}
          breed = {this.state.breed} systemType = {this.state.systemType} cowType ={this.state.cowType}
          setBreed = {this.setBreed} setCowType = {this.setCowType} setSystemType = {this.setSystemType}/>}/>

          <Route path = "/protocol"

          component = {()=><Protocol database = {this.state.database}
          breed = {this.state.breed} systemType = {this.state.systemType} cowType={this.state.cowType} name = {this.state.name} 
          setProtocol = {this.setProtocol} setStartDateTime = {this.setStartDate}/>}/>



          <Route path = "/" exact component = {HomePage}/>
          <Route path = "/help" component = {Help}/>
          <Route path = "/reference" component = {Reference}/>
          
          <Footer/>
        </div>
        </Router>);
  }
}

export default App;
