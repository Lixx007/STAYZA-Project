# 🏨 Stayza – Hotel Booking Platform

Stayza is a full-stack hotel booking platform that allows users to search for hotels, check room availability, book rooms, and make secure online payments.

Hotel owners/admins can manage hotels, rooms, pricing, and bookings through role-based access.

🔗 **Live Demo:** https://stayza.vercel.app/

---

## 📌 Project Overview

Stayza is designed to simulate a real-world hotel booking application with features such as:

- User authentication and authorization
- Hotel and room management
- Hotel search and availability checking
- Online room booking
- Secure Stripe payments
- Role-based access control
- RESTful API communication
- Booking management
- Concurrent booking handling
- Automatic release of expired room locks

The project was built to gain practical experience with full-stack development, REST APIs, authentication, database management, payment integration, and scalable application architecture.

---

## 🚀 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Browse available hotels
- Search and filter hotels
- View hotel and room details
- Check room availability
- Book rooms
- Make online payments
- View booking history

### 🏨 Hotel Owner / Admin Features

- Add and manage hotels
- Add and manage rooms
- Update room pricing
- Manage room availability
- Manage bookings
- Access management dashboard

### 🔐 Security Features

- JWT authentication
- Role-based access control
- Protected API routes
- Backend authorization middleware
- Secure payment processing through Stripe

### 💳 Payment Integration

Stayza uses Stripe for online payments.

Payment flow:

1. User selects a room
2. Room availability is checked
3. Room is temporarily locked
4. Backend creates a Stripe Checkout Session
5. User completes payment
6. Stripe sends a webhook event
7. Backend updates the booking status
8. Booking is confirmed

Sensitive card information is handled by Stripe and is not stored by the application.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Authentication

- JSON Web Token (JWT)
- Role-Based Access Control (RBAC)

### Payment

- Stripe
- Stripe Webhooks

### Tools

- Git
- GitHub
- VS Code
- Postman

---

## 🏗️ System Architecture

```text
                    ┌─────────────────┐
                    │     User        │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   React.js      │
                    │   Frontend      │
                    └────────┬────────┘
                             │
                        REST APIs
                             │
                             ▼
                    ┌─────────────────┐
                    │ Node.js +       │
                    │ Express.js      │
                    └───────┬─────────┘
                            │
               ┌────────────┼────────────┐
               ▼            ▼            ▼
        ┌────────────┐ ┌─────────┐ ┌──────────┐
        │  MongoDB   │ │  JWT    │ │  Stripe  │
        │  Database  │ │  Auth   │ │ Payments │
        └────────────┘ └─────────┘ └──────────┘
