/**
 *  Database.js
 *  Copyright (C) 2021  Andrew Stene, Ben Amos
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

/********************************/
 // #region EXPORTS             *
/********************************/

 export { 
          Database, 
          ListType, 
          Task, 
          Protocol, 
          ProtocolTask, 
          ProtocolRecommendation 
        };

//#endregion        
/********************************/

/********************************/
 // #region CONSTANTS           *
 /*******************************/

/** @DATABASE_LIST_TYPE 
 * An enum of the type of lists in the database
 */
const DATABASE_LIST_TYPE = 
{
   TASKS:       1,
   PROTOCOLS:   2,
   SEMEN:       3,
   SYSTEM_TYPE: 4,
   BREED:       5,
   GN_RH:       6,
   P_G:         7,
   CATTLE:      8
};

/** @DATABASE_LIST_TYPE 
 * An enum of the names of the lists in the database
 */
const DATABASE_LIST_NAME = 
{
  TASKS:       "Tasks",
  PROTOCOLS:   "Protocols",
  SEMEN:       "Semen",
  SYSTEM_TYPE: "System Type",
  BREED:       "Breed",
  GN_RH:       "Gonadotropin Releasing Hormone",
  P_G:         "Prostaglandin",
  CATTLE:      "Cattle"
};

//#endregion
/********************************/

/********************************/
// #region DATABASE MODEL CLASS *
/********************************/

class DatabaseModel
{
    /**
     * Constructor for database model
     * @param {object} json - a json object containing data to be parsed within new object
     */
    constructor( json )
    {
        this.Tasks      = [];
        this.Protocols  = [];
        this.Semen      = [];
        this.SystemType = [];
        this.Breed      = [];
        this.GnRH       = [];
        this.PG         = [];
        this.Cattle     = [];

        if( json != null )
        {
            // Populate Tasks
            if( json.Tasks != null )
            {
                for( let i = 0; i < json.Tasks.length; i++ )
                {
                    let task = json.Tasks[i];
                    if( task != null && checkParameterTypes( [ task.Id,  task.Name, task.Description, task.TaskLength ], 
                                                             [ "number", "string",  "string",         "number" ] ) )
                    {
                        this.Tasks.push( new Task( task.Id, task.Name, task.Description, task.TaskLength ) );
                    }                    
                }
            }
            
            // Populate Protocals
            if( json.Protocols != null )
            {                
                for( let i = 0; i < json.Protocols.length; i++ )
                {
                    let protocol = json.Protocols[i];
                    let tasks    = [];
                    
                    if( protocol != null && protocol.Tasks != null && protocol.Recommendations != null)
                    {
                        for( let j = 0; j < protocol.Tasks.length; j++ )
                        {
                            let task = protocol.Tasks[j]
                            if( task != null && checkParameterTypes( [ task.TaskId, task.SecondsSinceStart ], 
                                                                     [ "number",    "number" ]) )
                            {
                                tasks.push( new ProtocolTask( task.TaskId, task.SecondsSinceStart ) );
                            }
                            
                        }

                        let recommendation = new ProtocolRecommendation( protocol.Recommendations.SystemType, 
                                                                         protocol.Recommendations.Semen,
                                                                         protocol.Recommendations.Breed, 
                                                                         protocol.Recommendations.GnRH, 
                                                                         protocol.Recommendations.PG,
                                                                         protocol.Recommendations.Cattle );
                        
                        if( checkParameterTypes( [ protocol.Id, protocol.Name, protocol.Description ],
                                                 [ "number",    "string",      "string" ] ))
                        {
                            this.Protocols.push( new Protocol( protocol.Id, protocol.Name, protocol.Description, tasks, recommendation ) );
                        }                  
                    }                    
                }
            }
            
            // Populate Semen
            if( json.Semen != null )
            {                
                for( let i = 0; i < json.Semen.length; i++ )
                {
                    let semen = json.Semen[i];
                    if( semen != null && checkParameterTypes( [ semen.Id, semen.Name ], 
                                                              [ "number", "string" ]  ) )
                    {
                        this.Semen.push( new ListType( semen.Id, semen.Name ) );
                    }                    
                }
            }
            
            // Populate SystemType
            if( json.SystemType != null )
            {                
                for( let i = 0; i < json.SystemType.length; i++ )
                {
                    let systemType = json.SystemType[i];
                    if( systemType != null && checkParameterTypes( [ systemType.Id, systemType.Name ], 
                                                                   [ "number",      "string" ] ) )
                    {
                        this.SystemType.push( new ListType( systemType.Id, systemType.Name ) );
                    }                    
                }
            }
            
            // Populate Breed
            if( json.Breed != null )
            {                
                for( let i = 0; i < json.Breed.length; i++ )
                {
                    let breed = json.Breed[i];
                    if( breed != null && checkParameterTypes( [ breed.Id, breed.Name ],
                                                              [ "number", "string" ] ) )
                    {
                        this.Breed.push( new ListType( breed.Id, breed.Name ) );
                    }                    
                }
            }            

            // Populate GnRH
            if( json.GnRH != null )
            {                
                for( let i = 0; i < json.GnRH.length; i++ )
                {
                    let gnrh = json.GnRH[i];
                    if( gnrh != null && checkParameterTypes( [ gnrh.Id,  gnrh.Name ], 
                                                             [ "number", "string" ] ) ) 
                    {
                        this.GnRH.push( new ListType( gnrh.Id, gnrh.Name ) );
                    }                    
                }
            }

            // Populate PG
            if( json.PG != null )
            {                
                for( let i = 0; i < json.PG.length; i++ )
                {
                    let pg = json.PG[i];
                    if( pg != null && checkParameterTypes( [ pg.Id,    pg.Name ],
                                                           [ "number", "string" ] ) )
                    {
                        this.PG.push( new ListType( pg.Id, pg.Name ) );
                    }                    
                }
            }
            
            // Populate Cattle
            if( json.Cattle != null )
            {                
                for( let i = 0; i < json.Cattle.length; i++ )
                {
                    let cattle = json.Cattle[i];
                    if( cattle != null && checkParameterTypes( [ cattle.Id, cattle.Name ],
                                                               [ "number",  "string" ] ) )
                    {
                        this.Cattle.push( new ListType( cattle.Id, cattle.Name ) );
                    }
                }
            }
        }
    } // end constructor
} // end DatabaseModel

