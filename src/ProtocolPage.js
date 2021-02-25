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
import { Database } from './Database.js';
import centering from './ProtocolPage.css';

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
        systemType:" ",
        cowType:"",
        id:"",
        description:"",
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
       return{name: props.name, breed:props.breed, systemType:props.systemType, cowType:props.cowType, semen:props.semen};
   }

   /**
    * Dont remember what this is atm
    * @param {} value 
    */
   updateParent(value)
   {   
        let protocal = this.state.database.GetObjectByName(value.target.value, Database.DATABASE_LIST_TYPE.PROTOCALS)
        let description = "";
        if(protocal != null)
        {
            description = protocal.Description;
        }
        this.setState({id:value});
        
        this.setState({description: description })
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
        const recommendedProtocals = this.state.database.GetRecommendedProtocals(
                                     parseIdFromLabel( this.state.semen ), parseIdFromLabel( this.state.systemType ), parseIdFromLabel( this.state.breed ), 
                                     null, null ).map(
                                     ( protocal ) => < MenuItem 
                                       value = { protocal.Name } > { protocal.Name } </ MenuItem > );
        
        let styles = { width:  400,
                       height: 55 };

        return(
            <div>         
            <h1>Select a Protocol</h1>
            <br/>            
            <ul>
            <li>{this.state.name}</li>
            <li> <b>{ `${ Database.DATABASE_LIST_NAME.BREED }: ` }</b> 
                 { this.state.database.GetNameById( parseIdFromLabel( this.state.breed ), 
                                                    Database.DATABASE_LIST_TYPE.BREED ) } </li>
            <li> <b>{ `${Database.DATABASE_LIST_NAME.SYSTEM_TYPE}: ` }</b> 
                 { this.state.database.GetNameById( parseIdFromLabel( this.state.systemType ), 
                                                    Database.DATABASE_LIST_TYPE.SYSTEM_TYPE ) }</li>
            <li><b>Cow or Hiefer</b>: {this.state.cowType}</li>
            <li> <b>{ `${Database.DATABASE_LIST_NAME.SEMEN}: ` }</b> 
                 { this.state.database.GetNameById( parseIdFromLabel( this.state.semen ), 
                                                    Database.DATABASE_LIST_TYPE.SEMEN ) }</li>
            </ul>            
            <br/>
            <form>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                  { Database.DATABASE_LIST_NAME.PROTOCALS } 
              </InputLabel>
                   <Select style = {styles}
                   id="protocol"                    
                    onChange={this.updateParent}
                    label="Protocol"
                                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {recommendedProtocals}                        
                     </Select>
            </FormControl>
            <p><b>Protocal Description:</b> {this.state.description}</p>           
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


   /**
    * @function parseIdFromLabel - parses a label to convert to number id
    * @param {string} label - the label to parse, should be in format "SomeLabel-1"
    * @returns {number} - the id as a number, null if unsuccessful
    */
   function parseIdFromLabel(label)
   {
        let sId = label.split('-');
        let intId = null;

        if(sId.length != null && sId.length > 1);
        {
            intId = parseInt(sId[1]);
            if(isNaN(intId))
            {
                // parse failed
                intId = null;
            }
        }
        return intId;
   } /* parseIdFromLabel() */
