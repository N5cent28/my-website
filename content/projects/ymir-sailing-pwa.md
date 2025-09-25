---
title: "Ymir Sailing Club PWA"
description: "Progressive Web App for boat rental management and member administration at a sailing club in Iceland"
image: "/images/Ymir_logo.png"
weight: 5
ShowToc: true
---

## Project Links

<div class="project-links">
  <a href="https://siglingafelagidymir.com/en" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Live Application</span>
  </a>
  <a href="/documents/Ymir_PWA/PWA_FUNCTIONALITY_GUIDE.html" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Technical Implementation Guide</span>
  </a>
</div>

## Overview

Developed a comprehensive Progressive Web App (PWA) for the Ymir Sailing Club in Reykjavik, Iceland, to modernize their boat rental and member management system. The application facilitates safe boat checkouts, real-time monitoring, and automated safety notifications for a sailing club with 16 boats and multiple members.

## Key Features

### Core Functionality
- **Digital Boat Checkout System**: QR code-based instant boat rental process
- **Real-Time Safety Monitoring**: Automated notifications for overdue boats and missed check-ins
- **Member Management**: Complete member database with PIN-based authentication
- **Admin Dashboard**: Comprehensive management interface for club administrators
- **Multi-Language Support**: English and Icelandic language support
- **Mobile-First Design**: Optimized for mobile devices with offline capabilities

### Safety & Monitoring
- **Overdue Alerts**: Automatic notifications when boats are overdue for return
- **Real-Time Tracking**: Live monitoring of all boats currently on the water
- **Force Check-In**: Admin capability to handle emergency situations
- **Maintenance Management**: System for reporting and tracking boat issues

![Admin Dashboard](/images/Ymir_admin_dash.png)

![Activity Monitoring](/images/Ymir_actions.png)

## Technical Architecture

### Frontend: Astro Framework
- **Server-Side Rendering (SSR)**: Pages rendered on server for optimal performance
- **Component-Based Architecture**: Reusable UI components for maintainability
- **Zero-JavaScript by Default**: Only loads JavaScript when needed
- **Progressive Web App**: Installable with offline capabilities and push notifications

### Backend: Netlify Functions
- **Serverless Architecture**: Auto-scaling serverless functions
- **Event-Driven**: Execute code in response to HTTP requests
- **Cost-Effective**: Pay only for actual usage
- **Global Distribution**: Deploy to multiple regions for low latency

### Database: PostgreSQL (Neon)
- **Relational Database**: Structured data storage with entity relationships
- **ACID Compliance**: Ensures data integrity and consistency
- **Cloud-Hosted**: Managed database service with automatic backups
- **Scalable**: Handles growing amounts of data and users

## Technical Implementation

### Database Design
```sql
-- Core tables for member and boat management
CREATE TABLE members (
  member_number TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  pin TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE boats (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'operational',
  boat_type TEXT DEFAULT 'individual',
  last_maintenance TIMESTAMP,
  notes TEXT
);
```

### Key Technical Features
- **QR Code Integration**: Each boat has unique QR code for instant checkout
- **Push Notifications**: Web Push API for real-time alerts
- **Service Worker**: Background script for offline functionality and notifications
- **PIN-Based Authentication**: Simple 3-digit PIN system for mobile optimization
- **Real-Time Updates**: Live boat status and member activity tracking

### API Endpoints
- `POST /api/member-login` - Member authentication
- `GET /api/boat-status` - Get boat availability
- `POST /api/check-in` - Check out a boat
- `POST /api/check-out` - Check in a boat
- `POST /api/push-subscription` - Subscribe to notifications

## Project Impact

### Safety Improvements
- **Automated Safety Monitoring**: Eliminates manual tracking of boat returns
- **Immediate Overdue Alerts**: Ensures boats are returned safely and on time
- **Emergency Response**: Force check-in capability for urgent situations
- **Maintenance Tracking**: Proactive issue reporting and resolution

### Operational Efficiency
- **Digital Checkout Process**: Eliminates paper-based rental system
- **Real-Time Visibility**: Admins can monitor all boat activity instantly
- **Member Self-Service**: Members can check out boats independently
- **Data Analytics**: Comprehensive usage tracking and reporting

### User Experience
- **Mobile-Optimized**: Works seamlessly on smartphones and tablets
- **Offline Capable**: Functions without internet connection
- **Multi-Language**: Serves both English and Icelandic speakers
- **Installable**: Can be installed as a native app on mobile devices

## Development Process

### Requirements Analysis
- Worked directly with sailing club management to understand operational needs
- Identified key pain points in existing paper-based system
- Prioritized safety features and real-time monitoring capabilities

### Technical Challenges Solved
- **QR Code Integration**: Developed seamless mobile checkout experience
- **Real-Time Notifications**: Implemented reliable push notification system
- **Multi-Language Support**: Created language-specific routing and content
- **Mobile Optimization**: Ensured smooth experience across all devices
- **Offline Functionality**: Implemented service worker for offline capabilities

### Deployment & Infrastructure
- **Netlify Hosting**: Global CDN with automatic deployments
- **PostgreSQL Database**: Managed database service with automatic backups
- **CI/CD Pipeline**: Automated testing and deployment on code changes
- **Environment Management**: Secure configuration and environment variables

## Results & Outcomes

The PWA successfully modernized the sailing club's operations, providing:
- **Improved Safety**: Automated monitoring prevents boats from being forgotten
- **Enhanced Efficiency**: Digital system reduces administrative overhead
- **Better Member Experience**: Easy-to-use mobile interface for boat rentals
- **Real-Time Visibility**: Club administrators have complete oversight of operations
- **Scalable Solution**: System can grow with the club's needs

This project demonstrates full-stack development skills, real-world problem solving, and the ability to create user-friendly solutions for non-technical users in a professional setting.
