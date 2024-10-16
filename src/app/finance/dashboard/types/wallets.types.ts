
export type FinanceWalletType = {
  id: string,
  code: string,
  availablePoints: number,
  ledgerPoints: number,
  checksum: string,
  alertMinimum: string | number,
  fromCentralWallet: boolean,
}


export type FinanceInflowType = {
  providerReference: string,
  retryCount: number;
  createdAt: string
  id: string;
  status: string | number;
  narration: string;
  initiatorUserId: string;
  points: string | number;
  approverUserId?: string | undefined
}


export type FinanceWalletResponseType = {
  data: FinanceWalletType[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export type FinanceWalletQueryType = {

  pageNumber: number,
  pageSize: number,
  orderBy?: string[],
  initiatorEmail?: string,
  approverUserId?: string,
  providerReference?: string,
  status?: string

}

