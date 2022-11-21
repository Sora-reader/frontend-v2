export type TokenObtainIn = {
  username: string;
  password: string;
};
export type TokenObtainOut = {
  username: string;
  refresh: string;
  access: string;
};

export type TokenRefreshIn = string | null;
export type TokenRefreshOut = {
  access: string;
};

export type TokenVerifyIn = {
  token: string;
};
export type TokenVerifyOut = {};

export type TokenState = {
  username?: string;
  access?: string;
};
