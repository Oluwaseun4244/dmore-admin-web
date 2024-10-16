export type GroupType = {
  id: string,
  name: string
}

export interface GetUsersByGroupsResponse {
  points: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
export interface MultipleUsersPointPayload {
  points: string;
  firstName: string;
  lastName: string;
  email: string;
  narration: string;
}
