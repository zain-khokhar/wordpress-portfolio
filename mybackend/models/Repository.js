// models/Repository.js

const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  downloadLink: { type: String, required: false },
  license: { type: String, required: false },
  version: { type: String, required: false },
  readme: { type: String, required: false },
  isPremium: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Repository', repositorySchema);
