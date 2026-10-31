import {defineConfig} from "vite-plus";

export default defineConfig({
	fmt: {
		semi: true,
		singleQuote: false,
		useTabs: true,
		tabWidth: 4,
		printWidth: 120,
		proseWrap: "never",
		embeddedLanguageFormatting: "off",
		bracketSpacing: false,
		trailingComma: "all",
		arrowParens: "always",
		ignorePatterns: ["src/.claude-prompts/**", "src/.dotfiles/**", "src/claude-code-plugins/**"],
		overrides: [
			{
				files: [".yamllint.yaml", "**/*.yaml", "**/*.yml"],
				options: {
					useTabs: false,
					tabWidth: 2,
				},
			},
			{
				files: ["**/*.md"],
				options: {
					printWidth: 320,
				},
			},
		],
	},
	run: {
		tasks: {
			// Add dependsOn here for code generation that type-aware lint needs.
			check: {
				command: "vp check",
			},
			"test:run": {
				command: "node node_modules/vitest/dist/cli.js run",
				cache: {
					input: [{auto: true}, "!node_modules/.vitest-cache/**"],
					output: [],
				},
			},
		},
	},
	lint: {
		plugins: ["typescript", "unicorn", "oxc", "import", "react", "vitest", "promise", "node", "jsx-a11y"],
		jsPlugins: [
			{
				name: "vite-plus",
				specifier: "vite-plus/oxlint-plugin",
			},
		],
		categories: {
			correctness: "error",
			suspicious: "error",
			perf: "error",
		},
		rules: {
			"vite-plus/prefer-vite-plus-imports": "error",
			"react/react-in-jsx-scope": "off",
			"no-case-declarations": "error",
			"no-empty": "error",
			"no-fallthrough": "error",
			"no-prototype-builtins": "error",
			"no-regex-spaces": "error",
			"import/no-unassigned-import": ["error", {allow: ["**/*.css"]}],
			"no-unused-vars": [
				"error",
				{
					varsIgnorePattern: "^([A-Z_]|_)",
					argsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"react-hooks/rules-of-hooks": "error",
			eqeqeq: ["error", "smart"],
			"react/only-export-components": [
				"warn",
				{
					allowConstantExport: true,
				},
			],
		},
		env: {
			builtin: true,
		},
		ignorePatterns: [
			"build",
			".docusaurus",
			"storybook-static",
			".llm/**",
			"src/.claude-prompts/**",
			"src/.dotfiles/**",
			"src/claude-code-plugins/**",
		],
		overrides: [
			{
				files: ["public/**/*.{ts,tsx}"],
				globals: {
					ServiceWorkerGlobalScope: "readonly",
					ExtendableEvent: "readonly",
				},
			},
			{
				files: ["vite.config.ts", "vitest.config.ts"],
				globals: {
					process: "readonly",
				},
			},
			{
				files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}", "**/setupTests.{js,ts}"],
				globals: {
					vi: "readonly",
				},
				env: {
					browser: true,
					jest: true,
				},
			},
			{
				files: ["**/*.{js,jsx}"],
				rules: {
					"no-undef": "error",
					"no-redeclare": "error",
				},
				env: {
					es2020: true,
					browser: true,
					jest: true,
				},
			},
			{
				files: ["**/*.{ts,tsx}"],
				rules: {
					"@typescript-eslint/ban-ts-comment": [
						"error",
						{
							minimumDescriptionLength: 10,
						},
					],
					"no-array-constructor": "error",
					"@typescript-eslint/no-dynamic-delete": "error",
					"@typescript-eslint/no-empty-object-type": "error",
					"@typescript-eslint/no-invalid-void-type": "error",
					"@typescript-eslint/no-namespace": "error",
					"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
					"@typescript-eslint/no-explicit-any": "error",
					"@typescript-eslint/no-non-null-assertion": "error",
					"@typescript-eslint/no-require-imports": "error",
					"@typescript-eslint/no-unsafe-function-type": "error",
					"no-var": "error",
					"@typescript-eslint/prefer-literal-enum-member": "error",
					"@typescript-eslint/unified-signatures": "error",
					"@typescript-eslint/no-misused-promises": "error",
					"@typescript-eslint/require-await": "error",
					"@typescript-eslint/return-await": ["error", "error-handling-correctness-only"],
					"@typescript-eslint/only-throw-error": "error",
					"@typescript-eslint/switch-exhaustiveness-check": "error",
					"@typescript-eslint/prefer-nullish-coalescing": "error",
					"@typescript-eslint/restrict-plus-operands": "error",
					"@typescript-eslint/no-mixed-enums": "error",
					"@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
					"@typescript-eslint/consistent-type-exports": "error",
					"@typescript-eslint/prefer-find": "error",
					"@typescript-eslint/prefer-includes": "error",
					"@typescript-eslint/prefer-string-starts-ends-with": "error",
					"@typescript-eslint/prefer-reduce-type-parameter": "error",
					"@typescript-eslint/prefer-return-this-type": "error",
					"@typescript-eslint/related-getter-setter-pairs": "error",
					"@typescript-eslint/non-nullable-type-assertion-style": "error",
					"@typescript-eslint/prefer-promise-reject-errors": "error",
					"@typescript-eslint/prefer-optional-chain": "error",
					"@typescript-eslint/no-unsafe-return": "error",
					"no-promise-executor-return": "error",
					"no-negated-condition": "error",
					"@typescript-eslint/no-confusing-void-expression": "error",
					"@typescript-eslint/promise-function-async": "error",
					"@typescript-eslint/dot-notation": ["error", {allowIndexSignaturePropertyAccess: true}],
					"@typescript-eslint/prefer-readonly": "error",
					"@typescript-eslint/no-deprecated": "error",
					"import/no-cycle": "error",
					"import/no-duplicates": "error",
					"@typescript-eslint/no-unsafe-assignment": "error",
					"@typescript-eslint/no-unsafe-member-access": "error",
					"@typescript-eslint/no-unsafe-call": "error",
					"@typescript-eslint/no-unsafe-argument": "error",
					"@typescript-eslint/no-unnecessary-condition": ["error", {allowConstantLoopConditions: true}],
					"@typescript-eslint/strict-boolean-expressions": "off", // Opted out: it forces `=== true` noise.
				},
				env: {
					es2020: true,
					browser: true,
					jest: true,
				},
			},
			{
				files: ["**/*.{js,jsx,ts,tsx}"],
				rules: {
					"@docusaurus/no-html-links": "error",
					"@docusaurus/prefer-docusaurus-heading": "error",
				},
				jsPlugins: ["@docusaurus/eslint-plugin"],
			},
			{
				files: ["src/stories/**/*", ".storybook/**/*"],
				rules: {
					"@docusaurus/no-html-links": "off",
					"@docusaurus/prefer-docusaurus-heading": "off",
				},
			},
			{
				files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)", "**/*.story.@(ts|tsx|js|jsx|mjs|cjs)"],
				rules: {
					"react-hooks/rules-of-hooks": "off",
					"import-x/no-anonymous-default-export": "off",
					"storybook/await-interactions": "error",
					"storybook/context-in-play-function": "error",
					"storybook/default-exports": "error",
					"storybook/hierarchy-separator": "warn",
					"storybook/no-redundant-story-name": "warn",
					"storybook/no-renderer-packages": "error",
					"storybook/prefer-pascal-case": "warn",
					"storybook/story-exports": "error",
					"storybook/use-storybook-expect": "error",
					"storybook/use-storybook-testing-library": "error",
				},
				jsPlugins: ["eslint-plugin-storybook"],
			},
			{
				files: [".storybook/main.@(js|cjs|mjs|ts)"],
				rules: {
					"storybook/no-uninstalled-addons": "error",
				},
				jsPlugins: ["eslint-plugin-storybook"],
			},
			{
				files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
				rules: {
					"@typescript-eslint/no-explicit-any": "off",
					"@typescript-eslint/no-non-null-assertion": "off",
					"@typescript-eslint/no-unsafe-type-assertion": "off",
					"@typescript-eslint/no-unsafe-assignment": "off",
					"@typescript-eslint/no-unsafe-member-access": "off",
					"@typescript-eslint/no-unsafe-call": "off",
					"@typescript-eslint/no-unsafe-argument": "off",
					"vitest/no-identical-title": "error",
				},
			},
		],
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
});
