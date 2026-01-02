# Nginx Cache Configuration Guide

## Performance Optimization for selfdezign.ro

This guide configures browser and server caching for optimal performance.

## Add to Nginx Configuration

Add this to `/etc/nginx/sites-available/selfdezign.ro` inside the `server` block:

```nginx
# Browser caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# HTML files - shorter cache
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# API responses - no cache
location ~* \.json$ {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0";
}

# Gzip compression
gzip on;
gzip_types text/plain text/css text/javascript application/javascript application/json;
gzip_comp_level 6;
gzip_disable "msie6";
```

## Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Cache Strategy

- **Assets** (CSS, JS, images): 30 days - immutable
- **HTML**: 1 hour - must-revalidate
- **API/JSON**: No cache - fresh on every request

## Performance Impact

- Reduces server load by 60-80%
- Faster page loads for repeat visitors
- Better mobile performance
