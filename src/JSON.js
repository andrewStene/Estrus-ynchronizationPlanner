/**************************************************************
 * JSON.js
 * Author: Ben Amos
 * Description: Handles all input and output of the database
 **************************************************************/

/************************************
 *          EXPORT VARIBALES        *
 ************************************/
export {
           DATABASE_LIST_TYPE
       };

/*************************************
 *          EXPORT FUNCTIONS         *
 *************************************/
export {          
           initializeDatabase, 
           getObjectById,
           getNameById,
           getDatabaseList
       };

/*************************************
 *            CONSTANTS              *
 *************************************/

/** @DATABASE_LIST_TYPE 
 * An enum of the type of lists in the database
 */
const DATABASE_LIST_TYPE = 
{
   TASKS: 1,
   PROTOCALS: 2,
   SEMEN: 3,
   SYSTEM_TYPE: 4,
   BREED: 5,
   GN_RH: 6,
   P_G: 7
};

/************************************
 *          LOCAL VARIABLES         *
 ************************************/

 /**
  * A database of all the current protocals and input types
  */
var database = null;

/************************************
 *          PUBLIC FUNCTIONS        *
 ************************************/

/** @function initializeDatabase
 * Initialize the database by reading from a json file
 */
function initializeDatabase()
{
    // TESTING JSON OBJECT
    database =
    {
        Tasks: [
           { Id: 1, Name: "Start Heat Detection", 
              Description: "...", TaskLength: 0 },
           { Id: 2, Name: "Inject PG to Females", 
              Description: "...", TaskLength: 30 },
           { Id: 3, Name: "Stop Heat Detection", 
              Description: "...", TaskLength: 0 },
           { Id: 4, Name: "Detect Estrus and Breed", 
              Description: "...", TaskLength: 0 },
           { Id: 5, Name: "Clean up", 
              Description: "...", TaskLength: 50 },
           { Id: 6, Name: "New Cycle", 
              Description: "...", TaskLength: 0 },
        ],
        Protocals: [
            { Id: 1, 
              Name: "1 Injection Prostaglandin Prior Estrus",
              Description: "...", 
              Tasks: [ { TaskId: 1, SecondsSinceStart: 0 },
                       { TaskId: 2, SecondsSinceStart: 345600 },
                       { TaskId: 3, SecondsSinceStart: 950400 },
                       { TaskId: 4, SecondsSinceStart: 0 },
                       { TaskId: 5, SecondsSinceStart: 950400 },
                       { TaskId: 6, SecondsSinceStart: 2332800 },
                     ],
              Recommendations: 
                    { Semen: 1, SystemType: 1,
                      Breed: 1, GnRH: 2, PG: 6}
            },
            { Id: 2, 
                Name: "1 Injection Prostaglandin No Prior Estrus",
                Description: "...", 
                Tasks: [ { TaskId: 1, SecondsSinceStart: 0 },                         
                         { TaskId: 3, SecondsSinceStart: 432000 },
                         { TaskId: 4, SecondsSinceStart: 0 },
                         { TaskId: 5, SecondsSinceStart: 950400 },
                         { TaskId: 6, SecondsSinceStart: 1987200 },
                       ],
                Recommendations: 
                      { Semen: 1, SystemType: 1,
                        Breed: 1, GnRH: 2, PG: 6 }
              }
            ],
        Semen: [
            { Id: 1, Name: "Conventional"},
            { Id: 2, Name: "Sexed"}
        ],
        SystemType: [
            { Id: 1, Name: "Estrus AI"},
            { Id: 2, Name: "Estrus AI & Clean-up AI"},
            { Id: 3, Name: "Fixed-Time AI"}
        ],
        Breed: [
            { Id: 1, Name: "Bos Taurus"},
            { Id: 2, Name: "Bos Indicus Influence" }
        ],
        GnRH: [
            { Id: 1, Name: "Cystorelin"},
            { Id: 2, Name: "Factrel"},
            { Id: 3, Name: "Fertagyl"},
            { Id: 4, Name: "OvaCyst"},
            { Id: 5, Name: "GONAbreed"},
        ],
        PG: [
            { Id: 1, Name: "Estrumate"},
            { Id: 2, Name: "EstroPLAN"},
            { Id: 3, Name: "InSynch"},
            { Id: 4, Name: "Lutalyse"},
            { Id: 5, Name: "ProstaMate"},
            { Id: 6, Name: "HiConc. Lut",},
            { Id: 7, Name: "Synchsure"},
        ]

    }
    return;    
    fetch('data.json').then(res => res.json()).then(dataObj => {
        database = dataObj;
    });
} /* intializeDatabase() */

/** @function getObjectById
 * Look up a given object by its id
 * @param {int} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @returns {object} - The object with the id if found; null if not found
 */
