/**
 *  ListView.js
 *  Copyright (C) 2021  Andrew Stene
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *   
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import { CalculateProtocolCalendar } from './CalendarCalc';
import { Database } from './Database.js';
import Divider from '@material-ui/core/Divider';

/**
 * Component that represents the entire
 */
class ListView extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            protocolName: this.props.protocolName,
            protocolId:   this.props.protocolId,
            startingDate: this.props.startDate,
            db:           this.props.db
        }
        this.generateTaskComponents = this.generateTaskComponents.bind(this);
    }

    /**
     * Converts each of the tasks in the task list to a ListItem component
     * then returns an array containing the ListItems
     */
    generateTaskComponents()
    {
        let taskComponents = [];
        let protocol       = this.state.db.GetObjectById( parseInt( this.state.protocolId ), Database.DATABASE_LIST_TYPE.PROTOCOLS );
        if( protocol != null )
        {
            let tasks          = CalculateProtocolCalendar( protocol, this.state.startingDate, this.state.db, this.state.protocolName );        
            for(let i = 0; i < tasks.length; i++)
            {
                taskComponents.push(<ListItem task = {tasks[i].description} />);
            }
        }
        return taskComponents;
    }

    /**
     * Render function for the class
     * @returns 
     */
    render()
    {
        const taskComponents = this.generateTaskComponents();
        return (
            <div>
                
                   <List>
                       <ListItem>
                           
                       </ListItem>
                   </List>
                   <Button 
                        className = "sidebysidebutton" 
                        component = { Link } 
                        to        = "/calendar" 
                        variant   = "contained" 
                        size      = "large" 
                    >
                        Calendar View
                    </Button>                    
                    <Button 
                        className = "sidebysidebutton"
                        component = { Link } 
                        to        = "/"
                        variant   = "contained" 
                        size      = "large" 
                    > 
                        Home 
                    </Button>
            </div>
        );
    }
}

/**
 * Component that represents a single task 
 * that will be used to display the list
 */
// class ListItem extends React.Component
// {
//     constructor(props)
//     {
//         super(props)
//         this.state = 
//         {
//             task: this.props.task,
//             start: this.props.start,
//             end: this.props.end,
//             description: this.props.desc
//         }
//     }

//     render()
//     {
//         return(
//             <>
//                 <h1>Task: {this.state.task}</h1>
//             <ul>
//                 <li>Start Date and Time: {this.state.start}</li>
//                 <li>End Date and Time: {this.state.end}</li>
//                 <li>Description of Task: {this.state.description}</li>
//             </ul>
//             </> 
//         )
//     }
// }

export default ListView;