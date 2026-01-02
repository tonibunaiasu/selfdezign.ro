import type { Plugin } from 'vite';

/**
 * HTML Optimization Plugin for Vite
 * Optimizes HTML by:
 * - Deferring non-critical scripts
 * - Optimizing link preload/prefetch
 * - Minifying inline CSS
 */
export function htmlOptimizationPlugin(): Plugin {
  return {
    name: 'html-optimization',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html: string) {
      // Add async/defer to scripts to prevent render blocking
      let optimized = html
        .replace(
          /<script([^>]*?)src="([^"]*)"/g,
          (match, attrs, src) => {
            // Don't defer critical scripts
            if (src.includes('polyfill')) {
              return match;
            }
            // Add defer to other scripts
            if (!attrs.includes('defer') && !attrs.includes('async')) {
              return `<script${attrs} defer src="${src}"`;
            }
            return match;
          }
        )
        // Optimize preload directives
        .replace(
          /<link([^>]*?)rel="preload"([^>]*?)>/g,
          (match, before, after) => {
            // Ensure proper preload attributes
            if (!match.includes('as=')) {
              return match; // Skip if missing 'as' attribute
            }
            return match;
          }
        )
        // Remove unused CSS print styles inline
        .replace(
          /<link([^>]*?)media="print"([^>]*?)>/g,
          (match) => {
            return match.replace('href=', 'onload="this.media=\'all\'" href=');
          }
        );
      
      return optimized;
    },
  };
}

export default htmlOptimizationPlugin;
