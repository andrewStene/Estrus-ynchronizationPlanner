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
          DatabaseModel,
          ListType,
          HormoneProduct,
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

const INVALID_ID = -1; // Invalid id

/** @DATABASE_LIST_TYPE 
 * An enum of the type of lists in the database
 */
const DATABASE_LIST_TYPE = 
{
    NONE:        0,
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
    NONE:        "None",
    TASKS:       "Tasks",
    PROTOCOLS:   "Protocols",
    SEMEN:       "Semen",
    SYSTEM_TYPE: "System Type",
    BREED:       "Breed",
    GN_RH:       "Gonadotropin Releasing Hormone",
    P_G:         "Prostaglandin",
    CATTLE:      "Cattle"
};

/** @VAR_NAME
 * An enum of the variable names exposed to the user
 */
const VAR_NAME = 
{
    P_G:   "PG",
    GN_RH: "GnRH"
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

        this.SelectedGnRHId = INVALID_ID;
        this.SelectedPGId   = INVALID_ID;

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
                        this.Tasks.push( new Task( task.Id, 
                                                   task.Name, 
                                                   task.Description, 
                                                   task.TaskLength ) );
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
                    if( gnrh != null && checkParameterTypes( [ gnrh.Id,  gnrh.Name, gnrh.DefaultCCs ], 
                                                             [ "number", "string",  "number" ] ) ) 
                    {
                        this.GnRH.push( new HormoneProduct( gnrh.Id, gnrh.Name, gnrh.DefaultCCs ) );
                    }                    
                }
            }

            // Populate PG
            if( json.PG != null )
            {                
                for( let i = 0; i < json.PG.length; i++ )
                {
                    let pg = json.PG[i];
                    if( pg != null && checkParameterTypes( [ pg.Id,    pg.Name,  pg.DefaultCCs ],
                                                           [ "number", "string", "number" ] ) )
                    {
                        this.PG.push( new HormoneProduct( pg.Id, pg.Name, pg.DefaultCCs ) );
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

/**
 * Database Summary of Functions:
 * 
 * getJSONData
 * getDatabaseName
 * getObjectById
 * getObjectByName
 * getNameById
 * getUserTaskById
 * getDatabaseListElements
 * getDatabaseListNames
 * getRecommendedProtocols
 * getRecommendedProtocolNames
 * addListElement
 * addHormoneProduct
 * addTask
 * updateListElementName
 * updateHormoneProduct
 * updateTask
 * updateProtocolText
 * deleteObject
 * addRecommendedToProtocol
 * removeRecommendedFromProtocol
 * isRecommendedInProtocol
 * addTaskToProtocol
 * removeTaskFromProtocol
 * updateTaskStartInProtocol
 * addProtocol
 * selectHormoneId
 * downloadDatabaseAsJSON
 */

/**
 * A dictionary of database objects mapped from ids
 */
var databaseModels = {};

/**
 * The next available id to allocate a database object
 */
var nextDatabaseId = 0;

/** class Database
 * A database to handle all the lists of protocals, tasks and input types
 */
class Database
{
    /**
     * Constructor for a database object     * 
     * @param {object} json - A json object to initialize database with
     */
    constructor( json )
    {
        this.Id = nextDatabaseId;
        databaseModels[ nextDatabaseId ] = new DatabaseModel( json );
        nextDatabaseId = 0; // Increment this value to allow more than one database object to exist (for now constrain to 1 -- otherwise need to add a dispose method)
    } /* end constructor() */

    static DATABASE_LIST_TYPE = DATABASE_LIST_TYPE;
    static DATABASE_LIST_NAME = DATABASE_LIST_NAME;

    /**
     * @function getJSONData reads from a json file and returns the associated json object
     * @param {string} path - the path to the file
     * @returns {object} - a promise while pending, and then a json object
     */
    static getJSONData( path )
    {
        if( checkParameterTypes( [ path ],
                                 [ "string" ] ) )
        {
            return getJSONData_private( path );
        }
        return null;
    } /* getJSONData() */
    
    /**
     * @function getDatabaseName - returns the name of the database given the type
     * @param {DATABASE_LIST_TYPE} databaseListType - the database type
     * @returns {string} - the name of the database
     */
    getDatabaseName( databaseListType )
    {
        if( checkParameterTypes( [ databaseListType ], 
                                 [ "number"] ) )
        {
            return getDatabaseName_private( databaseListType );
        }
        return "";
    } /* getDatabaseName() */

    /**
     * @function getObjectById - Lookup element by its id
     * @param {number} id - the id of the element 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup in
     * @returns {ListType} - the element 
     */
    getObjectById( id, databaseListType )
    {
        if( checkParameterTypes( [ id,       databaseListType ], 
                                 [ "number", "number" ] ) )
        {
            return getObjectById_private( id, databaseListType, databaseModels[ this.Id ] );
        }      
        return null;
    } /* getObjectById() */

    /**
     * @function getObjectByName - find the object associated with the name
     * @param {string} name - the name of the object 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to look into
     * @returns {ListType} - the object associated with the name 
     */
    getObjectByName( name, databaseListType )
    {
        if( checkParameterTypes( [ name,     databaseListType ], 
                                 [ "string", "number" ] ) )
        {
            return getObjectByName_private( name, databaseListType, databaseModels[ this.Id ] );
        }
        return null;
    } /* getObjectByName() */

    /**
    * @function getNameById - Lookup the name of an element by its id
    * @param {number} id - the id of the element 
    * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup in
    * @returns {string} - the name of the element 
    */
    getNameById( id, databaseListType )
    {
        if( checkParameterTypes( [ id,       databaseListType ], 
                                 [ "number", "number" ] ) )
        {
            return getNameById_private( id, databaseListType, databaseModels[ this.Id ] );
        }
        return "";
    } /* getNameById() */

    /**
     * @function getUserTaskById - Gets the user version of a particular task (name adjusted for hormone task)
     * @param {number} id - the id of the task to query
     * @returns {Task} - the user task 
     */
    getUserTaskById( id )
    {
        if( checkParameterTypes( [ id ], [ "number" ] ) )
        {
            return getUserTaskById_private( id, databaseModels[ this.Id ] );
        }
        return null;
    } /* getUserTaskById() */

    /**
     * @function getDatabaseListElements - Lookup the elements of the database list
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
     * @param {boolean} sort - whether to return a sorted list or not
     * @returns {ListType[]} - a list of all the elements of a given list
     */
    getDatabaseListElements( databaseListType, sort )
    {
        if( sort == null )
        {
            sort = false;
        }

        if( checkParameterTypes( [ databaseListType, sort ], 
                                 [ "number",         "boolean" ] ) )
        {
            return getDatabaseListElements_private( databaseListType, sort, databaseModels[ this.Id ] );
        }
        return [];
    } /* getDatabaseListElements() */

    /**
     * @function GetDatabaseList - Lookup the names of the elements in the database
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
     * @param {boolean} sort - whether to sort the list or not
     * @returns {string[]} - A list of the names of a given list  
     */
    getDatabaseListNames( databaseListType, sort )
    {
        if( sort == null )
        {
            sort = false;
        }

        if( checkParameterTypes( [ databaseListType, sort ], 
                                 [ "number",         "boolean" ] ) )
        {
            return getDatabaseListNames_private( databaseListType, sort, databaseModels[ this.Id ] );
        }
        return [];
    } /* GetDatabaseList() */

    /**
     * @function getRecommendedProtocols - Gets a list of protocals filtered by the input types, all null parameters
     *  will return a list of all the protocals
     * @param {number} semenId - the id of the semen
     * @param {number} systemTypeId - the id of the system type
     * @param {number} breedId - the id of the breed
     * @param {number} gnrhId - the id of the gonadotropin hormone
     * @param {number} pgId - the id of the prostaglandin
     * @param {number} cattleId - the id of the cattle
     * @returns {Protocol[]} - a list of all the recommended protocals
     */
    getRecommendedProtocols( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId )
    {
        if(checkNullableParameters( [ semenId,  systemTypeId, breedId,  gnrhId,   pgId,     cattleId ], 
                                    [ "number", "number",     "number", "number", "number", "number" ] ) )
        {
            return getRecommendedProtocols_private( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, databaseModels[ this.Id ] );
        }
        return [];
    } /* getRecommendedProtocols() */

    /**
     * @function getRecommendedProtocolNames - Get a list of names of the recommended protocals filtered by inputs
     * @param {number} semenId - the id of the semen 
     * @param {number} systemTypeId - the id of the system type 
     * @param {number} breedId - the id of the breed 
     * @param {number} gnrhId - the id of the gonadtropin hormone
     * @param {number} pgId - the id of the prostaglandin
     * @param {number} cattleId - the id of the cattle
     * @returns {string[]} - A list of the names of the recommended protocals
     */
    getRecommendedProtocolNames( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId )
    {
        if(checkNullableParameters( [ semenId,  systemTypeId, breedId,  gnrhId,   pgId,     cattleId ], 
                                    [ "number", "number",     "number", "number", "number", "number" ] ) )
        {
            return getRecommendedProtocolNames_private( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, databaseModels[ this.Id ] );
        }
        return [];
    } /* getRecommendedProtocolNames() */

    /**
     * @function addListElement - Add a new list element to the database if it doesn't already exist
     * @param {string} elementName - the name of the element
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to 
     * @returns {boolean} - whether the element was successfully addded or not
     */
    addListElement( elementName, databaseListType )
    {
        if( checkParameterTypes( [ elementName, databaseListType ], 
                                 [ "string",    "number" ] ) )
        {
            return addListElement_private( databaseListType, elementName, databaseModels[ this.Id ] );
        }
        return false;
    } /* addListElement() */

    /**
     * @function addHormoneProduct - Add a new list hormone product to the database if it doesn't already exist
     * @param {string} hormoneName - the name of the product
     * @param {number} defaultCCs - the default dosage for the product
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to 
     * @returns {boolean} - whether the product was successfully addded or not
     */
    addHormoneProduct( hormoneName, defaultCCs, databaseListType )
    {
        if( checkParameterTypes( [ hormoneName, defaultCCs, databaseListType ], 
                                 [ "string",    "number",   "number" ] ) )
        {
            return addHormoneProduct_private( hormoneName, defaultCCs, databaseListType, databaseModels[ this.Id ] );
        }
        return false;
    } /* addHormoneProduct() */

    /**
     * @function addTask - Add a new task to the database if it doesn't already exist
     * @param {string} taskName - the name of the task to add
     * @param {string} taskDescription - the description of the task
     * @param {number} taskLength - the length of the task
     * @returns {boolean} - whether the task was added to the database 
     */
    addTask( taskName, taskDescription, taskLength )
    {
        if( checkParameterTypes( [ taskName, taskDescription, taskLength ], 
                                 [ "string", "string",        "number" ] ) )
        {
            return addTask_private( taskName, taskDescription, taskLength, databaseModels[ this.Id ] );
        }
        return false;
    } /* addTask() */

    /**
     * @function updateListElementName - update a list elements name in the database     *  
     * @param {number} elementId - the elements id to update 
     * @param {string} newName - the new name of the element to update 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to update
     * @returns {boolean} - Whether the element was updated or not
     */
    updateListElementName( elementId, newName, databaseListType )
    {
        if( checkParameterTypes( [ elementId, newName,  databaseListType ], 
                                 [ "number",  "string", "number" ] ) )
        {
            return updateListElementName_private( databaseListType, elementId, newName, databaseModels[ this.Id ] );
        }
        return false;
    } /* updateListElementName() */

    /**
     * @function updateHormoneProduct - update a product with a new name and/or default dosage
     * @param {number} productId - the id of the product to update 
     * @param {string} newProductName - the new name of the product
     * @param {number} newDefaultCCs - the new default dosage of the product
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to update
     * @returns {boolean} - whether the product was updated or not 
     */
    updateHormoneProduct( productId, newProductName, newDefaultCCs, databaseListType )
    {
        if( checkNullableParameters( [ productId,  newProductName, newDefaultCCs, databaseListType ],
                                     [ "number",   "string",       "number",      "number" ] ) )
        {
            return updateHormoneProduct_private( productId, newProductName, newDefaultCCs, databaseListType, databaseModels[ this.Id ] );
        }        
        return false;
    } /* updateHormoneProduct() */

    /**
     * @function updateTask - update a task with a new name and/or task length
     * @param {number} taskId - the id of the task to update 
     * @param {string} newTaskName - the new name of the task
     * @param {string} newTaskDescription - the new description of the task 
     * @param {number} newTaskLength - the new length of the task
     * @returns {boolean} - whether the task was updated or not 
     */
    updateTask( taskId, newTaskName, newTaskDescription, newTaskLength )
    {
        if( checkNullableParameters( [ taskId,  newTaskName, newTaskDescription, newTaskLength ],
                                     ["number", "string",    "string",           "number" ] ) )
        {
            return updateTask_private( taskId, newTaskName, newTaskDescription, newTaskLength, databaseModels[ this.Id ] );
        }
        return false;
    } /* updateTask() */

    /**
    * @function updateProtocolText - update a protocol with a new name and/or description
    * @param {number} protocolId - the id of the protocol to update 
    * @param {string} newProtocolName - the new name of the protocol
    * @param {string} newProtocolDescription - the new description of the protocol
    * @returns {boolean} - whether the protocol was updated or not
    */
    updateProtocolText( protocolId, newProtocolName, newProtocolDescription )
    {
        if( checkNullableParameters( [ protocolId,  newProtocolName, newProtocolDescription, ],
                                     [ "number",    "string",        "string", ] ) )
        {
            return updateProtocolText_private( protocolId, newProtocolName, newProtocolDescription, databaseModels[ this.Id ] );
        }
        return false;
    } /* updateProtocolText() */

    /**
     * @function deleteObject - removes an object from the database
     * @param {number} id - the id of the object to remove
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to remove object from
     * @returns {boolean} - whether the object was deleted or not 
     */
    deleteObject( id, databaseListType )
    {
        if( checkParameterTypes( [id,       databaseListType],
                                 ["number", "number"] ) )
        {
            return deleteObject_private( id, databaseListType, databaseModels[ this.Id ] );
        }
        return false;
    } /* deleteObject() */

    /**
     * @function addRecommendedToProtocol - adds a given elementId to a given protocols list of recommendations
     * @param {number} elementId - the id of the element to recommend
     * @param {number} protocolId - the id of the protocol to recommend on
     * @param {DATABASE_LIST_TYPE} databaseListType - which element this item belongs to     
     * @returns {boolean} - whether the item was successfully added or not
     */
    addRecommendedToProtocol( elementId, protocolId, databaseListType )
    {
        if( checkParameterTypes( [ elementId, protocolId, databaseListType ],
                                 [ "number",  "number",   "number" ] ) )
        {
            return addRecommendedToProtocol_private( elementId, protocolId, databaseListType, databaseModels[ this.Id ] );
        }
        return false;
    } /* addRecommendedToProtocol() */

    /**
     * @function removeRecommendedFromProtocol - removes a given elementId from a given protocols list of recommendations
     * @param {number} elementId - the id of the element to remove
     * @param {number} protocolId - the id of the protocol to remove from
     * @param {DATABASE_LIST_TYPE} databaseListType - which element this item belongs to     
     * @returns {boolean} - whether the item was successfully removed or not
     */
     removeRecommendedFromProtocol( elementId, protocolId, databaseListType )
     {
         if( checkParameterTypes( [ elementId, protocolId, databaseListType ],
                                  [ "number",  "number",   "number" ] ) )
         {
             return removeRecommendedFromProtocol_private( elementId, protocolId, databaseListType, databaseModels[ this.Id ] );
         }
         return false;
     } /* removeRecommendedFromProtocol() */

     /**
     * @function isRecommendedInProtocol - check if a given elementId is contained in a given protocols list of recommendations
     * @param {number} elementId - the id of the element to check
     * @param {number} protocolId - the id of the protocol to check in
     * @param {DATABASE_LIST_TYPE} databaseListType - which element this item belongs to     
     * @returns {boolean} - whether the item is contained
     */
    isRecommendedInProtocol( elementId, protocolId, databaseListType )
    {
        if( checkParameterTypes( [ elementId, protocolId, databaseListType ],
                                 [ "number",  "number",   "number" ] ) )
        {
            return isRecommendedInProtocol_private( elementId, protocolId, databaseListType, databaseModels[ this.Id ] );
        }
        return false;
    } /* isRecommendedInProtocol() */

    /**
     * @function addTaskToProtocol - Adds a given task to a protocol
     * @param {number} taskId - which task to add 
     * @param {number} protocolId - which protocol to add to
     * @param {number} secondsSinceStart - how many seconds since the start of the protocol to start task
     * @returns {boolean} - whether the task was successfully added or not
     */
    addTaskToProtocol( taskId, protocolId, secondsSinceStart )
    {
        if( checkParameterTypes( [ taskId,   protocolId, secondsSinceStart ],
                                 [ "number", "number",   "number"] ) )
        {
            return addTaskToProtocol_private( taskId, protocolId, secondsSinceStart, databaseModels[ this.Id ] );
        }
        return false;
    } /* addTaskToProtocol() */

    /**
     * @function removeTaskFromProtocol - Removes a given task from the protocol
     * @param {ProtocolTask} task - the task to remove
     * @param {number} protocolId - the id of the protocol to remove from
     * @returns {boolean} - whether the task was successfully removed or not
     */
    removeTaskFromProtocol( task, protocolId )
    {
        if( checkParameterTypes( [ task,     protocolId ],
                                 [ "object", "number" ] ) )
        {
            return removeTaskFromProtocol_private( task, protocolId, databaseModels[ this.Id ] );
        }
        return false;
    } /* removeTaskFromProtocol() */

    /**
     * @function updateTaskStartInProtocol - Update the start time of a particular task
     * @param {ProtocolTask} oldTask - the old task to update
     * @param {number} newSecondsSinceStart - the new time to set the task for
     * @param {number} protocolId - the id of the protocol to update
     * @returns {boolean} - whether the task was updated successfully or not
     */
    updateTaskStartInProtocol( oldTask, newSecondsSinceStart, protocolId )
    {
        if( checkParameterTypes( [ oldTask,  newSecondsSinceStart, protocolId ],
                                 [ "object", "number",             "number" ] ) )
        {
            return updateTaskStartInProtocol_private( oldTask, newSecondsSinceStart, protocolId, databaseModels[ this.Id ] );
        }
        return false;
    } /* updateTaskStartInProtocol() */

    /**
     * @function addProtocol - Add a new protocol to the database
     * @param {string} protocolName - the name of the new protocol
     * @param {string} description - a description of the new protocol
     * @param {ProtocolTask[]} tasks - an array of tasks to add to the new protocol
     * @param {ProtocolRecommendation} recommendations - the recommondations for the new protocol
     * @returns {boolean} - Whether the protocol was successfully added or not
     */
    addProtocol( protocolName, description, tasks, recommendations )
    {
        if( checkParameterTypes( [ protocolName, description, tasks,    recommendations ],
                                 [ "string",     "string",    "object", "object" ] ) )
        {
            return addProtocol_private( protocolName, description, tasks, recommendations, databaseModels[ this.Id ] );
        }
        return false;
    } /* addProtocol() */

    /**
     * @function selectHormoneId - Select a hormone product
     * @param {number} id - the id of the hormone product to select 
     * @param {DATABASE_LIST_TYPE} hormoneListType - which hormone to select (P_G or GN_RH)
     * @returns {boolean} - whether the hormone was selected or not 
     */
    selectHormoneId( id, hormoneListType )
    {
        if( checkParameterTypes( [ id,       hormoneListType ],
                                 [ "number", "number" ] ) )
        {
            return selectHormoneId_private( id, hormoneListType, databaseModels[ this.Id ] );
        }
        return false;
    } /* selectHormoneId() */

    /**
     * @function downloadDatabaseAsJSON - initiates a download of the current database object as a json file
     * @param {string} filename - the name of the file to download (without extension)
     */
    downloadDatabaseAsJSON( filename )
    {
        if( checkParameterTypes( [ filename ], [ "string" ] ) )
        {
            let newFilename = filename + ".json";
            downloadDatabaseAsJSON_private( newFilename, databaseModels[ this.Id ] );
        }
    } /* downloadDatabaseAsJSON */
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

/** class HormoneProduct
 * A hormone product to be used with cattle
 */
class HormoneProduct extends ListType
{
    /**
     * Constructs a hormone product
     * @param {number} id - the id of the product 
     * @param {string} name - the name of the product 
     * @param {number} defaultCCs - the default amount to use with this product 
     */
    constructor( id, name, defaultCCs )
    {
        super( id, name );

        this.DefaultCCs = 0;
        if( typeof defaultCCs == "number" && defaultCCs >= 0 )
        {
            this.DefaultCCs = defaultCCs;
        }
    } /* end constructor() */

    /**
     * @function Copy - creates a copy of the current object
     * @returns {HormoneProduct} - a copy of the current object
     */
    Copy()
    {
        return new HormoneProduct( this.Id, this.Name, this.DefaultCCs );
    } /* Copy() */
} /* class HormoneProduct */

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
        if( typeof taskLength == "number" && taskLength >= 0 )
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
        return new Task( this.Id, this.Name, this.Description, this.TaskLength, this.HormoneType, this.HormoneId );
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
        this.Tasks = [];
        if( typeof description == "string" )
        {
            this.Description = description;
        }
        if( typeof tasks == "object" )
        {
            for( let i = 0; i < tasks.length; i++ )
            {
                let task = tasks[i].Copy();
                if( task != null )
                {
                    this.Tasks.push( task )
                }                
            }            
        }
        if( typeof recommendations == "object" )
        {
            this.Recommendations = recommendations.Copy();
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
        this.SystemType = [];
        this.Semen      = [];
        this.Breed      = [];
        this.GnRH       = [];
        this.PG         = [];
        this.Cattle     = [];
        if( typeof systemType == "object" )
        {            
            for( let i = 0; i < systemType.length; i++ )
            {
                this.SystemType.push( systemType[i] );
            }
        }
        if( typeof semen == "object" )
        {            
            for( let i = 0; i < semen.length; i++ )
            {
                this.Semen.push( semen[i] );
            }
        }
        if( typeof breed == "object" )
        {            
            for( let i = 0; i < breed.length; i++ )
            {
                this.Breed.push( breed[i] );
            }
        }
        if( typeof gnRH == "object" )
        {            
            for( let i = 0; i < gnRH.length; i++ )
            {
                this.GnRH.push( gnRH[i] );
            }
        }
        if( typeof pG == "object" )
        {           
            for( let i = 0; i < pG.length; i++ )
            {
                this.PG.push( pG[i] );
            }
        }    
        if( typeof cattle == "object" )
        {            
            for( let i = 0; i < cattle.length; i++ )
            {
                this.Cattle.push( cattle[i] );
            }
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
// #region PRIVATE FUNCTIONS     *
/********************************/

/**
 * @function getDatabaseName_private - get the database list name given a type
 * @param {DATABASE_LIST_TYPE} databaseListType - the database type
 * @returns {string} - the name of the database
 */
function getDatabaseName_private( databaseListType )
{
    switch( databaseListType )
    {
        case DATABASE_LIST_TYPE.NONE:
            return DATABASE_LIST_NAME.NONE;

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
} /* getDatabaseName_private() */

/** @function getObjectById_private
 * Look up a given object by its id
 * @param {number} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @param {DatabaseModel} database - The database to search
 * @returns {ListType} - The object with the id if found; null if not found
 */
function getObjectById_private( id, databaseListType, database )
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
} /* getObjectById_private() */

/**
 * @function getObjectByName_private - Get and find an object by its name
 * @param {string} name - the name of the object 
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup 
 * @param {DatabaseModel} database - the database to traverse
 * @returns {ListType} - the object associated with the name
 */
function getObjectByName_private( name, databaseListType, database )
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
} /* getObjectByName_private() */

/** @function getNameById_private - Look up a given object by its id
 * @param {number} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @param {DatabaseModel} database - The database to search
 * @returns {string} - The name of the object with the id if found; empty string if not found
 */
function getNameById_private( id, databaseListType, database )
{
    let tempObject = getObjectById_private( id, databaseListType, database );

    if( tempObject != null )
    {
        return tempObject.Name;
    }
    else
    {
        return "";
    }
} /* getNameById_private() */

/**
* @function getUserTaskById_private - Gets the user version of a particular task (name adjusted for hormone task)
* @param {number} id - the id of the task to query
* @param {DatabaseModel} database - the database to search
* @returns {Task} - the user task 
*/
function getUserTaskById_private( id, database )
{
    let task = getObjectById_private( id, DATABASE_LIST_TYPE.TASKS, database );
    if( task != null )
    {
        adjustHormoneTaskName( task, database );
    }    
    return task;
} /* getUserTaskById_private() */

/**
 * @function getDatabaseListElements_private - Get the list of elements in a database list
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
 * @param {boolean} sort - whether to sort the list or not
 * @param {DatabaseModel} database - the database to search
 * @returns {ListType[]} - A list of elements with their
 */
function getDatabaseListElements_private( databaseListType, sort, database )
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

    if( sort == true )
    {
        alphabetizeByName( newList, 0, newList.length, 0, 0 );
    }
    return newList;
} /* getDatabaseListElements_private() */

/** @function getDatabaseListNames_private - Get the list of names to display
 * @param {DATABASE_LIST_TYPE} databaseListType - The list to get
 * @param {boolean} sort - whether to sort the list or not
 * @param {DatabaseModel} database - The database to search
 * @returns {string[]} - the list of names in the database list
 */
function getDatabaseListNames_private( databaseListType, sort, database )
{
    let newList = [];
    let list    = getDatabaseListElements_private( databaseListType, sort, database );

    if( list != null )
    {
        for( let i = 0; i < list.length; i++ )
        {
            newList.push( databaseElementToString( list[i] ) );
        }
    }
    
    return newList;
} /* getDatabaseListNames_private() */

/**
 * @function getRecommendedProtocols_private - Get the list of protocols which are recommended for the given inputs
 * @param {number} semenId - the id of the semen input 
 * @param {number} systemTypeId - the id of the system type 
 * @param {number} breedId - the id of the breed 
 * @param {number} gnrhId - the id of the gonadtropin hormone
 * @param {number} pgId - the id of the prostaglandin
 * @param {number} cattleId - the id of the cattle
 * @param {DatabaseModel} database - the database to search
 * @returns {Protocol[]} - A list of protocals associated with inputs 
 */
function getRecommendedProtocols_private( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, database )
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
} /* getRecommendedProtocols_private() */

/**
 * @function getRecommendedProtocolNames_private - Generates a list of the recommended protocal names associated with inputs
 * @param {number} semenId - the id of the semen 
 * @param {number} systemTypeId - the id of the system type
 * @param {number} breedId - the id of the breed 
 * @param {number} gnrhId - the id of the gonadatropin hormone
 * @param {number} pgId - the id of the prostaglandin
 * @param {number} cattleId - the id of the cattle
 * @param {DatabaseModel} database - the database to traverse
 * @returns {string[]} - A list of the names of the recommended protocals 
 */
function getRecommendedProtocolNames_private( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, database )
{
    let protocols = getRecommendedProtocols_private( semenId, systemTypeId, breedId, gnrhId, pgId, cattleId, database );
    let newList   = [];

    for( let i = 0; i < protocols.length; i++ )
    {
        newList.push( protocols[i].Name );
    }  
    return newList;
} /* getRecommendedProtocolNames_private() */

/** @function addListElement_private
 * Add a list element to a database list if it doesn't already exist
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to
 * @param {string} elementName - the name of the element 
 * @param {DatabaseModel} database - the database object
 * @returns {boolean} - whether the element was added or not
 */
function addListElement_private( databaseListType, elementName, database )
{
    let list = findDatabaseInputList( databaseListType, database );

    if( list != null )
    {
        let newId = list.length > 0 ? list[ list.length - 1 ].Id + 1 : 0; // Take last id and add 1 -- default 0
        return addElementToDatabase( new ListType( newId, elementName ), list );
    }
    return false;
} /* addListElement_private() */

/**
* @function addHormoneProduct_private - Add a new list hormone product to the database if it doesn't already exist
* @param {string} hormoneName - the name of the product
* @param {number} defaultCCs - the default dosage for the product
* @param {DATABASE_LIST_TYPE} databaseListType - which list to add to
* @param {DatabaseModel} database - the database to add to
* @returns {boolean} - whether the product was successfully addded or not
*/
function addHormoneProduct_private( hormoneName, defaultCCs, databaseListType, database )
{
    let list = findDatabaseProductList( databaseListType, database );

    if( list != null )
    {
        let newId = list.length > 0 ? list[ list.length - 1 ].Id + 1 : 0; // Take last id and add 1 -- default 0
        return addElementToDatabase( new HormoneProduct( newId, hormoneName, defaultCCs ), list );
    }
    return false;
} /* addHormoneProduct_private() */

/**
 * @function addTask_private - Add a new task to the database
 * @param {string} taskName - the unique name of the task to add
 * @param {string} taskDescription - the description of the task
 * @param {number} taskLength - the length of the task
 * @param {DatabaseModel} database - the database to add to
 * @returns {boolean} - whether the task was added or not
 */
function addTask_private( taskName, taskDescription, taskLength, database )
{
    let list = database.Tasks;    
    
    let newId = list.length > 0 ? list[ list.length - 1 ].Id + 1 : 0; // Take last id and add 1 -- default 0
    return addElementToDatabase( new Task( newId, taskName, taskDescription, taskLength ), list );
} /* addTask_private() */

/**
 * @function updateListElementName_private - Update the name of the list element
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to update 
 * @param {number} elementId - the id of the element to update
 * @param {string} newName - the new name to set the element to
 * @param {DatabaseModel} database - the database to traverse
 * @returns {boolean} - Whether the name was updated in the database
 */
function updateListElementName_private( databaseListType, elementId, newName, database )
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
} /* updateListElementName_private() */

/**
* @function updateHormoneProduct_private - update a product with a new name and/or default dosage
* @param {number} productId - the id of the product to update 
* @param {string} newProductName - the new name of the product
* @param {number} newDefaultCCs - the new default dosage of the product
* @param {DATABASE_LIST_TYPE} databaseListType - which list to update
* @param {DatabaseModel} database - the database to traverse
* @returns {boolean} - whether the product was updated or not 
*/
function updateHormoneProduct_private( productId, newProductName, newDefaultCCs, databaseListType, database )
{
    let list = findDatabaseProductList( databaseListType, database );
    if( list == null 
        || productId == null 
        || newProductName == null && newDefaultCCs == null
        || newDefaultCCs < 0 )
    {
        return false;
    }

    let oldProduct = findObjectByIdInList( productId, list, 0, list.length );

    if( oldProduct == null )
    {
        return false;
    }

    if( newProductName != null )
    {
        oldProduct.Name = newProductName;
    }
    if( newDefaultCCs != null )
    {
        oldProduct.DefaultCCs = newDefaultCCs;
    }

    return true;
} /* updateHormoneProduct_private() */

/**
 * @function updateTask_private - updates a given task in the database
 * @param {number} taskId - the id of the task to update 
 * @param {string} newTaskName - the new task name
 * @param {string} newTaskDescription - the new description of the task
 * @param {number} newTaskLength - the new task length
 * @param {DatabaseModel} database - the database to update
 * @returns {boolean} - whether the task was updated or not
 */
function updateTask_private( taskId, newTaskName, newTaskDescription, newTaskLength, database )
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
} /* updateTask_private() */

/**
* @function updateProtocolText_private - update a protocol with a new name and/or description
* @param {number} protocolId - the id of the protocol to update 
* @param {string} newProtocolName - the new name of the protocol
* @param {string} newProtocolDescription - the new description of the protocol
* @param {DatabaseModel} database - the database to traverse
* @returns {boolean} - whether the protocol was updated or not
*/
function updateProtocolText_private( protocolId, newProtocolName, newProtocolDescription, database )
{
    let list = database.Protocols;
    if( protocolId == null 
        || newProtocolName == null && newProtocolDescription == null )
    {
        return false;
    }

    let oldProtocol = findObjectByIdInList( protocolId, list, 0, list.length );
    
    if( oldProtocol == null )
    {
        return false;
    }

    // Update Protocol
    if( newProtocolName != null )
    {
        oldProtocol.Name = newProtocolName;
    }

    if( newProtocolDescription != null )
    {
        oldProtocol.Description = newProtocolDescription;
    }

    return true;
} /* updateProtocolText_private() */

/**
* @function deleteObject_private - removes an object from the database
* @param {number} id - the id of the object to remove
* @param {DATABASE_LIST_TYPE} databaseListType - which list to remove object from
* @param {DatabaseModel} database - the database to update
* @returns {boolean} - whether the object was deleted or not 
*/
function deleteObject_private( id, databaseListType, database )
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

            // Update protocol tasks dependencies if recommended element deleted 
            if( databaseListType == DATABASE_LIST_TYPE.TASKS )
            {
                let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );
                for( let i = 0; i < protocols.length; i++ )
                {
                    let tasks = protocols[i].Tasks;
                    for( let j = 0; j < tasks.length; j++ )
                    {
                        if( tasks[j].TaskId == id )
                        {
                            tasks.splice( j, 1 );
                        }
                    }
                }
            }

            // Update selected id if was deleted
            if( databaseListType == DATABASE_LIST_TYPE.P_G && database.SelectedPGId == id )
            {
                database.SelectedPGId = INVALID_ID;
            }
            else if( databaseListType == DATABASE_LIST_TYPE.GN_RH && database.SelectedGnRHId == id )
            {
                database.SelectedGnRHId = INVALID_ID;
            }

            return true;
        }
    }
    return false;
} /* deleteObject_private() */

