import { User, UserWithNoPassword } from '@sharedTypes/DBTypes';

type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

type TwoFAUser = User & { code?: string };

type Credentials = Pick<TwoFAUser, 'email' | 'code'>;

export type { AuthContextType, Credentials };
