const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

// Lista de nomes 
const names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Helen'];

function getRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

const mysql = require('mysql')

// Function to insert a random name into the database
function insertRandomName(callback) {
    const connectionInsert = mysql.createConnection(config);
    const sqlInsert = `INSERT INTO people(name) VALUES("${getRandomName()}")`;
    
    connectionInsert.query(sqlInsert, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Inserted random name into people table');
        }
        connectionInsert.end();
        callback(); // Call the callback function after inserting
    });
}

// Route to handle page refreshes and insert a random name
app.get('/', (req, res) => {
    insertRandomName(() => {
        const connectionQuery = mysql.createConnection(config); // New connection for query
        const sql = 'SELECT * FROM people'; // Query to select all records from 'people' table

        connectionQuery.query(sql, (err, result) => {
            if (err) {
                console.error('Error querying table:', err);
                res.status(500).send('Error querying table');
            } else {
                // Generate a string of HTML with the names from the people table
                let htmlResponse = '<h1>Full Cycle Rocks!</h1><h2>People in the Table:</h2><ul>';

                result.forEach(person => {
                    htmlResponse += `<li>${person.name}</li>`; // Add each name as a list item
                });

                htmlResponse += '</ul>';
                res.send(htmlResponse); // Send the HTML response back to the client
            }
            connectionQuery.end();
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
