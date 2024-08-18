import NextAuth from "next-auth";
import ResendProvider from "next-auth/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: process.env.NODE_ENV === "development",
	adapter: DrizzleAdapter(db),
	callbacks: {
		signIn({ user }) {
			return Boolean(
				process.env.AUTH_WHITELISTED_EMAILS?.split(",").includes(
					String(user?.email),
				),
			);
		},
	},
	providers: [
		ResendProvider({
			apiKey: process.env.RESEND_API_KEY,
			from: process.env.RESEND_FROM,
		}),
	],
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
		verifyRequest: "/auth/verify-request",
	},
});
