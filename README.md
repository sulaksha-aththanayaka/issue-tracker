# 📝 Issue Tracker

A high-performance, full-stack issue tracker built with React, Express.js, and MongoDB database.

## 🚀 Quick Start (Docker)

The entire environment is containerized. You don't need to install local dependencies other than Docker.

### 1. Pre-flight Checks

- **Ports**: Ensure ports `27017` (MongoDB), `5173` (Frontend), and `5000` (API) are free.
- **Cleanup**: Ensure you have no existing containers named `issue-tracker-mongo`, `issue-tracker-backend`, or `issue-tracker-frontend` to avoid naming conflicts.

### 2. Clone the repository

Run the following commands to pull the latest code:

```bash
git clone <repository-url>
cd <repository-name>
git checkout main
```

### 3. Launch the Stack

Run the following command in the root directory:

```bash
docker-compose up -d
```

### 4. Access the Application

- **Web Dashboard**: http://localhost:5173

You will need to Sign Up for a new account to explore the application locally. If you need to explore the application with pre-seeded data immediately, use the given account on the live url

- **Live Url**: https://issue-tracker-frontend-ochre.vercel.app
- **Email Address**: demo@example.com
- **Password**: Demo@123
