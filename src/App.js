/**
 *  App.js
 *  Copyright (C) 2021  Andrew Stene, Ben Amos
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
import CalPage from './CalendarPage'
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
    constructor( props )
    {

        super( props );
        
        /**
        * The different components of a protocol are stored in the state of the main 
        * react component and passed to other components or updated as needed
        */
        this.state = 
        {
            waitToRender:  true,
            database:      new Database(),
          
            name:          "",
            breed:         "",
            cowType:       "",
            id:            "",
            semen:         "",
            systemType:    "",
            gnrh:          "",
            pg:            "",
            startDateTime: new Date(),
            prevPage: "",
            description:"",
        }
      
        /**
        * The bindings for the functions to update the state
        */
        this.setName          = this.setName.bind( this );
        this.setCowType       = this.setCowType.bind( this );
        this.setBreed         = this.setBreed.bind( this );
        this.setSystemType    = this.setSystemType.bind( this );
        this.setSemen         = this.setSemen.bind( this );
        this.setStartDateTime = this.setStartDateTime.bind( this );
        this.setProtocol      = this.setProtocol.bind( this );
        this.updateLastVistedPage = this.updateLastVistedPage.bind(this);
        this.getProtocolStringFromState = this.getProtocolStringFromState.bind(this);
        this.setProtocolDescription = this.setProtocolDescription.bind(this);
    } /* end constructor() */


    /**
    * Sets the name of the protocol plan in the state based on the given Name
    * @param {string} name - The new Name to be set 
    */
    setName( name )
    {
        this.setState( { name: name } );
        console.log( this.state.name ); //Makes sure that the correct value is stored in the state
    } /* setName() */
  
    /**
    * Updates the state to the proper value of Cow or Heifer 
    * based on what is given in the SelectionPage
    * @param {string} cowType - Either a value of Cow or Heifer 
    */
    setCowType( cowType )
    {
        this.setState( { cowType: cowType } );
        console.log( this.state.cowType ); //Makes sure that the correct value is stored in the state
    } /* setCowType() */

    /**
    * Updates the state to the proper type of Cattle Breed
    * based on what is given in the SelectionPage
    * @param {string} breed - The Breed value to update the state with 
    */
    setBreed( breed )
    {
        this.setState( { breed: breed } );
        console.log( this.state.breed ); //Makes sure that the correct value is stored in the state
    } /* setBreed() */

    /**
    * Updates the state to the proper System Type
    * based on what is given in the SelectionPage
    * @param {string} sys - The System Type being used to be stored in the state 
    */
    setSystemType( sys )
    {
        this.setState( { systemType: sys } );
        console.log( this.state.systemType ); //Makes sure that the correct value is stored in the state
    } /* setSystemType() */

    /**
    * Updates the state to the proper Semen
    * based on what is given in the SelectionPage
    * @param {string} semen - The Semen being used to be stored in the state 
    */
    setSemen( semen )
    {
        this.setState( { semen: semen } );
        console.log( this.state.semen );
    } /* setSemen() */ 

    /**
    * Updates the state to the selected breeding protocol
    * based on what is given in the ProtocolPage
    * @param {string} protocol - The ID assigned to the selected protocol 
    */
    setProtocol( protocol )
    {
        
        this.setState( { id: protocol } );
        console.log( protocol );
    } /* setProtocol() */

    /**
    * Updates the state to the selected starting date and time
    * based on what is given in the ProtocolPage
    * @param {Date} date - The intended starting date and time
    */
    setStartDateTime( date )
    {
        console.log("In App.js")
        this.setState( { startDateTime: new Date (date) } );
        console.log(this.state.startDateTime)
    } /* setStartDateTime() */

    /**
     * 
     * @param {*} desc 
     */
    setProtocolDescription(desc)
    {
        this.setState({description: desc});
    }

    /**
     * Used to allow the user to return to the page they visted the help page from
     * @param {The last page the user was on} page 
     */
    updateLastVistedPage(page)
    {
        this.setState({prevPage:page});
    }
    /**
     * 
     * @returns 
     */
    getProtocolStringFromState()
    {
        let string = this.state.database.GetObjectById(this.state.id, Database.DATABASE_LIST_NAME.PROTOCOLS);
        if(string === null)
        {
            return "";
        }
        return string.Name;
    }

    /**
    * Render function for the class which includes all of the routes
    */
    render()
    {


        if( this.state.waitToRender )
        {
            Database.GetJSONData( './data.json' ).then( ( json ) => { this.setState( { database: new Database( json ), waitToRender: false } ) } );
            return( <div></div> );
        }
        else
        {
            let idString = this.getProtocolStringFromState();
        return(
            <Router>
                <div className = "App" >
                  <Header/>

                  <Route 
                      path      = "/namepage" 
                      component = { () => 
                                        <NamePage 
                                            database = { this.state.database } 
                                            name     = { this.state.name }
                                            setName  = { this.setName }
                                            lastPage = {this.updateLastVistedPage}
                                        />
                                  }
                  />          
                  <Route 
                      path      = "/selectionpage" 
                      component = { () =>
                                        <SelectionPage 
                                            database      = { this.state.database }
                                            breed         = { this.state.breed } 
                                            setBreed      = { this.setBreed }
                                            systemType    = { this.state.systemType } 
                                            setSystemType = { this.setSystemType }
                                            cowType       = { this.state.cowType }                                       
                                            setCowType    = { this.setCowType } 
                                            semen         = { this.state.semen }
                                            setSemen      = { this.setSemen } 
                                            lastPage = {this.updateLastVistedPage}
                                        />
                                  }
                  />
                  <Route 
                      path      = "/protocol"
                      component = { () => 
                                        <Protocol 
                                            database          = { this.state.database }
                                            breed             = { this.state.breed } 
                                            systemType        = { this.state.systemType } 
                                            cowType           = { this.state.cowType } 
                                            name              = { this.state.name } 
                                            semen             = { this.state.semen } startDate = {this.state.startDateTime}
                                            protocolId = {this.state.id}
                                            description = {this.state.description}
                                            setProtocol       = { this.setProtocol } 
                                            setStartDateTime  = { this.setStartDateTime }
                                            lastPage = {this.updateLastVistedPage}
                                            setDescription = {this.setProtocolDescription}
                                        />
                                  }
                  />
                  <Route path = "/calendar" component = {()=><CalPage 
                        protocolName = {this.state.name} protocolId = {this.state.id} startDate = {this.state.startDateTime} db = {this.state.database}
                        lastPage = {this.updateLastVistedPage}/>}/>

                  <Route path = "/" exact    component = { HomePage } />
                  <Route path = "/help"      component = { Help } />
                  <Route path = "/reference" component = { Reference } />
                  
                  <Footer/>
              </div>
          </Router>
        );
        }        

    } /* render() */
} /* end App */
export default App;
