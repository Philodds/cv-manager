const Experience = require('../models/experience.model');

exports.getAll = async (req, res) => {
  try {
    const experiences = await Experience.find({ user: req.userId }).sort({ ordre: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const experience = await Experience.create({ ...req.body, user: req.userId });
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const experience = await Experience.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!experience) return res.status(404).json({ message: 'Non trouvé' });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const experience = await Experience.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!experience) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};