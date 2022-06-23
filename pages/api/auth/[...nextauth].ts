import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    signIn: async ({ account, profile }) => {
      if (
        account.provider === 'google' &&
        profile.email_verified === true &&
        profile.email?.endsWith('@stanford.edu')
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  theme: {
    colorScheme: 'auto',
    brandColor: '#E53E3E',
    logo: ''
  }
});
