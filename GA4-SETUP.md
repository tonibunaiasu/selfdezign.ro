# Google Analytics 4 (GA4) Implementation Guide

## Overview
GA4 has been successfully integrated into the selfdezign.ro website. This document provides a comprehensive guide for using and maintaining GA4 tracking.

## What's Been Done

### 1. ✅ GA4 Script Added to HTML
**File:** `client/index.html`

Added Google Analytics 4 script to the `<head>` section with:
- Async loading of gtag JavaScript
- Window object initialization for GA4
- Global Measurement ID configuration

### 2. ✅ React Hook Created
**File:** `client/src/hooks/useGoogleAnalytics.ts`

Created a custom React hook with three main functions:

#### `useGoogleAnalytics()`
Initializes GA4 on component mount. Use in your root App component:

```typescript
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

export default function App() {
  useGoogleAnalytics();
  // rest of your component
}
```

#### `trackEvent(eventName, eventData)`
Track custom events:

```typescript
import { trackEvent } from '@/hooks/useGoogleAnalytics';

// Track a button click
trackEvent('button_click', {
  button_name: 'contact_submit',
  page: '/contact'
});

// Track form submission
trackEvent('contact_form_submit', {
  form_type: 'contact_form',
  timestamp: new Date().toISOString()
});
```

#### `trackPageView(pageTitle, pagePath)`
Track page views with custom data:

```typescript
import { trackPageView } from '@/hooks/useGoogleAnalytics';

trackPageView('About Us', '/despre');
```

## Configuration Steps

### Step 1: Get Your GA4 Measurement ID

1. Log in to [Google Analytics](https://analytics.google.com)
2. Select your property (selfdezign.ro)
3. Go to **Admin** → **Property Settings**
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/tonis-projects-057a0057/selfdezign-ro)
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `VITE_GA_MEASUREMENT_ID`
   - **Value:** `G-XXXXXXXXXX` (your Measurement ID)
   - **Environments:** Select Production and Preview
4. Click **Save**

### Step 3: Update HTML Script

Replace `G-MEASUREMENT_ID` in `client/index.html` (lines 13 and 18) with your actual Measurement ID:

```html
<!-- Before -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"></script>

<!-- After -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC1234567"></script>
```

### Step 4: Integrate in React App

Update `client/src/App.tsx` to initialize GA4:

```typescript
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

export default function App() {
  useGoogleAnalytics(); // Add this line
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
```

### Step 5: Add Event Tracking (Optional)

Example: Track form submissions in Contact page:

```typescript
import { trackEvent } from '@/hooks/useGoogleAnalytics';

const handleSubmit = async (data) => {
  trackEvent('form_submit', {
    form_name: 'contact_form',
    email: data.email
  });
  // Send form data to server
};
```

## Verification

1. **Local Testing:**
   - Run `npm run dev`
   - Open DevTools → Network tab
   - Look for requests to `www.googletagmanager.com`
   - Check Console for `[GA4]` logs

2. **Google Analytics Dashboard:**
   - Go to Analytics → Real time
   - Trigger an event on your site
   - You should see activity in Real time view within seconds

3. **Recommended Events to Track:**
   - Page views (automatic)
   - Form submissions (contact, newsletter)
   - Button clicks (important CTAs)
   - Link clicks (outbound links)
   - Video plays
   - Downloads

## Deployment

1. Ensure `VITE_GA_MEASUREMENT_ID` is set in Vercel
2. Commit and push changes to main branch
3. Vercel auto-deploys
4. GA4 begins tracking immediately

## Troubleshooting

### GA4 Not Tracking
- Check Measurement ID is correct
- Verify `VITE_GA_MEASUREMENT_ID` env var is set
- Check browser DevTools Console for errors
- Ensure gtag script loaded: Network tab → filter "gtag"

### Incorrect Measurement ID
- Get the right ID from Google Analytics Admin
- Update `client/index.html` lines 13 & 18
- Redeploy to Vercel

### No Real-time Data
- Wait 30-60 seconds after deployment
- Refresh your site
- Check GA4 Dashboard Real-time tab

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Events Setup](https://support.google.com/analytics/answer/9322408)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

## Support

For questions or issues with GA4 implementation, contact the development team or check the Google Analytics documentation.
