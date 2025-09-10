# EventHub

EventHub is a simple web app where users can create, view, and manage events.  
You can sign up for an account, log in, and add your own events. Other users can see events and get details about them.

---

## Features
- User sign up and login (with password encryption)
- Create, edit, and delete your own events
- View events created by other users
- Simple and clean navigation

---

## Technologies Used
- **Node.js** and **Express** for the backend
- **MongoDB** and **Mongoose** for the database
- **EJS** for rendering views
- **Express-Session** for authentication
- **bcryptjs** for password hashing

---

## ERD
### 👤User
| Field      | Type              | Description                                                 |
| ---------- | ----------------- | ----------------------------------------------------------- |
| `_id`      | `ObjectId`        | Primary key                                                 |
| `username` | `String`          | Unique username                                             |
| `email`    | `String`          | User email                                                  |
| `password` | `String`          | Hashed password                                             |
| `events`   | `Array<ObjectId>` | List of events created by the user (references `Event._id`) |

---
### Event

| Field         | Type              | Description                                               |
| ------------- | ----------------- | --------------------------------------------------------- |
| `_id`         | `ObjectId`        | Primary key                                               |
| `title`       | `String`          | Event title                                               |
| `description` | `String`          | Event details                                             |
| `date`        | `Date`            | Event date                                                |
| `location`    | `String`          | Event location                                            |
| `createdBy`   | `ObjectId`        | Reference to the user who created the event (`User._id`)  |
| `comments`    | `Array<ObjectId>` | List of comments for the event (optional, if implemented) |

### 🔗 Relationships

- A User can create many Events → User._id → Event.createdBy

- An Event belongs to one User (creator)

---
## 📅 Event Routes

| Method | Path               | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/events`          | List all events       |
| GET    | `/events/new`      | Form to create event  |
| POST   | `/events`          | Create new event      |
| GET    | `/events/:id`      | Show single event     |
| GET    | `/events/:id/edit` | Form to edit event    |
| PUT    | `/events/:id`      | Update existing event |
| DELETE | `/events/:id`      | Delete event          |
---
## 👤 User Routes
| Method | Path         | Description                        |
| ------ | ------------ | ---------------------------------- |
| GET    | `/users`     | List all users                     |
| GET    | `/users/:id` | Show user profile and their events |
---

## ✅ User Stories (MVP)

These user stories define the core functionality of the EventHub Minimum Viable Product (MVP):

- 🧑‍💼 **As a user, I can sign up and sign in** to create and manage my events.

- 📝 **As a user, I can create a new event** with details like name, date, location, and description.

- ✏️ **As a user, I can edit or delete my own events.**

- 🌍 **As a user, I can view all events in the system.**

- 👀 **As a user, I can view events created by other users (read-only).**
---

## 🚀 Future Plans

Planned features to enhance the functionality of EventHub:

- 🔍 **Search events** by name or location.

- 🗂️ **Event categories and filters** to improve browsing.

- 📅 **Confirm attendance** so users can join or attend events.

- 🙍‍♂️ **User profile pages** to view personal info and created events.
