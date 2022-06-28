const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThought } = require('./data');

connection.once('open', async () => {

    await User.deleteMany({})
    await Thought.deleteMany({})
    
    const users = []
    const allThoughts = []

    for (let i = 0; i < 5; i++) {
        let username = getRandomName()
        let email = `${username.split(' ')[0]}@${username.split(' ')[1]}.com`
        const thoughts = []
        for (let i = 0; i < 2; i++) {
            let thought = {
                thoughtText: getRandomThought(),
                username: username
            }
            thoughts.push(thought)
            allThoughts.push(thought)
        }

        users.push({
            username,
            email,
        })
    }
    console.log(users)
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(allThoughts)

    
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
})