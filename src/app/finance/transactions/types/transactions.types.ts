export type AllTransactionType = {
  id: string,
  transactionRef: string,
  type: string,
  points: number,
  charges: string,
  sourceUserId: string,
  sourceUserName: string,
  receiverId: string,
  receiverName: string,
  consumer: string,
  status: string | number;
  response: string;
  transactionDate: string
  createdAt: string
}


export type AllTransactionsResponse = {
  data: AllTransactionType[];
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}

export type AllTransactionQueryType = {
  pageNumber: number,
  pageSize: number,
  orderBy?: string[],
  initiatorEmail?: string,
  approverUserId?: string,
  providerReference?: string,
  status?: string
}


type PointRecipients = {
  phoneNumber?: string,
  email: string,
  points: string
}

export type SendPointsPayload = {
  recipients: PointRecipients[],
  userCategory?: string[],
  groupId?: string
  narration: string
}
