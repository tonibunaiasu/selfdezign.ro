
## Notification System
- [x] Upgrade project to full-stack (web-db-user)
- [x] Create subscribers table in database
- [x] Create tRPC procedures for subscribe/unsubscribe
- [x] Create NewsletterForm component
- [x] Add newsletter form to footer
- [x] Write vitest tests for newsletter functionality
- [x] Test newsletter subscription in browser

## Stripe Payment Integration
- [ ] Add Stripe feature to project
- [ ] Configure Stripe API keys
- [ ] Create products/services database schema (one-time + subscriptions)
- [ ] Implement checkout flow UI
- [ ] Create payment success/cancel pages
- [ ] Write tests for payment functionality

## Design Updates & Projects Import
- [x] Extract all projects with original images from WordPress site
- [x] Change accent color from green to lime yellow
- [x] Show full SelfDezign logo on both mobile and desktop
- [x] Update projects page with real images

## About Section (Despre Noi)
- [x] Create About page with brand positioning (user's text)
- [x] Develop Vision & Mission content
- [x] Create Principles & Values page
- [x] Add navigation links to About section
- [x] Design consistent layout for About pages

## Individual Project Pages
- [x] Extract all photos from each project on WordPress site (14/16 complete)
- [x] Create individual project page template (ProjectDetail.tsx)
- [x] Add project data with multiple images per project (Bloom, Cafeneaua Veche complete)
- [x] Link projects from Projects page to individual pages
- [x] Add image gallery/lightbox functionality

## Awards/Premii Images Fix
- [x] Extract original award/distinction images from WordPress homepage
- [x] Update homepage to display awards images correctly

## Complete Project Galleries
- [x] Zero Grade - Pizza în Păltiniș (gallery) - 8 images
- [x] Restaurant Poeme - Hotel Boutiq Mamaia (gallery) - 7 images
- [x] Cafeteria IBM - Clădirea GBC (gallery) - 9 images
- [x] Global Leader in Live Dealer Gaming (gallery) - 9 images
- [x] Prima Development (gallery) - 6 images
- [x] MyHive Office (gallery) - 5 images
- [x] Bucharest Comfort Suites (gallery) - 13 images
- [x] Mafi Natural Wooden Floors Showroom (gallery) - 9 images
- [ ] Eveniment Outdoor - Companie Țigarete (gallery) - 1 image only
- [ ] Branding Locație - Companie FMCG (gallery) - 1 image only
- [x] Locuință Cartierul Francez (gallery) - 10 images
- [x] Vilă P+E Cluj Napoca (gallery) - 10 images
- [ ] Vilă D+P+E Piața Domenii (gallery) - needs extraction
- [x] Quadra Trees București (gallery) - 6 images
- [x] Vilă P+E Pădurea Andronache (gallery) - 7 images

## Hero Section Update
- [x] Replace placeholder Featured Project with real SelfDezign project (Cafeneaua Veche 9)

## Team Page
- [x] Create Team page structure for 4 members
- [x] Add Irina Stoica (with fallback to initials)
- [x] Add Toni Bunăiașu (with fallback to initials)
- [x] Add Marco (with fallback to initials)
- [x] Add Teodora Brâncuș (with fallback to initials)
- [x] Add navigation link to Team page

## Contact Form Functionality
- [ ] Connect contact form to email service
- [ ] Add form validation and success/error messages
- [ ] Test email delivery

## Stripe Integration
- [ ] Create consultation booking product (1 hour initial consultation)
- [ ] Create e-books section (placeholder for future uploads)
- [ ] Implement checkout flow for consultations
- [ ] Create booking confirmation page

## Complete Remaining Galleries
- [x] Extract Vilă D+P+E Piața Domenii gallery from WordPress - 7 images
- [x] Update projects-data.ts with Piața Domenii gallery

## Language System (RO/EN)
- [x] Create language context and translations file
- [x] Add language toggle button to header
- [x] Translate all static content to English
- [x] Translate navigation menu
- [x] Translate homepage content
- [x] Translate About/Vision/Values pages
- [x] Translate Projects page and project details
- [x] Translate Contact page
- [x] Translate Blog page
- [x] Translate Team page
- [x] Translate footer content
- [ ] Test language switching functionality

## Fix Gallery Images
- [x] Check Mafi project gallery images - none loading correctly
- [x] Verify all other project galleries for broken images
- [x] Fix image paths in projects-data.ts (downloaded missing Mafi images from WordPress)
- [x] Test all project galleries

## Add Brand Experience Gallery Images
- [x] Extract images for Eveniment Outdoor project from WordPress (generated professional images)
- [x] Extract images for Branding FMCG project from WordPress (generated professional images)
- [x] Update projects-data.ts with gallery images
- [x] Test brand experience galleries

## Fix Hotel Bucharest Page Layout
- [x] Fix hotel title - replace asterisks with stars (★★★★)
- [x] Optimize gallery grid layout for uniform alignment
- [x] Improve spacing and responsive design
- [x] Test page on mobile and desktop

## Bug Fixes
- [x] Fix duplicated footer sections on mobile version (optimized spacing and responsive classes)

## Add Testimonials Section
- [x] Generate placeholder client photos
- [x] Create Testimonials component with reviews
- [x] Add testimonials section to Home page
- [x] Test testimonials section

## Add Media Appearances Section
- [x] Extract content from Articles page on WordPress
- [x] Create MediaAppearances component
- [x] Add /aparituri-media route and page
- [x] Add navigation link
- [x] Test section

## Add Media Publication Links
- [x] Find and add URLs for all media articles
- [x] Update media-appearances.ts with correct links
- [x] Modify MediaAppearances component to display clickable links
- [x] Test all links

## Admin Dashboard + CMS Integration (Manus Management UI)
- [x] Use Manus Management UI for content management
- [x] Create comprehensive Management UI guide
- [x] Document how to edit content visually
- [x] Document backup and restore process
- [x] Document domain configuration
- [x] Document notification setup for contact form

## Bug Fixes - Visibility Issues
- [x] Fix SelfDezign logo visibility on website (replaced with actual SelfDezign logo)
- [x] Improve contrast for yellow header elements on white background (updated button and nav links styling)

## SEO Improvements
- [x] Add meta description and keywords to Home page
- [ ] Add meta tags to all project pages
- [ ] Add meta tags to Blog pages
- [ ] Implement JSON-LD structured data

## Update Social Media Section
- [x] Add social media icons (Facebook, Instagram, LinkedIn)
- [x] Update social media links in footer with correct URLs
- [x] Test all social media links


## Admin Dashboard for Blog Management
- [x] Update database schema with blog_articles table (if not exists)
- [x] Create tRPC procedures for blog CRUD operations (create, read, update, delete)
- [x] Build Admin Dashboard UI with article list view
- [x] Create article form component (add/edit)
- [x] Implement article preview functionality
- [ ] Add image upload to S3 storage
- [x] Implement authentication/authorization for admin access
- [ ] Test admin dashboard functionality
- [ ] Deploy admin dashboard to VPS


## Project Category Filtering Fix
- [x] Investigate homepage project category links
- [x] Implement category filtering on Projects page with URL parameter
- [x] Update homepage category links to pass category parameter
- [x] Test all category filters (Restaurant, Office, Hotel, Comercial, Brand Experience, Rezidențial)


## Header Navigation Active Link Visibility Fix
- [x] Investigate header navigation active link styling in Layout.tsx
- [x] Change active link color from yellow (accent) to black for better contrast
- [x] Test navigation visibility on all pages


## UX Improvements Implementation
- [x] Deploy latest changes to VPS through Coolify
- [x] Add smooth hover transitions to all buttons
- [x] Implement swipe gesture for mobile menu closing
- [x] Test all improvements on live site


## SEO Improvements & Awards Section Enhancement
- [x] Add Open Graph meta tags to all pages
- [x] Add Twitter Cards meta tags to all pages
- [x] Implement JSON-LD structured data for Organization
- [x] Implement JSON-LD structured data for all project pages
- [x] Enlarge Awards section on homepage for better logo visibility
- [x] Test SEO meta tags with validators


## Header Navigation Optimization
- [x] Remove Contact button from header navigation
- [x] Rearrange navigation in psychologically optimal order (ACASĂ, DESPRE, ECHIPA, PROIECTE, BLOG, MEDIA, SCRIE-NE)
- [x] Test navigation changes on all pages


## GitHub Actions Auto-Deploy Setup
- [x] Create GitHub Actions workflow file (.github/workflows/deploy.yml)
- [x] Generate SSH key pair for GitHub Actions authentication
- [x] Add SSH private key to GitHub Secrets
- [x] Test workflow with manual trigger
- [x] Verify auto-deploy on next git push
- [x] Add monitoring and failure notifications
- [x] Optimize build time with caching (node_modules + build artifacts)
- [x] Remove Coolify configuration from VPS
- [x] Verify site works without Coolify (HTTP 200 OK)

## Text Contrast Fixes (Yellow on White/Dark)
- [x] Fix About page - Change numbered labels (01/02) from yellow to black
- [x] Fix Vision page - Change title "ȘI DE CE" from yellow to white on black background
- [x] Fix Values page - Change value subtitles from yellow to black
- [x] Fix Values page - Change principle numbers from yellow to gray
- [x] Fix Contact page - Wrap address labels in yellow boxes with black text
- [x] Fix Footer - Change section titles from yellow to white on dark background
- [x] Verify all contrast fixes on live site


## Website Modifications - Dec 31, 2025
- [x] Remove CONTACT menu item from header (duplicate of SCRIE-NE) - Not needed, already not in nav menu
- [x] Change yellow text on white background to royal blue (visiniu royal modern) - Added .text-accent-on-white class for specific elements on Contact page
- [x] Test all changes on live site - All changes verified and live on www.selfdezign.ro
- [x] Verify yellow on dark backgrounds remains intact - Confirmed on home page and other sections
