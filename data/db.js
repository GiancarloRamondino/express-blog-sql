const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'your_password', // Sostituisci con la tua password
    database: 'db_blog'
});
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connesso al database MySQL');
});

module.exports = connection;

