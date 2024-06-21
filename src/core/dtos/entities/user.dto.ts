export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserWithoutPassword extends Omit<IUser, 'password'> {}
