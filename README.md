# Metro Rail Management System - Frontend (Next.js & React)

This repository contains the frontend for the Metro Rail Management System demonstration project. The system provides a modern, responsive web interface for both metro administrators and passengers, enabling seamless metro operations and digital ticketing.

---

## Project Overview

This frontend powers the web-based admin dashboard and passenger portal for Metro Rail. It is designed to be user-friendly, scalable, and visually appealing, integrating tightly with the backend REST API.

- **Frontend:** Next.js (TypeScript, React, Tailwind CSS)
- **Backend:** [Express.js (Node.js)](https://github.com/MarufSiddikiGalib/metro-rail-backend)
- **Database:** Oracle SQL
- **Authentication:** JWT (via backend)
- **PDF/QR Ticketing:** Consumed from backend

---

## Features

- **Admin Dashboard:** Manage trains, routes, drivers, schedules, staff, tickets, reservations, and more
- **Passenger Portal:** Fare calculation, ticket booking, timetable, travel rules, and more
- **Journey Planner:** Plan your metro journey with intelligent route suggestions and time estimates
- **Metro Map:** Interactive, user-friendly metro map for easy navigation and station info
- **Authentication:** Secure JWT-based login for admins
- **Digital Tickets:** Downloadable PDF ticket with QR code for validation
- **Modern UI:** Responsive layout using React and Tailwind CSS
- **API Integration:** Connects to Express.js backend for all data and operations

---

## Tech Stack

- **Framework:** Next.js (React, App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Font Optimization:** [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Geist)
- **API Layer:** RESTful integration with backend
- **Environment Management:** dotenv

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/metro-rail-frontend.git
cd metro-rail-frontend
```

### 2. Install Dependencies

```bash
npm install
```
or
```bash
yarn install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root with your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Run the Development Server

```bash
npm run dev
```
or
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Authentication

- Admins log in using credentials, receiving a JWT token
- JWT is stored securely and used for all protected API requests

---

## Ticketing

- Booked tickets are available for download as PDFs
- Each ticket contains a unique QR code for validation and entry

---

## Main Pages & Routes

- `/admin/dashboard` — Admin dashboard (secure)
- `/trains`, `/routes`, `/schedules` — Management pages
- `/passenger` — Passenger portal
- `/fare`, `/booking`, `/timetable` — Passenger tools
- `/journey-planner` — **Journey Planner:** Plan your route and get optimal journey options
- `/maps` — **Metro Map:** Interactive metro map for navigation and information
- `/ticket` — Ticket downloads and info

---

## Contributing

1. Fork the repo & create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Create a Pull Request

---

## Deployment

- **Frontend:** Deploy easily to [Vercel](https://vercel.com/) or your preferred hosting
- **Backend:** Ensure the backend API is accessible at the URL specified in `.env.local`

---

## Project Structure

- `app/`: Next.js app directory (pages, routing)
- `components/`: Reusable React UI components
- `styles/`: Tailwind and global CSS
- `public/`: Static assets

---

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Metro Rail Backend](https://github.com/MarufSiddikiGalib/metro-rail-backend)

---

## License

This project is for demonstration and educational purposes.

---

*Developed with ❤️ by Maruf Siddiki Galib.*
- [Linkedin](https://www.linkedin.com/in/maruf-siddiki-galib-7360092b5/)