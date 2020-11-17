import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import './NamePage.css'

function NamePage (){
    return(
        <div>
        
        <h1>Enter a name for the schedule below</h1>
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <br/>
        <br/>
        <Button className = "sidebysidebutton" component={Link} to="/" color="defualt" variant="contained" size = "large" >Back</Button>

        <Button className = "sidebysidebutton"component={Link} to="/selectionpage"color="defualt"variant="contained" size = "large">Next</Button>

        </div>

    );
}
export default NamePage;

