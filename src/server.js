const express = require('express');
const bodyParser = require('body-parser');
const snowflake = require('snowflake-sdk');

const app = express();
app.use(bodyParser.json());

// Initialize connection
var connection = snowflake.createConnection({
  account: 'gq77945.ap-south-1',
  username: 'balapati',
  password: 'bhanuA1!',
  role: 'ACCOUNTADMIN',
  warehouse: 'COMPUTE_WH',
  database: 'EXERCISE_DB',
  schema: 'PUBLIC'
});

connection.connect((err, conn) => {
  if (err) {
    console.error('Unable to connect: ' + err);
  } else {
    console.log('Successfully connected');
  }
});

var statement = connection.execute({
  sqlText: 'SELECT * FROM CUSTOMERS LIMIT 5',
  complete: function(err, stmt, rows) {
    if (err) {
      console.error('Failed to execute statement due to the following error: ' + err.message);
    } else {
      console.log('Successfully executed statement: ' + stmt.getSqlText());
      console.log(rows);
    }
  }
});

console.log(statement);

app.post('/api/send-name', (req, res) => {
  const name = req.body.name;

  // Query to send name to Snowflake and receive it back
  const query = `SELECT '${name}' AS NAME`;

  connection.execute({
    sqlText: query,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Failed to execute statement due to the following error: ${err.message}`);
        res.status(500).send({ error: 'Failed to execute statement' });
      } else {
        console.log(`Successfully executed statement: ${stmt.getSqlText()}`);
        res.send({ name: rows[0].NAME });
      }
    }
  });
});

app.listen(3001, () => console.log('Server is running on port 3001'));




// Load the Snowflake Node.js driver.
// var snowflake = require('snowflake-sdk');

// Create a Connection object that we can use later to connect.
// var connection = snowflake.createConnection({
//   account: 'OMOPZUW.YO90028',
//   username: 'balapati',
//   password: 'bhanuA1!',
//   application: application
// });

// Try to connect to Snowflake, and check whether the connection was successful.
// connection.connect( 
//   function(err, conn) {
//       if (err) {
//           console.error('Unable to connect: ' + err);
//           } 
//       else {
//           console.log('Successfully connected to Snowflake.');
//           // Optional: store the connection ID.
//           connection_ID = conn.getId();
//           }
//   }
// );

// Create a Connection object and connect to Snowflake
// ..
