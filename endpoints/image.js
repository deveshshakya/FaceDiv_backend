const CLARIFAI = require('clarifai');

const clarifaiAPI = new CLARIFAI.App({
    apiKey: 'c9bfb989eeb341568a8b7e7c8e90a51d'
});

const handleAPICall = (req, res) => {
    clarifaiAPI.models
        .predict(CLARIFAI.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('API doesn\'t respond.'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('User not found.'))
}

module.exports = {
    handleImage,
    handleAPICall
}
