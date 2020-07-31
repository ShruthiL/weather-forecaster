import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path'
import bodyParser from "body-parser";
import { MongoClient } from 'mongodb'
import getCities from "./get_cities";
import saveCity from "./save_city";

const port = process.env.PORT || '3000';

let _client: MongoClient
let _mongoCollection: any
MongoClient.connect(`${process.env.MONGODB_ADDON_URI}`, (err, client) => {
    _client = client
    const _db = client.db(process.env.MONGODB_ADDON_DB || 'bqts2t5c6ajhsig')
    _mongoCollection = _db.collection(process.env.MONGODB_COLLECTION_NAME || 'cities')
})

// Create a new express app instance
const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files, compiled angular
app.use(express.static(path.join(__dirname, '../public')));

// express routing
app.get('/getCities/:uid', (req, res) => {
    if (_client && _mongoCollection) {
        getCities({uid: req.params.uid, res}, {collection: _mongoCollection});
    } else {
        res.status(500).send('unable to get cities');
    }

})

app.post('/addCity', (req, res) => {
    if (_client && _mongoCollection) {
        const {uid, city} = req.body
        saveCity({uid, city, res}, {collection: _mongoCollection})
    } else {
        res.status(500).send('unable to add city');
    }
})

app.post('/deleteCity', (req, res) => {
    if (_client && _mongoCollection) {
        res.send('delete successful');
    } else {
        res.status(500).send('unable to delete city');
    }
})

// the loads index.html, it should be the last one in the middleware
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});