/**
 * @function addRecommendedToProtocol_private - adds a given elementId to a given protocols list of recommendations
 * @param {number} elementId - the id of the element to recommend
 * @param {number} protocolId - the id of the protocol to recommend on
 * @param {DATABASE_LIST_TYPE} databaseListType - which element this item belongs to
 * @param {DatabaseModel} database - the database object to update
 * @returns {boolean} - whether the item was successfully added or not
 */
function addRecommendedToProtocol_private( elementId, protocolId, databaseListType, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );    
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );    
    let elementCheck = getObjectById_private( elementId, databaseListType, database );

    if( protocol != null && elementCheck != null )
    {        
        let recommendation = findDatabaseList( databaseListType, protocol.Recommendations );

        if( recommendation != null )
        {
            if( !isContainedInList( elementId, recommendation, isEqualNum ) )
            {            
                recommendation.push( elementId );
                return true;
            }
        }        
    }    
    return false;
} /* addRecommendedToProtocol_private() */

/**
 * @function removeRecommendedFromProtocol_private - removes a given elementId from a given protocols list of recommendations
 * @param {number} elementId - the id of the element to remove
 * @param {number} protocolId - the id of the protocol to remove from
 * @param {DATABASE_LIST_TYPE} databaseListType - which element this item belongs to
 * @param {DatabaseModel} database - the database object to update
 * @returns {boolean} - whether the item was successfully removed or not
 */
