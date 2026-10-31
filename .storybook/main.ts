import type {StorybookConfig} from "@storybook/react-vite";
import path from "path";
import {fileURLToPath} from "url";

const storybookDirectory = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
	stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-onboarding",
		"@storybook/addon-a11y",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	staticDirs: ["../static"],
	viteFinal: (viteConfig) => {
		viteConfig.resolve = viteConfig.resolve ?? {};
		viteConfig.resolve.alias = {
			// oxlint-disable-next-line typescript/no-misused-spread -- Storybook supplies aliases as an object here.
			...viteConfig.resolve.alias,
			"@site": path.resolve(storybookDirectory, "../"),
			// Prefix matching takes the first hit, so the specific mock must come before "@theme".
			"@theme/Heading": path.resolve(storybookDirectory, "../src/mocks/theme/Heading.tsx"),
			"@theme": path.resolve(storybookDirectory, "../src/theme"),
			"@docusaurus/Link": path.resolve(storybookDirectory, "../src/mocks/docusaurus/Link.tsx"),
			"@docusaurus/useGlobalData": path.resolve(storybookDirectory, "../src/mocks/docusaurus/useGlobalData.ts"),
		};
		return viteConfig;
	},
};
export default config;
