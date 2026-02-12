# Portfolio Setup Instructions

## Environment Variables

You need to set these environment variables in your `.env` file locally and in Vercel:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=4080b1084a5e73d64357ba50cf235d62
R2_ACCESS_KEY_ID=0ef9915f46aa3839969e9c44f5bdeb4c
R2_SECRET_ACCESS_KEY=ee318abfd204124bb8b6c43637a31a2b4601f1d4f5d9887f4f6c8e381785b13f
R2_BUCKET_NAME=aristotel-portfolio
R2_PUBLIC_URL=https://pub-d0c9c1c7e7c84221b23e8328e2ccc4fc.r2.dev
R2_ENDPOINT=https://4080b1084a5e73d64357ba50cf235d62.r2.cloudflarestorage.com

# Admin Authentication
ADMIN_USERNAME=aristotlemultipleadmin
ADMIN_PASSWORD=Yeshua7!!!!!!!
JWT_SECRET=aristotel_jwt_secret_key_2024_super_secure_random_string_change_in_production

# Environment
NODE_ENV=production
```

## Vercel Setup

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add all the variables above
4. Redeploy your project

## Local Development

1. Create a `.env` file in the root directory
2. Copy the variables above into it
3. Run `npm run dev`
4. Access admin panel at `/admin`
5. Log in with the credentials above
