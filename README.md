# Portfolio CMS Backend

Backend API for Portfolio CMS built with Node.js, Express, MongoDB, and Supabase Storage.

## 🚀 Features

- RESTful API for portfolio content management
- MongoDB database integration
- Supabase cloud storage for images
- CORS enabled for frontend integration
- Comprehensive data models for all portfolio sections
- Database seeding and analysis scripts
- File upload capabilities

## 📁 Project Structure

```
backend/
├── config/
│   └── supabase.js          # Supabase storage configuration
├── controllers/             # Request handlers
│   ├── about.controller.js
│   ├── blog.controller.js
│   ├── contact.controller.js
│   ├── experience.controller.js
│   ├── hero.controller.js
│   ├── project.controller.js
│   ├── service.controller.js
│   ├── skill.controller.js
│   ├── testimonial.controller.js
│   └── upload.controller.js
├── models/                  # MongoDB schemas
│   ├── About.model.js
│   ├── Blog.model.js
│   ├── Contact.model.js
│   ├── Experience.model.js
│   ├── Hero.model.js
│   ├── Project.model.js
│   ├── Service.model.js
│   ├── Skill.model.js
│   └── Testimonial.model.js
├── routes/                  # API routes
│   ├── about.routes.js
│   ├── blog.routes.js
│   ├── contact.routes.js
│   ├── experience.routes.js
│   ├── hero.routes.js
│   ├── project.routes.js
│   ├── service.routes.js
│   ├── skill.routes.js
│   ├── testimonial.routes.js
│   └── upload.routes.js
├── scripts/                 # Utility scripts
│   ├── analyzeDatabase.js   # Database analysis tool
│   └── seedDatabase.js      # Database seeding tool
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
└── server.js                # Application entry point
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Supabase account (for cloud storage)

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio_cms
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_cms

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=portfolio-images

# JWT Configuration (for future authentication)
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### 3. Supabase Storage Setup

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project (if you don't have one)
3. Navigate to Storage → Create a new bucket named `portfolio-images`
4. Set the bucket to **Public** (or configure access policies)
5. Copy your project URL and API keys to `.env`

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally and start the service
mongod
```

#### Option B: MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and add to `.env`

### 5. Seed Database

Seed the database with initial data from JSON files:

```bash
npm run seed
```

This will populate all collections with data from the `data/` folder.

### 6. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start at `http://localhost:5000`

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Hero Section
- `GET /api/hero` - Get hero data
- `PUT /api/hero` - Update hero data

### About Section
- `GET /api/about` - Get about data
- `PUT /api/about` - Update about data

### Projects
- `GET /api/projects` - Get all projects
- `PUT /api/projects` - Update all projects
- `POST /api/projects` - Add a new project
- `DELETE /api/projects/:projectId` - Delete a project

### Blogs
- `GET /api/blogs` - Get all blogs
- `PUT /api/blogs` - Update all blogs
- `POST /api/blogs` - Add a new blog
- `DELETE /api/blogs/:blogId` - Delete a blog

### Skills
- `GET /api/skills` - Get skills data
- `PUT /api/skills` - Update skills data

### Experience
- `GET /api/experience` - Get experience data
- `PUT /api/experience` - Update experience data

### Services
- `GET /api/services` - Get services data
- `PUT /api/services` - Update services data

### Testimonials
- `GET /api/testimonials` - Get testimonials data
- `PUT /api/testimonials` - Update testimonials data

### Contact
- `GET /api/contact` - Get contact data
- `PUT /api/contact` - Update contact data
- `POST /api/contact/submit` - Submit contact form

### File Upload (Supabase)
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `DELETE /api/upload` - Delete file
- `GET /api/upload/url` - Get public URL for file

## 🔧 Utility Scripts

### Analyze Database

Analyze your MongoDB database structure and get recommendations:

```bash
npm run analyze-db
```

This script will:
- List all collections
- Show document counts
- Display sample documents
- Analyze field consistency
- Provide optimization recommendations

### Seed Database

Populate database with initial data:

```bash
npm run seed
```

## 🔐 Security Features

- Helmet.js for security headers
- CORS configuration
- File upload validation (type & size)
- Environment variable protection
- MongoDB injection prevention

## 📝 API Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Response message",
  "data": {...}
}
```

## 🐛 Debugging

Enable detailed logging by setting:

```env
NODE_ENV=development
```

## 🚢 Deployment

### Production Checklist

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Configure production MongoDB URI
4. Set up proper CORS origins
5. Enable HTTPS
6. Set up monitoring and logging

### Deployment Platforms

- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **AWS/Azure**: Use PM2 or Docker

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **@supabase/supabase-js**: Cloud storage
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **helmet**: Security headers
- **morgan**: HTTP request logger
- **multer**: File upload handling
- **compression**: Response compression

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License
