
export declare const menuSuggestion: import("firebase-functions/https").CallableFunction<unknown, Promise<unknown>, unknown>;

// Type guard for request data
export function isValidRequestData(data: unknown): data is { theme: string } {
    return typeof data === 'object' 
        && data !== null 
        && 'theme' in data 
        && typeof data.theme === 'string';
}

// Type guard for response data
export function isValidResponseData(data: unknown): data is string {
    return typeof data === 'string';
}
