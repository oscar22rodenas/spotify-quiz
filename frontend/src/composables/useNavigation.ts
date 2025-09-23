export function useNavigation() {
  const navigateTo = (path: string) => {
    // Para Astro, simplemente usar location.assign que es más suave
    window.location.assign(path);
  };

  return { navigateTo };
}