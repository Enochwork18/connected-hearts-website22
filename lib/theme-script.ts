/**
 * Theme initialization script - prevents FOUC (Flash of Unstyled Content)
 * This should be inlined in the <head> before CSS loads
 * 
 * Usage: Add to app/layout.tsx in <head> as a <script dangerouslySetInnerHTML>
 */

export const themeScript = `
(function() {
  try {
    const storedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = storedTheme || systemTheme;
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store for later access
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    console.error('Theme initialization failed:', e);
  }
})();
`;

/**
 * Minified version for production
 */
export const themeScriptMinified = `(function(){try{const e=localStorage.getItem('theme'),t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light',r=e||t;'dark'===r?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark'),document.documentElement.setAttribute('data-theme',r)}catch(e){console.error('Theme initialization failed:',e)}})();`;
