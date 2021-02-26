/**
 *  CalendarPage.js
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
import { Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {  CalculateProtocolCalendar} from './CalendarCalc';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {Database} from './Database'


/**
 * A react component to display the steps of the desired protocol 
 * in a calendar type format
 */
class CalendarPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state=
        {   
            protocolName:this.props.protocolName,
            protocolId:this.props.protocolId,
            startingDate:this.props.startDate,
            cowlendar: this.props.cowCal,
            database: new Database()
        }
    }

    /**
     * Render function for the class
     */
    render()
    {
        let db = new Database();
        let results = CalculateProtocolCalendar(db.GetObjectById(0, Database.DATABASE_LIST_TYPE.PROTOCOLS),Date.now(),db);
        if(results === null)
        {
            console.log("Uh oh");
        }

        const INITIAL_EVENTS = results;
        return(
            <div>
                <br/>
                <FullCalendar   
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth'
                      }}
                    editable={false}
                    initialEvents={INITIAL_EVENTS}
                />
                <br/>
                <br/>
                <Button className = "sidebysidebutton" component={Link} to="/protocol" color="defualt" variant="contained" size = "large" >Back</Button>
                <Button className = "sidebysidebutton" component={Link} to="/"color="defualt"variant="contained" size = "large">Next</Button>
            </div>
        )
    }
}export default CalendarPage