/**************************************************************
 * Database.js
 * Author: Ben Amos
 * Description: Handles all input and output of the database
 **************************************************************/

 /*************************************
 *            EXPORTS                *
 *************************************/

 export { 
          Database, 
          ListType, 
          Task, 
          Protocal, 
          ProtocalTask, 
          ProtocalRecommendation 
        }; 

 /************************************
 *            CONSTANTS              *
 *************************************/

/** @DATABASE_LIST_TYPE 
 * An enum of the type of lists in the database
 */
const DATABASE_LIST_TYPE = 
{
   TASKS:       1,
   PROTOCALS:   2,
   SEMEN:       3,
   SYSTEM_TYPE: 4,
   BREED:       5,
   GN_RH:       6,
   P_G:         7
};

/** @DATABASE_LIST_TYPE 
 * An enum of the names of the lists in the database
 */
const DATABASE_LIST_NAME = 
{
  TASKS:       "Tasks",
  PROTOCALS:   "Protocals",
  SEMEN:       "Semen",
  SYSTEM_TYPE: "System Type",
  BREED:       "Breed",
  GN_RH:       "Gonadotropin Releasing Hormone",
  P_G:         "Prostaglandin"
}

/************************************
 *         DATABASE CLASS           *
 ************************************/

/** class Database
 * A database to handle all the lists of protocals, tasks and input types
 */
class Database
{
    constructor()
    {
      this.database = initializeDatabase(true);
    }

    static DATABASE_LIST_TYPE = DATABASE_LIST_TYPE;
    static DATABASE_LIST_NAME = DATABASE_LIST_NAME;

    GetJSONData()
    {
      return getJSONData();
    }
    
    /**
     * @function GetObjectById - Lookup element by its id
     * @param {number} id - the id of the element 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup in
     * @returns {ListType} - the element 
     */
    GetObjectById(id, databaseListType)
    {
      if(checkParameterTypes([id, databaseListType], ["number", "number"]))
      {
        return getObjectById(id, databaseListType, this.database);
      }      
      return null;
    } /* GetObjectById() */

    /**
     * @function GetObjectByName - find the object associated with the name
     * @param {string} name - the name of the object 
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to look into
     * @returns {ListType} - the object associated with the name 
     */
    GetObjectByName(name, databaseListType)
    {
      if(checkParameterTypes([name, databaseListType], ["string", "number"]))
      {
        return getObjectByName(name, databaseListType, this.database);
      }
      return null;
    } /* GetObjectByName() */

    /**
    * @function GetNameById - Lookup the name of an element by its id
    * @param {number} id - the id of the element 
    * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup in
    * @returns {string} - the name of the element 
    */
    GetNameById(id, databaseListType)
    {
      if(checkParameterTypes([id, databaseListType], ["number", "number"]))
      {
        return getNameById(id, databaseListType, this.database);
      }
      return "";
    } /* GetNameById() */

    /**
     * @function GetDatabaseListElements - Lookup the elements of the database list
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
     * @returns {ListType[]} - a list of all the elements of a given list
     */
    GetDatabaseListElements(databaseListType)
    {
      if(checkParameterTypes(databaseListType, "number"))
      {
        return getDatabaseListElements(databaseListType, this.database);
      }
      return [];
    } /* GetDatabaseListElements() */

    /**
     * @function GetDatabaseList - Lookup the names of the elements in the database
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to get
     * @returns {string[]} - A list of the names of a given list  
     */
    GetDatabaseListNames(databaseListType)
    {
      if(checkParameterTypes(databaseListType, "number"))
      {
        return getDatabaseListNames(databaseListType, this.database);
      }
      return [];
    } /* GetDatabaseList() */

    /**
     * @function GetRecommendedProtocals - Gets a list of protocals filtered by the input types, all null parameters
     *  will return a list of all the protocals
     * @param {number} semenId - the id of the semen
     * @param {number} systemTypeId - the id of the system type
     * @param {number} breedId - the id of the breed
     * @param {number} gnrhId - the id of the gonadotropin hormone
     * @param {number} pgId - the id of the prostaglandin
     * @returns {Protocal[]} - a list of all the recommended protocals
     */
    GetRecommendedProtocals(semenId, systemTypeId, breedId, gnrhId, pgId)
    {
      if(checkNullableParameters([semenId, systemTypeId, breedId, gnrhId, pgId], ["number", "number", "number", "number", "number"]))
      {
        return getRecommendedProtocals(semenId, systemTypeId, breedId, gnrhId, pgId, this.database);
      }
      return [];
    } /* GetRecommendedProtocals() */

