const Formation = require('../models/formation.model');

exports.getAll = async (req, res) => {
  try {
    const formations = await Formation.find({ user: req.userId }).sort({ dateDebut: -1 });
    res.json(formations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const formation = await Formation.create({ ...req.body, user: req.userId });
    res.status(201).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const formation = await Formation.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!formation) return res.status(404).json({ message: 'Non trouvé' });
    res.json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const formation = await Formation.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!formation) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};