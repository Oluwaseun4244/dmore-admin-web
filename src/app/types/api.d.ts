interface ApiErrorResponse {
    message: string;
    response: {
        data: {
            data?: unknown;
            message: string;
            supportMessage: string
        };
        status?; number;
        statusText?: string
    }
}