//#endregion
/********************************/

/********************************/
// #region DATABASE CLASS       *
/********************************/

/** class Database
 * A database to handle all the lists of protocals, tasks and input types
 */
class Database
{
    /**
     * Constructor for a database object
     * @param {boolean} useTestingData - Whether to initialize database with testing data
     * @param {object} json - A json object to initialize database with
     */
    constructor( json )
    {
        this.database = new DatabaseModel( json );
    } /* end constructor() */

    static DATABASE_LIST_TYPE = DATABASE_LIST_TYPE;
    static DATABASE_LIST_NAME = DATABASE_LIST_NAME;

    /**
     * @function GetJSONData reads from a json file and returns the associated json object
     * @param {string} path - the path to the file
     * @returns {object} - a promise while pending, and then a json object
     */
    static GetJSONData( path )
    {
        if( checkParameterTypes( [ path ],
                                 [ "string" ] ) )
        {
            return getJSONData( path );
        }
        return null;
    } /* GetJSONData() */
    
    /**
     * @function GetDatabaseName - returns the name of the database given the type
     * @param {DATABASE_LIST_TYPE} databaseListType - the database type
     * @returns {string} - the name of the database
     */
    GetDatabaseName( databaseListType )
    {
        if( checkParameterTypes( [ databaseListType ], 
                                 [ "number"] ) )
        {
            return getDatabaseName( databaseListType );
        }
        return "";
    } /* GetDatabaseName() */

    /**
     * @function GetObjectById - Lookup element by its id
     * @param {number} id - the id of the element 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup in
     * @returns {ListType} - the element 
     */
    GetObjectById( id, databaseListType )
    {
        if( checkParameterTypes( [ id,       databaseListType ], 
                                 [ "number", "number" ] ) )
        {
            return getObjectById( id, databaseListType, this.database );
        }      
        return null;
    } /* GetObjectById() */

    /**
     * @function GetObjectByName - find the object associated with the name
     * @param {string} name - the name of the object 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to look into
     * @returns {ListType} - the object associated with the name 
     */
    GetObjectByName( name, databaseListType )
    {
        if( checkParameterTypes( [ name,     databaseListType ], 
                                 [ "string", "number" ] ) )
        {
            return getObjectByName( name, databaseListType, this.database );
        }
        return null;
    } /* GetObjectByName() */

    /**
    * @function GetNameById - Lookup the name of an element by its id
    * @param {number} id - the id of the element 
    * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup in
    * @returns {string} - the name of the element 
    */
    GetNameById( id, databaseListType )
    {
        if( checkParameterTypes( [ id,       databaseListType ], 
                                 [ "number", "number" ] ) )
        {
            return getNameById( id, databaseListType, this.database );
        }
        return "";
    } /* GetNameById() */

    /**
     * @function GetDatabaseListElements - Lookup the elements of the database list
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
     * @returns {ListType[]} - a list of all the elements of a given list
     */
    GetDatabaseListElements( databaseListType )
    {
        if( checkParameterTypes( databaseListType, "number" ) )
        {
            return getDatabaseListElements( databaseListType, this.database );
        }
        return [];
    } /* GetDatabaseListElements() */

    /**
     * @function GetDatabaseList - Lookup the names of the elements in the database
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
     * @returns {string[]} - A list of the names of a given list  
     */
    GetDatabaseListNames( databaseListType )
    {
        if( checkParameterTypes( databaseListType, "number" ) )
        {
            return getDatabaseListNames( databaseListType, this.database );
        }
        return [];
    } /* GetDatabaseList() */

    /**
     * @function GetRecommendedProtocols - Gets a list of protocals filtered by the input types, all null parameters
     *  will return a list of all the protocals
     * @param {number} semenId - the id of the semen
     * @param {number} systemTypeId - the id of the system type
     * @param {number} breedId - the id of the breed
     * @param {number} gnrhId - the id of the gonadotropin hormone
     * @param {number} pgId - the id of the prostaglandin
     * @param {number} cattleId - the id of the cattle
     * @returns {Protocol[]} - a list of all the recommended protocals
     */
    GetRecommendedProtocols( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId )
    {
        if(checkNullableParameters( [ semenId,  systemTypeId, breedId,  gnrhId,   pgId,     cattleId ], 
                                    [ "number", "number",     "number", "number", "number", "number" ] ) )
        {
            return getRecommendedProtocols( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, this.database );
        }
        return [];
    } /* GetRecommendedProtocols() */

