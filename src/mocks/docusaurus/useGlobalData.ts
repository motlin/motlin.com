export function usePluginData(_pluginName: string): any {
  // Return empty object for Storybook - components using this hook
  // should handle empty data gracefully
  return {};
}

export function useAllPluginInstancesData(_pluginName: string): any {
  return {};
}

export default function useGlobalData(): any {
  return {
    'github-repos-plugin': {},
    'github-user-profile-plugin': {}
  };
}
