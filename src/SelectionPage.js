import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button} from '@material-ui/core';
import { Link } from 'react-router-dom'


class SelectionPage extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state=
    {
      breed:"",
      systemType:"",
      cowType:"",
    }
    this.updateParentCowType = this.updateParentCowType.bind(this);
    this.updateParentBreed = this.updateParentBreed.bind(this);
    this.updateParentSystemType = this.updateParentSystemType.bind(this);
  }
  
  static getDerivedStateFromProps(props,state)
  {
      return{breed: props.breed, systemType:props.systemType, cowType:props.cowType};
  }
  
  updateParentCowType(cowType)
  {
    this.setState({cowType:cowType});
    this.props.setCowType(cowType);
  }

  updateParentBreed(breed)
  {
    this.setState({breed:breed});
    this.props.setBreed(breed);

  }

  updateParentSystemType(sys)
  {
    this.setState({systemType:sys});
    this.props.setSystemType(sys);
  }

  render()
  {
    return(
        <div>
            <h1>Select Breed Type</h1>
            <FormControl>
              <FormLabel>Breed Type</FormLabel>
              <RadioGroup aria-label = "Breed Type" name = "breed" value={this.state.breed} onChange={(event)=>this.updateParentBreed(event.target.value)}>
                <FormControlLabel value ="bosTaurus" control={<Radio />} label="Bos Taurus"/>
                <FormControlLabel value ="bosIndicusInfluence" control={<Radio />} label="Bos Indicus Influence"/>
              </RadioGroup>
            </FormControl>
            <br/>
            <br/>
            <FormControl>
              <FormLabel>Cow or Heifer</FormLabel>
              <RadioGroup aria-label = "Cow or Heifer" name = "cow" value={this.state.cowType} onChange={(event)=>this.updateParentCowType(event.target.value)}>
                <FormControlLabel value ="cow" control={<Radio />} label="Cow "/>
                <FormControlLabel value ="heifer" control={<Radio />} label="Heifer "/>
              </RadioGroup>
            </FormControl>
            <br/>
            <br/>
            <FormControl>
              <FormLabel>System Type</FormLabel>
              <RadioGroup aria-label = "System Type" name = "sys" value={this.state.systemType} onChange={(event)=>this.updateParentSystemType(event.target.value)}>
                <FormControlLabel value ="estrusAi" control={<Radio />} label="Estrus AI "/>
                <FormControlLabel value ="cleanUpAi" control={<Radio />} label="Estrus AI and Clean-Up AI "/>
                <FormControlLabel value ="fixedTimeAI" control={<Radio />} label="Fixed Time AI "/>
              </RadioGroup>
            </FormControl>
            <br/>
            <Button className = "sidebysidebutton" component={Link} to="/namepage" variant="contained" size = "large" >Back</Button>
            <Button className = "sidebysidebutton"  component={Link} to="/protocol" variant="contained" size = "large">Next</Button>
        </div>
    );
    }
}

export default SelectionPage;