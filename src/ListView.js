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
import ReactToPrint from 'react-to-print';
import './index.css';

const daysOfWeek = 
{
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};

const months = 
{
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
};

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
        let styles = { paddingLeft:  700 };
        let protocol       = this.state.db.GetObjectById( parseInt( this.state.protocolId ), Database.DATABASE_LIST_TYPE.PROTOCOLS );
        if( protocol != null )
        {
            let events          = CalculateProtocolCalendar( protocol, this.state.startingDate, this.state.db, this.state.protocolName );        
            for( let i = 0; i < events.length; i++ )
            {
                taskComponents.push(<ListItem style={styles}> { `${ this.formatDate( events[i].start ) } > ${ events[i].title }` } </ListItem>);
            }
        }
        return taskComponents;
    } /* generateTaskComponents */

    /**
     * @function formatDate - formats a date object into a date in form: "DayofWeek Month Day Hour Minute AM/PM"
     * @param {Date} date - the time to format
     * @returns {string} - the formated time
     */
    formatDate( date )
    {
        return `${ this.formatDayOfWeek( date.getDay() ) } - ${ this.formatMonth( date.getMonth() ) } ${ date.getDate() } @ ${ this.formatTime( date.getHours(), date.getMinutes() ) }`;
    } /* formatDate() */

    /**
     * @function formatDayOfWeek - formats a number representing the day of the week to a string representation
     * @param {number} numDayOfWeek - the number to convert
     * @returns {string} - the day of the week
     */
    formatDayOfWeek( numDayOfWeek )
    {
        if( numDayOfWeek < 0 || numDayOfWeek > 6 )
        {
            return "Invalid";
        }        
        return daysOfWeek[numDayOfWeek];
    } /* formatDayOfWeek() */

    /**
     * @function formatMonth - formats the a numeric month to its string
     * @param {number} numMonth - the numeric month to format
     * @returns {string} - the month 
     */
    formatMonth ( numMonth )
    {
        if( numMonth < 0 || numMonth > 11 )
        {
            return "Invalid";
        }        
        return months[ numMonth ];
    } /* formatMonth() */

    /**
     * @function formatTime - formats a time into AM and PM
     * @param {number} hours - the hours to format
     * @param {number} minutes - the minutes to format
     */
    formatTime ( hours, minutes )
    {
        let AM_or_PM = hours < 12 ? "AM" : "PM";
        if( hours > 12 )
        {
            hours -= 12;
        }
        else if( hours == 0 )
        {
            hours = 12; // 12 AM
        }
        let strMinutes = minutes + "";
        if( minutes < 10 )
        {
            strMinutes = "0" + strMinutes;
        }
        return `${ hours }:${ strMinutes } ${ AM_or_PM }`;
    } /* formatTime() */

    /**
     * Render function for the class
     * @returns 
     */
    render()
    {
        
        const taskComponents = this.generateTaskComponents();
        return (
            <div> 
           
             
                <br/>              
                <h1>Protocol - { this.state.db.GetNameById( parseInt( this.state.protocolId ), Database.DATABASE_LIST_TYPE.PROTOCOLS ) }</h1>

                   <List ref = { ( el ) => ( this.componentRef = el ) } >
                       { taskComponents }
                   </List>
                   <br/>
                   <br/>
                   <ReactToPrint
                    trigger = { () => <Button  size = "large" className = "sidebysidebutton" variant = "contained">Print this out </Button>}
                    content = { () => this.componentRef}/>
              
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
    } /* render() */
}

export default ListView;