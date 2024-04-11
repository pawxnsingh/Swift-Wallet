import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";

// @ts-ignore
const handler = NextAuth(authOptions);
// this is the change i have made

export { handler as GET, handler as POST };
