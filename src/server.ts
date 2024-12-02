import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { User } from './models/User';

const api1 = express();
const PORT = 3000;
const osote = 'mongodb://127.0.0.1:27017/testdb';

api1.use(bodyParser.json());
api1.use(express.static('public'));

mongoose.connect(osote)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

  api1.post('/add', async (req, res) => {
  const { name, todo } = req.body;

  try {
    let user = await User.findOne({ name });

    if (user) {
      user.todos.push({ todo });
    } else {
      user = new User({ name, todos: [{ todo }] });
    }

    await user.save();
    res.send(`Todo added successfully for user ${name}.`);
  } catch (error) {
    res.status(500).send('Error saving todo');
  }
});

api1.listen(PORT, () => {
  console.log(`Täällä toimii http://localhost:${PORT}`);
});
