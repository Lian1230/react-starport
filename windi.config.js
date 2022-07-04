import { defineConfig } from "windicss/helpers";
import aspectRatio from "windicss/plugin/aspect-ratio";

export default defineConfig({
  extract: {
    include: ["src/**/*.{html,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  theme: {},
  plugins: [aspectRatio],
  attributify: true,
});
