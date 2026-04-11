const mongoose = require('mongoose');

const jobOfferSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  titrePoste: { type: String, required: true, trim: true },
  entreprise: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('JobOffer', jobOfferSchema);