import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'


class SelectionPage extends React.Component
{

  render()
  {
    return(
        <div>
            <h1>Select Breed Type</h1>
            <Button className = "sidebysidebutton" component={Link} to="/namepage" color="defualt" variant="contained" size = "large" >Back</Button>
            <Button className = "sidebysidebutton"  color="defualt"variant="contained" size = "large">Next</Button>
        </div>
    );
    }
}

export default SelectionPage;