function removeRecommendedFromProtocol_private( elementId, protocolId, databaseListType, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );    
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );  
     
    if( protocol != null )
    {        
        let recommendation = findDatabaseList( databaseListType, protocol.Recommendations );
        if( recommendation != null )
        {
            let i = 0;
            while( i < recommendation.length )
            {
                if( recommendation[i] == elementId )
                {
                    break;
                }
                i++;
            }

            if( i < recommendation.length )
            {
                recommendation.splice( i, 1 );
                return true;
            }         
        }         
    }    
    return false;
} /* removeRecommendedFromProtocol_private() */

 /**
  * @function isRecommendedInProtocol_private - check if a given elementId is contained in a given protocols list of recommendations
  * @param {number} elementId - the id of the element to check
  * @param {number} protocolId - the id of the protocol to check in
  * @param {DATABASE_LIST_TYPE} databaseListType - which element this item belongs to
  * @param {DatabaseModel} database - the database object to check in 
  * @returns {boolean} - whether the item is contained
  */
function isRecommendedInProtocol_private( elementId, protocolId, databaseListType, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );    
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );  

    if( protocol != null )
    {        
        let recommendation = findDatabaseList( databaseListType, protocol.Recommendations );
        if( recommendation != null )
        {
            return isContainedInList( elementId, recommendation, isEqualNum );   
        }                 
    }    
    return false;      
} /* isRecommendedInProtocol_private() */

