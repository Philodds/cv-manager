const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nom: { type: String, required: true, trim: true },
  niveau: { 
    type: String, 
    enum: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'],
    default: 'Intermédiaire'
  },
  categorie: { type: String, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);