function getObjectById(id, databaseListType)
{
    switch(databaseListType)
    {
      case DATABASE_LIST_TYPE.TASKS:
        return findByIdInList(id, database.Tasks, 0, database.Tasks.length);

      case DATABASE_LIST_TYPE.PROTOCALS:
        return findByIdInList(id, database.Protocals, 0, database.Protocals.length);

      case DATABASE_LIST_TYPE.SEMEN:
        return findByIdInList(id, database.Semen, 0, database.Semen.length);

      case DATABASE_LIST_TYPE.SYSTEM_TYPE:
        return findByIdInList(id, database.SystemType, 0, database.SystemType.length);

      case DATABASE_LIST_TYPE.BREED:        
        return findByIdInList(id, database.Breed, 0, database.Breed.length);

      case DATABASE_LIST_TYPE.GN_RH:
        return findByIdInList(id, database.GnRH, 0, database.GnRH.length);

      case DATABASE_LIST_TYPE.P_G:
        return findByIdInList(id, database.PG, 0, database.PG.length);
    }
} /* getObjectById() */

/** @function getNameById
 * Look up a given object by its id
 * @param {int} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @returns {string} - The name of the object with the id if found; empty string if not found
 */
function getNameById(id, databaseListType)
{
  let tempObject = null;
    switch(databaseListType)
    {
      case DATABASE_LIST_TYPE.TASKS:
        tempObject = findByIdInList(id, database.Tasks, 0, database.Tasks.length);

      case DATABASE_LIST_TYPE.PROTOCALS:
        tempObject = findByIdInList(id, database.Protocals, 0, database.Protocals.length);

      case DATABASE_LIST_TYPE.SEMEN:
        tempObject = findByIdInList(id, database.Semen, 0, database.Semen.length);

      case DATABASE_LIST_TYPE.SYSTEM_TYPE:
        tempObject = findByIdInList(id, database.SystemType, 0, database.SystemType.length);

      case DATABASE_LIST_TYPE.BREED:        
        tempObject = findByIdInList(id, database.Breed, 0, database.Breed.length);

      case DATABASE_LIST_TYPE.GN_RH:
        tempObject = findByIdInList(id, database.GnRH, 0, database.GnRH.length);

      case DATABASE_LIST_TYPE.P_G:
        tempObject = findByIdInList(id, database.PG, 0, database.PG.length);
    }

    if(tempObject != null)
    {
      return tempObject.Name;
    }
    else
    {
      return "";
    }
} /* getNameById() */

/** @function getDatabaseList
 * Get the list of objects with an id and name to display
 * @param {DATABASE_LIST_TYPE} databaseListType - The list to get
 * @returns {string[]} - A list of objects with their
 */
function getDatabaseList(databaseListType)
{
  let listLength = 0;
  let newList = [];
  switch(databaseListType)
    {
      case DATABASE_LIST_TYPE.TASKS:
        listLength = database.Tasks.length;

      case DATABASE_LIST_TYPE.PROTOCALS:
        listLength = database.Protocals.length;

      case DATABASE_LIST_TYPE.SEMEN:
        listLength = database.Semen.length;

      case DATABASE_LIST_TYPE.SYSTEM_TYPE:
        listLength = database.SystemType.length;

      case DATABASE_LIST_TYPE.BREED:        
        listLength = database.Breed.length;

      case DATABASE_LIST_TYPE.GN_RH:
        listLength = database.GnRH.length;

      case DATABASE_LIST_TYPE.P_G:
        listLength = database.PG.length;
    }

  for(let i = 0; i < listLength; i++)
  {
    newList.push( databaseElementToString( i, databaseListType ) );
  }
  
  return newList;
} /* getDatabaseList() */

/*************************************
 *         PRIVATE FUNCTIONS         *
 *************************************/

/** @function findByIdInList 
 * Search a sorted list for the object which contains the id
 * @param {int} id - The id to look for
 * @param {array} list - The sorted list to search
 * @param {int} start - The starting index of the list
 * @param {int} length - The length of the list to search
 * @returns - The object with the given id, null otherwise
 */
function findByIndexInList(id, list, start, length)
{
    let end = length;
    while(start < end)
    {
      let mid = (start + end) / 2;
      if( id < list[mid].Id )
      {
        end = mid;
      }
      else if( id > list[mid].Id )
      {
        start = mid + 1;
      }
      else
      {
        return list[mid];
      }
    }
    return null;
} /* findByIdInList() */

/** @function databaseElementToString
 * Create a string representation of a given element
 * @param {int} index - The index of the element 
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to lookup in database
 * @returns {string} - The string representation of the element
 */
function databaseElementToString(index, databaseListType)
{
  let tempList = null;
  let newString = "";
  switch(databaseListType)
    {
      case DATABASE_LIST_TYPE.TASKS:
        tempList = database.Tasks;

      case DATABASE_LIST_TYPE.PROTOCALS:
        tempList = database.Protocals;

      case DATABASE_LIST_TYPE.SEMEN:
        tempList = database.Semen;

      case DATABASE_LIST_TYPE.SYSTEM_TYPE:
        tempList = database.SystemType;

      case DATABASE_LIST_TYPE.BREED:        
        tempList = database.Breed;

      case DATABASE_LIST_TYPE.GN_RH:
        tempList = database.GnRH;

      case DATABASE_LIST_TYPE.P_G:
        tempList = database.PG;

    }

    if(tempList != null && index < 0 && index >= tempList.length)
    {
      //FORMAT - "ID - NAME" 
      newString = tempList[index].Id + " - " + tempList[index].Name;
    }
    return newString;
} /* databaseElementToString() */



