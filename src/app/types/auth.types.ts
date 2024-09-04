interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    refferedBy: string;
    referralCode: string;
    id: string
}

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
export type ProfileResponse = {
    fullName: string;
    email: string
    credit: string
}

export type BuyerRegisterResponse = {
    user: User;
}
export type StaffRegisterResponse = {
    user: User;
}

export type BuyerRegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    referralCode: string;
}

export type StaffRegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    referralCode: string;
    company: string;
    occupation: string
}