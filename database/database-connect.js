import * as SQLite from 'expo-sqlite';

// QUERIES //

// TODO - REWORK QUERIES TO INCLUDE ALL PARAMS 

const CREATE_TABLE_CONTACT = `CREATE TABLE IF NOT EXISTS 
    table_contact(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        first_name VARCHAR(20), 
        last_name VARCHAR(20), 
        phone VARCHAR(20)
    )`;

const DROP_TABLE_CONTACT = `DROP TABLE IF EXISTS table_contact`;

const ADD_TO_TABLE_CONTACT = `INSERT INTO 
    table_contact(
        first_name, 
        last_name, 
        phone) VALUES (?,?,?)`;

const VIEW_ALL_TABLE_CONTACT = `SELECT * FROM table_contact`;

// HELPERS //

const errHandler = (err) => {
    console.log(err);
}
 
// PROCEDURES //

const viewAllContacts = (db) => {
    db.transaction((tx) => {
        tx.executeSql(
            VIEW_ALL_TABLE_CONTACT,
            [],
            (tx, results) => {
                console.log(results);
            },
            (tx, err) => errHandler(err)
        )
    })
};

const addAContact = (db, data) => {
    const { firstName, lastName, phoneNumber } = data;
    db.transaction((tx) => {
        tx.executeSql(
            ADD_TO_TABLE_CONTACT,
            [firstName, lastName, phoneNumber],
            (tx, results) => {
                console.log(results);
            },
            (tx, err) => errHandler(err)
        )
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
    viewContacts: (db) => viewAllContacts(db),
    addContact: (db, data) => addAContact(db, data),
    dropTableTestable: (db) => dropTableTestable(db)
}