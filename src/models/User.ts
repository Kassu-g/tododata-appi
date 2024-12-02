import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITodo {
  todo: string;
}

interface IUser extends Document {
  name: string;
  todos: ITodo[];
}


const skema = new Schema<ITodo>({
  todo: { type: String, required: true }
});

const käyttäjä = new Schema<IUser>({
  name: { type: String, required: true },
  todos: [skema]
});

const User: Model<IUser> = mongoose.model<IUser>('User', käyttäjä);

export { User, IUser, ITodo };
