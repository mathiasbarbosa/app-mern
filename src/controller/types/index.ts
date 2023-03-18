/**
 * Basic JSON response for controllers
 */
export type BasicResponse = {
    message: string
}

/**
 * Error JSON response for controllers
 */
export type ErrorResponse = {
    error: string,
    message: string
}

/**
 * Auth JSON response for controllers
 */
export type AuthResponse = {
    message: string,
    token: string
}
