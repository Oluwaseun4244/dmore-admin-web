export type CreateInflowPayload = {
  points: number | string,
  narration: string,
  initiatorUserId: string | undefined,
  providerReference: string,
  financeWalletCode: string | undefined
}


export type InflowApprovalPayload = {
  financeWalletCode: string | undefined
}
export type InflowApprovalResponse = {
  message: string;
  data: {
    token: string,
    user: {}
  }
}

export type FinanceInflowType = {
  id: string;
  providerReference: string,
  points: string | number;
  narration: string;
  status: string | number;
  initiatorUserId: string;
  approverUserId?: string | undefined;
  retryCount: number;
  initiatorName: string;
  approverName: string;
  createdOn: string
}

export type FinanceGetInflowResponseType = {
  data: FinanceInflowType[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export type FinanceInflowQueryType = {

  pageNumber: number,
  pageSize: number,
  orderBy?: string[],
  initiatorEmail?: string,
  approverUserId?: string,
  providerReference?: string,
  status?: string

}
