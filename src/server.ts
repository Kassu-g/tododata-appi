import { User } from './models/User';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { Todo } from './models/Todo';

const api1 = express();
const PORT = 3000;
const osote = 'mongodb://127.0.0.1:27017/testdb';
api1.use(bodyParser.json());
api1.use(express.static('public'));
mongoose.connect(osote)
  .then(() => console.log('Toimiiko'))
  .catch(err => console.error('error:', err));

  api1.post('/add', async (req: Request, res: Response) => {
    const { name, todo } = req.body;
  
    try {
      let käyttis = await User.findOne({ name });
  
      if (käyttis) {
        käyttis.todos.push({ todo });
      } else {
        käyttis = new User({ name, todos: [{ todo }] });
      }
  
      await käyttis.save();
      res.send(`Todo added successfully for user ${name}.`);
    } catch (error) {
        res.status(500).send('Error saving todo');
    }
  });
  
  api1.get('/todos/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const käyttäjä = await User.findOne({ name: id });
  
      if (!käyttäjä) {
        return res.status(404).send('User not found');
      }
  
      res.json(käyttäjä.todos);
    } catch (error) {
      res.status(500).send('Error fetching todos');
    }
  });
  
api1.listen(PORT, () => {
    console.log(`Täällä toimii http://localhost:${PORT}`);
  });