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
    phoneNumber: string,
    isStaff: boolean
}

export type BuyerRegisterResponse = {
    user: User;
}
export type StaffRegisterResponse = {
    user: User;
}

export type BuyerRegisterData = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    country?: string,
    state?: string,
    city?: string,
    address?: string,
    password: string,
    confirmPassword: string,
    role?: string,
    userCategory?: string,
    occupation: string,
    company: string,
    referralCode: string,
    isStaff: boolean
}

export type ConfirmEmailData = {
    userId: string;
    code: string
}


export type StaffRegisterData = {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    country?: string,
    state?: string,
    city?: string,
    address?: string,
    password: string,
    confirmPassword: string,
    role?: string,
    userCategory?: string,
    occupation: string,
    company: string,
    referralCode: string,
    isStaff: boolean
}

export type ForgotPasswordData = {
    email: string;
}

export type ResetPasswordData = {
    email: string;
    password: string;
    token: string;
}

export type SessionUserType = {
    email: string;
    id: string;
    name: string

}
// export type SessionType = {
//     accessToken: string;
//     expiredAt: string;
//     expires: string;
//     refreshToken: string;   
//     user: SessionUserType
// }
