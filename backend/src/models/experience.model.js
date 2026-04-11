const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  poste: { type: String, required: true, trim: true },
  entreprise: { type: String, required: true, trim: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date },
  enCours: { type: Boolean, default: false },
  description: { type: String, trim: true },
  competences: [{ type: String, trim: true }],
  ordre: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);