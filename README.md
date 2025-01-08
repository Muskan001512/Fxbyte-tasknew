# User Management Application

## Project Overview
This is a full-stack application for managing user profiles. The application consists of a **frontend** and a **backend**, separated into two folders:

- **Frontend**: Runs on `http://localhost:3000`
- **Backend**: Runs on `http://localhost:3002`

The application allows users to:
1. View a list of users.
2. Click on a username to view their profile.
3. Edit user information from the profile page.

---

## Features

### Backend
- Built with **Node.js** and **Express**.
- Provides API endpoints for:
  - Fetching all users.
  - Fetching a user by ID.
  - Updating user information.
- Uses **nodemon** for development to automatically restart the server on file changes.
- Main backend file: `server.js`.
- Runs on `http://localhost:3002`.

### Frontend
- Built with **React**.
- Displays a list of users fetched from the backend.
- Allows navigation to a detailed profile view for each user.
- Includes a form for editing user information with basic validation.
  -  For start Frontend use npm run start

---

## Getting Started

### Prerequisites
- **Node.js** installed on your system.
- **npm** (comes with Node.js).

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>
