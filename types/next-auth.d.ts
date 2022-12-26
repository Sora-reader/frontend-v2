import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string;
      access: string;
      refresh: string;
    };
    // Not sure if this is the best way to hold the value, but a guy on Dev.to wrote so
    access: string;
    accessExpiry: number;
    error?: string;
  }
  interface User {
    username: string;
    access: string;
    refresh: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    access: string;
    accessExpiry: number;
    refresh: string;
    error?: string;
  }
}
