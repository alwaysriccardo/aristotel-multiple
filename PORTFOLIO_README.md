# Portfolio Feature Documentation

## Overview
The portfolio feature allows admins to create projects and upload images/videos to showcase their work. Visitors can browse the portfolio by clicking on project tabs.

## Features

### Admin Panel
- **Login**: Secure authentication with username and password
- **Create Projects**: Organize media into project folders
- **Upload Media**: Support for images and videos
- **Delete**: Remove individual media items or entire projects
- **Visual Management**: Drag-and-drop interface for easy management

### Public Portfolio
- **Horizontal Tabs**: Browse projects using horizontal scrollable tabs
- **Media Grid**: Beautiful grid layout showing all media for selected project
- **Lightbox**: Click any media to view in full-screen lightbox
- **Responsive**: Works perfectly on mobile, tablet, and desktop

## How to Use

### For Administrators

#### 1. Access Admin Panel
Visit `https://your-domain.com/admin`

#### 2. Login
- Username: `aristotlemultipleadmin`
- Password: `Yeshua7!!!!!!!`

#### 3. Create a New Project
1. Click the `+` button in the sidebar
2. Enter project title (e.g., "Kitchen Renovation")
3. Enter optional subtitle (e.g., "Modern Design - Berlin")
4. Click "Create"

#### 4. Upload Media
1. Select a project from the sidebar
2. Click "Upload Media" button
3. Select one or multiple images/videos
4. Wait for upload to complete

#### 5. Delete Media
- Click the trash icon on any media item to remove it
- Click the trash icon next to a project name to delete the entire project

### For Visitors

1. Navigate to the Portfolio section on the website
2. Click on different project tabs to view their media
3. Click any image/video to view in full-screen
4. Use arrow buttons to scroll through more projects

## Technical Details

### Architecture
- **Frontend**: React + TypeScript
- **Backend**: Vercel Serverless Functions
- **Storage**: Cloudflare R2 (S3-compatible)
- **Metadata**: JSON file stored in R2

### File Structure
```
/api
  /auth
    - login.ts                → Authentication endpoint
  /portfolio
    - get.ts                 → Fetch portfolio data
    - create-project.ts      → Create new project
    - upload.ts              → Upload media
    - delete.ts              → Delete project/media
  /utils
    - r2Client.ts            → R2 storage utilities
    - auth.ts                → JWT authentication

/components
  /Admin
    - AdminLogin.tsx         → Login screen
    - AdminDashboard.tsx     → Admin interface
    - AdminPage.tsx          → Admin route wrapper
  /Portfolio
    - PortfolioSection.tsx   → Public portfolio display

portfolioTypes.ts            → TypeScript interfaces
```

### Environment Variables
Set these in Vercel dashboard:

```env
R2_ACCOUNT_ID=4080b1084a5e73d64357ba50cf235d62
R2_ACCESS_KEY_ID=0ef9915f46aa3839969e9c44f5bdeb4c
R2_SECRET_ACCESS_KEY=ee318abfd204124bb8b6c43637a31a2b4601f1d4f5d9887f4f6c8e381785b13f
R2_BUCKET_NAME=aristotel-portfolio
R2_PUBLIC_URL=https://pub-d0c9c1c7e7c84221b23e8328e2ccc4fc.r2.dev
R2_ENDPOINT=https://4080b1084a5e73d64357ba50cf235d62.r2.cloudflarestorage.com
ADMIN_USERNAME=aristotlemultipleadmin
ADMIN_PASSWORD=Yeshua7!!!!!!!
JWT_SECRET=aristotel_jwt_secret_key_2024_super_secure_random_string_change_in_production
NODE_ENV=production
```

### API Endpoints

#### `POST /api/auth/login`
Authenticate admin user
```json
Request:
{
  "username": "aristotlemultipleadmin",
  "password": "Yeshua7!!!!!!!"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "username": "aristotlemultipleadmin"
}
```

#### `GET /api/portfolio/get`
Fetch all portfolio projects
```json
Response:
{
  "projects": [
    {
      "id": "proj_123",
      "title": "Kitchen Renovation",
      "subtitle": "Modern Design",
      "folderName": "kitchen-renovation",
      "coverImage": "https://...",
      "media": [...],
      "order": 0,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### `POST /api/portfolio/create-project`
Create a new project (requires authentication)
```json
Request:
{
  "title": "Kitchen Renovation",
  "subtitle": "Modern Design"
}

Headers:
{
  "Authorization": "Bearer jwt_token_here"
}
```

#### `POST /api/portfolio/upload`
Upload media to a project (requires authentication)
```json
Request:
{
  "projectId": "proj_123",
  "file": "base64_encoded_file",
  "fileName": "image.jpg",
  "contentType": "image/jpeg",
  "caption": "Optional caption"
}

Headers:
{
  "Authorization": "Bearer jwt_token_here"
}
```

#### `POST /api/portfolio/delete`
Delete project or media (requires authentication)
```json
// Delete specific media:
{
  "projectId": "proj_123",
  "mediaUrl": "https://..."
}

// Delete entire project:
{
  "projectId": "proj_123"
}

Headers:
{
  "Authorization": "Bearer jwt_token_here"
}
```

## Deployment

### Vercel Setup
1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy

### Local Development
1. Create `.env` file with environment variables (see SETUP.md)
2. Run `npm install`
3. Run `npm run dev`
4. Access admin at `http://localhost:5173/admin`

## Security

- Admin password is verified server-side
- JWT tokens expire after 7 days
- All admin endpoints require authentication
- R2 bucket is public for reading media, but write access requires API credentials
- CORS is configured for security

## Limitations

- Max file size: ~4.5MB per file (Vercel limit)
- For larger videos, consider direct R2 upload or video compression
- Files are sent as base64 (increases payload size by ~33%)

## Future Enhancements

- [ ] Bulk upload
- [ ] Video thumbnail generation
- [ ] Image optimization/compression
- [ ] Reorder projects by drag-and-drop
- [ ] Add categories/tags to projects
- [ ] Search functionality
- [ ] Analytics tracking

## Support

For issues or questions, contact the development team.
