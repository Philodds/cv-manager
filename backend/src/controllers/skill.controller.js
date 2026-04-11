const Skill = require('../models/skill.model');

exports.getAll = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.userId });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const skill = await Skill.create({ ...req.body, user: req.userId });
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Non trouvé' });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!skill) return res.status(404).json({ message: 'Non trouvé' });
    res.json({ message: 'Supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};