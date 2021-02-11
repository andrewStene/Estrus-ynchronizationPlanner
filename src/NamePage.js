/**
 *  NamePage.js
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
import './NamePage.css'

function validate(name)
{
    return {
        name : name.length === 0
    };
}


/**
 * The react component that allows the user to input a name for
 * a schedule
 */
class NamePage extends React.Component
{
    /**
     * Constructor for the NamePage class
     * @param {The Name stored in App.js} props 
     */
   constructor(props)
   {
       super(props);
       this.state =
       {
        name: "",
       }
       this.updateParent = this.updateParent.bind(this);  
   }

    /**
     * Included
     * @param {The Name} props 
     * @param {The State} state 
     */
   static getDerivedStateFromProps(props,state)
   {
       return{name: props.name};
   }

   /**
    * Updates both the state of this class as well as the state in App.js
    * @param {The Name to update the state to} value 
    */
   updateParent(value)
   {   
    if(!this.notBlank())
    {
        value.preventDefault();
        return;
    }
        this.props.setName(value);
        this.setState({name:value});

      
   }

   notBlank()
   {
    const errors = validate(this.state.name);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
   }

   /**
    * Render function for NamePage.js
    */
    render()
    {
        return(
            <div>         
            <h1>Enter a name for the schedule below</h1>
            <TextField id="outlined-basic" label="Name" variant="outlined" defaultValue = {this.state.name} onBlur = {(event) => this.updateParent(event.target.value)}/>
            <br/>
            <br/>
            <Button className = "sidebysidebutton" component={Link} to="/" color="defualt" variant="contained" size = "large" >Back</Button>
            <Button className = "sidebysidebutton"component={Link} to="/selectionpage"color="defualt"variant="contained" size = "large">Next</Button>
            </div>
            );
    }
   
}
export default NamePage;