    /**
     * @function GetRecommendedProtocalNames - Get a list of names of the recommended protocals filtered by inputs
     * @param {number} semenId - the id of the semen 
     * @param {number} systemTypeId - the id of the system type 
     * @param {number} breedId - the id of the breed 
     * @param {number} gnrhId - the id of the gonadtropin hormone
     * @param {number} pgId - the id of the prostaglandin
     * @returns {string[]} - A list of the names of the recommended protocals
     */
    GetRecommendedProtocalNames(semenId, systemTypeId, breedId, gnrhId, pgId)
    {
      if(checkNullableParameters([semenId, systemTypeId, breedId, gnrhId, pgId], ["number", "number", "number", "number", "number"]))
      {
        return getRecommendedProtocalNames(semenId, systemTypeId, breedId, gnrhId, pgId, this.database);
      }
      return [];
    } /* GetRecommendedProtocalNames() */

    /**
     * @function AddListElement - Add a new list element to the database if it doesn't already exist
     * @param {string} elementName - the name of the element
     * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to 
     * @returns {boolean} - whether the element was successfully addded or not
     */
    AddListElement(elementName, databaseListType)
    {
      if(checkParameterTypes([elementName, databaseListType], ["string", "number"]))
      {
        return addListElement(databaseListType, elementName, this.database);
      }
      return false;
    } /* AddListElement() */