    /**
     * @function GetRecommendedProtocolNames - Get a list of names of the recommended protocals filtered by inputs
     * @param {number} semenId - the id of the semen 
     * @param {number} systemTypeId - the id of the system type 
     * @param {number} breedId - the id of the breed 
     * @param {number} gnrhId - the id of the gonadtropin hormone
     * @param {number} pgId - the id of the prostaglandin
     * @param {number} cattleId - the id of the cattle
     * @returns {string[]} - A list of the names of the recommended protocals
     */
    GetRecommendedProtocolNames( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId )
    {
        if(checkNullableParameters( [ semenId,  systemTypeId, breedId,  gnrhId,   pgId,     cattleId ], 
                                    [ "number", "number",     "number", "number", "number", "number" ] ) )
        {
            return getRecommendedProtocolNames( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, this.database );
        }
        return [];
    } /* GetRecommendedProtocolNames() */

    /**
     * @function AddListElement - Add a new list element to the database if it doesn't already exist
     * @param {string} elementName - the name of the element
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to 
     * @returns {boolean} - whether the element was successfully addded or not
     */
    AddListElement( elementName, databaseListType )
    {
        if( checkParameterTypes( [ elementName, databaseListType ], 
                                 [ "string",    "number" ] ) )
        {
            return addListElement( databaseListType, elementName, this.database );
        }
        return false;
    } /* AddListElement() */

    /**
     * @function AddTask - Add a new task to the database if it doesn't already exist
     * @param {string} taskName - the name of the task to add
     * @param {string} taskDescription - the description of the task
     * @param {number} taskLength - the length of the task
     * @returns {boolean} - whether the task was added to the database 
     */
    AddTask( taskName, taskDescription, taskLength )
    {
        if( checkParameterTypes( [ taskName, taskDescription, taskLength ], 
                                 [ "string", "string",        "number" ] ) )
        {
            return addTask( taskName, taskDescription, taskLength, this.database );
        }
        return false;
    } /* AddTask() */

    /**
     * @function UpdateListElementName - update a list elements name in the database     *  
     * @param {number} elementId - the elements id to update 
     * @param {string} newName - the new name of the element to update 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to update
     * @returns {boolean} - Whether the element was updated or not
     */
    UpdateListElementName( elementId, newName, databaseListType )
    {
        if( checkParameterTypes( [ elementId, newName,  databaseListType ], 
                                 [ "number",  "string", "number" ] ) )
        {
            return updateListElementName( databaseListType, elementId, newName, this.database );
        }
        return false;
    } /* UpdateListElementName() */

    /**
     * @function UpdateTask - update a task with a new name and/or task length
     * @param {number} taskId - the id of the task to update 
     * @param {string} newTaskName - the new name of the task
     * @param {string} newTaskDescription - the new description of the task 
     * @param {number} newTaskLength - the new length of the task
     * @returns {boolean} - whether the task was updated or not 
     */
    UpdateTask( taskId, newTaskName, newTaskDescription, newTaskLength )
    {
        if( checkNullableParameters( [ taskId,  newTaskName, newTaskDescription, newTaskLength ],
                                     ["number", "string",    "string",           "number" ] ) )
        {
            return updateTask( taskId, newTaskName, newTaskDescription, newTaskLength, this.database );
        }
        return false;
    } /* UpdateTask() */

    /**
     * @function DeleteObject - removes an object from the database
     * @param {number} id - the id of the object to remove
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to remove object from
     * @returns {boolean} - whether the object was deleted or not 
     */
    DeleteObject( id, databaseListType )
    {
        if( checkParameterTypes( [id,       databaseListType],
                                 ["number", "number"] ) )
        {
            return deleteObject( id, databaseListType, this.database );
        }
        return false;
    } /* DeleteObject() */

    /**
     * @function RemoveTaskFromProtocol - removes a given task from a protocol
     * @param {number} taskId - the task id to remove
     * @param {number} protocolId - the protocol id of the protocol to remove from
     * @returns {boolean} - whethe the task was removed or not
     */
    RemoveTaskFromProtocol( taskId, protocolId )
    {
        if( checkParameterTypes( [ taskId,   protocolId ],
                                 [ "number", "number"] ) )
        {
            return removeTaskFromProtocol( taskId, protocolId, this.database );
        }
        return false;
    } /* RemoveTaskFromProtocol() */
} /* end Database */

//#endregion
/********************************/

/********************************/
// #region PUBLIC MODEL CLASSES *
/********************************/

 /** class ListType
  * Generic structure of an element in a database list
  */
class ListType
{
  /**
   * Constructs a list type
   * @param {number} id - the id of the element 
   * @param {string} name - the name of the element 
   */
    constructor( id, name )
    {
        if( typeof id == "number" )
        {
            this.Id = id;
        }
        if( typeof name == "string" )
        {
            this.Name = name;
        }    
    } /* end constructor() */

