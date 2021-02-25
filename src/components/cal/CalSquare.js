import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';




class CalSquare extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state=
        {
            date:"",
            time:"",
            action:"",
            currentDate:null,
        }
    }


    render()
    {
        return(
            <div></div>
           /*  <div style={{width:'500 px' , height:'100 px' , border:'2 px solid #ffffff'}}>
                <h1>Day</h1>
                <List>
                    <ListItem>
                        <ListItemText primary="hi"/>
                    </ListItem>
                </List>
            </div> */
        );
    }

}

export default CalSquare;