/************************************************
 * CalendarCalc.js
 * Author: Ben Amos
 * Description: The calendar to be displayed to the user
 ************************************************/
/******************************
 *          IMPORTS
 ******************************/

 import { Database, Protocol, Task } from './Database.js';

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
  * @returns {CowCalendar} - A calendar of all the different tasks to be displayed 
  */
 function CalculateProtocalCalendar(protocol, dateOffset, database)
 {
    if(protocol == null || database == null)
    {
        return null;
    }

    if(dateOffset == null)
    {
        dateOffset = new Date( Date.now() );
    }
    let events = []
    for(let i = 0; i < protocol.Tasks.length; i++)
    {
        let task = database.GetObjectById(protocol.Tasks[i].TaskId, Database.DATABASE_LIST_TYPE.TASKS);
        if(task == null)
        {
            return null;
        }
        let start = offsetDate(dateOffset, protocol.Tasks[i].SecondsSinceStart);
        let end = offsetDate(dateOffset, protocol.Tasks[i].SecondsSinceStart + task.TaskLength);
        events.push(new ScheduledEvent(task.Name, task.Description, start, end))
    }
    return new CowCalendar("Protocal: " + protocol.Name, events);
 } /* CalculateProtocalCalendar() */

/**********************************
 *          PUBLIC CLASS          *
 **********************************/

 /**
  * A calendar of scheduled events
  */
 class CowCalendar
 {
     /**
      * @function constructor - constructs a cow calendar
      * @param {string} name - the name of the calendar / or person 
      * @param {ScheduledEvent[]} events - a list of all the scheduled events 
      */
     constructor(name, events)
     {
         this.Name = name;
         this.Events = events;
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
      return new Date( date.getTime() + seconds * SECONDS_TO_MILLISECONDS );
  }