const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// TEST ROUTE
app.get('/', (req, res) => {
    res.send('Hospital API is running...');
});

// SAMPLE ROUTE
app.get('/patients', (req, res) => {
    res.json([
        { id: 1, name: "Ana Krasniqi" },
        { id: 2, name: "Blerim Gashi" }
    ]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
