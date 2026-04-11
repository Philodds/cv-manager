const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  etablissement: { type: String, required: true, trim: true },
  diplome: { type: String, required: true, trim: true },
  specialite: { type: String, trim: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date },
  enCours: { type: Boolean, default: false },
  description: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Formation', formationSchema);