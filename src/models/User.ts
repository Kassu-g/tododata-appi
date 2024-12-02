import mongoose, { Schema, Document, Model } from 'mongoose';

interface ITodo {
  todo: string;
}

interface IUser extends Document {
  name: string;
  todos: ITodo[];
}

const TodoSchema = new Schema<ITodo>({
  todo: { type: String, required: true }
});

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  todos: [TodoSchema]
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export { User, IUser, ITodo };
