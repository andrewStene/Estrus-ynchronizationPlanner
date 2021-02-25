/**
 *  ProtocolPage.js
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
 * ProtocolPage.js
 */
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Database } from './Database.js';
import centering from './ProtocolPage.css';
import 'date-fns';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

/**
 * Can't think of a good description rn
 */
class ProtocolPage extends React.Component
{
    /**
     * Constructor for the ProtocolPage class
     * @param {Includes the Name, Breed, SystemType and CowType} props 
     */
   constructor(props)
   {
       super(props);
       /**
        * State is used to store previous values to display to the user
        */
       this.state =
       {
        name: "",
        breed:"",
        systemType:" ",
        cowType:"",
        id:"",
        startDate: new Date(),
        description:"",
         /** @type {Database} */ database: this.props.database
       }
         
       this.updateProtocolId = this.updateProtocolId.bind(this); 
       this.updateStartDateTime = this.updateStartDateTime.bind(this);
       this.lookupNameFromLabel = this.lookupNameFromLabel.bind(this);
   }

    /**
     * Sets the state based on the values passed in the props
     * @param {Props} props 
     * @param {State} state 
     */
   static getDerivedStateFromProps(props,state)
   {
       return{name: props.name, breed:props.breed, systemType:props.systemType, cowType:props.cowType, semen:props.semen};
   }

   /**
    * Dont remember what this is atm
    * @param {The new protocol ID} value
    */
   updateProtocolId(value)
   {   
       
        let protocal = this.state.database.GetObjectByName(value.target.value, Database.DATABASE_LIST_TYPE.PROTOCALS)
        let description = "";
        if(protocal != null)
        {
            description = protocal.Description;
        }
        this.setState({id:value});
        
        this.setState({description: description })
   }

   /**
    * Updates the starting date and time
    * @param {The start date} date 
    */
   updateStartDateTime(date)
   {
    console.log(date);
    this.setState({startDate:new Date(date)});
    //this.props.setStartDateTime(date);
   }

    /**
    * Not currently implemented
    * @param {*} event 
    */
   verifyInput(event)
   {
       event.preventDefualt();
       
   }

   /**
    * Looks up a given name in the database given a label
    * @param {string} label - the label to look up
    * @param {DATABASE_LIST_TYPE} databaseListType - the database list to search
    * @return {string} - the name of the label, or Not Selected if not found
    */
   lookupNameFromLabel(label, databaseListType)
   {
        let name = this.state.database.GetNameById( parseIdFromLabel( label ), databaseListType );
        if(name == "")
        {
            name = <em>Not Selected</em>;
        }
        return name;
   } /* lookypNameFromLabel() */


    /**
     * Render function for the class
     */
    render()
    {        
        const recommendedProtocals = this.state.database.GetRecommendedProtocals(
                                     parseIdFromLabel( this.state.semen ), parseIdFromLabel( this.state.systemType ), parseIdFromLabel( this.state.breed ), 
                                     null, null ).map(
                                     ( protocal ) => < MenuItem 
                                       value = { protocal.Name } > { protocal.Name } </ MenuItem > );
        
        let styles = { width:  400,
                       height: 55 };

        return(
            <div>         
            <h1>Select a Protocol</h1>
            <br/>            
            <ul>
            <li>{this.state.name}</li>
            <li> <b>{ `${ Database.DATABASE_LIST_NAME.BREED }: ` }</b> 
                 { this.lookupNameFromLabel( this.state.breed, Database.DATABASE_LIST_TYPE.BREED ) } </li>

            <li> <b>{ `${Database.DATABASE_LIST_NAME.SYSTEM_TYPE}: ` }</b> 
                 { this.lookupNameFromLabel( this.state.systemType, Database.DATABASE_LIST_TYPE.SYSTEM_TYPE ) }</li>

            <li><b>Cow or Hiefer</b>: {this.state.cowType}</li>
            <li> <b>{ `${Database.DATABASE_LIST_NAME.SEMEN}: ` }</b> 
                 { this.lookupNameFromLabel( this.state.semen, Database.DATABASE_LIST_TYPE.SEMEN ) }</li>
            </ul>            
            <br/>
            <form>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                  { Database.DATABASE_LIST_NAME.PROTOCALS } 
              </InputLabel>
                   <Select style = {styles}
                   id="protocol"                    
                    onChange={this.updateProtocolId}
                    label="Protocol"
                                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {recommendedProtocals}                        
                     </Select>
            </FormControl>
            <p><b>Protocal Description:</b> {this.state.description}</p>           
            <br/>
            <br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDateTimePicker
                variant="inline"

                label="With keyboard"
                value={this.state.startDate}
                onChange={(value)=> this.updateStartDateTime(value)}
                onError={console.log}
                disablePast
                format="MM/dd/yyyy hh:mm aa"
            />
            </MuiPickersUtilsProvider>
            <br/>
            <br/>
            <Button className = "sidebysidebutton" component={Link} to="/selectionpage" color="defualt" variant="contained" size = "large" >Back</Button>
            <Button className = "sidebysidebutton"component={Link} to="/"color="defualt"variant="contained" size = "large">Next</Button>
            </form>
            </div>
            );
    }
   
}
export default ProtocolPage;


   /**
    * @function parseIdFromLabel - parses a label to convert to number id
    * @param {string} label - the label to parse, should be in format "SomeLabel-1"
    * @returns {number} - the id as a number, null if unsuccessful
    */
   function parseIdFromLabel(label)
   {
        let sId = label.split('-');
        let intId = null;

        if(sId.length != null && sId.length > 1);
        {
            intId = parseInt(sId[1]);
            if(isNaN(intId))
            {
                // parse failed
                intId = null;
            }
        }
        return intId;
   } /* parseIdFromLabel() */
