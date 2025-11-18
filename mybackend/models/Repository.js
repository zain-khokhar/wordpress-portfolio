// models/Repository.js

const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Repository', repositorySchema);
