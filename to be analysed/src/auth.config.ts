import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.role) {
                (session.user as any).role = token.role;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isDashboard = nextUrl.pathname.startsWith("/dashboard");
            const isAuthPage = nextUrl.pathname.startsWith("/auth");

            if (isDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            } else if (isAuthPage) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/dashboard", nextUrl));
                }
                return true;
            }
            return true;
        },
    },
    providers: [], // Add providers with Edge-compatible setup here if needed
} satisfies NextAuthConfig;
