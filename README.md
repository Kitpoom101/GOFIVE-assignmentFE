# GOFIVE Frontend (Angular)

This is the frontend for the GOFIVE system built with Angular. It provides the user interface and communicates with an ASP.NET backend API running locally.

The application is built using Angular with TypeScript, HTML, and CSS, following a modular structure with components, pages, services, and environment-based configuration.

---

## 🚀 Prerequisites

Make sure you have the following installed:

- Node.js (LTS) → https://nodejs.org/
- Angular CLI

Install Angular CLI:
```
npm install -g @angular/cli
```
Verify installation:
```
node -v
npm -v
ng version
```
---

## 📦 Setup Instructions

Clone the repository:
```
git clone https://github.com/Kitpoom101/GOFIVE-assignmentFE.git
cd GOFIVE-assignmentFE
```
Install dependencies:
```
npm install
```
Run the frontend:
```
ng serve
```
Open in browser:

http://localhost:4200

---

## 🔗 Backend Setup

This frontend connects to an ASP.NET backend running on:
```
http://localhost:5214
```
Start backend:
```
cd GOFIVE-assignmentBE
dotnet run
```
The backend must be running before the frontend is used.

---

## ⚙️ API Configuration

API base URL is managed using Angular environment files:

File:
src/environments/env.ts

Example:
```
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5214/api'
};
```
Use it in services:
```
import { environment } from '../../environments/env';

this.http.get(`${environment.apiUrl}/users`);
```
---

## 🌐 Backend CORS Setup

If API requests fail, enable CORS in ASP.NET (Program.cs):
```
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

app.UseCors("AllowFrontend");
```
---

│   ├── pages/        
│   ├── services/     
## 📁 Project Structure

src/
├── app/
│   ├── components/     → UI elements (Header, Sidebar, Icons, Modals)   
│   │   ├── Header/
│   │   ├── sidebar/
│   │   ├── DashboardUtil/
│   │   ├── UserModal/
│   │   └── icon/
│   │
│   ├── pages/          → Full pages (Dashboard, Document, NoPage)   
│   │   ├── Dashboard/
│   │   ├── Document/
│   │   └── NoPage/
│   │
│   ├── services/       → API communication layer   
│   │   └── user.ts
│   │
│   ├── app.ts
│   ├── app.routes.ts
│   └── app.config.ts
│
├── environments/
│   ├── env.ts
│   └── env.prod.ts
│
├── index.html
├── main.ts
├── main.server.ts
├── server.ts
└── styles.css
---

## ⚠️ Common Issues

### Port already in use
ng serve --port 4201

### Broken dependencies
```rm -rf node_modules package-lock.json
npm install```

### CORS errors
Ensure backend allows:
http://localhost:4200

---

## 🧠 Notes

- Backend must be running before frontend
- All API calls must use environment.apiUrl
- Angular supports live reload during development
- SSR files exist but are optional