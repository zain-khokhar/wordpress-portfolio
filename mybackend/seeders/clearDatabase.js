require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Repository = require('../models/Repository');
const Product = require('../models/Product');
const Comment = require('../models/Comment');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`)
};

const clearDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    log.info('Connected to database');

    console.log('\n' + '='.repeat(50));
    log.warning('Starting database cleanup...');
    console.log('='.repeat(50) + '\n');

    // Get counts before deletion
    const userCount = await User.countDocuments();
    const repoCount = await Repository.countDocuments();
    const productCount = await Product.countDocuments();
    const commentCount = await Comment.countDocuments();

    // Delete all data
    log.info('Removing users...');
    await User.deleteMany({});
    log.success(`${userCount} users removed`);

    log.info('Removing repositories...');
    await Repository.deleteMany({});
    log.success(`${repoCount} repositories removed`);

    log.info('Removing products...');
    await Product.deleteMany({});
    log.success(`${productCount} products removed`);

    log.info('Removing comments...');
    await Comment.deleteMany({});
    log.success(`${commentCount} comments removed`);

    // Summary
    console.log('\n' + '='.repeat(50));
    log.success('Database cleared successfully!');
    console.log('='.repeat(50));
    console.log(`${colors.blue}Removed:${colors.reset}`);
    console.log(`  Users:        ${userCount}`);
    console.log(`  Repositories: ${repoCount}`);
    console.log(`  Products:     ${productCount}`);
    console.log(`  Comments:     ${commentCount}`);
    console.log(`  ${colors.green}Total:        ${userCount + repoCount + productCount + commentCount}${colors.reset}`);
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    log.error(`Database cleanup failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    log.info('Database connection closed');
    process.exit(0);
  }
};

// Run the cleanup
clearDatabase();
