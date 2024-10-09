export type CreateInflowPayload = {
  points: number | string,
  narration: string,
  initiatorUserId: string | undefined
}

export type CreateInflowResponse = {
  message: string;
  data: {
    token: string,
    user: {}
  }
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
  id: string;
  status: string;
  narration: string;
  initiatorUserId: string;
  points: string | number;
  approverUserId?: string | undefined
}

export type FinanceGetInflowResponseType = {
  data: [];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalPages: number;
  totalCount: number
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
