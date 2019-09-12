const PORT = Number(process.env.PORT) || 8080;
import * as express from "express";

const fs = require('fs');
const uuidv1 = require('uuid/v1'); 

const app = express();
app.set('view engine', 'pug');
app.use(express.json()) 

app.get("/", (req, res) => {
  res.status(200);
  res.render('index');
});

app.get("/load", (req, res) => {
	let rawdata = fs.readFileSync('objects.json');
	let jsonObjects = JSON.parse(rawdata);
  res.status(200);
  res.send({
    'objects' : jsonObjects,
  });
});

app.get("/add", (req, res) => {
	// create new object 
	var new_obj = {"id": uuidv1()};
  console.log("Adding new object: " + JSON.stringify(new_obj));

  // read database, add new object and write back synchronously
	let rawData = fs.readFileSync('objects.json');
	let jsonObjects = JSON.parse(rawData);
	if (typeof jsonObjects['objects'] !== 'undefined') {
   	jsonObjects['objects'].push(new_obj);
 	}else{
 		console.log("ERROR: database file object.json may be corrupted");
 		res.sendStatus(500);
	}
  let jsonData = JSON.stringify(jsonObjects)
  fs.writeFileSync("objects.json", jsonData, function(err) {
    if (err) {
    		console.log("ERROR: unable to write database file");
        console.log(err);
 				res.sendStatus(500);
    }
	});
	// send new object to the client
  res.status(200);
  res.send({
    'objects' : new_obj,
  });
});

app.delete("/", (req, res) => {
	console.log("Deleting all objects");
	// delete and initialize empty db with valid json object
	fs.writeFileSync("objects.json", "{\"objects\":[]}", function(err) {
    if (err) {
        console.log(err);
    }
	});
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
