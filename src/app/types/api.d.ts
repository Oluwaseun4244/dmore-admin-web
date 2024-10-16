interface ApiErrorResponse {
    message: string;
    response: {
        data: {
            data?: unknown;
            message: string;
            messages: string[];
            exception: string;
            supportMessage: string
        };
        status?; number;
        statusText?: string
    }
}