OPD Token Allocation Engine

Link: https://opd-token-engine-kixu.onrender.com

A backend service that simulates OPD (Outpatient Department) token allocation for a hospital. The system is designed to handle real-world OPD scenarios such as limited doctor capacity, multiple booking sources, emergency patients, cancellations, and no-shows, while dynamically reallocating tokens based on priority.
This project was built as part of a Backend Intern assignment and focuses on algorithm design, clean APIs, and practical reasoning.

🚀 Features

-Fixed time slots per doctor (e.g., 9–10, 10–11)

-Hard capacity limits per slot

-Multiple token sources with priority-based allocation

-Emergency insertion with automatic bumping of lower-priority tokens

-Waiting queue per slot for overflow handling

-Dynamic reallocation on cancellation and no-shows

-Automatic no-show handling using background jobs

-RESTful API-based service

-Simulation of one OPD day with 3 doctors



API Endpoints
1️⃣ Create Doctor

POST /api/doctor

{
"id": "D1",
"slots": {
"9-10": {
"capacity": 2,
"tokens": [],
"waitingQueue": [],
"startTime": "09:00",
"graceMinutes": 10
}
}
}

Allocate Token

POST /api/token
{
"doctorId": "D1",
"slotTime": "9-10",
"source": "ONLINE"
}

Cancel Token

POST /api/cancel/:tokenId

API Info (Browser Friendly)

GET /api/doctor

GET /api/token

GET /api/cancel


OPD Day Simulation

A full-day OPD simulation with 3 doctors is included.
simulation/simulateDay.js
To run use:
node simulation/opdDaySimulation.js

🛠️ Tech Stack

-Node.js

-Express.js

-In-memory data store (for simplicity)

-UUID for token generation

Note: In-memory storage was chosen intentionally for clarity. The system can be easily extended to MongoDB or SQL for production use.

To run Locally:

npm install
node index.js

Server runs on http://localhost:3000

Author
Akash Sharma
