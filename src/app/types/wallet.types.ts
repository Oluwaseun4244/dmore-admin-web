export type UserWallet = {
  id: string;
  balance: number;
  title: string;
  description: string;
  currency: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserWallets = UserWallet[];
