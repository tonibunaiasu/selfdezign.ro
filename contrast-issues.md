# Yellow Text on White Background - Contrast Issues

## Issues Found:

1. **About Page - Blockquote section**
   - Yellow text on white background in the blockquote
   - Location: `/despre` page, blockquote with italic text
   - Component: `About.tsx` line 67

2. **Vision Page - Blockquote section**
   - Yellow text on white background in blockquote
   - Location: `/viziune-misiune` page
   - Component: `Vision.tsx` line 195

3. **Values Page - Multiple instances**
   - Yellow text on white background in principle descriptions
   - Location: `/principii-valori` page
   - Component: `Values.tsx` lines 297

4. **Blog/Articles Pages**
   - Yellow text in article titles and descriptions on white backgrounds
   - Location: `/blog`, `/articole` pages
   - Components: `Blog.tsx`, `Articles.tsx`

5. **Contact Page**
   - Yellow text labels on white background
   - Location: `/contact` page
   - Component: `Contact.tsx` lines 87, 91

6. **Footer**
   - Yellow text labels on white background
   - Location: Footer component
   - Component: `Layout.tsx` lines 169, 185, 207

## Solutions to Implement:

### Option 1: Wrap text in yellow background box (RECOMMENDED)
- Add `bg-accent` background with `text-black` text
- Add padding for readability
- Maintains brand consistency

### Option 2: Change text color to dark
- Replace `text-accent` with `text-black` or `text-gray-900`
- Use `text-accent` only on dark backgrounds

### Option 3: Add text shadow/outline
- Add subtle shadow to make text readable
- Less professional looking

## Recommended Approach:
Use Option 1 for emphasis text (quotes, important labels)
Use Option 2 for regular labels and metadata
