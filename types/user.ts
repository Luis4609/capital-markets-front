export type UserLoginSubmitForm = {
  mail: string;
  password: string;
};

// export type UserSubmitForm = {
//   fullname: string;
//   username: string;
//   mail: string;
//   password: string;
//   confirmPassword: string;
//   acceptTerms: boolean;
// };

export type UserSubmitForm = {
  name: string;
  surname: string;
  dni: string;
  mail: string;
  password: string;
  confirmPassword: string;
};

export interface AuthContextType {
  mail: string,
  password: string;
  isLogging: boolean;
};
