# 🚀 Rate-Limited API Service (Node.js + Express + Redis)

## 📌 Overview

This project implements a **rate-limited API service** that restricts users to **5 requests per minute**.

It includes:

* Rate-limited endpoint (`POST /request`)
* Usage statistics endpoint (`GET /stats`)
* Redis-based implementation for scalability

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Redis

---

## ⚙️ Features

* ✅ Per-user rate limiting (5 requests/minute)
* ✅ Redis-based storage (scalable)
* ✅ Middleware-based architecture
* ✅ Simple and clean implementation
* ✅ Easily extendable for production use

---

## 📂 API Endpoints

### 🔹 POST /request

Accepts:

```json
{
  "user_id": "string",
  "payload": "any"
}
```

#### ✅ Success Response

```json
{
  "message": "Request accepted",
  "remaining": 4
}
```

#### ❌ Rate Limit Exceeded

```json
{
  "error": "Rate limit exceeded"
}
```

---

### 🔹 GET /stats

Returns per-user request stats (if implemented for in-memory version).

---

## 🧠 How It Works

This implementation uses a **fixed window rate limiting strategy** with Redis.

### Flow:

1. Each user has a Redis key:

   ```
   rate:<user_id>
   ```

2. On every request:

   * Increment request count using `INCR`
   * If first request → set expiry (60 seconds)
   * If count > 5 → block request

---

## ▶️ How to Run Locally

```bash
git clone <your-repo-url>
cd <project-folder>

npm install
node src/index.js
```

---

## 🌐 Environment Variables

Create a `.env` file:

```
REDISUSERNAME=your_username
REDISPASSWORD=your_password
REDISHOST=your_host
```

---

## ☁️ Deployment (AWS EC2)

1. SSH into instance
2. Clone repo
3. Install dependencies:

   ```bash
   npm install
   ```
4. Start server:

   ```bash
   node src/index.js
   ```

### ⚠️ Important:

* Ensure server listens on:

  ```js
  app.listen(3000, "0.0.0.0")
  ```
* Open port **3000** in Security Group

---

## 🧪 Testing

### Using curl:

```bash
curl -X POST http://<PUBLIC_IP>:3000/request \
-H "Content-Type: application/json" \
-d '{"user_id":"u1"}'
```

---

## ⚠️ Limitations

* Fixed window approach (less accurate than sliding window)
* Not fully atomic (multiple Redis calls)
* No request queueing or retry mechanism
* No authentication/authorization

---

## 🚀 Improvements

* Use **Sliding Window (Redis Sorted Sets)** for better accuracy
* Implement **atomic operations using Lua scripts**
* Add **retry & queueing (BullMQ)**
* Add **rate limit headers**
* Add **horizontal scaling support**

---

## 💡 Design Decisions

* Chose fixed window for simplicity and performance
* Middleware-based approach for reusability


## 📌 Author

Rahul Chaudhary

---
