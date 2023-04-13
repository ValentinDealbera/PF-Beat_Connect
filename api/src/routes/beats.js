const {Router} = require('express')
const { uploadBeat, getBeat } = require('../controllers/beatsController')
const router = Router()
const beats = require('../models/nosql/beats');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
// Ruta para subir un archivo de audio
const fs = require('fs');

router.get('/:trackID', getBeat)
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }
}).single('audio');

router.post('/', upload, async (req, res) => {
  if (!req.body.name || !req.files.audio) {
    console.log(req)
    return res.status(400).json({ message: 'Name and file required' });
  }

  const newTrack = new Track({
    name: req.body.name,
    audio: req.file.buffer
  });

  try {
    const savedTrack = await newTrack.save();
    res.json({ message: 'Track uploaded successfully', id: savedTrack._id });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading track' });
  }
});

module.exports= router