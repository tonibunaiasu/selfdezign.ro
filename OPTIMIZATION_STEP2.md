# OPTIMIZATION STEP 2: Render-Blocking Requests (Async/Defer)

## Objective
Reduce render-blocking requests by 2,550ms (Est. savings) by implementing async/defer attributes for non-critical scripts.

## Implementation Plan

### 1. Vite HTML Plugin Configuration
Add HTML optimization plugin to vite.config.ts:

```typescript
import { createHtmlPlugin } from 'vite-plugin-html';

const plugins = [
  // ... existing plugins
  createHtmlPlugin({
    inject: {
      data: {
        title: 'SelfDezign',
      },
    },
    preloadModule: true,
    minify: true,
  }),
];
```

### 2. Script Loading Strategy
Implement defer attributes in HTML for non-critical scripts:

```html
<!-- Critical scripts (inline or with no-defer) -->
<script>
  // Essential polyfills and critical config
</script>

<!-- Non-critical third-party scripts (defer) -->
<script defer src="https://example.com/analytics.js"></script>

<!-- Application scripts (defer) -->
<script type="module" src="/src/main.tsx"></script>
```

### 3. Module Preloading Optimization
Add rel="modulepreload" for critical ES modules:

```html
<link rel="modulepreload" href="/src/main.tsx" />
<link rel="modulepreload" href="/src/components/OptimizedImage.tsx" />
```

### 4. DNS Prefetch and Preconnect
Optimize external resource loading:

```html
<!-- Preconnect to external APIs/CDNs -->
<link rel="preconnect" href="https://api.selfdezign.ro" />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />

<!-- DNS Prefetch for non-critical domains -->
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

## Testing & Verification

1. Run vite build with new config
2. Run PageSpeed Insights on desktop variant
3. Check for reduction in "Render-blocking requests" warning
4. Verify Core Web Vitals metrics (FCP, LCP, TBT)

## Expected Results
- Render-blocking requests: 2,550ms savings
- FCP improvement: ~200-400ms
- Overall Performance Score: 81 → 84-86

## Files to Modify
- `client/vite.config.ts` - Add HTML plugin
- `client/public/index.html` - Add defer/preload attributes (when accessible)
- `client/src/main.tsx` - Ensure module loading is optimized

## Status
✅ Documented optimization strategy
⏳ Implementation pending