    /**
    * @function Copy - creates a copy of current object
    * @returns {ListType} - a copy of current object
    */
    Copy()
    {
        return new ListType( this.Id, this.Name );
    } /* Copy() */
} /* class ListType */

/** class Task
 * A given task that can be used in protocals
 */
class Task extends ListType
{
    /**
    * Constructs a task
    * @param {number} id - the id of the task
    * @param {string} name - the name of the task
    * @param {string} description - the description of the task 
    * @param {number} taskLength - the amount of time to allow for completing the task
    */
    constructor( id, name, description, taskLength )
    {
        super( id, name );
        if( typeof description == "string" )
        {
            this.Description = description;
        }
        if( typeof taskLength == "number" )
        {
            this.TaskLength = taskLength;
        }    
    } /* end constructor() */

    /**
    * @function Copy - creates a copy of current Task
    * @returns {Task} - a copy of current Task
    */
    Copy()
    {
        return new Task( this.Id, this.Name, this.Description, this.TaskLength );
    } /* Copy() */
} /* class Task */

/** Class Protocol
 * A given protocal to be executed
 */
class Protocol extends ListType
{
    /**
    * Constructs a protocol
    * @param {number} id - the id of the protocol 
    * @param {string} name - the name of the protocol 
    * @param {string} description - the description of the protocol
    * @param {ProtocolTask[]} tasks - the protocals tasks to complete 
    * @param {ProtocolRecommendation} recommendations - the recommended inputs for this protocol  
    */
    constructor( id, name, description, tasks, recommendations )
    {
        super( id, name );

        if( typeof description == "string" )
        {
            this.Description = description;
        }
        if( typeof tasks == "object" )
        {
            this.Tasks = tasks;
        }
        if( typeof recommendations == "object" )
        {
            this.Recommendations = recommendations;
        }
    } /* end constructor() */

    /**
    * @function Copy - creates a copy of the protocal
    * @returns {Protocol} - a copy of the protocal
    */
    Copy()
    {
        let tasksCopy = []
        
        for( let i = 0; i < this.Tasks.length; i++ )
        {
            tasksCopy.push( this.Tasks[i].Copy() );
        }
        return new Protocol( this.Id, this.Name, this.Description, tasksCopy, this.Recommendations.Copy() );
    } /* Copy() */
} /* class Protocol */

/** class ProtocolTask
 * A task to excecute in a protocal
 */
class ProtocolTask
{
    /**
    * Constructs a ProtocolTask
    * @param {number} taskId - the id of the task in the protocal 
    * @param {number} secondsSinceStart - the relative seconds since the start of the protocal to begin task 
    */
    constructor( taskId, secondsSinceStart )
    {
        if( typeof taskId == "number" )
        {
            this.TaskId = taskId;
        }
        if( typeof secondsSinceStart == "number" )
        {
            this.SecondsSinceStart = secondsSinceStart;
        }    
    } /* end constructor() */

    /**
    * @function Copy - creates a copy of the ProtocolTask
    * @returns {ProtocolTask} - a copy of the protocal task
    */
    Copy()
    {
        return new ProtocolTask( this.TaskId, this.SecondsSinceStart );
    } /* Copy() */
} /* class ProtocolTask */

/** class ProtocolRecommendation
 * An aggregation of all the recommended inputs for a protocal
 */
class ProtocolRecommendation
{
    /**
    * Constructs a ProtocolRecommendation
    * @param {number[]} systemType - a list of recommended system type id's 
    * @param {number[]} semen - a list of recommended semen id's
    * @param {number[]} breed - a list of recommended breed id's
    * @param {number[]} gnRH - a list of recommended GnRH id's 
    * @param {number[]} pG - a list of recommended PG id's 
    * @param {number[]} cattle - a list of recommended cattle id's
    */
    constructor( systemType, semen, breed, gnRH, pG, cattle )
    {
        if( typeof systemType == "object" )
        {
            this.SystemType = systemType;
        }
        if( typeof semen == "object" )
        {
            this.Semen = semen;
        }
        if( typeof breed == "object" )
        {
            this.Breed = breed;
        }
        if( typeof gnRH == "object" )
        {
            this.GnRH = gnRH;
        }
        if( typeof pG == "object" )
        {
            this.PG = pG;
        }    
        if( typeof cattle == "object" )
        {
            this.Cattle = cattle;
        }
    } /* end constructor() */

    /**
    * @function Copy - creates a copy of the ProtocolRecommendation
    * @returns {ProtocolRecommendation} - a copy of the ProtocolRecommendation
    */
    Copy()
    {
        let systemTypeCopy = [];
        let semenCopy      = [];
        let breedCopy      = [];
        let gnRHCopy       = [];
        let pgCopy         = [];
        let cattleCopy     = [];

        for( let i = 0; i < this.SystemType.length; i++ )
        {
            systemTypeCopy.push( this.SystemType[i] );
        }
        for( let i = 0; i < this.Semen.length; i++ )
        {
            semenCopy.push( this.Semen[i] ); 
        }
        for( let i = 0; i < this.Breed.length; i++ )
        {
            breedCopy.push( this.Breed[i] );
        }
        for( let i = 0; i < this.GnRH.length; i++ )
        {
            gnRHCopy.push( this.GnRH[i] );
        }
        for( let i = 0; i < this.PG.length; i++ )
        {
            pgCopy.push( this.PG[i] );
        }
        for( let i = 0; i < this.Cattle.length; i++ )
        {
            cattleCopy.push( this.Cattle[i] );
        }

        return new ProtocolRecommendation( systemTypeCopy, semenCopy, breedCopy, gnRHCopy, pgCopy, cattleCopy );
    } /* Copy() */
} /* class ProtocolRecommendation */

