import * as SQLite from 'expo-sqlite';

// QUERIES //

/*

firstName,
            lastName,
            phoneNumber,
            location,
            description,
            isTemporary,
            keepFor

*/

// TODO - REWORK QUERIES TO INCLUDE ALL PARAMS 

const CREATE_TABLE_CONTACT = `CREATE TABLE IF NOT EXISTS 
    table_contact(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        first_name VARCHAR(20), 
        last_name VARCHAR(30), 
        phone VARCHAR(20),
        location VARCHAR(20),
        description VARCHAR(150),
        temporary INTEGER,
        keep_for TEXT
    )`;

const DROP_TABLE_CONTACT = `DROP TABLE IF EXISTS table_contact`;

const ADD_TO_TABLE_CONTACT = `INSERT INTO 
    table_contact(
        first_name, 
        last_name, 
        phone,
        location,
        description,
        temporary,
        keep_for) VALUES (?,?,?,?,?,?,?)`;

const VIEW_ALL_TABLE_CONTACT = `SELECT * FROM table_contact`;

// HELPERS //

const errHandler = (err) => {
    console.log(err);
}

const transformKeys = (obj) => {
    let transformed = {};

    /* 
    
        Before you forget about this project for like 3 years, here is a quick explanation why this abomination exists:

            > Basically, I didn't like the snake_case of object props so I turned it into camelCase for ease of use
            > All objects retrieved from database will have snake_case style of writing for their properties
            > Knowing this, we split all props of object by the special character, take the first element and leave it
              lowercase, while turning all other elements to uppercase
            > We select the first element and then attach the rest, using the slice function which in the first part returns only
              the very first element, and in the second part returns all without the first element
            > Elements returned in second part are then transformed to have their first letter turn uppercase, and then this 
              letter is joined with the rest of the letters of the element
            > After that, a newly transformed key is used for a new object, which now contains the new key and the old value 
    
    */

    Object.keys(obj).forEach(o => {
        // Do your eyes hurt yet :D
        let newKey = o.split("_")[0] + o.split("_").slice(1).map(el => el.charAt(0).toUpperCase() + el.slice(1)).join("");
        Object.defineProperty(transformed, newKey, { value: obj[o] });
    });

    return transformed;

}

// PROCEDURES //

const viewAllContacts = (db, setter) => {
    db.transaction((tx) => {
        tx.executeSql(
            VIEW_ALL_TABLE_CONTACT,
            [],
            (tx, results) => {
                if (results.rows.length === 0) {
                    createTable(db);
                }
                
                let tmp = [];
                for (let i = 0; i < results.rows.length; i++) {
                    tmp.push(transformKeys(results.rows.item(i)));
                }
                setter(tmp);
            },
            (tx, err) => errHandler(err)
        )
    })
};

const addAContact = (db, data) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        location,
        description,
        isTemporary,
        keepFor
    } = data;

    db.transaction((tx) => {
        tx.executeSql(
            ADD_TO_TABLE_CONTACT,
            [
                firstName,
                lastName,
                phoneNumber,
                location,
                description,
                isTemporary,
                keepFor
            ],
            (tx, results) => {
                console.log("contact added");
            },
            (tx, err) => errHandler(err)
        );
    });
}

// TODO - ONLY FOR TESTING - DELETE LATER

const dropTableTestable = (db) => {
    db.transaction((tx) =>
        tx.executeSql(
            DROP_TABLE_CONTACT,
            [],
            (tx, results) => {
                console.log("dropped contact table");
            },
            (tx, err) => errHandler(err)
        ));
}

const createTable = (db) => {
    db.transaction((tx) => {
        tx.executeSql(
            CREATE_TABLE_CONTACT,
            [],
            (tx, results) => {
                console.log("GREAT SUCCESS");
            },
            (tx, err) => errHandler(err)
        );
    })
}

export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("contactdb.db"),
    createContactTable: (db) => createTable(db),
    viewContacts: (db, setter) => viewAllContacts(db, setter),
    addContact: (db, data) => addAContact(db, data),
    dropTableTestable: (db) => dropTableTestable(db)
}