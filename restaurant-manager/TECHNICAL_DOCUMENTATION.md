# 🏗️ Documentación Técnica - Brasa 33 Restaurant Manager

## Resumen Ejecutivo

**Brasa 33 Restaurant Manager** es una API REST profesional construida con **Node.js**, **Express**, **PostgreSQL** y **Swagger**. El sistema está completamente integrado con un servicio de autenticación centralizado en **.NET** usando **JWT**.

---

## 📐 Arquitectura del Sistema

### **Stack Tecnológico**

```
┌─────────────────────────────────────────────────────────┐
│           Frontend / Cliente Externo                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ├──── JWT Token ────┐
                     │                   │
┌────────────────────────────────────────────────────────────┐
│              Restaurant Manager API (Node.js/Express)      │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Swagger UI Documentation (/brasa33/v1/docs)        │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │  Middleware Layer:                                  │ │
│  │  - Authentication (JWT Validation)                 │ │
│  │  - Rate Limiting                                   │ │
│  │  - CORS / Security (Helmet)                        │ │
│  │  - Request Logging                                 │ │
│  │  - Global Error Handler                           │ │
│  ├──────────────────────────────────────────────────────┤ │
│  │  Service Modules:                                   │ │
│  │  ├─ Restaurants (CRUD)                             │ │
│  │  ├─ Menu (Products Management)                     │ │
│  │  ├─ Orders (Order Management)                      │ │
│  │  ├─ Payments (Payment Processing)                  │ │
│  │  ├─ Reservations (Booking)                         │ │
│  │  └─ Reports (Analytics & KPIs)                     │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────────────┐         ┌──────────────┐
    │ PostgreSQL │         │ Auth Service │
    │ Database   │         │ (.NET/C#)    │
    └────────────┘         └──────────────┘
                          (Centralizado)
```

---

## 🔐 Seguridad

### **1. Autenticación JWT**
- **Origen:** Auth Service en .NET
- **Formato:** Bearer Token en header `Authorization`
- **Validación:** Realizada en middleware `validateJwt.js`
- **Extracción de user_id:** Del payload decodificado del token

```javascript
// Middleware validateJwt.js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // { id, email, ... }
```

### **2. Endpoints Protegidos vs Públicos**

#### **Públicos (sin JWT requerido):**
- `GET /brasa33/v1/restaurants`
- `GET /brasa33/v1/restaurants/{id}`
- `GET /brasa33/v1/menu`
- `GET /brasa33/v1/menu/{id}`
- `GET /brasa33/v1/menu/restaurant/{restaurantId}`
- `GET /brasa33/v1/orders`
- `GET /brasa33/v1/orders/{id}`
- `GET /brasa33/v1/payments`
- `GET /brasa33/v1/payments/{id}`
- `GET /brasa33/v1/reservations`
- `GET /brasa33/v1/reservations/{id}`
- `GET /brasa33/v1/reports/*` (todos)

#### **Protegidos (JWT requerido):**
- `POST /brasa33/v1/restaurants`
- `PUT /brasa33/v1/restaurants/{id}`
- `DELETE /brasa33/v1/restaurants/{id}`
- `POST /brasa33/v1/menu`
- `PUT /brasa33/v1/menu/{id}`
- `PATCH /brasa33/v1/menu/{id}/stock`
- `DELETE /brasa33/v1/menu/{id}`
- `POST /brasa33/v1/orders`
- `PATCH /brasa33/v1/orders/*`
- `GET /brasa33/v1/orders/my-orders`
- `POST /brasa33/v1/payments`
- `GET /brasa33/v1/payments/my-payments`
- `POST /brasa33/v1/reservations`
- `PATCH /brasa33/v1/reservations/*`
- `GET /brasa33/v1/reservations/my-reservations`

### **3. Medidas de Seguridad Adicionales**

