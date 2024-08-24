"use server";
import { cookies } from "next/headers";

export async function setThemeCookie(mode: "light" | "dark" | "system") {
	await cookies().set("theme", mode);
}
