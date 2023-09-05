import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                activate: "#3E3AFF",
                deactivate: "#9B9BA1",
            },
            fontFamily: {
                loginBoxFont: ["Jacques Francois", "serif"],
                textBoxFont: ["IBM Plex Sans KR", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
