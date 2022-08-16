export type UserLoginSubmitForm = {
    email: string;
    password: string;
  };
  
  export type UserSubmitForm = {
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  };