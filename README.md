# Auth Service (Authentication Microservice)

Bu proje, profesyonel bir kimlik doğrulama ve yetkilendirme servisi örneğidir.

## Özellikler

- Node.js + TypeScript + Express
- PostgreSQL + TypeORM
- JWT Access & Refresh Token mekanizması
- Bcrypt ile parola hashleme
- Role-based auth (`USER`, `ADMIN`)
- Katmanlı mimari:
  - Controller
  - Service
  - Repository
- Merkezi error handling
- Request validation (class-validator)
- Docker & docker-compose ile kolay kurulum

## Çalıştırma

### 1. Ortam değişkenleri

`.env` dosyasını `env.example`'dan kopyalayın:

```bash
cp .env.example .env
```

Gerekirse değerleri güncelleyin.

### 2. Docker ile çalıştırma (önerilen)

```bash
docker-compose up --build
```

Servis varsayılan olarak `http://localhost:4000` üzerinde çalışır.

### 3. Lokal geliştirme (PostgreSQL kuruluysa)

```bash
npm install
npm run dev
```

## Örnek İstekler

### Kayıt

```bash
curl -X POST http://localhost:4000/api/auth/register \

  -H "Content-Type: application/json" \

  -d '{
    "email": "test@example.com",
    "password": "StrongPass123!",
    "role": "USER"
  }'
```

### Giriş

```bash
curl -X POST http://localhost:4000/api/auth/login \

  -H "Content-Type: application/json" \

  -d '{
    "email": "test@example.com",
    "password": "StrongPass123!"
  }'
```

### Access Token yenileme

```bash
curl -X POST http://localhost:4000/api/auth/refresh \

  -H "Content-Type: application/json" \

  -d '{
    "refreshToken": "<REFRESH_TOKEN>"
  }'
```

### Mevcut kullanıcı bilgisi (korumalı endpoint örneği)

```bash
curl http://localhost:4000/api/users/me \

  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

