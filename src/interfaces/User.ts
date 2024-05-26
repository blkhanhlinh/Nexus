export interface User {
    username: string;
    email: string;
    password: string;
    token: string;
    userId: string;
    userEmail: string;
    favoriteGenres: string[];
    role: string;
    httpCode: number;
    errorMessage: string | null;
    otpId: string | null;
}

export interface RegisterResponse {
    otpId: string;
    token: string;
    errorMessage: string;
}

export interface AuthState {
    user: User;
    isAuthenticated: boolean;
    returnUrl: string | null;
    registerResponse: RegisterResponse; 
}