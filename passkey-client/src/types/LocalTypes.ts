import { UserWithNoPassword } from '@sharedTypes/DBTypes';

type AuthContextType = {
  user: UserWithNoPassword | null;
  registerResult: UserWithNoPassword | null;
  handleLogin: (email: string) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
  handleRegister: (user: UserWithNoPassword) => void;
};

// type TwoFAUser = User & { code?: string };

// type Credentials = Pick<TwoFAUser, 'email' | 'code'>;

export type { AuthContextType };
