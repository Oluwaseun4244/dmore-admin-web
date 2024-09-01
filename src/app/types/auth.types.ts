export type LoginResponseType = {
    message: string;
    data: {
        token: string,
        user: {}
    }
}
export type LoginApiData = {
    email: string;
    password: string
}