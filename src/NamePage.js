import React from 'react';
import { Button, TextField } from '@material-ui/core';

function NamePage (){
    return(
        <div>
        <h1>Enter a name for the schedule below</h1>
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <br/>
        <br/>
        <Button color="defualt"variant="contained" size = "large">Next</Button>
        </div>

    );
}
export default NamePage;

