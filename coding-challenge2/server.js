const express = require('express');

const app = express();
var fs = require('fs');



app.get('/api/items', (req, res) => {
   
    var data = fs.readFileSync('database.json');
    var itemData = JSON.parse(data);
    res.send(itemData);
});

function addObject(req, res) {
    
}
const port = 5000;

app.listen(port, () => console.log('Server started on port 5000'));