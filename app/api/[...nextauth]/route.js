import connectDB from "@/db/connectDB";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    // Only include OAuth providers if environment variables are provided
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ] : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      })
    ] : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isSignUp: { label: "Sign Up", type: "boolean", default: false }
      },
      async authorize(credentials) {
        try {
          await connectDB();
          
          const { email, password, isSignUp } = credentials;
          
          // Sign up flow
          if (isSignUp) {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error("Email already registered");
            
            const user = await User.create({ 
              email,
              password,
              username: email.split('@')[0]
            });
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.username,
              role: user.role
            };
          }
          
          // Sign in flow
          const user = await User.findOne({ email });
          if (!user) throw new Error("User not found");
          
          const isMatch = await user.comparePassword(password);
          if (!isMatch) throw new Error("Invalid credentials");
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
            role: user.role
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      
      // Handle OAuth providers
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectDB();
          let dbUser = await User.findOne({ email: user.email });
          
          if (!dbUser) {
            dbUser = await User.create({
              email: user.email,
              username: user.name || user.email.split('@')[0],
              password: 'oauth_user', // placeholder for OAuth users
              role: 'user'
            });
          }
          
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        } catch (error) {
          console.error("OAuth user creation error:", error);
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };