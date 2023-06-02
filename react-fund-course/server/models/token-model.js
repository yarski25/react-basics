import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

//module.exports = model('Token', TokenSchema);
export default model('Token', tokenSchema);