/**
 * @function addTaskToProtocol - Adds a given task to a protocol
 * @param {number} taskId - which task to add 
 * @param {number} protocolId - which protocol to add to
 * @param {number} secondsSinceStart - how many seconds since the start of the protocol to start task
 * @param {DatabaseModel} database - which database to search in
 * @returns {boolean} - whether the task was successfully added or not
 */
function addTaskToProtocol_private( taskId, protocolId, secondsSinceStart, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );    
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );
    let elementCheck = getObjectById_private( taskId, Database.DATABASE_LIST_TYPE.TASKS, database );

    if( protocol != null && elementCheck != null )
    {
        let protocolTask = new ProtocolTask( taskId, secondsSinceStart );
        if( !isContainedInList( protocolTask, protocol.Tasks, isEqualProtocolTask ) )
        {
            for( let i = 0; i < protocol.Tasks.length; i++ )
            {                
                // insert ordered based on seconds since start
                if( protocolTask.SecondsSinceStart < protocol.Tasks[i].SecondsSinceStart )
                {
                    protocol.Tasks.splice( i, 0, protocolTask );
                    return true;
                }
            }

            // default if tasks are emtpy
            protocol.Tasks.push( protocolTask );
            return true;
        }
    }
    return false;
} /* addTaskToProtocol_private() */

