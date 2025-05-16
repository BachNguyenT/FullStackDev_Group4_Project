# Event Planning & Management System

Full Stack Development 2025A
Group 4
RMIT University

## Group Members & Contribution Scores
- Nguyen Trong Bach - s4044878 - Score: 5
- Do Phan Viet Anh - s4063835 - Score: 5
- Ngo Hoang Viet - s3998350 - Score: 5
- Vu Van Tuan - s4040269 - Score: 5
- Tran Thanh Lam - s4038329 - Score: 5

## Project Overview
The Event Planning & Management System is a comprehensive full stack web application using the PERN stack, including PostgreSQL database hosted with Neon services, ExpressJS and NodeJS for RESTful Backend APIs, and React for frontend user interfaces. The application is designed to facilitate event creation, management, and participation. It provides different interfaces for various user roles including admins, organizers, and attendees.

Note: Admin account for system:
UserName: admin123
Password: admin123

User account with preset events:
UserName: bonabona
Password: bonabona

Application Demo Video link: https://rmiteduau-my.sharepoint.com/:v:/r/personal/s4038329_rmit_edu_vn/Documents/Fullstack%20Development%20Group%20Project/FSvideo.mp4?csf=1&web=1&e=YR1sRS&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

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
- Node.js 16 or later (Download at https://nodejs.org/en/download)
- NPM 8 or later (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation & Setup

1. Clone the repository

2. Install backend dependencies
```bash
# In the root directory
cd ./FullStackDev_Group4_BackEnd
npm install
```

3. Configure environment variables
```bash
# In the backend directory
cp .env.example .env
```

4. Install frontend dependencies
```bash
# In the root directory
cd ./FullStackDev_Group4_Project
npm install
```

5. Run the application
```bash
# In the root directory
cd ./FullStackDev_Group4_BackEnd
node main.js
________

# In the root directory (separate terminal)
cd ./FullStackDev_Group4_Project
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
