const mongoose = require("mongoose");
const multer = require("multer");
const { Readable } = require("stream");
const { GridFSBucket, ObjectId } = require('mongodb');

const Track = mongoose.model("Track", new mongoose.Schema({
  audio: {
    data: Buffer,
    contentType: String,
  },
}));

const getBeat = async (req, res) => {
  const trackID = req.params.trackID;
  console.log(req.params)
  try {
    const track = await Track.findById(trackID);

    if (!track) {
      return res.sendStatus(404);
    }

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db);
    const downloadStream = bucket.openDownloadStream(track.audio._id);

    res.set('Content-Type', 'audio/mp3');
    res.set('Content-Disposition', `attachment; filename="${track.audio.originalname}"`);

    downloadStream.pipe(res);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fields: 1,
    fileSize: 10000000,
    files: 1,
    parts: 1,
  },
})
upload.single("Track") 

const uploadBeat = async (req, res) => {
  const readableTrackStream = new Readable();
  readableTrackStream.push(req.files.audio.data);
  readableTrackStream.push(null);

  console.log(req.files.audio.data)
  const newTrack = new Track();
  newTrack.audio.data = req.files.audio.data;
  newTrack.audio.contentType = "audio/mpeg";

  try {
    const savedTrack = await newTrack.save();
    res.json({ message: "Track saved successfully", id: savedTrack._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving track" });
  }
}

module.exports = {
  getBeat,
  uploadBeat,
};




































// const fs =require("fs")
// // const {BeatsModel} = require("../schemas") 
// const BeatsModel = require('../models/nosql/beats')
// const { Readable } = require('stream')
// const mongoose = require("mongoose");
// const { GridFSBucket, ObjectId } = require("mongodb")




// const getBeat = async (req, res) => {
//   let trackID;
//   try {
//     trackID = new mongoose.Types.ObjectId(req.params.trackID);
//   } catch (error) {
//     console.log(error)
//     return res.status(400).json({ message: "Invalid track in URL parameter." });
//   }

//   res.set("content-type", "audio/mp3");
//   res.set("accept-ranges", "bytes");

//   try {
//     const track = await BeatsModel.findById(trackID).lean();
//     console.log(track)
//     if (!track) {
//       return res.sendStatus(404);
//     }

//     const audioBuffer = track.audio.data;
//     const CHUNK_SIZE = 10 ** 6; // tamaño de cada chunk en bytes
//     let offset = 0;
//     let bytesRead = 0;

//     while (offset < audioBuffer.length) {
//       const remaining = audioBuffer.length - offset;
//       const chunkSize = remaining < CHUNK_SIZE ? remaining : CHUNK_SIZE;
//       const chunk = audioBuffer.slice(offset, offset + chunkSize);
//       offset += chunkSize;
//       bytesRead += chunkSize;
//       res.write(chunk);
//     }

//     res.end();
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };


// const uploadBeat = async (req, res) => {
//   try {
//     const readableTrackStream = new Readable({
//       read() {
//         // Agregar los datos de audio al stream
//         this.push(req.files.audio.data);
//         // Indicar que no hay más datos que agregar al stream
//         this.push(null);
//       }
//     });
//     console.log(req.files.audio)
//     let audioBuffer = Buffer.from([]);
// readableTrackStream.on('data', chunk => {
//   audioBuffer = Buffer.concat([audioBuffer, chunk]);
// });
// readableTrackStream.on('end', async () => {
//   const beat = new BeatsModel({
//     name: req.body.name,
//     audio: {
//       data: audioBuffer,
//       contentType: contentType
//     }
//     // otros campos del modelo...
//   });
//   await beat.save();
// });
//     console.log(audioBuffer)
//     const contentType = req.files.audio.mimetype;
//     console.log(contentType)
//     const {body} =req
//     console.log(body);
//     const beat = new BeatsModel({
//       name: req.body.name,
//       audio: {
//         data: audioBuffer,
//         contentType: contentType
//       }
//       // otros campos del modelo...
//     });

//     await beat.save();

//     return res.status(201).json({ message: "Archivo de audio subido exitosamente" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error al subir archivo de audio" });
//   }
// };

// module.exports = {
//   uploadBeat, getBeat
// }