/**
 * @function removeTaskFromProtocol_private - Removes a given task from the protocol
 * @param {ProtocolTask} task - the task to remove
 * @param {number} protocolId - the id of the protocol to remove from
 * @param {DatabaseModel} database - the database to search
 * @returns {boolean} - whether the task was successfully removed or not
 */
function removeTaskFromProtocol_private( task, protocolId, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );    
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );

    if( protocol != null )
    {
        for( let i = 0; i < protocol.Tasks.length; i++ )
        {
            if( isEqualProtocolTask( task, protocol.Tasks[i] ) )
            {
                protocol.Tasks.splice( i, 1 );
                return true;
            }
        }
    }
    return false;
} /* removeTaskFromProtocol_private() */

/**
 * @function updateTaskStartInProtocol_private - Update the start time of a particular task
 * @param {ProtocolTask} oldTask - the old task to update
 * @param {number} newSecondsSinceStart - the new time to set the task for
 * @param {number} protocolId - the id of the protocol to update
 * @param {DatabaseModel} database = the database to search in
 * @returns {boolean} - whether the task was updated successfully or not
 */
function updateTaskStartInProtocol_private( oldTask, newSecondsSinceStart, protocolId, database )
{
    let protocols = findDatabaseList( Database.DATABASE_LIST_TYPE.PROTOCOLS, database );    
    let protocol = findObjectByIdInList( protocolId, protocols, 0, protocols.length );

    if( protocol != null )
    {
        let taskUpdated = false;
        let tasks = protocol.Tasks;
        let i;
        for( i = 0; i < tasks.length; i++ )
        {
            if( isEqualProtocolTask( oldTask, tasks[i] ) )
            {                
                tasks[i].SecondsSinceStart = newSecondsSinceStart;
                taskUpdated = true;
                break;
            }
        }

        if( taskUpdated )
        {            
            let j = i + 1;                        
            // try sort right
            while( j < tasks.length && tasks[j].SecondsSinceStart < newSecondsSinceStart )
            {                
                swapElements(j - 1, j, tasks);                
                j++;
            }

            j = i - 1;
            //try sort left
            while( j >= 0 && tasks[j].SecondsSinceStart > newSecondsSinceStart )
            {
                swapElements(j + 1, j, tasks);
                j--;
            }             
            
            return true;
        }
    }
    return false;
} /* updateTaskStartInProtocol_private() */

