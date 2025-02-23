import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn(account, profile, user) {
            console.log(user);
            return true; // Do different verification for other providers that don't have `email_verified`
        },
    },
};

export default NextAuth(authOptions);
