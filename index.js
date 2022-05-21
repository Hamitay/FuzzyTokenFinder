// const { Client } = require("pg");

// const password = "mysecretpassword";
// const user = "postgres";
// const client = new Client({ user, password });

// const CREATE_TABLE = `CREATE TABLE Tokens (
//     id int,
//     name varchar(255),
//     url varchar(255)
// );`

// const INSERT = "INSERT INTO Tokens VALUES ('1', 'maria', 'b')"
// const INSERT_2 = "INSERT INTO Tokens VALUES ('2', 'mariano', 'b')"
// const INSERT_3 = "INSERT INTO Tokens VALUES ('3', 'ricardo', 'b')"

// const SELECT = "SELECT * FROM Tokens"

// const CREATE_EXTENSION = "CREATE EXTENSION pg_trgm;"

// const SIM = `SELECT
// name, SIMILARITY(name,'marianoooo')
// FROM Tokens;`

// client.connect().then(() => {
//   console.log("ok");

//   client.query(SIM, (err, res) => {
//       console.log(res.rows)
//       client.end()
//   })
// });
