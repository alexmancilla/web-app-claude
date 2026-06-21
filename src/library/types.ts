export enum AUTH_RESULT {
    INTERNAL_ERROR = 'Internal Error - please try again later',
    NO_USER = 'No user found with that email',
    PASSWORD_MISMATCH = 'Email or password incorrect',
    UNVERIFIED_USER = 'Pending verification, check your email or request new verification link',
    EXISTING_ACCOUNT = 'User already exists with that email',
    CREATED_ACCOUNT = 'Account created, check email for activation link',
    UNVERIFIED_USER_UNABLE_TO_EMAIL = 'Trouble sending verification email, please request new verification link or try again later',
    RESET_PASS_SUCCESS = 'Reset password email sent successfully',
    BAD_REQUEST = 'Invalid entry',
}

export enum VERIFICATION_RESULT {
    VERIFY_SUCCESSFUL = 'Account successfully verified',
    ALREADY_VERIFIED = 'Account already verified',
    INVALID_TOKEN = 'Verification link is invalid - please request new a one',
    INTERNAL_ERROR = 'Internal Error - please try again later',
    ALREADY_LOGGED_IN = 'Already logged in',
    MISSING_TOKEN = 'Verification token not found',
    BAD_REQUEST = 'Invalid entry',
    NO_USER = 'No user found with that email',
}

export enum RESET_PASSWORD_RESULT {
    RESET_SUCCESSFUL = 'Password reset succesfully',
    MISSING_DETAILS = 'Password or reset token not found',
    INVALID_TOKEN = 'Reset password link is invalid - please request new a one',
    INTERNAL_ERROR = 'Internal Error - please try again later',
    BAD_REQUEST = 'Invalid entry'
}

export enum DELETE_ACCOUNT_RESULT {
    DELETE_SUCCESS = 'Account deleted successfully',
    NO_SESSION = 'Forbidden - log into account before deleting',
    NO_USER = 'No user found with that email - try logging out and back in',
    MISMATCH = 'Request to delete does not match account logged in from',
    INTERNAL_ERROR = 'Internal Error - please try again later',
    BAD_REQUEST = 'Invalid entry',
}

export enum CHECKOUT {
    MISSING_DATA = 'Missing data',
    INTERNAL_ERROR = 'Internal error: Failed to set up checkout. Please try again later.',
}

//https://stripe.com/docs/api/events/types
export enum STRIPE_EVENTS {
    CHECKOUT_COMPLETE = 'checkout.session.completed',
    SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
    SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
}

export type Mode = "payment" | "setup" | "subscription";

export type SearchParamsType = {
    searchParams: { [key: string]: string | string[] | undefined }
    success?: string,
    login?: string,
}

export type AutoLoginInfo = {
    email: string,
}

export type StandardLoginInfo = {
    email: string,
    password: string
}

export type SignupInfo = {
    name: string
    email: string
    password: string
    stripeId?: string
}