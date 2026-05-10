# Deployment on Render, Railway, Heroku, etc.

## Quick Deploy Buttons

### Render.com (Recommended)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/manshakotra-spec/Mansa.)

### Railway.app
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/manshakotra-spec/Mansa.)

## Environment Variables for Different Platforms

### Render.com
```
NODE_ENV=production
PORT=5678
DB_TYPE=sqlite
VUE_APP_GEMINI_API_KEY=sk-...
N8N_BASIC_AUTH_PASSWORD=your_secure_password
ENCRYPTION_KEY=generate_strong_key
JWT_SECRET=generate_strong_secret
```

### Railway.app
```
NODE_ENV=production
PORT=$PORT (Railway sets this automatically)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=$PGHOST
DB_POSTGRESDB_USER=$PGUSER
DB_POSTGRESDB_PASSWORD=$PGPASSWORD
DB_POSTGRESDB_DATABASE=$PGDATABASE
VUE_APP_GEMINI_API_KEY=sk-...
```

### Heroku
```
heroku config:set NODE_ENV=production
heroku config:set VUE_APP_GEMINI_API_KEY=sk-...
heroku config:set DB_TYPE=postgresdb
heroku addons:create heroku-postgresql:hobby-dev
```

### DigitalOcean/EC2
```bash
export NODE_ENV=production
export VUE_APP_GEMINI_API_KEY=sk-...
export N8N_BASIC_AUTH_PASSWORD=secure_password
export DB_TYPE=postgresdb
export DB_POSTGRESDB_HOST=your-db-host
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Set `VUE_APP_GEMINI_API_KEY` from Google AI
- [ ] Generate `ENCRYPTION_KEY` and `JWT_SECRET`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Enable HTTPS/SSL
- [ ] Set strong `N8N_BASIC_AUTH_PASSWORD`
- [ ] Configure CORS for your domain
- [ ] Setup monitoring and alerts
- [ ] Configure backups
- [ ] Setup logging

## Performance Tips

1. **Use PostgreSQL** for production (SQLite is single-threaded)
2. **Enable caching** with Redis
3. **Set appropriate timeouts** based on your workflows
4. **Monitor memory usage** (Node.js needs 2GB+)
5. **Use CDN** for static assets
6. **Enable gzip compression**

## Scaling Guide

- **Render Free Tier**: ~10 users
- **Railway $5/month**: ~50 users
- **Heroku Standard Dyno**: ~100 users
- **EC2/DigitalOcean**: Unlimited (based on instance size)

## Support

- Repository: https://github.com/manshakotra-spec/Mansa.
- Issues: https://github.com/manshakotra-spec/Mansa./issues
- Discussions: https://github.com/manshakotra-spec/Mansa./discussions