//#endregion
/********************************/

/********************************/
// #region PUBLIC FUNCTIONS     *
/********************************/

/**
 * @function getDatabaseName - get the database list name given a type
 * @param {DATABASE_LIST_TYPE} databaseListType - the database type
 * @returns {string} - the name of the database
 */
function getDatabaseName( databaseListType )
{
    switch( databaseListType )
    {
        case DATABASE_LIST_TYPE.TASKS:
            return DATABASE_LIST_NAME.TASKS;
      
        case DATABASE_LIST_TYPE.PROTOCOLS:
            return DATABASE_LIST_NAME.PROTOCOLS;

        case DATABASE_LIST_TYPE.SEMEN:
            return DATABASE_LIST_NAME.SEMEN;

        case DATABASE_LIST_TYPE.SYSTEM_TYPE:
            return DATABASE_LIST_NAME.SYSTEM_TYPE;

        case DATABASE_LIST_TYPE.BREED:
            return DATABASE_LIST_NAME.BREED;

        case DATABASE_LIST_TYPE.GN_RH:
            return DATABASE_LIST_NAME.GN_RH;

        case DATABASE_LIST_TYPE.P_G:
            return DATABASE_LIST_NAME.P_G;

        case DATABASE_LIST_TYPE.CATTLE:
            return DATABASE_LIST_NAME.CATTLE;

        default:
            return "";
    }
} /* getDatabaseName() */

/** @function getObjectById
 * Look up a given object by its id
 * @param {number} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @param {DatabaseModel} database - The database to search
 * @returns {ListType} - The object with the id if found; null if not found
 */
function getObjectById( id, databaseListType, database )
{
    let list    = findDatabaseList( databaseListType, database );
    let findObj = null;

    if( list != null )
    {
        findObj = findObjectByIdInList( id, list, 0, list.length );
        if( findObj != null )
        {
            findObj = findObj.Copy();
        }
    }    
    return findObj;
} /* getObjectById() */

/**
 * @function getObjectByName - Get and find an object by its name
 * @param {string} name - the name of the object 
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup 
 * @param {DatabaseModel} database - the database to traverse
 * @returns {ListType} - the object associated with the name
 */
function getObjectByName( name, databaseListType, database )
{
    let list    = findDatabaseList( databaseListType, database );
    let findObj = null;
    
    if( list != null )
    {
        findObj = findByNameInList( name, list );
        if( findObj != null )
        {
            findObj = findObj.Copy();
        }
    }    
    return findObj;
} /* getObjectByName() */

/** @function getNameById
 * Look up a given object by its id
 * @param {number} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @param {DatabaseModel} database - The database to search
 * @returns {string} - The name of the object with the id if found; empty string if not found
 */
function getNameById( id, databaseListType, database )
{
    let tempObject = getObjectById( id, databaseListType, database );

    if( tempObject != null )
    {
        return tempObject.Name;
    }
    else
    {
        return "";
    }
} /* getNameById() */

/**
 * @function getDatabaseListElements - Get the list of elements in a database list
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
 * @param {DatabaseModel} database - the database to search
 * @returns {ListType[]} - A list of elements with their
 */
function getDatabaseListElements( databaseListType, database )
{
    let newList = [];
    let list    = findDatabaseList( databaseListType, database );
  
    if( list == null )
    {
        return [];
    }

    for( let i = 0; i < list.length; i++ )
    {
        newList.push( list[i].Copy() );
    }  
    return newList;
} /* getDatabaseListElements() */

/** @function getDatabaseList
 * Get the list of names to display
 * @param {DATABASE_LIST_TYPE} databaseListType - The list to get
 * @param {DatabaseModel} database - The database to search
 * @returns {string[]} - the list of names in the database list
 */
function getDatabaseListNames( databaseListType, database )
{
    let newList = [];
    let list    = findDatabaseList( databaseListType, database );

    if( list != null )
    {
        for( let i = 0; i < list.length; i++ )
        {
            newList.push( databaseElementToString(list[i]) );
        }
    }
    return newList;
} /* getDatabaseList() */

/**
 * @function getRecommendedProtocols - Get the list of protocols which are recommended for the given inputs
 * @param {number} semenId - the id of the semen input 
 * @param {number} systemTypeId - the id of the system type 
 * @param {number} breedId - the id of the breed 
 * @param {number} gnrhId - the id of the gonadtropin hormone
 * @param {number} pgId - the id of the prostaglandin
 * @param {number} cattleId - the id of the cattle
 * @param {DatabaseModel} database - the database to search
 * @returns {Protocol[]} - A list of protocals associated with inputs 
 */
