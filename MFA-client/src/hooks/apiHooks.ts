import fetchData from '@/lib/fetchData';
import { Credentials } from '@/types/LocalTypes';
import { LoginResponse, UserResponse } from '@sharedTypes/MessageTypes';

const useUser = () => {
  // Implement network functions for auth server user endpoints
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

  // Implement network functions for auth server username and email endpoints
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

// Implement network functions for 2FA server user endpoints
const use2FA = () => {
  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    // fetch and return qrCodeUrl from 2FA server /auth/setup
    return await fetchData<{ qrCodeUrl: string }>(
      import.meta.env.VITE_2FA_API + '/auth/setup',
      options,
    );
  };

  const postVerify = async (creds: Credentials) => {
    return await fetchData<LoginResponse>(
      import.meta.env.VITE_2FA_API + '/auth/verify',
      {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return { postUser, postVerify };
};

export { useUser, use2FA };
