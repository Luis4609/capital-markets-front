export type UserLoginSubmitForm = {
    mail: string;
    password: string;
  };
  
  export type UserSubmitForm = {
    fullname: string;
    username: string;
    mail: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  };