function getRecommendedProtocols( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, database )
{
    let protocols = database.Protocols;
    let newList   = [];
    
    if( semenId         == null 
        && systemTypeId == null 
        && breedId      == null 
        && gnrhId       == null 
        && pgId         == null 
        && cattleId     == null )
    {
        for( let i = 0; i < protocols.length; i++ )
        {
            newList.push( protocols[i].Copy() );
        }
    }
    else
    {
        for( let i = 0; i < protocols.length; i++ )
        {
            if( isRecommendedProtocol( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, protocols[i].Recommendations ) )
            {
                newList.push( protocols[i].Copy() );
            }
        }
    }  
    return newList;
} /* getRecommendedProtocols() */

/**
 * @function getRecommendedProtocolNames - Generates a list of the recommended protocal names associated with inputs
 * @param {number} semenId - the id of the semen 
 * @param {number} systemTypeId - the id of the system type
 * @param {number} breedId - the id of the breed 
 * @param {number} gnrhId - the id of the gonadatropin hormone
 * @param {number} pgId - the id of the prostaglandin
 * @param {number} cattleId - the id of the cattle
 * @param {DatabaseModel} database - the database to traverse
 * @returns {string[]} - A list of the names of the recommended protocals 
 */
function getRecommendedProtocolNames( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, database )
{
    let protocols = getRecommendedProtocols( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, database );
    let newList   = [];

    for( let i = 0; i < protocols.length; i++ )
    {
        newList.push( protocols[i].Name );
    }  
    return newList;
} /* getRecommendedProtocolNames() */

/** @function addListElement
 * Add a list element to a database list if it doesn't already exist
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to
 * @param {string} elementName - the name of the element 
 * @param {DatabaseModel} database - the database object
 * @returns {boolean} - whether the element was added or not
 */
function addListElement( databaseListType, elementName, database )
{
    let list = findDatabaseInputList( databaseListType, database );

    if( list != null )
    {
        let newId = list[ list.length - 1 ].Id + 1; // Take last id and add 1
        return addElementToDatabase( new ListType( newId, elementName ), list );
    }
    return false;
} /* addListElement() */

/**
 * @function addTask - Add a new task to the database
 * @param {string} taskName - the unique name of the task to add
 * @param {string} taskDescription - the description of the task
 * @param {number} taskLength - the length of the task
 * @param {DatabaseModel} database - the database to add to
 * @returns {boolean} - whether the task was added or not
 */
function addTask( taskName, taskDescription, taskLength, database )
{
    let list = database.Tasks;

    if( taskName == null || taskDescription == null || taskLength == null )
    {
        return false;
    }
    
    let newId = list[ list.length - 1 ].Id + 1; // Take last id and add 1
    return addElementToDatabase( new Task( newId, taskName, taskDescription, taskLength ), list );
} /* addTask() */

/**
 * @function updateListElementName - Update the name of the list element
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to update 
 * @param {number} elementId - the id of the element to update
 * @param {string} newName - the new name to set the element to
 * @param {DatabaseModel} database - the database to traverse
 * @returns {boolean} - Whether the name was updated in the database
 */
function updateListElementName( databaseListType, elementId, newName, database )
{
    if( newName == null )
    {
        return false;
    }

    let list = findDatabaseInputList( databaseListType, database );
    if( list == null )
    {
        return false;
    }

    let oldElement = findObjectByIdInList( elementId, list, 0, list.length );

    if( oldElement == null )
    {
        return false;
    }
    oldElement.Name = newName;

    return true;
} /* updateListElementName() */

/**
 * @function updateTask - updates a given task in the database
 * @param {number} taskId - the id of the task to update 
 * @param {string} newTaskName - the new task name
 * @param {string} newTaskDescription - the new description of the task
 * @param {number} newTaskLength - the new task length
 * @param {DatabaseModel} database - the database to update
 * @returns {boolean} - whether the task was updated or not
 */
function updateTask( taskId, newTaskName, newTaskDescription, newTaskLength, database )
{
    let list = database.Tasks;
    if( taskId == null 
        || newTaskName == null && newTaskDescription == null && newTaskLength == null )
    {
        return false;
    }

    let oldTask = findObjectByIdInList( taskId, list, 0, list.length );
    
    if( oldTask == null )
    {
        return false;
    }

    // Update Task
    if( newTaskName != null )
    {
        oldTask.Name = newTaskName;
    }

    if( newTaskDescription != null )
    {
        oldTask.Description = newTaskDescription;
    }

    if( newTaskLength != null )
    {
        oldTask.TaskLength = newTaskLength;
    }

    return true;
} /* updateTask() */

