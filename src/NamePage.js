import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import './NamePage.css'

class NamePage extends React.Component
{
   constructor(props)
   {
       super(props);
       this.state =
       {
        name: "",
       }
       this.updateParent = this.updateParent.bind(this);  
   }

   static getDerivedStateFromProps(props,state)
   {
       return{name: props.name};
   }

   updateParent(value)
   {   
        this.props.setName(value);
        this.setState({name:value});
   }

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

