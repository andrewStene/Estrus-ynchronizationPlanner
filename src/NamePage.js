/**
 * NamePage.js
 */
import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import './NamePage.css'

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
        this.props.setName(value);
        this.setState({name:value});
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

