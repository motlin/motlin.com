export function usePluginData(_pluginName: string): object {
	// Return empty object for Storybook - components using this hook
	// should handle empty data gracefully
	return {};
}

export function useAllPluginInstancesData(_pluginName: string): object {
	return {};
}

export default function useGlobalData(): object {
	return {
		"github-repos-plugin": {},
		"github-user-profile-plugin": {},
	};
}