/**
 * @function addProtocol_private - Add a new protocol to the database
 * @param {string} protocolName - the name of the new protocol
 * @param {string} description - the description of the new protocol
 * @param {ProtocolTask[]} tasks - an array of tasks to add to the new protocol
 * @param {ProtocolRecommendation} recommendations - the recommondations for the new protocol
 * @param {DatabaseModel} database - the database to traverse
 * @returns {boolean} - Whether the protocol was successfully added or not
 */
 function addProtocol_private( protocolName, description, tasks, recommendations, database )
 {
     let list = findDatabaseList( DATABASE_LIST_TYPE.PROTOCOLS, database );
     let id = list.length > 0 ? list[ list.length - 1 ].Id + 1 : 0; // take last elements id and add 1 -- default 0
     let protocol = new Protocol( id, protocolName, description, tasks, recommendations );
     if( isValidProtocol( protocol, database ) )
     {
        return addElementToDatabase( protocol, list );
     }
     else
     {
         return false; // something went wrong.
     }     
 } /* addProtocol_private() */

/**
* @function selectHormoneId_private - Select a hormone product
* @param {number} id - the id of the hormone product to select 
* @param {DATABASE_LIST_TYPE} hormoneListType - which hormone to select (P_G or GN_RH)
* @param {DatabaseModel} database - the database to traverse
* @returns {boolean} - whether the hormone was selected or not 
*/
function selectHormoneId_private( id, hormoneListType, database )
{
    if( isHormoneDatabaseType( hormoneListType ) )
    {
        let objectCheck = getObjectById_private( id, hormoneListType, database );
        if( objectCheck != null )
        {
            if( hormoneListType == DATABASE_LIST_TYPE.P_G )
            {
                database.SelectedPGId = id;
            }
            else
            {
                database.SelectedGnRHId = id;
            }
            return true;
        }
    }
    return false;
} /* selectHormoneId_private() */

