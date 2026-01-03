# Decap CMS OAuth Configuration

## GitHub OAuth Setup for SelfDezign

This document details the GitHub OAuth credentials configured for Decap CMS authentication.

## OAuth Application Details

**Application Name:** TinaCMS Auth  
**Repository:** https://github.com/tonibunaiasu/selfdezign.ro

### Credentials

**Client ID:** `Ov231iLozK7ibqjvJCD`

**Client Secret:** `7dfa9f2e6342d4bec148553c73f988141e65b8b`  
*(Stored securely in GitHub Settings > Secrets)*

**Homepage URL:** https://www.selfdezign.ro/admin

**Authorization Callback URL:** https://www.selfdezign.ro/callback

## Authentication Flow

1. User visits: `https://www.selfdezign.ro/admin`
2. User clicks "Login with GitHub"
3. Redirected to GitHub OAuth consent screen
4. User authorizes the application
5. GitHub redirects back to `https://auth.decapcms.vercel.app/callback`
6. Decap CMS verifies credentials and grants access
7. User can now edit content through the CMS

## Configuration in config.yml

```yaml
backend:
  name: github
  repo: tonibunaiasu/selfdezign.ro
  branch: main
  api_root: https://api.github.com
  site_domain: selfdezign.ro
  base_url: https://auth.decapcms.vercel.app
```

## How It Works

Decap CMS uses **external OAuth service** (`https://auth.decapcms.vercel.app`) provided by Vercel. This means:

✓ No backend server required  
✓ No need to manage tokens directly  
✓ Secure OAuth flow through Vercel's service  
✓ Automatic credential handling

## Access Management

**Who can edit content:**
- Users must be authenticated with GitHub
- The GitHub OAuth app only checks authentication, not authorization
- For role-based access, configure team permissions in GitHub

## Revoking Access

To prevent someone from accessing the CMS:
1. Go to GitHub Settings → Authorized OAuth Apps
2. Revoke the "TinaCMS Auth" application
3. Or remove their push access to the repository

## Updating Credentials

If you need to regenerate the Client Secret:
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Select "TinaCMS Auth"
3. Click "Generate a new client secret"
4. Update `DECAP_CMS_OAUTH.md` and GitHub settings

## Security Notes

⚠️ **Important:**
- Never commit the client secret directly in code
- Use GitHub Secrets for storing sensitive credentials
- Keep the OAuth app callback URL accurate
- Regularly audit who has access to your repository

## Troubleshooting

### "Login failed" error
- Verify the callback URL in GitHub OAuth settings
- Check that the domain matches exactly (including https://)
- Ensure the OAuth app is authorized

### "Permission denied" error
- Check GitHub user permissions on the repository
- Verify the GitHub user has push access to the repo
- Check GitHub OAuth app scopes

## Testing the CMS

1. Navigate to: https://www.selfdezign.ro/admin
2. Click "Login with GitHub"
3. Authorize the application
4. You should see the Decap CMS dashboard
5. Try editing a team member or creating a new page

## References

- [Decap CMS GitHub Backend](https://decapcms.org/docs/github-backend/)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Decap CMS Authentication](https://decapcms.org/docs/authentication-backends/)
