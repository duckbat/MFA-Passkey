import {model, Schema} from 'mongoose';
import {AuthDevice} from '../../types/PasskeyTypes';

const AuthenticatorDeviceSchema = new Schema<AuthDevice>({
  email: {type: String, required: true, unique: true},
  credentialID: {type: String, required: true},
  credentialPublicKey: {type: Buffer, required: true},
  counter: {type: Number, required: true},
  transports: {type: [String], required: true},
});

export default model<AuthDevice>(
  'AuthenticatorDevice',
  AuthenticatorDeviceSchema,
);
