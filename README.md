# Event Planning & Management System

Full Stack Development 2025A
RMIT University

## Group Members & Contribution Scores
- Nguyen Trong Bach - s4044878 - Score: 5
- Do Phan Viet Anh - s4063835 - Score: 5
- Ngo Hoang Viet - s3998350 - Score: 5
- Vu Van Tuan - s4040269 - Score: 5
- Tran Thanh Lam - s4038329 - Score: 5

## Project Overview
The Event Planning & Management System is a comprehensive full stack web application designed to facilitate event creation, management, and participation. It provides different interfaces for various user roles including admins, organizers, and attendees.
<br>
<p>Note: Admin account for system:</p>
<p>UserName: admin123</p>
<p>Password: admin123</p>

### Key Features
- User authentication and role-based access control
- Event creation and management
- RSVP system for invitations
- Public and private event handling
- Discussion board for event-related communication
- Notification system for reminders and updates
- Real-time statistics and reporting

## Tech Stack
- React.js for frontend
- Node.js and Express.js for backend
- PostgreSQL for database
- Neon for database hosting
- Tailwind for UI styling
- RESTful API architecture
- Cookie for authentication and authorization

## System Requirements
- Node.js 16 or later
- NPM 8 or later
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

1. Clone the repository

2. Install backend dependencies
```bash
cd ./FullStackDev_Group4_BackEnd
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env file with your database credentials and other config
```

4. Install frontend dependencies
```bash
cd ./frontend
npm install
```

5. Run the application
```bash
# In backend directory
node main.js

# In frontend directory (separate terminal)
npm run dev
```

## User Roles & Functionalities

### Attendee
- Register and manage personal profile
- View public events
- Request to join public events
- Respond to event invitations (RSVP)
- Participate in event discussions
- Receive notifications about event updates and reminders

### Organizer
- Create public or private events
- Send invitations to potential participants
- Track RSVP responses
- Configure notification reminders
- Manage event details and updates
- View event statistics and insights
- Moderate event discussions

### Admin
- Full system access
- Configure system settings (max events per user, max invitations, etc.)
- Access system-wide statistics
- Manage user accounts
- Monitor event activities

## Database Schema
The system uses a database with the following main entities:
- Users (Admins, Organizers, Attendees)
- Events
- Invitations
- RSVPs
- Discussions
- Notifications

## Features Implemented

### Frontend
- User registration and login interfaces
- Role-based UI components
- Event creation and management dashboards
- RSVP system with response tracking
- Discussion board with threaded comments
- Notification center for event reminders
- Mobile-responsive design implementation
- Settings management for administrators

### Backend
- RESTful API endpoints for all core features
- JWT authentication and role-based authorization
- File upload functionality for event images
- Database models and relationships
- Event statistics and reporting APIs
- Input validation and sanitization
- Error handling middleware

## Future Enhancements
- Calendar integration
- Event location mapping
- Advanced search and filtering
- Email notification integration
- Payment processing for paid events
- Mobile application development

## Acknowledgments
- RMIT University Full Stack Development teaching team
- React and Node.js documentations
- MongoDB/MySQL documentations
