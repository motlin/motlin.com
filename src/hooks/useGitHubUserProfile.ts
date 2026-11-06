import {usePluginData} from "@docusaurus/useGlobalData";
import {z} from "zod";

const GitHubProfileSchema = z.object({
	login: z.string(),
	id: z.number(),
	avatar_url: z.string(),
	html_url: z.string(),
	name: z.string().nullable(),
	company: z.string().nullable(),
	blog: z.string().nullable(),
	location: z.string().nullable(),
	email: z.string().nullable(),
	bio: z.string().nullable(),
	public_repos: z.number(),
	public_gists: z.number(),
	followers: z.number(),
	following: z.number(),
	created_at: z.string(),
	updated_at: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;

export function useGitHubUserProfile(): GitHubProfile | null {
	try {
		// oxlint-disable-next-line react/hooks, react-hooks/rules-of-hooks -- Keeps pages rendering when the plugin data is absent, as in Storybook.
		const data = usePluginData("github-user-profile-plugin");
		if (!data || Object.keys(data).length === 0) {
			return null;
		}
		return GitHubProfileSchema.parse(data);
	} catch (error) {
		// In Storybook or development, continue without throwing
		// oxlint-disable-next-line typescript/no-unnecessary-condition, typescript/prefer-optional-chain -- window is undefined during server-side rendering.
		if (typeof window !== "undefined" && window.location.hostname === "localhost") {
			console.warn("GitHub user profile data not available in development/Storybook:", error);
			return null;
		}
		// In production, we still want to handle gracefully
		console.error("Failed to parse GitHub user profile data:", error);
		return null;
	}
}
