// controllers/repositoryController.js

const Repository = require('../models/Repository');

const createRepository = async (req, res) => {
  try {
    const { title, description, githubLink, isPremium } = req.body;

    const newRepo = new Repository({ title, description, githubLink, isPremium });
    const savedRepo = await newRepo.save();

    res.status(201).json(savedRepo);
  } catch (err) {
    console.error('Error creating repository:', err);
    res.status(500).json({ error: 'error from repo controller' });
  }
};

// Read all repositories
const getAllRepositories = async (req, res) => {
  try {
    const repos = await Repository.find().sort({ createdAt: -1 });
    res.status(200).json(repos);
  } catch (err) {
    console.error('Error fetching repositories:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete one repository by ID
const deleteRepository = async (req, res) => {
  try {
    const { id } = req.params;
    await Repository.findByIdAndDelete(id);
    res.status(200).json({ message: 'Repository deleted' });
  } catch (err) {
    console.error('Error deleting repository:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createRepository, getAllRepositories, deleteRepository };
