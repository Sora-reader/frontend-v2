export type TokenObtainIn = {
  username: string;
  password: string;
};
export type TokenObtainOut = {
  username: string;
  refresh: string;
  access: string;
};

export type TokenRefreshIn = {
  refresh: string;
};
export type TokenRefreshOut = {
  refresh: string;
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
