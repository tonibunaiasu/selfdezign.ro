# Decap CMS Setup Guide for SelfDezign

## Overview

Decap CMS (formerly Netlify CMS) is now integrated into your SelfDezign website. It provides a user-friendly admin interface for editing content without needing to directly modify code files.

## Accessing the CMS

1. Once the site is deployed, visit: **https://www.selfdezign.ro/admin**
2. You will see the Decap CMS login screen
3. The CMS uses a test backend by default

## Current Configuration

### Files Created:
- `client/public/admin/index.html` - Admin interface entry point
- `client/public/admin/config.yml` - CMS configuration file

### Available Collections:
- **Team Members** - Edit team information in `src/pages/Team.tsx`
- **Pages** - Create and edit pages in `src/pages/`

## How to Use Decap CMS

### Editing Team Members

1. Go to `/admin`
2. Click on "Team Members" in the sidebar
3. The Team.tsx file will open in the code editor
4. Make your changes and click save
5. Your changes will be committed to GitHub automatically

### Adding New Pages

1. Go to `/admin`
2. Click on "Pages"
3. Click "New Page"
4. Fill in:
   - **Title**: Page title
   - **Content**: Your page content (markdown)
5. Click save

## Backend Configuration

Currently, the CMS is configured with a `test-repo` backend. For production use with GitHub:

1. You'll need to create a GitHub OAuth application
2. Update `client/public/admin/config.yml` with:
   ```yaml
   backend:
     name: github
     repo: tonibunaiasu/selfdezign.ro
     branch: main
   ```
3. Configure GitHub OAuth settings

## Local Development

For local development, you can:

1. Install Decap CMS CLI: `npm install -g decap-cms-cli`
2. Run: `decap-cms-proxy-server`
3. Access the CMS locally with full editing capabilities

## Troubleshooting

### Admin page shows 404
- Wait for the site to rebuild after pushing changes
- Check that the build completed successfully
- Clear your browser cache

### Changes not appearing
- The GitHub Actions workflow needs to process your changes
- Check the "Actions" tab in your GitHub repository
- Wait for the deployment to complete

## Next Steps

For a fully functional CMS with GitHub authentication:
1. Create a GitHub OAuth App in your account settings
2. Update the backend configuration in `config.yml`
3. Add more collections for other content types (blog, projects, etc.)

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Git Gateway Setup](https://decapcms.org/docs/git-gateway-backend/)
- [GitHub OAuth Configuration](https://decapcms.org/docs/github-backend/)
