export type WalletRule = {
  code: string;
  walletType: string;
  pointWorth: number;
  depositPercent: number;
  isDefault: boolean;
}

export type UserWallet = {
  code: string;
  walletType: string;
  availablePoints: number;
  ledgerPoints: number;
  checksum: string;
  userId: string;
  status: string;
  ruleId: string;
  description: string;
  currency: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  rule: WalletRule;
  fees: null | number | string
};


export type UserWallets = UserWallet[];
