/*<!Name:Kelsey Bartlett>
<!Class:CS290>
<!Activity: Database Interactions>
<!Credit: Textbook examples>
<!Date:6/1/16>*/

var mysql = require('mysql');
var pool = mysql.createPool({
host : 'localhost',
user : 'student',
password: 'default',
database: 'student'
});

module.exports.pool = pool;

