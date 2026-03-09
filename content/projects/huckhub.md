---
title: "HuckHub - Madison Ultimate Throwing Partner Finder"
description: "A Progressive Web App connecting Madison's ultimate frisbee community for skill development and community building"
image: "/images/HHgoldring_thumb.png"
weight: 3
ShowToc: true
---

## Project Links

<div class="project-links">
  <a href="https://huckhub.netlify.app" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>Live Application</span>
  </a>
  <a href="https://github.com/N5cent28/HuckHub" class="project-link" target="_blank" rel="noopener noreferrer">
    <span>GitHub Repository</span>
  </a>
</div>

## Overview

HuckHub is a location-based Progressive Web App designed specifically for Madison's ultimate frisbee community. The app addresses a common challenge faced by ultimate players: finding consistent throwing partners to improve their skills between league seasons and pickup games.

### The Problem
- New players struggle to find mentors and practice partners
- Experienced players want to maintain skills during off-seasons
- Limited visibility into who's available for impromptu throwing sessions
- Geographic barriers to finding nearby players

### The Solution
A mobile-first PWA that connects players based on location, skill level, availability, and league experience, fostering skill development and community connections.

![App Icon](/images/HH_disc_logo.png)

## Key Features

### Location-Based Matching
- GPS-enabled park discovery and matching
- Integration with Madison's park system
- Custom location submissions with admin approval
- Radius-based partner suggestions

### Smart Compatibility System
- Skill level matching (1-10 scale)
- League experience preferences (MUFA, college/club, recreational)
- Availability scheduling with time slot preferences
- Mutual interest verification before connections

### Community Safety Features
- Age verification (18+ requirement)
- User reporting and blocking systems
- Admin moderation capabilities
- Clear safety guidelines for in-person meetings
- Privacy-focused design with minimal data collection

### Real-Time Communication
- Push notifications for throwing requests
- Email notifications with custom templates
- In-app messaging system
- Contact sharing with mutual consent

## Technical Implementation

### Frontend Architecture
- **Framework**: Next.js 15.5.4 with React 19
- **Styling**: Tailwind CSS for responsive design
- **Type Safety**: TypeScript throughout
- **State Management**: Zustand for client-side state
- **Form Handling**: React Hook Form with Zod validation

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with email verification
- **API Routes**: Next.js API routes with server-side rendering
- **Real-time**: Supabase real-time subscriptions
- **File Storage**: Supabase Storage for user uploads

### Progressive Web App Features
- **Service Worker**: Custom PWA implementation
- **Offline Capability**: Basic functionality without internet
- **App Installation**: Native app-like experience
- **Push Notifications**: Browser notification API
- **Responsive Design**: Mobile-first approach

### Security & Privacy
- **Data Encryption**: HTTPS/TLS in transit, Supabase encryption at rest
- **Row Level Security**: Database-level access controls
- **No Tracking**: Zero analytics or third-party tracking
- **GDPR Compliance**: User data deletion and privacy controls
- **Age Verification**: 18+ requirement with legal compliance

## Technical Challenges & Solutions

### Real-Time Location Matching
**Problem**: Efficiently matching users based on proximity and availability
**Solution**: Implemented geospatial queries with Supabase PostGIS, caching frequently accessed location data, and optimizing database indexes for performance.

### Mobile-First PWA Development
**Problem**: Creating a native app experience without app store distribution
**Solution**: Leveraged Next.js PWA capabilities, implemented service workers for offline functionality, and designed touch-optimized interfaces.

### User Safety & Moderation
**Problem**: Ensuring safe interactions in a location-based social app
**Solution**: Implemented comprehensive safety features including age verification, user reporting, admin moderation, and clear community guidelines.

## Community Impact

### Supporting MUFA's Mission
HuckHub directly aligns with the Madison Ultimate Frisbee Association's mission to "promote the growth and development of the sport of Ultimate" by:

- **Skill Development**: Providing consistent practice opportunities
- **Community Building**: Connecting players across different league levels
- **New Player Support**: Helping beginners find mentors
- **Off-Season Engagement**: Keeping players active between league seasons

### Measurable Benefits
- **Accessibility**: Free tool available to all Madison ultimate players
- **Inclusivity**: Welcoming environment for all skill levels
- **Safety**: Comprehensive safety measures and community guidelines
- **Growth**: Supporting the sport's development in Madison

## Project Statistics

- **Lines of Code**: ~8,000+ lines
- **Database Tables**: 12 optimized tables
- **API Endpoints**: 15+ RESTful endpoints
- **User Interface**: 20+ responsive components
- **Test Coverage**: Comprehensive error handling and validation

## Technical Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15.5.4, React 19, TypeScript |
| **Styling** | Tailwind CSS, Responsive Design |
| **Backend** | Next.js API Routes, Supabase |
| **Database** | PostgreSQL (Supabase) |
| **Authentication** | Supabase Auth |
| **Deployment** | Netlify, Continuous Integration |
| **PWA** | Service Workers, Web App Manifest |
| **State Management** | Zustand, React Hooks |
| **Form Handling** | React Hook Form, Zod Validation |

## Future Enhancements

### Planned Features
- **Skill-Based Pickup**: Support impromptu pickup in good weather
- **Group Throwing**: Organize larger throwing sessions / drills

### Community Expansion
- **Regional Growth**: Expand to other cities
- **League Integration**: Deeper integration with MUFA systems
- **Youth Programs**: Safe environment for younger players (with parental consent)

## Recognition & Impact

### Community Response
- Positive feedback from Madison ultimate community
- Increased throwing session frequency among users
- Successful integration with local ultimate culture
- Recognition from MUFA leadership for community contribution

### Technical Achievement
- Successful PWA implementation without app store dependency
- Robust security and privacy implementation
- Scalable architecture supporting community growth
- Clean, maintainable codebase with comprehensive documentation

This project represents my commitment to using technology to strengthen local communities and support the sports I'm passionate about. HuckHub demonstrates how thoughtful application design can solve real-world problems while fostering positive social connections.
