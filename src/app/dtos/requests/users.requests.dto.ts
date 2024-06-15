export interface IUserSignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserSigninRequest {
  email: string;
  password: string;
}
