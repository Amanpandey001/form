import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    let data = [];
    
    try {
        const fileData = fs.readFileSync('data.json', 'utf-8');
        // Parse the data and ensure it's an array
        data = JSON.parse(fileData);
        if (!Array.isArray(data)) {
            data = [];
        }
    } catch (err) {
        console.error('Error reading data.json:', err);
        // If the file doesn't exist or can't be read, start with an empty array
        data = [];
    }

    // Append the new data to the existing data array
    data.push(req.body);

    // Write the updated data back to data.json
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
        console.log('Data saved:', req.body);
        res.send('Data saved to server!');
    } catch (err) {
        console.error('Error writing to data.json:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
