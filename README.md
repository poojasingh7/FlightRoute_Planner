# FlightRoute_Planner
# ✈️ Flight Route Planner

> A full-stack MERN application that computes optimal flight routes between cities using **Dijkstra's Algorithm** — bridging classical DSA with modern web development.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📸 Demo

<img width="778" height="680" alt="WhatsApp Image 2026-04-12 at 9 13 41 PM" src="https://github.com/user-attachments/assets/98c8ddf0-d060-4b95-956a-0f866654cc04" />
<img width="1600" height="680" alt="WhatsApp Image 2026-04-12 at 9 15 25 PM" src="https://github.com/user-attachments/assets/29dfdc31-d7f9-44ec-add2-ec64c5b4ed06" />
<img width="874" height="457" alt="WhatsApp Image 2026-04-13 at 12 06 52 AM" src="https://github.com/user-attachments/assets/c4743992-a826-428a-99d8-2939bf37bbef" />

---

## 🚀 Features

- 🔍 **Smart route finding** — find the shortest path between cities by distance, cost, or time
- 🧠 **Dijkstra's Algorithm** — graph-based pathfinding with step-by-step visualization
- 🗺️ **Interactive maps** — live route rendering using React-Leaflet
- 💾 **Route history** — searched routes are persisted in MongoDB
- 🔐 **Authentication** — secure Login / Register with JWT
- ⚡ **Fast API layer** — React frontend communicates via Axios

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Maps | React-Leaflet |
| Auth | JWT + bcrypt |
| HTTP Client | Axios |
| Algorithm | Dijkstra's (Graph-based) |

---

## 📂 Project Structure

```
flight-route-planner/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Route pages (Home, Login, Register)
│   │   └── api/             # Axios API calls
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── routes/              # API route handlers
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # Auth middleware
│   └── utils/
│       └── dijkstra.js      # Core algorithm implementation
│
└── README.md
```

---

## 🧠 Algorithm Overview

Cities are modelled as **nodes** and flight paths as **weighted edges** in an undirected graph. Dijkstra's Algorithm traverses this graph to find the minimum-cost path between any source and destination.

**Edge weights can represent:**
- Total distance (km)
- Flight cost (₹)
- Travel time (hours)

```js
// Simplified example — server/utils/dijkstra.js
function dijkstra(graph, source) {
  const dist = {}, visited = new Set();
  Object.keys(graph).forEach(node => dist[node] = Infinity);
  dist[source] = 0;

  while (/* unvisited nodes remain */) {
    const u = getMinDistNode(dist, visited);
    visited.add(u);
    for (const { to, weight } of graph[u]) {
      if (dist[u] + weight < dist[to]) {
        dist[to] = dist[u] + weight;
      }
    }
  }
  return dist;
}
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/poojasingh7/flight-route-planner.git
cd flight-route-planner
```

### 2. Configure environment variables

Create a `.env` file inside `/server`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Run the backend

```bash
cd server
npm install
npm run dev
```

### 4. Run the frontend

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/api/routes` | Get all saved routes |
| `POST` | `/api/routes/find` | Compute shortest route |
| `DELETE` | `/api/routes/:id` | Delete a saved route |

---

## 🌐 Future Improvements

- [ ] Integrate real-time flight data APIs (e.g. Aviationstack)
- [ ] Multi-criteria route comparison and filtering
- [ ] Enhanced UI/UX with animations and better mobile support
- [ ] Admin dashboard for managing graph data
- [ ] Cloud deployment — backend on Render, frontend on Vercel

---

## 🧑‍💻 Key Learnings

- Applying DSA (graphs, shortest path) in a real-world full-stack context
- Designing RESTful APIs with Express and Mongoose
- Managing React state and component architecture with Vite
- Debugging async flows and edge cases in a MERN environment
- Integrating map libraries (React-Leaflet) with dynamic data

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made by Pooja Singh with ❤️ using the MERN stack</p>
