# Doctor Booking Platform

This project is a comprehensive Doctor Booking Platform built using **React**, **TypeScript**, **Vite**, and includes both **admin** and **user** sections. The platform leverages a separate backend for handling user, doctor, and appointment management. It also integrates with **MongoDB** via **Mongoose** and utilizes **JWT** for authentication and **Cloudinary** for handling doctor profile image uploads.

## Features

### Admin Section

- **Doctor Management**: Admins can add new doctors, including their specialties, degrees, fees, and upload their profile picture to Cloudinary.
- **Appointment Management**: Admins can view and manage all appointments.
- **Doctor Overview**: Admins can view all registered doctors with details.

### Doctor Section

- **Profile Management**: Doctors can manage their profiles and update their availability.
- **Appointment Overview**: Doctors can view upcoming appointments and manage their schedule.

### User Section

- **Doctor Search**: Users can search for doctors based on specialty, location, and availability.
- **Appointment Booking**: Users can book, cancel, or reschedule appointments with doctors.
- **Authentication**: Secure signup/login with JWT-based token authentication.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express.js
  - **JWT** for secure authentication
  - **Mongoose** for MongoDB integration
  - **Cloudinary** for storing doctor profile pictures
- **Database**: MongoDB
- **Deployment**: Cloudinary for image uploads

## Project Structure

- **Admin Side**: Admins can handle doctor and appointment management.
- **User Side**: Users can search for doctors and book appointments.
- **Doctor Side**: Doctors can manage their profiles and view appointments.

## Setup Instructions

1. **Clone the repository**:
   Admin Repository

   ```bash
   git clone https://github.com/Sushank-ghimire/medSync-admin.git
   cd admin
   ```

   Backend Repository

   ```bash
   git clone git clone https://github.com/Sushank-ghimire/medSync-server.git
   cd server
   ```

   Client Repository

   ```bash
   git clone git clone https://github.com/Sushank-ghimire/medSync-client.git
   cd client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Configure your `.env` file with the following keys:
     ```env
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```

4. **Run the frontend**:
   for client and admin

   ```bash
   npm run dev
   ```

5. **Run the backend**:
   Navigate to the `server` folder and run:
   ```bash
   npm start
   ```

## API Endpoints

### User API

- **POST /api/v1/user/register**: Register a new user.
- **POST /api/v1/users/login**: User login and receive JWT token.
- **GET /api/v1/doctors**: Retrieve available doctors.
- **POST /api/v1/users/appointments**: Book an appointment.

### Admin API

- **POST /api/v1/admin/addDoctor**: Add a new doctor to the database, including uploading their profile picture to Cloudinary.
- **GET /api/v1/admin/appointments**: View and manage appointments.

## Key Components

### 1. Admin Dashboard

- Allows admins to add doctors, manage appointments, and view doctor details.
- Connects to the admin backend for fetching and managing data.

### 2. Doctor Search & Booking

- Users can search for doctors and book appointments.
- JWT-secured routes ensure only authenticated users can book appointments.

### 3. Profile Management

- Doctors can update their profiles and view/manage their schedules.

## Cloudinary Integration

This project uses **Cloudinary** for uploading and managing doctor profile pictures. The `image` field in the doctor’s form is uploaded directly to Cloudinary, and the Cloudinary URL is stored in the database.

## Authentication & Authorization

- **JWT Authentication**: Both users and admins log in securely via JWT tokens.
- **Protected Routes**: Admin and doctor actions are secured via middleware that checks for valid JWT tokens.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
