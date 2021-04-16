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
import ListItemText from '@material-ui/core/ListItemText';
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
            db: this.props.db,
            taskList: this.props.taskList,
        }
        this.generateTaskComponents = this.generateTaskComponents.bind(this);
    }

    /**
     * Converts each of the tasks in the task list to a ListItem component
     * then returns an array containing the ListItems
     */
    generateTaskComponents()
    {
        var taskComponents = [];
        for(let i = 0; i < this.state.taskList.length; i++)
        {
            taskComponents.push(<ListItem task = {this.state.taskList[i].description} />);
        }
    }

    /**
     * Render function for the class
     * @returns 
     */
    render()
    {
        const taskComponents = this.generateTaskComponents();
        return(
            <div>
                {this.state.taskList.map(
                   (task)=>
                   <>
                   <h1><b>{task.title}</b></h1>
                   <List>
                       <ListItem>
                           <ListItemText 
                           primary = "Start:"
                           secondary = {task.startDate}
                           />
                       </ListItem>
                   </List>
                  </>

                )}
            </div>
        )
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