import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id */
      id: string,
      signInMethod: string,
    } & DefaultSession["user"]
  }
}

// code from next-auth docs to Extend default interface properties: https://next-auth.js.org/getting-started/typescript