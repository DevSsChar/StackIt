import connectDB from "@/db/connectDB";
import User from "@/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isSignUp: { label: "Sign Up", type: "boolean", default: false }
      },
      async authorize(credentials) {
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
          return user;
        }
        
        // Sign in flow
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error("Invalid credentials");
        
        return user;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.role = user.role;
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