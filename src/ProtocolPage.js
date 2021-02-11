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
 */
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './ProtocolPage.css';



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
        systemType:"",
        cowType:"",
        id:"",
        startDate: "",
       }

       this.updateMainID = this.updateMainID.bind(this);
       this.updateStartDate = this.updateStartDate.bind(this);
   }

    /**
     * Sets the state based on the values passed in the props
     * @param {Props} props 
     * @param {State} state 
     */
   static getDerivedStateFromProps(props,state)
   {
       return{name: props.name, breed:props.breed, systemType:props.systemType, cowType:props.cowType};
   }

   /**
    * Updates the desired protocol
    * @param {ID of the protocol selected} value 
    */
   updateMainID(value)
   {   
        this.props.setProtocol(value);
        this.setState({id:value});      
   }

   /**
    * Updates the intended breed date
    * @param {The new date value} value 
    */
   updateStartDate(value)
   {
       this.props.setStartDate(value);
       this.setState({startDate:value});
       
       console.log(this.state.startDate);
       console.log(value);
   }

   /**
    * 
    * @param {form submission} event 
    */
   verifyInput(event)
   {
       event.preventDefualt();
       
   }

    /**
     * Render function for the class
     */
    render()
    {
        return(
            <div>         
            <h1>Select a Protocol</h1>
            <br/>
            <ul>
            <li>Name: {this.state.name}</li>
            <li>Breed: {this.state.breed}</li>
            <li>Cow or Hiefer: {this.state.cowType}</li>
            <li>System Type: {this.state.systemType}</li>
            </ul>
            <br/>
            <form>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Protocol</InputLabel>
                  <Select
                   id="protocol"
                    value={this.state.id}
                    onBlur={(event) =>this.updateMainID(event.target.value)}
                    label="Protocol">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                     </Select>
            </FormControl>
            <br/>
            <br/>
            <TextField
                id="date"
                label="Start Date"
                type="date"
                Value={this.state.startDate}
                onBlur = {(event) => this.updateStartDate(event.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
            />
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

