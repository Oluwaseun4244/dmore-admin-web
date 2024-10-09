interface ApiErrorResponse {
    message: string;
    response: {
        data: {
            data?: unknown;
            message: string
        };
        status?; number;
        statusText?: string
    }
}