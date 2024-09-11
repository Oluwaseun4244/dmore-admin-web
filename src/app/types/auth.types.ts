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
    id: string,
    firstName: string,
    lastName: string,
    country: string,
    state: string,
    city: string,
    address: string,
    email: string,
    isActive: boolean,
    emailConfirmed: boolean,
    role: string,
    userCategory: string,
    occupation: string,
    isStaff: boolean
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