```javascript
// helmet.js - Headers de seguridad
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: { ... },
  crossOriginEmbedderPolicy: { ... }
}));

// Rate Limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000,  // 15 minutos
  max: 100  // max 100 requests
});

// CORS configurado
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

---

## 📊 Estándar de Respuestas

### **Formato Éxito (2xx)**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "...",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### **Formato Error (4xx, 5xx)**
```json
{
  "success": false,
  "message": "Descripción clara del error",
  "error": "Detalles técnicos (solo en desarrollo)"
}
```

### **Códigos HTTP Utilizados**
| Código | Caso de Uso |
|--------|------------|
| 200 | Solicitud exitosa (GET, PUT, PATCH) |
| 201 | Recurso creado (POST) |
| 400 | Validación fallida, datos inválidos |
| 401 | Autenticación requerida/inválida |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## 🏛️ Estructura de Base de Datos

### **Tablas Principales**

#### **restaurants**
```sql
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **menu**
```sql
CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  restaurant_id INTEGER REFERENCES restaurants(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **orders**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **order_items**
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  menu_id INTEGER REFERENCES menu(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

#### **payments**
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  amount DECIMAL(10, 2) NOT NULL,
  method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **reservations**
```sql
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id),
  guest_count INTEGER NOT NULL,
  reservation_date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔄 Flujo de Solicitud (Request Lifecycle)

```
1. Cliente envía solicitud HTTP
   ↓
2. CORS Middleware valida origen
   ↓
3. Helmet aplica headers de seguridad
   ↓
4. Morgan registra la solicitud (logging)
   ↓
5. Body parser parsea JSON
   ↓
6. validateJwt (si está presente) valida token
   ↓
7. Route handler (controller) procesa solicitud
   ↓
8. Service layer realiza lógica de negocio
   ↓
9. Data layer (model) interactúa con BD
   ↓
10. Respuesta se serializa a JSON
    ↓
11. Global Error Handler captura errores
    ↓
12. Cliente recibe respuesta con status code
```

---

## 📁 Estructura de Directorios

```
restaurant-manager/
├── src/
│   ├── app.js                          # Configuración principal de Express
│   ├── config/
│   │   ├── db.js                       # Conexión PostgreSQL
│   │   ├── cors.configuration.js       # Configuración CORS
│   │   ├── helmet.configuration.js     # Headers de seguridad
│   │   └── rateLimit.configuration.js  # Rate limiting
│   ├── middlewares/
│   │   ├── validateJwt.js              # Autenticación JWT
│   │   ├── errorHandler.js             # Manejo global de errores
│   │   ├── notFound.js                 # Manejo 404
│   │   └── requestLogger.js            # Logging de solicitudes
│   ├── restaurant/
│   │   ├── restaurant.routes.js        # Rutas + Swagger docs
│   │   ├── restaurant.controller.js    # Lógica de control
│   │   └── restaurant.model.js         # Consultas SQL
│   ├── menu/
│   │   ├── menu.routes.js
│   │   ├── menu.controller.js
│   │   └── menu.model.js
│   ├── orders/
│   │   ├── order.routes.js
│   │   ├── order.controller.js
│   │   └── order.model.js
│   ├── payments/
│   │   ├── payment.routes.js
│   │   ├── payment.controller.js
│   │   └── payment.model.js
│   ├── reservations/
│   │   ├── reservation.routes.js
│   │   ├── reservation.controller.js
│   │   └── reservation.model.js
│   └── reports/
│       ├── report.routes.js
│       ├── report.controller.js
│       └── report.model.js
├── index.js                             # Punto de entrada
├── swagger.js                           # Configuración Swagger/OpenAPI
├── package.json
└── SWAGGER_GUIDE.md                     # Esta guía
```

---

## 🚀 Patrones de Desarrollo

### **Patrón MVC (Model-View-Controller)**

```javascript
// routes.js (View + Routing)
router.get('/:id', controllerFunction);

// controller.js (Controller)
export const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await getRestaurantByIdService(id);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);  // Pasa al Global Error Handler
  }
};

// model.js (Model)
export const getRestaurantById = async (id) => {
  const query = `SELECT * FROM restaurants WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
```

### **Manejo de Errores**

```javascript
// Crear y lanzar error personalizado
export const getRestaurantById = async (id) => {
  const restaurant = await getRestaurantByIdService(id);
  if (!restaurant) {
    const error = new Error('Restaurante no encontrado');
    error.status = 404;
    throw error;
  }
  return restaurant;
};

// Global error handler captura automáticamente
app.use(errorHandler);
```

---

## 📦 Dependencias Principales

```json
{
  "express": "^5.2.1",           // Framework web
  "pg": "^8.11.1",               // Driver PostgreSQL
  "jsonwebtoken": "^9.0.3",      // JWT handling
  "cors": "^2.8.6",              // CORS middleware
  "helmet": "^8.1.0",            // Security headers
  "morgan": "^1.10.1",           // HTTP request logging
  "express-rate-limit": "^8.2.1", // Rate limiting
  "swagger-ui-express": "^5.0.1", // Swagger UI
  "swagger-jsdoc": "^6.2.8"      // JSDoc to Swagger
}
```

---

## 🔌 Variables de Entorno

```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=brasa33_db