    /**
     * @function AddTask - Add a new task to the database if it doesn't already exist
     * @param {string} taskName - the name of the task to add 
     * @param {number} taskLength - the length of the task
     * @returns {boolean} - whether the task was added to the database 
     */
    AddTask(taskName, taskLength)
    {
      if(checkParameterTypes([taskName, taskLength], ["string", "number"]))
      {
        return addTask(taskName, taskLength, this.database);
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
    UpdateListElementName(elementId, newName, databaseListType)
    {
      if(checkParameterTypes([elementId, newName, databaseListType], ["number", "string", "number"]))
      {
        return updateListElementName(databaseListType, elementId, newName, this.database);
      }
      return false;
    } /* UpdateListElementName() */

    /**
     * @function UpdateTask - update a task with a new name and/or task length
     * @param {number} taskId - the id of the task to update 
     * @param {string} newTaskName - the new name of the task 
     * @param {number} newTaskLength - the new length of the task
     * @returns {boolean} - whether the task was updated or not 
     */
    UpdateTask(taskId, newTaskName, newTaskLength)
    {
      if(checkNullableParameters([taskId, newTaskName, newTaskLength], ["number", "string", "number"]))
      {
        return updateTask(taskId, newTaskName, newTaskLength, this.database);
      }
      return false;
    } /* UpdateTask() */
}

/**********************************
 *      PUBLIC MODEL CLASSES      *
 **********************************/

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
  constructor(id, name)
  {
    if(typeof id == "number")
    {
      this.Id = id;
    }
    if(typeof name == "string")
    {
      this.Name = name;
    }    
  }

  /**
   * @function Copy - creates a copy of current object
   * @returns {ListType} - a copy of current object
   */
  Copy()
  {
    return new ListType(this.Id, this.Name);
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
  constructor(id, name, description, taskLength)
  {
    super(id, name);
    if(typeof description == "string")
    {
      this.Description = description;
    }
    if(typeof taskLength == "number")
    {
      this.TaskLength = taskLength;
    }    
  }

  /**
   * @function Copy - creates a copy of current Task
   * @returns {Task} - a copy of current Task
   */
  Copy()
  {
    return new Task(this.Id, this.Name, this.Description, this.TaskLength);
  } /* Copy() */
} /* class Task */

/** Class Protocal
 * A given protocal to be executed
 */
class Protocal extends ListType
{
  /**
   * Constructs a protocal
   * @param {number} id - the id of the protocal 
   * @param {string} name - the name of the protocal 
   * @param {string} description - the description of the protocal
   * @param {ProtocalTask[]} tasks - the protocals tasks to complete 
   * @param {ProtocalRecommendation} recommendations - the recommended inputs for this protocal  
   */
  constructor(id, name, description, tasks, recommendations)
  {
    super(id, name);
    if(typeof description == "string")
    {
      this.Description = description;
    }
    if(typeof tasks == "object")
    {
      this.Tasks = tasks;
    }
    if(typeof recommendations == "object")
    {
      this.Recommendations = recommendations;
    }
  }

  /**
   * @function Copy - creates a copy of the protocal
   * @returns {Protocal} - a copy of the protocal
   */
  Copy()
  {
    let tasksCopy = []
    for(let i = 0; i < this.Tasks.length; i++)
    {
      tasksCopy.push( this.Tasks[i].Copy() );
    }
    return new Protocal(this.Id, this.Name, this.Description, tasksCopy, this.Recommendations.Copy() );
  } /* Copy() */
} /* class Protocal */

/** class ProtocalTask
 * A task to excecute in a protocal
 */
class ProtocalTask
{
  /**
   * Constructs a ProtocalTask
   * @param {number} taskId - the id of the task in the protocal 
   * @param {number} secondsSinceStart - the relative seconds since the start of the protocal to begin task 
   */
  constructor(taskId, secondsSinceStart)
  {
    if(typeof taskId == "number")
    {
      this.TaskId = taskId;
    }
    if(typeof secondsSinceStart == "number")
    {
      this.SecondsSinceStart = secondsSinceStart;
    }    
  }

  /**
   * @function Copy - creates a copy of the ProtocalTask
   * @returns {ProtocalTask} - a copy of the protocal task
   */
  Copy()
  {
    return new ProtocalTask(this.TaskId, this.SecondsSinceStart);
  } /* Copy() */
} /* class ProtocalTask */

/** class ProtocalRecommendation
 * An aggregation of all the recommended inputs for a protocal
 */
class ProtocalRecommendation
{
  /**
   * Constructs a ProtocalRecommendation
   * @param {number[]} systemType - a list of recommended system type id's 
   * @param {number[]} semen - a list of recommended semen id's
   * @param {number[]} breed - a list of recommended breed id's
   * @param {number[]} gnRH - a list of recommended GnRH id's 
   * @param {number[]} pG - a list of recommended PG id's 
   */
  constructor(systemType, semen, breed, gnRH, pG)
  {
    if(typeof systemType == "object")
    {
      this.SystemType = systemType;
    }
    if(typeof semen == "object")
    {
      this.Semen = semen;
    }
    if(typeof breed == "object")
    {
      this.Breed = breed;
    }
    if(typeof gnRH == "object")
    {
      this.GnRH = gnRH;
    }
    if(typeof pG == "object")
    {
      this.PG = pG;
    }    
  }

  /**
   * @function Copy - creates a copy of the ProtocalRecommendation
   * @returns {ProtocalRecommendation} - a copy of the ProtocalRecommendation
   */
  Copy()
  {
    let systemTypeCopy = [];
    let semenCopy = [];
    let breedCopy = [];
    let gnRHCopy = [];
    let pgCopy = [];
    for(let i = 0; i < this.SystemType.length; i++)
    {
      systemTypeCopy.push( this.SystemType[i] );
    }
    for(let i = 0; i < this.Semen.length; i++)
    {
      semenCopy.push( this.Semen[i] ); 
    }
    for(let i = 0; i < this.Breed.length; i++)
    {
      breedCopy.push( this.Breed[i] );
    }
    for(let i = 0; i < this.GnRH.length; i++)
    {
      gnRHCopy.push( this.GnRH[i] );
    }
    for(let i = 0; i < this.PG.length; i++)
    {
      pgCopy.push( this.PG[i] );
    }
    return new ProtocalRecommendation(systemTypeCopy, semenCopy, breedCopy, gnRHCopy, pgCopy);
  } /* Copy() */
} /* class ProtocalRecommendation */

/************************************
 *          PUBLIC FUNCTIONS        *
 ************************************/

/** @function getObjectById
 * Look up a given object by its id
 * @param {number} id - The id to search for
 * @param {DATABASE_LIST_TYPE} databaseListType - Which list to search
 * @param {object} database - The database to search
 * @returns {ListType} - The object with the id if found; null if not found
 */
function getObjectById(id, databaseListType, database)
{
    let list = findDatabaseList(databaseListType, database);
    let findObj = null;
    if(list != null)
    {
      findObj = findByIndexInList(id, list, 0, list.length);
      if(findObj != null)
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
 * @param {object} database - the database to traverse
 * @returns {ListType} - the object associated with the name
 */
function getObjectByName(name, databaseListType, database)
{
  let list = findDatabaseList(databaseListType, database);
  let findObj = null;
  if(list != null)
  {
    findObj = findByNameInList(name, list);
    if(findObj != null)
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
 * @param {object} database - The database to search
 * @returns {string} - The name of the object with the id if found; empty string if not found
 */
function getNameById(id, databaseListType, database)
{
    let tempObject = getObjectById(id, databaseListType, database);

    if(tempObject != null)
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
 * @param {object} database - the database to search
 * @returns {ListType[]} - A list of elements with their
 */
function getDatabaseListElements(databaseListType, database)
{
  let newList = [];
  let list = findDatabaseList(databaseListType, database);
  if(list == null)
  {
    return [];
  }

  for(let i = 0; i < list.length; i++)
  {
    newList.push( list[i].Copy() );
  }  
  return newList;
}

/** @function getDatabaseList
 * Get the list of names to display
 * @param {DATABASE_LIST_TYPE} databaseListType - The list to get
 * @param {object} database - The database to search
 * @returns {string[]} - the list of names in the database list
 */
function getDatabaseListNames(databaseListType, database)
{
  let newList = [];
  let list = findDatabaseList(databaseListType, database);

  if(list != null)
  {
    for(let i = 0; i < list.length; i++)
    {
      newList.push( databaseElementToString(list[i]) );
    }
  }
  return newList;
} /* getDatabaseList() */

/**
 * @function getRecommendedProtocals - Get the list of protocals which are recommended for the given inputs
 * @param {number} semenId - the id of the semen input 
 * @param {number} systemTypeId - the id of the system type 
 * @param {number} breedId - the id of the breed 
 * @param {number} gnrhId - the id of the gonadtropin hormone
 * @param {number} pgId - the id of the prostaglandin 
 * @param {object} database - the database to search
 * @returns {Protocal[]} - A list of protocals associated with inputs 
 */
function getRecommendedProtocals(semenId, systemTypeId, breedId, gnrhId, pgId, database)
{
  let protocals = database.Protocals;
  let newList = [];
  if(semenId == null && systemTypeId == null && breedId == null && gnrhId == null && pgId == null)
  {
    for(let i = 0; i < protocals.length; i++)
    {
      newList.push(protocals[i].Copy());
    }
  }
  else
  {
    for(let i = 0; i < protocals.length; i++)
    {
      if(isRecommendedProtocal(semenId, systemTypeId, breedId, gnrhId, pgId, protocals[i].Recommendations))
      {
        newList.push(protocals[i].Copy());
      }
    }
  }  
  return newList;
} /* getRecommendedProtocals() */

/**
 * @function getRecommendedProtocalNames - Generates a list of the recommended protocal names associated with inputs
 * @param {number} semenId - the id of the semen 
 * @param {number} systemTypeId - the id of the system type
 * @param {number} breedId - the id of the breed 
 * @param {number} gnrhId - the id of the gonadatropin hormone
 * @param {number} pgId - the id of the prostaglandin 
 * @param {object} database - the database to traverse
 * @returns {string[]} - A list of the names of the recommended protocals 
 */
function getRecommendedProtocalNames(semenId, systemTypeId, breedId, gnrhId, pgId, database)
{
  let protocals = getRecommendedProtocals(semenId, systemTypeId, breedId, gnrhId, pgId, database);
  let newList = [];  
  for(let i = 0; i < protocals.length; i++)
  {
    newList.push(protocals[i].Name);
  }  
  return newList;
} /* getRecommendedProtocalNames() */

/** @function addListElement
 * Add a list element to a database list if it doesn't already exist
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to add to
 * @param {string} elementName - the name of the element 
 * @param {object} database - the database object
 * @returns {boolean} - whether the element was added or not
 */
function addListElement(databaseListType, elementName, database)
{
  let list = findDatabaseInputList(databaseListType, database);

  if(list != null)
  {
    let newId = list[list.length - 1].Id + 1; // Take last id and add 1
    return addElementToDatabase(new ListType(newId, elementName), list);
  }
  return false;
} /* addListElement() */

/**
 * @function addTask - Add a new task to the database
 * @param {string} taskName - the unique name of the task to add 
 * @param {number} taskLength - the length of the task
 * @param {object} database - the database to add to
 * @returns {boolean} - whether the task was added or not
 */
function addTask(taskName, taskLength, database)
{
  let list = database.Tasks;
  if( taskName == null || taskLength == null )
  {
    return false;
  }
  let newId = list[list.length - 1].Id + 1; // Take last id and add 1
  return addElementToDatabase(new Task(newId, taskName, taskLength), list);
} /* addTask() */

/**
 * @function updateListElementName - Update the name of the list element
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to update 
 * @param {number} elementId - the id of the element to update
 * @param {string} newName - the new name to set the element to
 * @param {object} database - the database to traverse
 * @returns {boolean} - Whether the name was updated in the database
 */
function updateListElementName(databaseListType, elementId, newName, database)
{
  if(newName == null)
  {
    return false;
  }

  let list = findDatabaseInputList(databaseListType, database);
  if(list == null)
  {
    return false;
  }
  let oldElement = findByIndexInList(elementId, list, 0, list.length);

  if(oldElement == null)
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
 * @param {number} newTaskLength - the new task length
 * @param {object} database - the database to update
 * @returns {boolean} - whether the task was updated or not
 */
function updateTask(taskId, newTaskName, newTaskLength, database)
{
  let list = database.Tasks;
  if(taskId == null || newTaskName == null && newTaskLength == null)
  {
    return false;
  }
  let oldTask = findByIndexInList(taskId, list, 0, list.length);
  if(oldTask == null)
  {
    return false;
  }
  if(newTaskName != null)
  {
    oldTask.Name = newTaskName;
  }
  if(newTaskLength != null)
  {
    oldTask.TaskLength = newTaskLength;
  }
  return true;
} /* updateTask() */

function parseJSON(json)
{
  let database =
  {
    Tasks: [],
    Protocals: [],
    Semen: [],
    SystemType: [],
    Breed: [],
    GnRH: [],
    PG: []
  };

  console.log(json)
  
  // Populate Tasks
  for(let i = 0; i < json.Tasks.length; i++)
  {
    let task = json.Tasks[i];
    database.Tasks.push( new Task(task.Id, task.Name, task.Description, task.TaskLength) );
  }

  // Populate Protocals
  for(let i = 0; i < json.Protocals.length; i++ )
  {
    let protocal = json.Protocals[i];
    let tasks = [];
    for(let j = 0; j < protocal.Tasks.length; j++)
    {
      let task = protocal.Tasks[j]
      tasks.push( new ProtocalTask(task.TaskId, task.SecondsSinceStart) )
    }
    let recommendation = new ProtocalRecommendation(protocal.Recommendations.SystemType, protocal.Recommendations.Semen,
      protocal.Recommendations.Breed, protocal.Recommendations.GnRH, protocal.Recommendations.PG )
    database.Protocals.push(new Protocal(protocal.Id, protocal.Name, protocal.Description, tasks, recommendation));
  }

  // Populate Semen
  for(let i = 0; i < json.Semen.length; i++)
  {
    let semen = json.Semen[i];
    database.Semen.push(new ListType(semen.Id, semen.Name))
  }

  // Populate SystemType
  for(let i = 0; i < json.SystemType.length; i++)
  {
    let systemType = json.SystemType[i];
    database.SystemType.push(new ListType(systemType.Id, systemType.Name));
  }

  // Populate Breed
  for(let i = 0; i < json.Breed.length; i++)
  {
    let breed = json.Breed[i];
    database.Breed.push(new ListType(breed.Id, breed.Name));
  }

  // Populate GnRH
  for(let i = 0; i < json.GnRH.length; i++)
  {
    let gnrh = json.GnRH[i];
    database.GnRH.push(new ListType(gnrh.Id, gnrh.Name));
  }

  // Populate PG
  for(let i = 0; i < json.PG.length; i++)
  {
    let pg = json.PG[i];
    database.PG.push(new ListType(pg.Id, pg.Name));
  }
  return database;
}

async function getJSONData()
{
  let json;
  fetch('./data.json',
  {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then(function(res){
      console.log(res);
      return res.json();
      }).then(function(dataobj){
        json = dataobj
      })
  
  console.log(await json);
  return (await json);
}

/*************************************
 *         PRIVATE FUNCTIONS         *
 *************************************/

/** @function initializeDatabase
 * Initialize the database by reading from a json file
 */
function initializeDatabase(useTesting)
{
    // TESTING DATABASE OBJECT
    if(useTesting)
    {
      return testingData;
    }
    else
    {
      return parseJSON( getJSONData() );
    }
    return null;
} /* intializeDatabase() */

/**
 * @function findDatabaseList - find and lookup the correct database list
 * @param {DATABASE_LIST_TYPE} databaseListType - which list to lookup
 * @param {object} database - the database to traverse
 * @returns {ListType[]} - the database list 
 */
function findDatabaseList(databaseListType, database)
{
  let list = findDatabaseInputList(databaseListType, database)
  if(list != null)
  {
    return list;
  }
  switch(databaseListType)
  {
    case DATABASE_LIST_TYPE.TASKS:
      return database.Tasks;

    case DATABASE_LIST_TYPE.PROTOCALS:
      return database.Protocals;

    default:
      return null;
  }
} /* findDatabaseList() */

/**
 * @function findDatabaseList - find a given input database list
 * @param {DATABASE_LIST_TYPE} databaseListType - the list to find
 * @param {object} database - the database to traverse
 * @returns {ListType[]} - the input database list
 */
function findDatabaseInputList(databaseListType, database)
{
  switch(databaseListType)
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

    default:
      return null;
  }
} /* findDatabaseInputList() */

/** @function findByIdInList 
 * Search a sorted list for the object which contains the id
 * @param {number} id - The id to look for
 * @param {array} list - The sorted list to search
 * @param {number} start - The starting index of the list
 * @param {number} length - The length of the list to search
 * @returns - The object with the given id, null otherwise
 */
function findByIndexInList(id, list, start, length)
{
    if(id == null || list == null)
    {
      return null;
    }
    let end = length;
    while(start < end)
    {
      let mid = Math.trunc((start + end) / 2);
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

/** @function findByNameInList
 * Find an element in the list by its name
 * @param {string} name - the name of the element to find 
 * @param {ListType[]} list - the list of elements to check
 * @returns {ListType} - the element with the given name 
 */
function findByNameInList(name, list)
{
  if(name == null || list == null)
  {
    return null;
  }
  for(let i = 0; i < list.length; i++)
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
function databaseElementToString(element)
{  
  let newString = "";  
  if(element != null)
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
function addElementToDatabase(element, list)
{
  // check for duplicates
  if(findByIndexInList(element.Id, list, 0, list.length) || findByNameInList(element.Name, list))
  {
    return false;
  }

  list.push( element );
  return true;
} /* addElementToDatabase() */


/**
 * @function isRecommendedProtocal - Checks whether a protocal is recommended or not
 * @param {number} semenId - the id of the semen
 * @param {number} systemTypeId - the id of the system type
 * @param {number} breedId - the id of the breed
 * @param {number} gnrhId - the id of the gonadtropin hormone
 * @param {number} pgId - the id of the prostaglandin
 * @param {ProtocalRecommendation} protocalRecommendation - the protocal recommendation to compare to
 * @returns {boolean} - Whether the protocal is recommended or not
 */
function isRecommendedProtocal(semenId, systemTypeId, breedId, gnrhId, pgId, protocalRecommendation)
{
  if(semenId != null)
  {
    if(!isContainedInList(semenId, protocalRecommendation.Semen, isEqualNum))
    {
      return false;
    }
  }
  if(systemTypeId != null)
  {
    if(!isContainedInList(systemTypeId, protocalRecommendation.SystemType, isEqualNum))
    {
      return false;
    }
  }
  if(breedId != null)
  {
    if(!isContainedInList(breedId, protocalRecommendation.Breed, isEqualNum))
    {
      return false;
    }
  }
  if(gnrhId != null)
  {
    if(!isContainedInList(gnrhId, protocalRecommendation.GnRH, isEqualNum))
    {
      return false;
    }
  }
  if(pgId != null)
  {
    if(!isContainedInList(pgId, protocalRecommendation.PG, isEqualNum))
    {
      return false;
    }
  }
  return true;
} /* isRecommendedProtocal() */

/**
 * @function isEqualNum - Checks whether two numbers are equal
 * @param {number} num1 - the first number to check 
 * @param {number} num2 - the second number to check
 * @returns {boolean} - whether the two numbers are equal
 */
function isEqualNum(num1, num2)
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
function isContainedInList(element, list, isEqualFunc)
{
  for(let i = 0; i < list.length; i++)
  {
    if( isEqualFunc( list[i], element) )
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
function checkParameterTypes(parameters, types)
{
  if(types != null && parameters != null)
  {
    if(typeof types == "string")
    {
      return typeof parameters == types;
    }
    else if(typeof types == "object" && typeof parameters == "object")
    {
      let end = Math.min(types.length, parameters.length);
      let i = 0;
      for(i = 0; i < end; i++)
      {
        if(typeof parameters[i] != types[i])
        {
          return false;
        }
      }
      if(i < parameters.length || i < types.length)
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
function checkNullableParameters(parameters, types)
{
  if(types != null && parameters != null)
  {
    if(typeof types == "string")
    {
      return typeof parameters == types;
    }
    else if(typeof types == "object" && typeof parameters == "object")
    {
      let end = Math.min(types.length, parameters.length);
      let i = 0;
      for(i = 0; i < end; i++)
      {
        if(parameters[i] != null && typeof parameters[i] != types[i])
        {
          return false;
        }
      }
      if(i < parameters.length || i < types.length)
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

/*******************
 *   TESTING DATA  *
 *******************/
var testingData = 
{
  Tasks: [            
    new Task( 0, "Start Heat Detection", "...", 0 ),
    new Task( 1, "Inject PG to Females", "...", 30 ),
    new Task( 2, "Stop Heat Detection", "...", 0 ),
    new Task( 3, "Detect Estrus and Breed", "...", 0 ),
    new Task( 4, "Clean up", "...", 50 ),
    new Task( 5, "New Cycle", "...", 0 ),
        ],
 Protocals: [
     new Protocal(0, 
       "1 Injection Prostaglandin Prior Estrus",               
       "...", 
       [ new ProtocalTask(0, 0), new ProtocalTask(1, 345600),
         new ProtocalTask(2, 950400), new ProtocalTask(3, 0),
         new ProtocalTask(4, 950400), new ProtocalTask(5, 2332800)
       ],
       new ProtocalRecommendation([0],[0],[0],[1],[5])
       ),
     new Protocal(1, 
       "1 Injection Prostaglandin No Prior Estrus",               
       "...", 
         [ new ProtocalTask(0, 0), new ProtocalTask(1, 345600),
           new ProtocalTask(2, 432000), new ProtocalTask(3, 0),
           new ProtocalTask(4, 950400), new ProtocalTask(5, 1987200)
         ],
         new ProtocalRecommendation([0],[0],[1],[1],[5])
       )
     ],
 Semen: [
     new ListType(0, "Conventional"),
     new ListType(1, "Sexed")
    ],
 SystemType: [
     new ListType(0, "Estrus AI"),
     new ListType(1, "Estrus AI & Clean-up AI"),
     new ListType(2, "Fixed-Time AI")
        ],
 Breed: [
     new ListType(0, "Bos Taurus"),
     new ListType(1, "Bos Indicus Influence")
        ],
 GnRH: [
     new ListType(0, "Cystorelin"),
     new ListType(1, "Factrel"),
     new ListType(2, "Fertagyl"),
     new ListType(3, "OvaCyst"),
     new ListType(4, "GONAbreed"),
      ],
 PG: [
     new ListType(0, "Estrumate"),
     new ListType(1, "EstroPLAN"),
     new ListType(2, "InSynch"),
     new ListType(3, "Lutalyse"),
     new ListType(4, "ProstaMate"),
     new ListType(5, "HiConc. Lut"),
     new ListType(6, "Synchsure"),
    ]
}