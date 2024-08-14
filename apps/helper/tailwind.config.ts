import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
	content: ["./src/app/**/*.tsx", "./src/features/**/components/*.tsx"],
	presets: [sharedConfig],
};

export default config;