# Autenticación
JWT_SECRET=your_secret_key_here

# API
API_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

## ✅ Validaciones Implementadas

### **1. Validación de JWT**
- Token presente en header
- Token válido y no expirado
- Secret configurado

### **2. Validación de Datos**
- Campos requeridos presentes
- Tipos de datos correctos
- Ranges válidos (precios > 0, stock >= 0)

### **3. Validación de Negocio**
- Stock suficiente para órdenes
- Reservaciones en fechas válidas
- Pagos corresponden a órdenes

---

## 🧪 Ejemplo de Prueba End-to-End

### **Escenario: Crear una orden completa**

```bash
# 1. Obtener token (desde Auth Service)
curl -X POST http://auth-service:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass"}'
# Response: { "token": "eyJhbGc..." }

# 2. Crear restaurante (requiere token)
curl -X POST http://localhost:3000/brasa33/v1/restaurants \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brasa 33 Centro",
    "address": "Calle 33 #123",
    "phone": "+57 1 234 5678"
  }'
# Response: { "success": true, "data": { "id": 1, ... } }

# 3. Crear plato (requiere token)
curl -X POST http://localhost:3000/brasa33/v1/menu \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brasas a la Parrilla",
    "description": "Carnes premium",
    "price": 45.99,
    "stock": 50,
    "restaurant_id": 1
  }'
# Response: { "success": true, "data": { "id": 1, ... } }

# 4. Crear orden (requiere token)
curl -X POST http://localhost:3000/brasa33/v1/orders \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      { "menu_id": 1, "quantity": 2, "price": 45.99 }
    ]
  }'
# Response: { "success": true, "data": { "id": 101, "total": 91.98, ... } }

# 5. Obtener reportes (sin JWT requerido)
curl -X GET http://localhost:3000/brasa33/v1/reports/total-revenue
# Response: { "success": true, "data": { "total_revenue": 91.98, ... } }
```

---

## 📈 Monitoreo y Logging

### **Logs Disponibles**

1. **Request Logger** - Cada solicitud entrante
2. **Morgan (HTTP Logger)** - Detalles de HTTP en modo dev
3. **Error Logger** - Errores capturados globalmente
4. **Timestamp** - Todas las operaciones incluyen fecha/hora

```javascript
// Ejemplo en console
[2024-01-15 10:30:45] POST /brasa33/v1/orders - 201 Created
[2024-01-15 10:30:46] GET /brasa33/v1/restaurants - 200 OK
[2024-01-15 10:30:47] Error 404: Restaurant not found
```

---

## 🚀 Deployment (Producción)

### **Checklist Pre-Deployment**

- [ ] `.env` configurado con valores de producción
- [ ] `NODE_ENV=production`
- [ ] Base de datos migrada y validada
- [ ] Backups de BD configurados
- [ ] SSL/HTTPS habilitado
- [ ] CORS configurado para dominios correctos
- [ ] Rate limiting ajustado
- [ ] Logging centralizado (p. ej., ELK Stack)
- [ ] Monitoreo y alertas configuradas
- [ ] Tests ejecutados exitosamente

### **Comando de Inicio**

```bash
# Desarrollo
npm run dev

# Producción
NODE_ENV=production node index.js
```

---

## 🤝 Contribuciones y Mejoras Futuras

### **Mejoras Pendientes**
- [ ] Implementar paginación en endpoints GET
- [ ] Agregar búsqueda y filtros avanzados
- [ ] Webhook para eventos importantes
- [ ] WebSocket para actualizaciones en tiempo real
- [ ] Implementar caché (Redis)
- [ ] Agregar tests unitarios y E2E
- [ ] Documentación en múltiples idiomas

---

## 📞 Soporte

Para preguntas o problemas:
- 📧 Email: support@brasa33.com
- 🐛 Issues: GitHub Issues
- 💬 Chat: Slack workspace

---

**Última actualización:** Enero 2024
**Versión:** 1.0.0
**Estado:** ✅ Producción-Ready
