import { routeTree } from "@/routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Handle GitHub Pages 404.html redirect
// When 404.html redirects to index.html, restore the original path
const redirectPath = sessionStorage.getItem('redirect');
if (redirectPath && redirectPath !== window.location.pathname + window.location.search + window.location.hash) {
  sessionStorage.removeItem('redirect');
  // Restore the path (from 404.html) before router initializes
  // redirectPath already includes pathname, query, and hash
  window.history.replaceState(null, '', redirectPath);
}

const basepath = import.meta.env.BASE_URL; // auto matches Vite base
console.log({basepath});

export const router = createRouter({
  routeTree,
  basepath,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export function TanstackRouterProvider() {
  return <RouterProvider router={router} />;
}