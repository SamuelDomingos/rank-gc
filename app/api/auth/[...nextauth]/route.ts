import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      triboSlug: string;
      cargo: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    triboSlug: string;
    cargo: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
        triboSlug: { label: "Tribo", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais incompletas");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Usuário não encontrado");
        }

        const senhaValida = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!senhaValida) {
          throw new Error("Senha incorreta");
        }

        if (!credentials.triboSlug) {
          if (user.cargo !== "ADMIN") {
            throw new Error("Sem permissão de administrador");
          }
          return { id: user.id, email: user.email, cargo: user.cargo };
        }

        if (
          user.tribo.toLocaleLowerCase() !== credentials.triboSlug &&
          user.cargo === "MEMBRO"
        ) {
          throw new Error("Você não pertence a esta tribo");
        }

        return {
          id: user.id,
          email: user.email,
          triboSlug: user.tribo?.toLowerCase() || "",
          cargo: user.cargo,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.triboSlug = (user as any).triboSlug?.toLowerCase() || "";
        token.cargo = (user as any).cargo || "";
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.triboSlug = token.triboSlug;
      session.user.cargo = token.cargo;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
