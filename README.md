# Full-NexstJS - NestJS + Next.js Full-Stack Boilerplate

Production-ready boilerplate untuk full-stack development dengan **NestJS backend** dan **Next.js frontend**.

## Features

- NestJS Backend (TypeScript)
- Next.js Frontend (React 19)
- Type-Safe API Client
- CORS Pre-configured
- Hot Reload
- Dashboard dengan API Status Monitoring

## Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn

### Setup & Run

**Windows:**

```bash
.\start-dev.ps1
```

**Mac/Linux:**

```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Manual:**

```bash
# Terminal 1
cd backend && npm install && npm run start:dev

# Terminal 2
cd frontend && npm install && npm run dev
```

Buka: http://localhost:3000

## Structure

```
full-nexstjs/
├── backend/              # NestJS API (port 3001)
│   ├── src/
│   │   ├── main.ts      # CORS + API prefix /api/v1
│   │   ├── app.controller.ts
│   │   └── app.service.ts
│   └── .env
│
├── frontend/             # Next.js App (port 3000)
│   ├── app/
│   │   └── page.tsx     # Status dashboard
│   ├── lib/
│   │   └── api.ts       # API utilities
│   └── .env.local
│
└── Documentation/        # INDEX.md, QUICK_START.md, etc
```

## API Usage

```typescript
import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api";

// GET
const data = await apiGet("/users");

// POST
const newUser = await apiPost("/users", { name: "John" });

// PUT / DELETE
await apiPut("/users/1", { name: "Jane" });
await apiDelete("/users/1");
```

## Endpoints

| Endpoint                | Method | Response               |
| ----------------------- | ------ | ---------------------- |
| `/api/v1`               | GET    | Welcome message + docs |
| `/api/v1/health`        | GET    | "Hello World!"         |
| `/api/v1/health/status` | GET    | { status, timestamp }  |

## Environment Variables

**Backend (.env):**

```env
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env.local):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Documentation

- **[INDEX.md](./INDEX.md)** - Documentation navigation
- **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Detailed guide
- **[DEVELOPMENT_CHECKLIST.md](./DEVELOPMENT_CHECKLIST.md)** - Progress tracking

## Common Tasks

### Create New Endpoint

**Backend (src/users/users.controller.ts):**

```typescript
import { Controller, Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Get()
  getUsers() {
    return [{ id: 1, name: "John" }];
  }
}
```

**Register in app.module.ts:**

```typescript
import { UsersController } from "./users/users.controller";

@Module({
  controllers: [AppController, UsersController],
})
export class AppModule {}
```

**Frontend (app/users/page.tsx):**

```typescript
'use client';
import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';

export default function UsersPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    apiGet('/users').then(setUsers);
  }, []);

  return <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## Scripts

**Backend:**

```bash
npm run start:dev    # Development with hot reload
npm run build        # Build for production
npm run start:prod   # Run production build
```

**Frontend:**

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Run production build
```

## Production Deployment

**Backend:** Vercel, Railway, Heroku, atau Docker
**Frontend:** Vercel, Netlify, atau Cloud provider

Set `NEXT_PUBLIC_API_URL` ke production backend URL di environment.

## Troubleshooting

| Problem            | Solution                                         |
| ------------------ | ------------------------------------------------ |
| CORS Error         | Pastikan backend running & CORS enabled          |
| 404 Error          | Cek route/endpoint exists                        |
| Port in Use        | Kill process: `lsof -i :3001` \| `kill -9 <PID>` |
| API not responding | Check `NEXT_PUBLIC_API_URL` di `.env.local`      |
