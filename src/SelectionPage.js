import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'

export default SelectionPage;
function SelectionPage(){

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  }
    return(
        <div>
            <h1>Select Breed Type</h1>
            <FormControl component="fieldset">
              <FormLabel component="legend">Breed</FormLabel>
                <RadioGroup aria-label="breed" name="breed1" value={value} onChange={handleChange}>
                  <FormControlLabel value="bostaurus" control={<Radio />} label="Bos Taurus" />
                  <FormControlLabel value="bosindicusinfluence" control={<Radio />} label="Bos indicus influence" />
               </RadioGroup>
           </FormControl>
           <br></br>
           <h1>Cow or Heifer</h1>
           <FormControl component="fieldset">
            <FormLabel component ="legend">Cow or Heifer</FormLabel>
            <RadioGroup aria-label="cow" name="cow1" value={value} onChange={handleChange}>
                  <FormControlLabel value="cow" control={<Radio />} label="Cow" />
                  <FormControlLabel value="heifer" control={<Radio />} label="Heifer" />
               </RadioGroup>
           </FormControl>

          <br></br>


        <Button className = "sidebysidebutton" component={Link} to="/namepage" color="defualt" variant="contained" size = "large" >Back</Button>

        <Button className = "sidebysidebutton"  color="defualt"variant="contained" size = "large">Next</Button>
        </div>
    );

    }