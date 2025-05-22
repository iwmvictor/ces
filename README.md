# CCES - Citizen Complaints & Engagement System

> A centralized, user-centric platform for citizens to submit complaints and engage with government agencies—streamlining feedback, boosting transparency, and improving response times.

![CCES Screenshot](./preview.png) <!-- Optional: Replace with your actual image path -->

## Live Demo

- 🌐 Frontend: [https://cesonline.vercel.app](https://cesonline.vercel.app)
- ⚙️ Backend: [https://ces-be.onrender.com](https://ces-be.onrender.com/docs)
- 📑 API Docs: [Swagger Documentation](https://ces-be.onrender.com/docs/)

---

## Summary

**CCES** is a fullstack web application that empowers citizens to submit complaints or feedback on public services. The system intelligently routes submissions to appropriate government agencies, allowing real-time interaction and status tracking.

Developed with scalability and usability in mind, the system ensures fast and accessible citizen engagement with built-in authentication, AI-assisted routing, and email notifications.

---

## Tech Stack

| **Layer**     | **Technology**               |
| --------      | ---------------------------- |
| **Frontend**  | React JS (Vite)        |
| **Styling**   | SCSS                         |
| **Backend**   | Node.js + Express.js         |
| **Database**  | Supabase                     |
| **Auth**      | JWT (with role-based access) |
| **Docs**      | Swagger                      |


---

## Core Features

- **Complaint Submission** – Citizens can register and submit complaints easily.
- **AI-Assisted Routing** – Complaints are automatically routed to the relevant government agency using an internal model.
- **Categorization** – Complaints are categorized by type to ensure proper handling.
- **Ticket Tracking** – Citizens can track the status of their submissions.
- **Agency Dashboard** – Organizations can respond to complaints and manage their inbox.
- **Authentication** – Secure login with role-based access for:
- `Citizen` – Submits complaints
- `Organization` – Handles incoming complaints
- `Admin` – Manages users and settings
- **Email Notifications** – Citizens receive updates via email.
- **Mobile-Responsive** – Optimized for smartphones and tablets.

---

## UI/UX Design Philosophy

- **Minimal & Functional**: Clean interface focused on delivering function without clutter.
- **User-Centered**: Designed with accessibility and intuitiveness as top priorities.
- **Responsive**: Works seamlessly across desktop, tablet, and mobile devices.
- **Custom-Built**: All UI components were designed from scratch in **Figma**, inspired by familiar patterns but uniquely tailored for this project.

---

## Authentication & Roles

Implemented with JWT:

- **Citizen**: Submits and tracks complaints.
- **Organization**: Receives and responds to routed complaints.
- **Admin**: Manages system users and configurations.

---

## API Documentation

Visit the live Swagger documentation here:  
**[https://ces.onrender.app/api-docs](https://ces.onrender.app/api-docs)**

---

## AI-Assisted Routing

A simple but functional model was built to route complaints based on category and keywords. Though not deeply complex due to time limits, it shows promising scalability with future ML integration.

---

## Challenges Faced

- Limited time to balance backend, frontend, and model integration.
- Learning curve around designing an effective routing model.
- Managing state and role-based views securely and intuitively.
- Light/Dark mode support deferred due to focus on core functionality.

---

## Future Improvements

- Native Mobile App (iOS + Android)
- Chatbot Assistant for instant citizen support
- Community/Forum integration for public discussions
- Advanced analytics dashboard for agencies
- Full audit trail and complaint history

---

## Author

**Iwmvictor**  
[Behance](https://www.behance.net/iwmvictor) • [GitHub](https://github.com/iwmvictor) • [Pinterest](https://www.pinterest.com/iwmvictor) • [Portfolio](https://iwmvictor.vercel.app)

---

> _Built for a better citizen experience, one complaint at a time._
