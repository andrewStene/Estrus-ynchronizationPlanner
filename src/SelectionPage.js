/**
 *  SelectionPage.js
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button} from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Database } from './Database.js';

/**
 * Class that represents the page where a user will select the parameters
 * of their desired system
 */
class SelectionPage extends React.Component
{
  /**
   * Constructor for the SelectionPage class
   * @param {Props include the Breed, Type of system and Type of cow} props 
   */
  constructor(props)
  {
    super(props);

    this.state=
    {
      breed:"",
      systemType:"",
      cowType:"",
      
      /** @type {Database} */ database: this.props.database
    }
    this.updateParentCowType = this.updateParentCowType.bind(this);
    this.updateParentBreed = this.updateParentBreed.bind(this);
    this.updateParentSystemType = this.updateParentSystemType.bind(this);
    this.verifyInput = this.verifyInput.bind(this);
  }

  /**
   * Default
   * @param {*} props 
   * @param {*} state 
   */
  static getDerivedStateFromProps(props,state)
  {
      return{breed: props.breed, systemType:props.systemType, cowType:props.cowType};
  }

  /**
   * Function to update both the state of the SelectionType
   *  as well as the state contained in App.js
   *  if the system being used is for cows or heifers
   * @param {Either a cow or heifer} cowType 
   */
  updateParentCowType(cowType)
  {
    this.setState({cowType:cowType});
    this.props.setCowType(cowType);
  }

  /**
  * Function to update both the state of the SelectionType
  *  as well as the state contained in App.js
  *  of the breed of cattle being used
  * @param {The breed of cattle the user has selected} breed 
  */
  updateParentBreed(breed)
  {
    this.setState({breed:breed});
    this.props.setBreed(breed);

  }

  /**
  * Function to update both the state of the SelectionType
   *  as well as the state contained in App.js
   *  of the System to be used
   * @param {The System to update the state to} sys 
   */
  updateParentSystemType(sys)
  {
    this.setState({systemType:sys});
    this.props.setSystemType(sys);
  }

  /**
   * Ensures that all inputs on a page contain some value
   * @param {The event raised when a user clicks the next button} event 
   */
  verifyInput(event)
  {
    event.preventDefualt();
    console.log("here");

  }

  /**
   * The render function for the SelectionPage class
   */
  render()
  {
    const breeds      = this.state.database.GetDatabaseListElements( Database.DATABASE_LIST_TYPE.BREED ).map( 
                        (breed) => < FormControlLabel 
                        value   = { Database.DATABASE_LIST_NAME.BREED + "-" + breed.Id } 
                        control = { <Radio /> } 
                        label   = { breed.Name }/> );

    const systemTypes = this.state.database.GetDatabaseListElements( Database.DATABASE_LIST_TYPE.SYSTEM_TYPE ).map(
                        (systemType) => < FormControlLabel 
                        value        = { Database.DATABASE_LIST_NAME.SYSTEM_TYPE + "-" + systemType.Id } 
                        control      = { <Radio /> } 
                        label        = { systemType.Name } /> );    
    
    return(
        <div>
            <h1>Select { Database.DATABASE_LIST_NAME.BREED } Type</h1>
            <form onSubmit = {(event)=> this.verifyInput(event)}>
            <FormControl>
              <FormLabel> { Database.DATABASE_LIST_NAME.BREED } </FormLabel>
              <RadioGroup aria-label = { Database.DATABASE_LIST_NAME.BREED } name = {Database.DATABASE_LIST_NAME.BREED }
               value={this.state.breed} onChange={(event)=>this.updateParentBreed(event.target.value)}>
                { breeds }
              </RadioGroup>
            </FormControl>
            <br/>
            <br/>
            <FormControl>
              <FormLabel>Cow or Heifer</FormLabel>
              <RadioGroup aria-label = "Cow or Heifer" name = "cow" value={this.state.cowType} onChange={(event)=>this.updateParentCowType(event.target.value)}>
                <FormControlLabel value ="cow" control={<Radio />} label="Cow "/>
                <FormControlLabel value ="heifer" control={<Radio />} label="Heifer "/>
              </RadioGroup>
            </FormControl>
            <br/>
            <br/>
            <FormControl>
              <FormLabel>System Type</FormLabel>
              <RadioGroup aria-label = { Database.DATABASE_LIST_NAME.SYSTEM_TYPE } name = { Database.DATABASE_LIST_NAME.SYSTEM_TYPE } 
               value={this.state.systemType} onChange={(event)=>this.updateParentSystemType(event.target.value)} >
                { systemTypes }                
              </RadioGroup>
            </FormControl>
            <br/>
            <Button className = "sidebysidebutton" component={Link} to="/namepage" variant="contained" size = "large" >Back</Button>
            <Button className = "sidebysidebutton"  component={Link} to="/protocol" variant="contained" size = "large">Next</Button>
            </form>
        </div>
    );
    }
}

export default SelectionPage;