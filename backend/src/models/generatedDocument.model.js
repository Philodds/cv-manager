const mongoose = require('mongoose');

const generatedDocumentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['cv', 'lettre', 'email', 'resume'],
    required: true
  },
  contenu: { type: String, required: true },
  jobOffer: { type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer' },
  modeleIA: { type: String, default: 'claude-sonnet-4-20250514' },
}, { timestamps: true });

module.exports = mongoose.model('GeneratedDocument', generatedDocumentSchema);