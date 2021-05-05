The database file could be considered the nuts and bolts of the backend of this application. The database file handles all user interactions with the stored protocols.

Overview Structure of Database file:

DATABASE_LIST_TYPE - an enum like object for each database list (tasks, protocols, etc). Most methods are applicable for multiple
data types; for instance, "GetObjectById" looks up an object in the database by its id. Trouble is, is that each object has an id
which is unique only to that list, and so therefore to find the object, the method needs to know both the id of the object and which
list to look in. Within the database file, this enum can be accessed directly by its name -- outside of the file, this enum is stored as a static const object within the Database class, and can be accessed via a call Database.DATABASE_LIST_TYPE.

VAR_NAME - an enum of which user variables are exposed. Currently, only PG and GnRH are exposed. If the user names a task which is related to PG or GnRH, adding the '$' sign next to the name allows the database to render the task with $PG replaced by the name of the selected product and the dosage amount. For instance, suppose "Synchsure" is the currently selected PG, then a task which is named:
"Inject $PG into females" would render as "Inject 2cc of Synchsure (PG) into females" -- likewise if "InSynch" were selected, then the same task would render as, "Inject 5cc of InSynch into females." If no selection was made, the task would render as "Inject PG into females" -- that is to say, the rendering removes the $ sign from the displayed name. 

Database class - Represents a type of proxy for a database object and exposes a public database class and public functions. Each method does only 1 task, which is to check to make sure that all parameters are of the correct type before sending the parameters off to the main method handler associated with the method. 

Database Model - No data structures are exposed in the database class for security/maintainability reasons and cannot be changed outside of this file. Instead, the actual data is stored in a separate DatabaseModel class which is stored in a global dictionary called "databaseModels." Each new database object recieves an id it stores locally; when a method is called from the Database object, the method looks up the DatabaseModel associated with the Database object's id. Currently, only one database object is allowed to exist at a time, since it does not seem as though there is a use case for multiple database objects; however, if a use case is needed, a modifictation to increment the next id and a garbage collecting function will need to be written. The structure contains a list of tasks, protocols, system types, semen type, breeds, cattle type, gondotroping hormone, and prostaglandin.

Model Classes - The model classes are the class objects which are aggregated into the Database Model. Each class which is directly stored in a database list inherits from the ListType superclass, and so therefore each item contains an id and a name -- both attributes are unique. All classes contain a copy function, which returns a new object with equivalent features. The Protocol class aggregates tasks, containing a list of protocol tasks associated with the protocol and their respective starting time -- a protocol can contain multiple tasks which have the same id. If the protocol is setup correctly, each duplicate task will have a different starting time; however, in the interim-period of creating a protocol, they may share all the same attributes. A Protocol also has a list of recommondations, that is to say, all the input values/combinations that the protocol should be recommoneded on; the recommended id's correspond to the id's in the other database classes, including system type, semen, breed and cattle. Recommendations were also created with capability to recommend on products (gnrh and pg), however this functionality is unneeded and exists only for potential future development needs. The hormone classes, gnrh and pg, store an additional feature of default dosage. These classes are mainly for changing the names of tasks when they are displayed. 

Private Functions - All the handlers for the database methods; assumption is that all parameters have been type checked.

    Important functions: 
        getObjectById - the function is used a ton, as it allows the user to get the item in the database from its id.
        Before getting too excited by what this function can do, for security and weird behavior reasons the object that is returned
        is a copy of what is in the database. Modifying the object that is quiered will not change anything to the database, it is a 
        separate object. Because this object queries a copy, it cannot be used to find an object in the database which needs to be modified: it can be used to find an object in the database in order to get information (for example matching a protocol task with a task).

        getDatabaseListElements - this function returns an entire list of elements in the database, all copies and modifying them will not change anything to the base data.

        getRecommendedProtocols - this function acts just like getDatabaseListElements except that filters may be included to query a list of only those protocols which are recommended. For instance, adding a filter of system type = 1, will return all protocols which include system type id of 1 in their list of recommondations. Each filter is allowed to be null, and is ignored in that case.

        getJSONData - this static function reads in database data which is stored in a json format via promises. Once that data is queried, it ought to be passed to a new Database object. Code which calls this function will need to handle synchronization of promises.

        deleteObject - this function handles deletion of an object from the database. Since multiple classes contain properties and ids
        which are stored in multiple places, and many dependies, a significant portion of the database will get traversed. Currently the only non-dependies are deletions of protocols. System Type, Semen, Breed, and Cattle all may have dependies to recommondations in protocols, and these need to be deleted as well. Tasks also may have dependies in protocols tasks in respective protcols and also ought to be deleted. PG and GnRH also may have dependancies in terms of the currently selected PG or GnRH and ought to be deleted as well.

        getUserTaskById - this function is a special case of getObjectById specifically for rendering tasks. This function changes the name of the copied task by replacing user variables ($PG and $GnRH) with their true values (such as 2cc of Synchrose (PG)) within the string. If you are wanting to display what is stored in the database, use getObjectById, if you are wanting to display what is stored in the database "nicely" to the user, call getUserTaskById.

        selectHormoneId - this function selects the PG and GnRH, which affects all tasks queired by getUserTaskById

Helper Functions - Methods to assist in the logic of the private functions, including sorting, and binary searches.

    Important Functions:
        findDatabaseList - used in almost every function, assists by looking up the correct list given a DATABASE_LIST_TYPE

        findIndexByIdInList - does a binary search for the index value in the database list for the item which contains that id

        checkParameterTypes - checks a list of parameters against a list of expected types for those parameters

        addElementToDatabase - a push function which forces uniqueness on the id and name of the object

        isContainedInList - checks whether a given item is contained within a list

        formatHormoneString - replaces a string which contains user variables ($PG or $GnRH) with their values

        alphabetizeByName - alphabetizes a list by their names using a DNF-like algorithm

Example Code Q&A:

    I need to display the list of system types?
    
    Psuedo-Code
    {
        let database = new Database( json );

        // this is a copy of all system type objects
        let systemTypes = database.getDatabaseListElements( Database.DATABASE_LIST_TYPE.SYSTEM_TYPE );

        // This maps list to react elements
        const elements = systemTypes.map( (systemType) => <ListItem value=systemType.id> systemType.name </ListItem> );

        ...

        // in react jsx
        <List>
            { elements }
        </List>
    }

    I need to display the tasks of a protocol?

    Psuedo-Code
    {
        // get the protocol by the id
        let protocol = database.getObjectById( myProtocolId, Database.DATABASE_LIST_TYPE.PROTOCOLS )
        let tasks = [];

        // match each protocol task id by to the task object in the database 
        for( let i = 0; i < protocol.tasks.length; i++ )
        {
            let task = database.getUserTaskById( protocol.tasks[i].id );
            tasks.push( <ListItem value = task.id> task.name </ListItem> );
        }

        ...

        in react jsx
        <List>
            { tasks }
        </List>
    }

    I need to find an item in the database to modify it?

    You can only modify items in the database file, use existing methods (add*, update*, delete*) to modify outside of the file. If you need to modify something in a method within the database file, follow this example.

    Pseudo-Code( {DATABASE_LIST_TYPE} databaseListType, {number} elementId, {DatabaseModel} database )
    {
        // find the correct list
        let list = findDatabaseList( databaseListType, database );

        // get the object (not a copy)
        let item = findObjectByIdInList( elementId, list, 0, list.length );

        // modify item

        // OR if you need to modify the location, and need to know where it is stored in the list

        let itemIndex = findIndexByIdInList( elementId, list, 0, list.length );

        // modify item @ itemIndex in list
    }




