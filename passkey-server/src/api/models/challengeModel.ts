import {model, Schema} from 'mongoose';
import {Challenge} from '../../types/PasskeyTypes';

const challengeSchema = new Schema<Challenge>({
  challenge: {type: String, required: true},
  email: {type: String, required: true, unique: true},
});

export default model<Challenge>('Challenge', challengeSchema);
