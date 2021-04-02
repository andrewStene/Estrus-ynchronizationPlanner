/**
 *  CalendarCalc.js
 *  Copyright (C) 2021  Ben Amos
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

/******************************
 *          IMPORTS
 ******************************/

 import React from 'react';
 import { Database, protocol, Task } from './Database.js';


/******************************
 *          EXPORT
 ******************************/

export {
    CalculateProtocolCalendar, 
    CowCalendar, 
    ScheduledEvent
};

/*********************************
 *        PUBLIC FUNCTIONS       *
 *********************************/

 /**
  * @function CalculateProtocolCalendar - Creates a new CowSchedulingCalendar based on a protocol
  * @param {Protocol} protocol - the protocol to create the calendar from
  * @param {Date} dateOffset - the date to start the calendar
  * @param {Database} database - A database object which contains all the protocols
  * @param {String} name name of the group
  * @returns {CowCalendar} - A calendar of all the different tasks to be displayed 
  */
 function CalculateProtocolCalendar(protocol, dateOffset, database, name)
 {
    if(protocol === null)
    {
        console.log("protocol is null");
        return null;
    }
    if(database === null)
    {
        console.log("db is null");
        database = new Database();
    }

    if(dateOffset == null)
    {
        dateOffset = new Date();
    }

    var events = []
    for(let i = 0; i < protocol.Tasks.length; i++)

    {
        let task = database.GetObjectById(protocol.Tasks[i].TaskId, Database.DATABASE_LIST_TYPE.TASKS);
        if(task == null)
        {
            return null;
        }

        let startTime = offsetDate(dateOffset, protocol.Tasks[i].SecondsSinceStart);
        let endTime = offsetDate(dateOffset, protocol.Tasks[i].SecondsSinceStart + task.TaskLength);
        let groupTitle = `[GROUP: ${name.toUpperCase()}] ${task.Name}`; 
        console.log("Start Time:" + startTime + "\nEnd Time: " + endTime);
        
        events.push({id: i, start:startTime, end:endTime, title:groupTitle})
    }
    return events;

 } /* CalculateprotocolCalendar() */

/**********************************
 *          PUBLIC CLASS          *
 **********************************/

 /**
  * A calendar of scheduled events
  */
 class CowCalendar extends React.Component
 {
     /**
      * @function constructor - constructs a cow calendar
      * @param {string} name - the name of the calendar / or person 
      * @param {ScheduledEvent[]} events - a list of all the scheduled events 
      */
     constructor(props)
     {
      

         super(props);
         this.Name = props.name;
         this.Events = props.events;
     }
 } /* class CowCalendar */

 /**
  * An event that is scheduled
  */
 class ScheduledEvent
 {
     /**
      * @function constructor - constructs a new scheduled event
      * @param {string} name - the name of the event 
      * @param {string} description - a description of the event 
      * @param {Date} start - the starting time of when the event is to start 
      * @param {Date} end - the ending time when the event is supposed to end 
      */
     constructor(name, description, start, end)
     {         
         this.Name = name;
         this.Description = description;
         this.Start = start;
         this.End = end;
     }
 } /* class ScheduledEvent */

 /***************************
  *     PRIVATE FUNCTIONS   *
  ***************************/

  /**
   * @function offsetDate - returns a new date object at a given date offset by an amount of seconds 
   * @param {Date} date - the date to offset
   * @param {number} seconds - the number of seconds to offset
   * @returns {Date} - the new date
   */
  function offsetDate(date, seconds)
  {
      const SECONDS_TO_MILLISECONDS = 1000;
      return new Date( date + seconds * SECONDS_TO_MILLISECONDS );
  }