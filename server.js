const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./endpoints/register');
const signIn = require('./endpoints/signIn');
const profile = require('./endpoints/profile');
const image = require('./endpoints/image');

const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'dshakya29',
        password: 'google',
        database: 'facediv'
    }
});

const API = express();

API.use(cors());
API.use(bodyParser.json());

API.get('/', (req, res) => {
    res.send('Not Allowed.');
})

API.post('/signin', (req, res) => {
    signIn.handleSignIn(req, res, database, bcrypt)
})

API.post('/register', (req, res) => {
    register.handleRegister(req, res, database, bcrypt)
})

API.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, database)
})

API.put('/image', (req, res) => {
    image.handleImage(req, res, database)
})

API.post('/imageurl', (req, res) => {
    image.handleAPICall(req, res)
})

API.listen(3000, res => {
    console.log('200');
});