/**
 * @function getJSONData_private - fetches a given json file and returns a json object
 * @param {string} path - the path to the json object
 * @returns {object} - a json object
 */
async function getJSONData_private( path )
{
    let json = await fetch( path,
    {
        headers : 
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    json = await json.json();
    return json;
} /* getJSONData_private() */

/**
 * @function downloadDatabaseAsJSON_private - Initiate a download of the database object
 * @param {string} filename - the name to set the file as
 * @param {DatabaseModel} database - the database to download
 */
function downloadDatabaseAsJSON_private( filename, database )
{   
    let link = document.createElement('a');
    link.setAttribute( 'href', 
                       'data:text/plain;charset=utf-8,' + 
                        encodeURIComponent( JSON.stringify( database ) ) );

    link.setAttribute('download', filename);          
    link.style.display = 'none';

    document.body.appendChild( link );
          
    link.click();
          
    document.body.removeChild( link );        
} /* downloadDatabaseAsJSON_private() */

//#endregion
/********************************/

/********************************/
// #region HELPER FUNCTIONS    *
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

    list = findDatabaseProductList( databaseListType, database );
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
 * @function findDatabaseInputList - find a given input database list
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

        case DATABASE_LIST_TYPE.CATTLE:
            return database.Cattle;

        default:
            return null;
    }
} /* findDatabaseInputList() */

/**
 * @function findDatabaseProductList - find a given product database list
 * @param {DATABASE_LIST_TYPE} databaseListType - the list to find
 * @param {DatabaseModel} database - the database to traverse
 * @returns {HormoneProduct[]} - the product database list
 */
function findDatabaseProductList( databaseListType, database )
{
    switch( databaseListType )
    {
        case DATABASE_LIST_TYPE.P_G:
            return database.PG;

        case DATABASE_LIST_TYPE.GN_RH:
            return database.GnRH;

        default:
            return null;
    }
} /* findDatabaseProductList() */

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
 * @function isEqualId - Checks whether two elements id's are equal
 * @param {ListType} element1 - the first element to check
 * @param {ListType} element2 - the second element to check
 * @returns {boolean} - whether the id's are equal or not
 */
function isEqualId( element1, element2 )
{
    let cmp1 = typeof element1 == "number" ? element1 : element1.Id;
    let cmp2 = typeof element2 == "number" ? element2 : element2.Id;    
    return cmp1 == cmp2 && cmp1 != null;
} /* isEqualId() */

/**
 * @function isProtocolTaskEqualToTask - Checks whether the ids of a protocol task are equivalent to task
 * @param {ProtocolTask} protocolTask - the protocol task to check
 * @param {Task} task - the task to check
 * @returns {boolean} - whether the two tasks have the same id
 */
function isProtocolTaskIdEqualToTaskId( protocolTask, task )
{
    return protocolTask.TaskId == task.Id && task.Id != null;
} /* isProtocolTaskIdEqualToTaskId */

/**
 * @function isEqualProtocolTask - Checks whether two protocol tasks are equal
 * @param {ProtocolTask} task1 - task 1 to check
 * @param {ProtocolTask} task2 - task 2 to check
 * @returns {boolean} - whether the two tasks are equivalent
 */
function isEqualProtocolTask( task1, task2 )
{
    return task1.TaskId == task2.TaskId && task1.SecondsSinceStart == task2.SecondsSinceStart;
} /* isEqualProtocolTask() */

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
        if( isEqualFunc( element, list[i] ) )
        {
            return true;
        }
    }
    return false;
} /* isContainedInList() */

/**
 * @function isValidProtocol - checks whether a given protocol contains valid entries or not
 * @param {Protocol} protocol - the protocol to check
 * @param {DatabaseModel} database - the database to traverse
 * @returns {boolean} - whether the protocol contains valid entries 
 */
function isValidProtocol( protocol, database )
{
    if( protocol == null )
    {
        return false;
    }

    // Check tasks   
    if( protocol.Tasks == null || protocol.Tasks.length == null )
    {        
        return false;
    }
    let list = findDatabaseList( DATABASE_LIST_TYPE.TASKS, database );
    if( !isListContainedInList( protocol.Tasks, list, isProtocolTaskIdEqualToTaskId ) )
    {        
        return false;
    }
    
    // Check recommendation    
    if( protocol.Recommendations == null )
    {        
        return false;
    }
    
    // Check System Type    
    if( protocol.Recommendations.SystemType == null || protocol.Recommendations.SystemType.length == null )
    {        
        return false;
    }
    list = findDatabaseList( DATABASE_LIST_TYPE.SYSTEM_TYPE, database );
    if( !isListContainedInList( protocol.Recommendations.SystemType, list, isEqualId ) )
    {        
        return false;
    }

    // Check Semen    
    if( protocol.Recommendations.Semen == null || protocol.Recommendations.Semen.length == null )
    {        
        return false;
    }
    list = findDatabaseList( DATABASE_LIST_TYPE.SEMEN, database );
    if( !isListContainedInList( protocol.Recommendations.Semen, list, isEqualId ) )
    {        
        return false;
    }

    // Check Breed    
    if( protocol.Recommendations.Breed == null || protocol.Recommendations.Breed.length == null )
    {        
        return false;
    }
    list = findDatabaseList( DATABASE_LIST_TYPE.BREED, database );
    if( !isListContainedInList( protocol.Recommendations.Breed, list, isEqualId ) )
    {        
        return false;
    }

    // Check GnRH    
    if( protocol.Recommendations.GnRH == null || protocol.Recommendations.GnRH.length == null )
    {        
        return false;
    }
    list = findDatabaseList( DATABASE_LIST_TYPE.GN_RH, database );
    if( !isListContainedInList( protocol.Recommendations.GnRH, list, isEqualId ) )
    {        
        return false;
    }

    // Check PG    
    if( protocol.Recommendations.PG == null || protocol.Recommendations.PG.length == null )
    {        
        return false;
    }
    list = findDatabaseList( DATABASE_LIST_TYPE.P_G, database );
    if( !isListContainedInList( protocol.Recommendations.PG, list, isEqualId ) )
    {        
        return false;
    }

    // Check Cattle    
    if( protocol.Recommendations.Cattle == null || protocol.Recommendations.Cattle.length == null )
    {        
        return false;
    }
    list = findDatabaseList( DATABASE_LIST_TYPE.CATTLE, database );
    if( !isListContainedInList( protocol.Recommendations.Cattle, list, isEqualId ) )
    {        
        return false;
    }

    return true;
} /* isValidProtocol() */

