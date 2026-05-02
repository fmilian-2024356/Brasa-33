# 🍽️ Brasa 33 Restaurant Manager API

> Sistema integral de gestión de restaurantes con arquitectura profesional, documentación completa con Swagger y autenticación centralizada con JWT.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v5.2-blue)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-yellow)](https://www.postgresql.org)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-brightgreen)](https://swagger.io)
[![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

---

## 🎯 Características Principales

✅ **6 Servicios Integrados**
- 🏨 Gestión de Restaurantes
- 🍽️ Catálogo de Menú con Control de Stock
- 📦 Sistema de Órdenes
- 💳 Procesamiento de Pagos
- 🗓️ Sistema de Reservaciones
- 📊 Reportes y Análisis

✅ **Seguridad Empresarial**
- 🔐 Autenticación JWT con Auth Service centralizado (.NET)
- 🛡️ Headers de seguridad con Helmet
- 🚫 Rate Limiting configurado
- ✅ Validación de datos en todos los endpoints
- 🔒 CORS configurado para múltiples orígenes

✅ **Documentación Profesional**
- 📚 Swagger UI interactivo en `/brasa33/v1/docs`
- 📝 OpenAPI 3.0 specification
- 🧪 "Try it out" para pruebas directas
- 🔐 Integración de Bearer Token

✅ **Buenas Prácticas**
- 🏛️ Arquitectura MVC
- 🔄 Manejo global de errores
- 📋 Respuestas estandarizadas
- 🧹 Código limpio y bien organizado
- 📊 Logging con Morgan

---

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [API Endpoints](#-api-endpoints)
- [Documentación Swagger](#-documentación-swagger)
- [Autenticación JWT](#-autenticación-jwt)
- [Estructura de Respuestas](#-estructura-de-respuestas)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Deployement](#-deployment)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** v18+ ([descargar](https://nodejs.org))
- **npm** o **pnpm** (recomendado v10+)
- **PostgreSQL** v14+ ([descargar](https://www.postgresql.org))
- **Docker** (opcional, para PostgreSQL en contenedor)

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/restaurant-manager.git
cd restaurant-manager

# 2. Instalar dependencias
npm install
# o con pnpm
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Crear base de datos
# Asegúrate que PostgreSQL esté corriendo
psql -U postgres -c "CREATE DATABASE brasa33_db;"

# 5. (Opcional) Ejecutar migraciones
# psql -U postgres -d brasa33_db -f migrations/schema.sql
```

---

## ⚙️ Configuración

### Variables de Entorno (`.env`)

```env
# 🖥️ Servidor
PORT=3000
NODE_ENV=development

# 🗄️ Base de Datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_secure_password_here
DB_NAME=brasa33_db

# 🔐 Autenticación JWT
JWT_SECRET=your_jwt_secret_key_here_min_32_chars

# 🌐 API
API_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://frontend.example.com

# 🔗 Auth Service (Centralizado en .NET)
AUTH_SERVICE_URL=http://localhost:5000
```

### Inicializar Base de Datos

```sql
-- Crear tabla restaurants
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla menu
CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla order_items
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Crear tabla payments
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla reservations
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  guest_count INTEGER NOT NULL,
  reservation_date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎮 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

**Salida esperada:**
```
🚀 ==========================================
   Brasa 33 Restaurant Manager API
   ✅ Servidor iniciado exitosamente
==========================================
📍 API: http://localhost:3000/brasa33/v1
🏥 Health: http://localhost:3000/brasa33/v1/health
📚 Swagger: http://localhost:3000/brasa33/v1/docs
==========================================
```

### Modo Producción

```bash
NODE_ENV=production node index.js
```

---

## 📚 Documentación Swagger

### Acceder a Swagger UI

```
🌐 http://localhost:3000/brasa33/v1/docs
```

### Estructura de Documentación

La documentación está organizada en **6 servicios principales**:

| Servicio | Descripción | Endpoints |
|----------|-------------|-----------|
| 🏨 **Restaurantes** | Gestión de locales | 5 |
| 🍽️ **Menú** | Catálogo de platos | 7 |
| 📦 **Órdenes** | Gestión de pedidos | 7 |
| 💳 **Pagos** | Procesamiento de pagos | 4 |
| 🗓️ **Reservaciones** | Sistema de reservas | 6 |
| 📊 **Reportes** | Analytics y KPIs | 5 |

**Total: 34 endpoints documentados**

---

## 🔐 Autenticación JWT

### Obtener Token

```bash
# Desde el Auth Service (.NET)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com"
    }
  }
}
```

### Usar Token en Swagger

1. 🔐 Haz clic en el botón **"Authorize"** (arriba a la derecha)
2. 📝 Pega tu token con formato: `Bearer eyJhbGc...`
3. ✅ Haz clic en "Authorize"
4. 🔒 Todos los endpoints protegidos estarán disponibles

### Usar Token en Cliente

```javascript
const token = 'eyJhbGc...';

const response = await fetch('http://localhost:3000/brasa33/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    items: [{ menu_id: 1, quantity: 2, price: 45.99 }]
  })
});
```

---

## 📊 API Endpoints

### 🏨 Restaurantes
```
POST   /brasa33/v1/restaurants          - Crear restaurante
GET    /brasa33/v1/restaurants          - Listar todos
GET    /brasa33/v1/restaurants/{id}     - Obtener por ID
PUT    /brasa33/v1/restaurants/{id}     - Actualizar
DELETE /brasa33/v1/restaurants/{id}     - Eliminar
```

### 🍽️ Menú
```
POST   /brasa33/v1/menu                 - Crear plato
GET    /brasa33/v1/menu                 - Listar todos
GET    /brasa33/v1/menu/{id}            - Obtener por ID
GET    /brasa33/v1/menu/restaurant/{id} - Platos por restaurante
PUT    /brasa33/v1/menu/{id}            - Actualizar plato
PATCH  /brasa33/v1/menu/{id}/stock     - Actualizar stock
DELETE /brasa33/v1/menu/{id}            - Eliminar plato
```

### 📦 Órdenes
```
POST   /brasa33/v1/orders               - Crear orden
GET    /brasa33/v1/orders               - Listar todas
GET    /brasa33/v1/orders/my-orders     - Mis órdenes (JWT)
GET    /brasa33/v1/orders/{id}          - Obtener por ID
PATCH  /brasa33/v1/orders/{id}/confirm - Confirmar orden
PATCH  /brasa33/v1/orders/{id}/status  - Cambiar estado
PATCH  /brasa33/v1/orders/{id}/cancel  - Cancelar orden
```

### 💳 Pagos
```
POST   /brasa33/v1/payments             - Crear pago
GET    /brasa33/v1/payments             - Listar todos
GET    /brasa33/v1/payments/my-payments - Mis pagos (JWT)
GET    /brasa33/v1/payments/{id}        - Obtener por ID
```

### 🗓️ Reservaciones
```
POST   /brasa33/v1/reservations         - Crear reservación
GET    /brasa33/v1/reservations         - Listar todas
GET    /brasa33/v1/reservations/my-reservations - Mis reservaciones (JWT)
GET    /brasa33/v1/reservations/{id}    - Obtener por ID
PATCH  /brasa33/v1/reservations/{id}/cancel - Cancelar
PATCH  /brasa33/v1/reservations/{id}/complete - Completar
```

### 📊 Reportes
```
GET    /brasa33/v1/reports/total-revenue - Ingresos totales
GET    /brasa33/v1/reports/sales-by-date - Ventas por fecha
GET    /brasa33/v1/reports/top-products - Productos más vendidos
GET    /brasa33/v1/reports/orders-by-status - Órdenes por estado
GET    /brasa33/v1/reports/reservations-report - Reporte reservaciones
```

### 🏥 Salud
```
GET    /brasa33/v1/health               - Health check
```

---

## 📋 Estructura de Respuestas

### Respuesta Exitosa (2xx)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Brasa 33 Principal",
    "address": "Calle 33, Apto 101",
    "phone": "+57 1 123 4567",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### Respuesta de Error (4xx, 5xx)
```json
{
  "success": false,
  "message": "Descripción clara del error",
  "error": "Detalles técnicos del error (solo en desarrollo)"
}
```

### Códigos HTTP
| Código | Significado |
|--------|------------|
| 200 | ✅ OK - Solicitud exitosa |
| 201 | ✅ Created - Recurso creado |
| 400 | ❌ Bad Request - Datos inválidos |
| 401 | 🔒 Unauthorized - Token requerido |
| 404 | ❌ Not Found - Recurso no encontrado |
| 500 | ⚠️ Server Error - Error interno |

---

## 📌 Ejemplos de Uso

### 1️⃣ Crear un Restaurante

```bash
curl -X POST http://localhost:3000/brasa33/v1/restaurants \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brasa 33 Centro",
    "address": "Calle Principal 123",
    "phone": "+57 1 234 5678"
  }'
```

### 2️⃣ Crear un Plato

```bash
curl -X POST http://localhost:3000/brasa33/v1/menu \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brasas a la Parrilla",
    "description": "Carnes premium asadas a fuego lento",
    "price": 45.99,
    "stock": 50,
    "restaurant_id": 1
  }'
```

### 3️⃣ Crear una Orden

```bash
curl -X POST http://localhost:3000/brasa33/v1/orders \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menu_id": 1,
        "quantity": 2,
        "price": 45.99
      }
    ]
  }'
```

### 4️⃣ Obtener Reportes

```bash
curl -X GET http://localhost:3000/brasa33/v1/reports/total-revenue
```

---

## 🐳 Docker (Opcional)

### Ejecutar con Docker Compose

```bash
# Iniciar PostgreSQL y la API
docker-compose -f ../postgre_db_b33/docker-compose.yml up -d

# Luego ejecutar la API
npm run dev
```

---

## 🚀 Deployment

### En Producción

1. **Configurar variables de entorno**
   ```bash
   NODE_ENV=production
   ```

2. **Usar gestor de procesos (PM2)**
   ```bash
   npm install -g pm2
   pm2 start index.js --name "brasa33-api"
   pm2 save
   pm2 startup
   ```

3. **Configurar reverse proxy (Nginx)**
   ```nginx
   server {
     listen 80;
     server_name api.brasa33.com;
   
     location / {
       proxy_pass http://localhost:3000;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
     }
   }
   ```

---

## 📚 Documentación Adicional

- 📖 [SWAGGER_GUIDE.md](SWAGGER_GUIDE.md) - Guía completa de Swagger
- 🔧 [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) - Documentación técnica profunda
- 📋 [API_STANDARDS.md](API_STANDARDS.md) - Estándares y convenciones

---

## 🧪 Testing

```bash
# (Futuro) Ejecutar tests
npm test

# Coverage
npm run test:coverage
```

---

## 📝 Scripts Disponibles

```json
{
  "dev": "nodemon index.js",
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

---

## 🔗 Enlaces Útiles

- 🌐 [Sitio Web](https://brasa33.com)
- 📧 [Email de Soporte](mailto:support@brasa33.com)
- 📚 [API Docs (Swagger)](http://localhost:3000/brasa33/v1/docs)
- 🏥 [Health Check](http://localhost:3000/brasa33/v1/health)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

---

## 📄 Licencia

Este proyecto está bajo la licencia **ISC**. Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Braulio Echeverria** - Arquitecto de Software
- **IN6AV** - Equipo de Desarrollo

---

## 🎉 Gracias

Gracias por usar **Brasa 33 Restaurant Manager**. ¡Esperamos que disfrutes! 🍽️✨

---

**Última actualización:** Enero 2024  
**Versión:** 1.0.0  
**Estado:** ✅ Production Ready
