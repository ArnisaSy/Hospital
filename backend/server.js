const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_db'
});

db.connect(err => {
    if (err) {
        console.log('DB ERROR:', err);
    } else {
        console.log('Connected to DB');
    }
});

// ROUTES

app.get('/', (req, res) => {
    res.send('Hospital API is running...');
});

app.get('/patients', (req, res) => {
    db.query('SELECT * FROM Patient', (err, results) => {
        if (err) return res.send(err);
        res.json(results);
    });
});

app.get('/top-doctors', (req, res) => {
    db.query(`
        SELECT d.Name, COUNT(*) AS TotalVisits
        FROM Doctor d
        JOIN Appointment a ON d.DoctorID = a.DoctorID
        GROUP BY d.Name
        ORDER BY TotalVisits DESC
        LIMIT 3
    `, (err, results) => {
        if (err) return res.send(err);
        res.json(results);
    });
});

app.get('/stats', (req, res) => {
    const stats = {};

    db.query('SELECT COUNT(*) AS totalPatients FROM Patient', (err, result) => {
        stats.patients = result[0].totalPatients;

        db.query('SELECT COUNT(*) AS totalDoctors FROM Doctor', (err, result) => {
            stats.doctors = result[0].totalDoctors;

            db.query('SELECT COUNT(*) AS totalAppointments FROM Appointment', (err, result) => {
                stats.appointments = result[0].totalAppointments;

                res.json(stats);
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
