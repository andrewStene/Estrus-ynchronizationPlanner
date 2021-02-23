/**
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
        
         /** @type {Database} */ database: this.props.database
       }
       this.updateParent = this.updateParent.bind(this);  
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
    * Dont remember what this is atm
    * @param {} value 
    */
   updateParent(value)
   {   
        this.setState({id:value});
   }

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
            <li>{this.state.name}</li>
            <li>Breed: {this.state.breed}</li>
            <li>System Type: {this.state.systemType}</li>
            <li>Cow or Hiefer: {this.state.cowType}</li>
            </ul>
            <br/>
            <form>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Protocol</InputLabel>
                  <Select
                   id="protocol"
                    //value={age}
                    onChange={this.updateParent}
                    label="Protocol"
                                    >
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
            <Button className = "sidebysidebutton" component={Link} to="/selectionpage" color="defualt" variant="contained" size = "large" >Back</Button>
            <Button className = "sidebysidebutton"component={Link} to="/"color="defualt"variant="contained" size = "large">Next</Button>
            </form>
            </div>
            );
    }
   
}
export default ProtocolPage;