/**
 * @function isListContainedInList - whether a given lists elements are all contained in another list
 * @param {Array[]} list1 - the list to check
 * @param {Array[]} list2 - the list to check against
 * @param {function} isEqualFunc - an equal function to check list elements by
 * @return {boolean} - whether a given lists elements are all contained in another list
 */
function isListContainedInList( list1, list2, isEqualFunc )
{
    for( let i = 0; i < list1.length; i++ )
    {        
        if( !isContainedInList( list1[i], list2, isEqualFunc ) )
        {            
            return false;
        }
    }
    return true;
} /* isListContainedInList() */

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

/**
 * @function swapElements - swaps two elements in a list
 * @param {number} index1 - the index of element 1
 * @param {number} index2 - the index of element 2
 * @param {Array[]} list - the list to swap in
 */
function swapElements( index1, index2, list )
{
    let temp = list[ index2 ];
    list[ index2 ] = list[ index1 ];
    list[ index1 ] = temp;
} /* swapElements() */

/**
 * @function isHormoneDatabaseType - Whether the given type is a hormone type
 * @param {DATABASE_LIST_TYPE} databaseListType - the type to check
 * @returns {boolean} Whether the given type is a hormone type
 */
function isHormoneDatabaseType( databaseListType )
{
    return databaseListType == DATABASE_LIST_TYPE.P_G || databaseListType == DATABASE_LIST_TYPE.GN_RH;
} /* isHormoneDatabaseType() */

/**
 * @function adjustHormoneTaskName - adjusts the name of a hormone task to include the amount of injection
 * @param {Task} task - the task to adjust name
 * @param {DatabaseModel} database - the database to search in 
 */
function adjustHormoneTaskName( task, database )
{
    let pg = getObjectById_private( database.SelectedPGId, DATABASE_LIST_TYPE.P_G, database );
    let gnrh = getObjectById_private( database.SelectedGnRHId, DATABASE_LIST_TYPE.GN_RH, database );
    
    task.Name = formatHormoneString( task.Name, pg, VAR_NAME.P_G );    
    task.Name = formatHormoneString( task.Name, gnrh, VAR_NAME.GN_RH );    
} /* adjustHormoneTaskName() */

/**
 * @function formatHormoneString - formats a string by inserting the dosage of a given hormone into each placeholder in the format $variableName
 * @param {string} s - the string to split on
 * @param {HormoneProduct} hormone - the hormone to insert into the string
 * @param {VAR_NAME} variableName - the "variable" name to split the string and map the hormone to that location $variableName - if null, just print variableName 
 * @returns {string} - a new formated string
 */
function formatHormoneString( s, hormone, variableName )
{
    let s_split = s.split( "$" + variableName );    

    let newString = s_split[0];
    // format normally
    if( hormone != null )
    {
        for( let i = 1; i < s_split.length; i++ )
        {
            newString = `${ newString }${ hormone.DefaultCCs }cc of ${ hormone.Name } (${ variableName })${ s_split[i] }`
        }
    }
    // hormone doesn't exist so... remove '$', and show variable name instead
    else
    {
        for( let i = 1; i < s_split.length; i++ )
        {
            newString = `${ newString }${ variableName }${ s_split[i] }`
        }
    }    
    return newString; 
} /* formatHormoneTask() */

/**
 * @function ListType - alphabetizes a list by name
 * @param {ListType[]} list - the list to alphabetize
 * @param {number} start - the starting index
 * @param {number} length - how far of the list to alphabetize
 * @param {number} charIndex - which character to sort on
 * @param {number} recDepth - how deep we are into recursion
 */
function alphabetizeByName( list, start, length, charIndex, recDepth )
{
    const recursionMax = 75

    // Already sorted
    if( length <= 1 || recDepth >= recursionMax )
    {        
        return;
    }

    // (L)ess (U)nsorted (M)edian (G)reater
    let u_start = start;
    let u_end = start + length - 1;
    let m_end = start + length - 1;

    let median = null;
    for( let i = start; i < start + length; i++ )
    {
        if( charIndex < list[i].Name.length )
        {            
            median = list[i].Name[ charIndex ];           
            break;
        }
    }

    // Already sorted
    if( median == null )
    {        
        return;
    }

    // Partian
    while( u_start <= u_end )
    {
        if( charIndex >= list[ u_start ].Name.length )
        {            
            // end of string reached and sorted
            u_start++;
        }
        else
        {
            let character = list[ u_start ].Name[ charIndex ];
            if( character < median )
            {                
                // Move to L
                u_start++
            }
            else if( character > median )
            {                
                // Move to G               
                swapElements( u_start, m_end, list );                
                swapElements( u_start, u_end, list );
                u_end--;
                m_end--;                
            }
            else
            {                
                // Move to M
                swapElements( u_start, u_end, list );
                u_end--;
            }
        } 
    }

    // Sort L if more than 1 element    
    if( u_start - start > 1 )
    {        
        alphabetizeByName( list, start, u_start - start, charIndex, recDepth + 1 );
    }

    // Sort M if more than 1 element    
    if( m_end - u_end > 1 )
    {        
        alphabetizeByName( list, u_start, m_end - u_end, charIndex + 1, recDepth + 1 );
    }

    // Sort G if more than 1 element    
    if( ( start + length - 1 ) - m_end > 1 )
    {        
        alphabetizeByName( list, m_end + 1, ( start + length - 1 ) - m_end, charIndex, recDepth + 1 );
    }
} /* alphabetizeByName() */

//#endregion
/********************************/