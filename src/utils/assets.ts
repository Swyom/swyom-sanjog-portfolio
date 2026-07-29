/**
 * Helper to resolve asset URLs correctly across development and production
 * environments, taking into account Vite's base path configuration.
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  // Remove leading './' or '/'
  const cleanPath = path.replace(/^(\.\/|\/)/, '');
  const baseUrl = import.meta.env.BASE_URL || '/';
  const formattedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  
  return `${formattedBase}${cleanPath}`;
};
