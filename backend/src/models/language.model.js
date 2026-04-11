const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nom: { type: String, required: true, trim: true },
  niveau: {
    type: String,
    enum: ['Débutant', 'Intermédiaire', 'Avancé', 'Courant', 'Langue maternelle'],
    default: 'Intermédiaire'
  },
}, { timestamps: true });

module.exports = mongoose.model('Language', languageSchema);