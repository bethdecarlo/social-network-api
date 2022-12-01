const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // deletes user
  await User.deleteMany({});

  //deleted a thought
  await Thought.deleteMany({});

  // add a user
  await User.collection.insertMany(users);

  // add a thought
  await Thought.collection.insertMany(thoughts);

  console.info('Success! DB is seeded.');
  process.exit(0);
});
