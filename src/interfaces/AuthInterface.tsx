export interface AuthInterface {
  Username: string;
  Password: string;
}
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

//ApirError
export interface ApiErrorResponse {
  Message: string;
  error_description: string;
}
