import axios from 'axios';
import NextAuth, { Account, AuthOptions, CallbacksOptions, Profile } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiUrl } from '../../../core/api/const';

async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refresh
    const tokenResponse = await axios.post(apiUrl + '/token/refresh', {
      refresh: tokenObject.refresh,
    });

    return {
      ...tokenObject,
      access: tokenResponse.data.access,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    };
  }
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: 'Имя пользователя', type: 'text' },
      password: { label: 'Пароль', type: 'password' },
    },
    async authorize(credentials, req) {
      try {
        // Authenticate user with credentials
        const user = await axios.post(apiUrl + '/token/pair', {
          username: credentials?.username,
          password: credentials?.password,
        });

        if (user.data.access) {
          console.log('User data', user.data);
          return user.data;
        }

        return null;
      } catch (e) {
        throw new Error(String(e));
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions<Profile, Account>> = {
  jwt: async ({ token, user }) => {
    if (user) {
      // This will only be executed at login. Each next invocation will skip this part.
      token.access = user.access;
      token.accessExpiry = Date.now() + 60 * 60 * 1000;
      token.refresh = user.refresh;
    }

    // If accessExpiry is 24 hours, we have to refresh token before 24 hours pass.
    const shouldRefreshTime = Math.round(token.accessExpiry - 60 * 60 * 1000 - Date.now());

    // If the token is still valid, just return it.
    if (shouldRefreshTime > 0) {
      return Promise.resolve(token);
    }

    // If the call arrives after 23 hours have passed, we allow to refresh the token.
    const refresh = refreshAccessToken(token);
    return Promise.resolve(refresh);
  },
  session: async ({ session, token }) => {
    // Here we pass access to the client to be used in authentication with your API
    session.access = token.access;
    session.accessExpiry = token.accessExpiry;
    session.error = token.error;

    return Promise.resolve(session);
  },
};

export const options: AuthOptions = {
  providers,
  callbacks,
  pages: {},
  secret: 'your_secret',
};

export default NextAuth(options);
