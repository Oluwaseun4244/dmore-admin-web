export type CreateInflowPayload = {
  points: number | string,
  narration: string,
  initiatorUserId: string | undefined,
  providerReference: string
}

export type CreateInflowResponse = {
  id: string,
  points: number,
  narration: string,
  providerReference: string,
  status: string | number,
  initiatorUserId: string,
  approverUserId: string,
  retryCount: number;
  createdAt: string
}

export type InflowApprovalPayload = {

}
export type InflowApprovalResponse = {
  message: string;
  data: {
    token: string,
    user: {}
  }
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

export type FinanceGetInflowResponseType = {
  data: CreateInflowResponse[];
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
