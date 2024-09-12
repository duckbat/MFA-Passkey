type TwoFA = {
  userId: number;
  email: string;
  twoFactorSecret: string;
  twoFactorEnabled: boolean;
};

export {TwoFA};
