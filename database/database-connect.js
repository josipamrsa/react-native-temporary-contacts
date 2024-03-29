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

const CREATE_TABLE_CONTACT = `CREATE TABLE IF NOT EXISTS 
    table_contact(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        first_name VARCHAR(20), 
        last_name VARCHAR(30), 
        phone VARCHAR(20),
        location VARCHAR(20),
        description VARCHAR(150),
        temporary INTEGER,
        keep_for INTEGER,
        deletion_date TEXT
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
        keep_for,
        deletion_date) VALUES (?,?,?,?,?,?,?,?)`;

const VIEW_ALL_TABLE_CONTACT = `SELECT * FROM table_contact`;

const DELETE_CONTACT_FROM_TABLE = `DELETE FROM table_contact WHERE user_id=?`;

const UPDATE_CONTACT_IN_DATABASE = `UPDATE table_contact SET 
        first_name=?, 
        last_name=?, 
        phone=?, 
        location=?, 
        description=? WHERE user_id=?`;

// HELPERS //

const errHandler = (err) => {
    console.log(err);
}

const addDays = (date, days) => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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

const viewAllContacts = (db) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                VIEW_ALL_TABLE_CONTACT,
                [],
                (_, results) => {
                    if (results.rows.length === 0) {
                        createTable(db);
                    }

                    let tmp = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        console.log(results.rows.item(i));
                        tmp.push(transformKeys(results.rows.item(i)));
                    }
                    
                    resolve(tmp);
                },
                (_, err) => reject(err)
            )
        })
    });


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

    let deletionDate = addDays(new Date(), keepFor).toString();

    return new Promise((resolve, reject) => {
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
                    keepFor,
                    deletionDate
                ],
                (_, results) => resolve(results),
                (_, err) => reject(err)
            );
        });
    });
};

const deleteAContact = (db, uid) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                DELETE_CONTACT_FROM_TABLE,
                [uid],
                (_, results) => resolve(results),
                (_, err) => reject(err)
            );
        });
    });
}

const updateAContact = (db, data) => { 
    const {
        userId,
        firstName,
        lastName,
        phoneNumber,
        location,
        description
    } = data;

    //console.log(userId);

    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                UPDATE_CONTACT_IN_DATABASE,
                [firstName, lastName, phoneNumber, location, description, userId],
                (_, results) => {
                    /* let tmp = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        console.log(results.rows.item(i));
                        tmp.push(transformKeys(results.rows.item(i)));
                    }
                    console.log(tmp[0]); */
                    resolve(results);
                },
                (_, err) => reject(err)
            );
        });
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
    deleteContact: (db, uid) => deleteAContact(db, uid),
    updateContact: (db, data) => updateAContact(db, data),
    dropTableTestable: (db) => dropTableTestable(db)
}