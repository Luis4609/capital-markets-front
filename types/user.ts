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

export type AuthContextType = {
  user: boolean;
  login: () => void;
  register: () => void;
  logout: () => void;
};
