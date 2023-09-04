import NextAuth, { NextAuthOptions } from "next-auth";
import InstagramProvider from "next-auth/providers/instagram";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID || "",
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || "",
        }),
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
