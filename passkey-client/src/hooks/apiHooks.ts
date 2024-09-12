import fetchData from '@/lib/fetchData';
import { User } from '@sharedTypes/DBTypes';
import { LoginResponse, UserResponse } from '@sharedTypes/MessageTypes';
import {
  startAuthentication,
  startRegistration,
} from '@simplewebauthn/browser';
import {
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/types';
// Imports for WebAuthn functions

const useUser = () => {
  // Implementing network functions for auth server user endpoints
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token/',
      options,
    );
  };

  const getUsernameAvailable = async (username: string) => {
    return await fetchData<{ available: boolean }>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username,
    );
  };

  const getEmailAvailable = async (email: string) => {
    return await fetchData<{ available: boolean }>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email,
    );
  };

  return { getUserByToken, getUsernameAvailable, getEmailAvailable };
};

// Define usePasskey hook
const usePasskey = () => {
  // Define postUser function
  const postUser = async (
    user: Pick<User, 'username' | 'email' | 'password'>,
  ) => {
    // Set up request options
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    // Fetch setup response
    const registrationResponse = await fetchData<{
      email: string;
      options: PublicKeyCredentialCreationOptionsJSON;
    }>(import.meta.env.VITE_PASSKEY_API + '/auth/setup', options);

    console.log(registrationResponse);
    // Start registration process
    const attResp = await startRegistration(registrationResponse.options);

    // Prepare data for verification
    const data = {
      email: registrationResponse.email,
      registrationOptions: attResp,
    };
    // Fetch and return verification response
    return await fetchData<UserResponse>(
      import.meta.env.VITE_PASSKEY_API + '/auth/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
  };

  // Define postLogin function
  const postLogin = async (email: string) => {
    // Fetch login setup options
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };

    const authenticationResponse =
      await fetchData<PublicKeyCredentialRequestOptionsJSON>(
        import.meta.env.VITE_PASSKEY_API + '/auth/login-setup',
        options,
      );

    // Start authentication process
    const attResp = await startAuthentication(authenticationResponse);

    // Fetch and return login verification response
    const loginOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        authResponse: attResp,
      }),
    };
    const verificationResponse = await fetchData<LoginResponse>(
      import.meta.env.VITE_PASSKEY_API + '/auth/login-verify',
      loginOptions,
    );
    return verificationResponse;
  };

  // Return postUser and postLogin functions
  return { postUser, postLogin };
};

export { useUser, usePasskey };