/**
* @function deleteObject - removes an object from the database
* @param {number} id - the id of the object to remove
* @param {DATABASE_LIST_TYPE} databaseListType - which list to remove object from
* @param {DatabaseModel} database - the database to update
* @returns {boolean} - whether the object was deleted or not 
*/
function deleteObject( id, databaseListType, database )
{
    let list = findDatabaseList( databaseListType, database );

    if( list != null )
    {
        let index = findIndexByIdInList( id, list, 0, list.length );

        if( index != null )
        {
            let deleteProtocolRec = findDatabaseInputList( databaseListType, database ) == null ? false : true;

            // delete item
            list.splice( index, 1 );
           
            // Update protocol recommendations dependencies if recommended element deleted
            if( deleteProtocolRec )
            {
                let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );
                for( let i = 0; i < protocols.length; i++ )
                {
                    let protocolRecommendationList = findDatabaseList( databaseListType, protocols[i].Recommendations );
                    for( let j = 0; j < protocolRecommendationList.length; j++)
                    {
                        if( protocolRecommendationList[j] == id )
                        {
                            protocolRecommendationList.splice( j, 1 );
                        }
                    }
                }                
            }
            return true;
        }
    }
    return false;
} /* deleteObject() */

/**
 * @function RemoveTaskFromProtocol - removes a given task from a protocol
 * @param {number} taskId - the task id to remove
 * @param {number} protocolId - the protocol id of the protocol to remove from
 * @returns {boolean} - whethe the task was removed or not
 */
function removeTaskFromProtocol( taskId, protocolId, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );

    if( protocol != null )
    {        
        let i = 0;
        while( i < protocol.Tasks.length)
        {
            if( protocol.Tasks[i].TaskId == taskId )
            {
                break;
            }
            i++;
        }

        if( i < protocol.Tasks.length )
        {            
            protocol.Tasks.splice( i, 1 );
            return true;
        }
    }
    return false;
} /* removeTaskFromProtocol() */

/**
 * @function getJSONData - fetches a given json file and returns a json object
 * @param {string} path - the path to the json object
 * @returns {object} - a json object
 */
