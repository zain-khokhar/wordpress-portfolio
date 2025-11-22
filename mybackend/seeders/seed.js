require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Repository = require('../models/Repository');
const Product = require('../models/Product');
const Comment = require('../models/Comment');
const seedData = require('./seedData');

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

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    log.info('Connected to database');

    // Clear existing data
    log.info('Clearing existing data...');
    await User.deleteMany({});
    await Repository.deleteMany({});
    await Product.deleteMany({});
    await Comment.deleteMany({});
    log.success('Existing data cleared');

    // Seed Users
    log.info('Seeding users...');
    const usersWithHashedPasswords = await Promise.all(
      seedData.users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10)
      }))
    );
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    log.success(`${createdUsers.length} users created`);

    // Seed Repositories
    log.info('Seeding repositories...');
    const createdRepositories = await Repository.insertMany(seedData.repositories);
    log.success(`${createdRepositories.length} repositories created`);

    // Seed Products
    log.info('Seeding products...');
    const createdProducts = await Product.insertMany(seedData.products);
    log.success(`${createdProducts.length} products created`);

    // Seed Comments
    log.info('Seeding comments...');
    const createdComments = await Comment.insertMany(seedData.comments);
    log.success(`${createdComments.length} comments created`);

    // Summary
    console.log('\n' + '='.repeat(50));
    log.success('Database seeding completed successfully!');
    console.log('='.repeat(50));
    console.log(`${colors.blue}Summary:${colors.reset}`);
    console.log(`  Users:        ${createdUsers.length}`);
    console.log(`  Repositories: ${createdRepositories.length}`);
    console.log(`  Products:     ${createdProducts.length}`);
    console.log(`  Comments:     ${createdComments.length}`);
    console.log('='.repeat(50) + '\n');

    // Display sample credentials
    console.log(`${colors.yellow}Sample Login Credentials:${colors.reset}`);
    console.log(`  Admin: ${colors.cyan}admin@techsolutions.com${colors.reset} / Admin@2024`);
    console.log(`  User:  ${colors.cyan}john.mitchell@devworks.io${colors.reset} / SecurePass123!`);
    console.log('\n');

  } catch (error) {
    log.error(`Seeding failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    log.info('Database connection closed');
    process.exit(0);
  }
};

// Run the seeder
seedDatabase();