async function getJSONData( path )
{
    let json = await fetch(path,
    {
        headers : 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    json = await json.json();
    return json;
} /* getJSONData() */

//#endregion
/********************************/

/********************************/
// #region PRIVATE FUNCTIONS    *
/********************************/

/**
 * @function findDatabaseList - find and lookup the correct database list
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup
 * @param {DatabaseModel} database - the database to traverse
 * @returns {ListType[]} - the database list 
 */
function findDatabaseList( databaseListType, database )
{
    let list = findDatabaseInputList( databaseListType, database )
    
    if( list != null )
    {
        return list;
    }

    switch( databaseListType )
    {
        case DATABASE_LIST_TYPE.TASKS:
            return database.Tasks;

        case DATABASE_LIST_TYPE.PROTOCOLS:
            return database.Protocols;

        default:
            return null;
    }
} /* findDatabaseList() */

/**
 * @function findDatabaseList - find a given input database list
 * @param {DATABASE_LIST_TYPE} databaseListType - the list to find
 * @param {DatabaseModel} database - the database to traverse
 * @returns {ListType[]} - the input database list
 */
function findDatabaseInputList( databaseListType, database )
{
    switch( databaseListType )
    {
        case DATABASE_LIST_TYPE.SYSTEM_TYPE:
            return database.SystemType;

        case DATABASE_LIST_TYPE.SEMEN:
            return database.Semen;
    
        case DATABASE_LIST_TYPE.BREED:
            return database.Breed;

        case DATABASE_LIST_TYPE.P_G:
            return database.PG;

        case DATABASE_LIST_TYPE.GN_RH:
            return database.GnRH;

        case DATABASE_LIST_TYPE.CATTLE:
            return database.Cattle;

        default:
            return null;
    }
} /* findDatabaseInputList() */

/**
 * @function findIndexByIdInList - finds the index of the list which contains element with the id
 * @param {number} id - the id of the element to search for 
 * @param {object[]} list - the list to traverse 
 * @param {number} start - the start index of the list 
 * @param {number} length - the length of the list
 * @returns {number} - the index of the list which contains the element 
 */
function findIndexByIdInList( id, list, start, length )
{
    if( id == null || list == null )
    {
        return null;
    }

    let end = length;
    
    while( start < end )
    {
        let mid = Math.trunc( ( start + end ) / 2 );
        if( id < list[ mid ].Id )
        {
            end = mid;
        }
        else if( id > list[ mid ].Id )
        {
            start = mid + 1;
        }
        else
        {
            return mid;
        }
    }
    return null;
} /* findIndexByIdInList() */

/** @function findObjectByIdInList 
 * Search a sorted list for the object which contains the id
 * @param {number} id - The id to look for
 * @param {array} list - The sorted list to search
 * @param {number} start - The starting index of the list
 * @param {number} length - The length of the list to search
 * @returns - The object with the given id, null otherwise
 */
function findObjectByIdInList( id, list, start, length )
{
    let index = findIndexByIdInList( id, list, start, length );
    if( index != null && index >= start && index < length )
    {
        return list[ index ];
    }    
    return null;
} /* findByIdInList() */

/** @function findByNameInList
 * Find an element in the list by its name
 * @param {string} name - the name of the element to find 
 * @param {ListType[]} list - the list of elements to check
 * @returns {ListType} - the element with the given name 
 */
function findByNameInList( name, list )
{
    if( name == null || list == null )
    {
        return null;
    }
    for( let i = 0; i < list.length; i++ )
    {
        if( list[i].Name.toUpperCase() === name.toUpperCase() )
        {
            return list[i];
        }
    }
    return null;
} /* findByNameInList() */

/** @function databaseElementToString
 * Create a string representation of a given element
 * @param {object} element - The element to represent as a string
 * @returns {string} - The string representation of the element
 */
function databaseElementToString( element )
{  
    let newString = "";  
    if( element != null )
    {
        //FORMAT - "ID - NAME" 
        newString = element.Name;
    }
    return newString;
} /* databaseElementToString() */

/** @function addElementToDatabase
 * Add an element to database list
 * @param {ListType} element - the element to add with an id
 * @param {ListType[]} list - the list to add to
 * @returns {boolean} - Whether the element was added to the list
 */
function addElementToDatabase( element, list )
{
    // check for duplicates
    if( findObjectByIdInList( element.Id, list, 0, list.length ) || findByNameInList( element.Name, list ) )
    {
        return false;
    }

    list.push( element );
    return true;
} /* addElementToDatabase() */

/**
 * @function isRecommendedProtocol - Checks whether a protocol is recommended or not
 * @param {number} semenId - the id of the semen
 * @param {number} systemTypeId - the id of the system type
 * @param {number} breedId - the id of the breed
 * @param {number} gnrhId - the id of the gonadtropin hormone
 * @param {number} pgId - the id of the prostaglandin
 * @param {number} cattleId - the id of the cattle type
 * @param {ProtocolRecommendation} protocolRecommendation - the protocal recommendation to compare to
 * @returns {boolean} - Whether the protocal is recommended or not
 */
function isRecommendedProtocol( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, protocolRecommendation )
{
    if( semenId != null )
    {
        if( !isContainedInList( semenId, protocolRecommendation.Semen, isEqualNum ) )
        {
            return false;
        }
    }
    if( systemTypeId != null )
    {
        if( !isContainedInList( systemTypeId, protocolRecommendation.SystemType, isEqualNum ) )
        {
            return false;
        }
    }
    if( breedId != null )
    {
        if( !isContainedInList( breedId, protocolRecommendation.Breed, isEqualNum ) )
        {
            return false;
        }
    }
    if( gnrhId != null )
    {
        if( !isContainedInList( gnrhId, protocolRecommendation.GnRH, isEqualNum ) )
        {
            return false;
        }
    }
    if( pgId != null )
    {
        if( !isContainedInList( pgId, protocolRecommendation.PG, isEqualNum ) )
        {
            return false;
        }
    }
    if( cattleId != null )
    {
        if( !isContainedInList( cattleId, protocolRecommendation.Cattle, isEqualNum ) )
        {
            return false;
        }
    }
    return true;
} /* isRecommendedProtocol() */

/**
 * @function isEqualNum - Checks whether two numbers are equal
 * @param {number} num1 - the first number to check 
 * @param {number} num2 - the second number to check
 * @returns {boolean} - whether the two numbers are equal
 */
function isEqualNum( num1, num2 )
{
    return num1 == num2;
} /* isEqualNum() */

/**
 * @function isContainedInList - Checks to see if an element exists in a list
 * @param {object} element - An element to check
 * @param {object[]} list - the list to traverse
 * @param {function} isEqualFunc - the compare function to check equality
 * @returns {boolean} - whether the element is contained in the list
 */
function isContainedInList( element, list, isEqualFunc )
{
    for( let i = 0; i < list.length; i++ )
    {
        if( isEqualFunc( list[i], element ) )
        {
            return true;
        }
    }
    return false;
} /* isContainedInList() */

/**
 * @function checkParameterTypes - Checks a list of parameters against a list of types
 * @param {object} parameters - the list of parameters to check
 * @param {string[]} types - the list of types to match with parameters - order matters
 * @returns {boolean} - whether all the parameter types match 
 */
function checkParameterTypes( parameters, types )
{
    if( types != null && parameters != null )
    {
        if( typeof types == "string" )
        {
            return typeof parameters == types;
        }
        else if( typeof types == "object" && typeof parameters == "object" )
        {
            let end = Math.min( types.length, parameters.length );
            let i   = 0;

            for( i = 0; i < end; i++ )
            {
                if( typeof parameters[i] != types[i] )
                {
                    return false;
                }
            }
        
            if( i < parameters.length || i < types.length )
            {
                return false;
            }
        }
        else
        {
            return false;
        }    
    }
    return true;
} /* checkParameterTypes() */

/**
 * @function checkNullableParameters - Check that nullable parameters are of the correct type
 * @param {object} parameters - the parameters to check
 * @param {string[]} types - the list of types for the parameters
 * @returns {boolean} - Whether the parameters are of the correct type
 */
function checkNullableParameters( parameters, types )
{
    if( types != null && parameters != null )
    {
        if( typeof types == "string" )
        {
            return typeof parameters == types;
        }
        else if( typeof types == "object" && typeof parameters == "object" )
        {
            let end = Math.min( types.length, parameters.length );
            let i = 0;
            
            for( i = 0; i < end; i++ )
            {
                if( parameters[i] != null && typeof parameters[i] != types[i] )
                {
                    return false;
                }
            }
            if( i < parameters.length || i < types.length )
            {
                return false;
            }
        }
        else
        {
            return false;
        }    
    }
    return true;
} /* checkNullableParameters() */

//#endregion
/********************************/