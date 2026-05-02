# 📚 Guía Completa de Swagger - Brasa 33 Restaurant Manager

## 🎯 Introducción

Esta guía proporciona instrucciones detalladas sobre cómo acceder, navegar y utilizar la documentación interactiva de API con Swagger en el sistema **Brasa 33 Restaurant Manager**.

---

## 🚀 Inicio Rápido

### 1. **Iniciar el servidor**

```bash
cd restaurant-manager
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

### 2. **Acceder a Swagger UI**

Abre tu navegador e ingresa a:
```
http://localhost:3000/brasa33/v1/docs
```

---

## 📖 Estructura de Swagger

### **Header Principal**
- 🔗 **Brasa 33 Restaurant Manager API** - Título de la API
- 📌 **Versión:** 1.0.0
- 📝 **Descripción:** Detalla las características principales

### **Secciones de Servicios**

La documentación está organizada en 6 servicios principales:

#### 1. **Restaurantes** 🏨
- `POST /brasa33/v1/restaurants` - Crear restaurante
- `GET /brasa33/v1/restaurants` - Listar todos
- `GET /brasa33/v1/restaurants/{id}` - Obtener por ID
- `PUT /brasa33/v1/restaurants/{id}` - Actualizar
- `DELETE /brasa33/v1/restaurants/{id}` - Eliminar

#### 2. **Menú** 🍽️
- `POST /brasa33/v1/menu` - Crear plato
- `GET /brasa33/v1/menu` - Listar todos
- `GET /brasa33/v1/menu/{id}` - Obtener por ID
- `GET /brasa33/v1/menu/restaurant/{restaurantId}` - Platos por restaurante
- `PUT /brasa33/v1/menu/{id}` - Actualizar plato
- `PATCH /brasa33/v1/menu/{id}/stock` - Actualizar stock
- `DELETE /brasa33/v1/menu/{id}` - Eliminar plato

#### 3. **Órdenes** 📦
- `POST /brasa33/v1/orders` - Crear orden
- `GET /brasa33/v1/orders` - Listar todas
- `GET /brasa33/v1/orders/my-orders` - Mis órdenes (requiere JWT)
- `GET /brasa33/v1/orders/{id}` - Obtener por ID
- `PATCH /brasa33/v1/orders/{id}/confirm` - Confirmar orden
- `PATCH /brasa33/v1/orders/{id}/status` - Cambiar estado
- `PATCH /brasa33/v1/orders/{id}/cancel` - Cancelar orden

#### 4. **Pagos** 💳
- `POST /brasa33/v1/payments` - Crear pago
- `GET /brasa33/v1/payments` - Listar todos
- `GET /brasa33/v1/payments/my-payments` - Mis pagos (requiere JWT)
- `GET /brasa33/v1/payments/{id}` - Obtener por ID

#### 5. **Reservaciones** 🗓️
- `POST /brasa33/v1/reservations` - Crear reservación
- `GET /brasa33/v1/reservations` - Listar todas
- `GET /brasa33/v1/reservations/my-reservations` - Mis reservaciones (requiere JWT)
- `GET /brasa33/v1/reservations/{id}` - Obtener por ID
- `PATCH /brasa33/v1/reservations/{id}/cancel` - Cancelar
- `PATCH /brasa33/v1/reservations/{id}/complete` - Completar

#### 6. **Reportes** 📊
- `GET /brasa33/v1/reports/total-revenue` - Ingresos totales
- `GET /brasa33/v1/reports/sales-by-date` - Ventas por fecha
- `GET /brasa33/v1/reports/top-products` - Productos más vendidos
- `GET /brasa33/v1/reports/orders-by-status` - Órdenes por estado
- `GET /brasa33/v1/reports/reservations-report` - Reporte de reservaciones

---

## 🔐 Autenticación JWT

### **Configurar Bearer Token en Swagger**

1. **Busca el botón "Authorize"** en la parte superior derecha de Swagger UI
2. **Haz clic en él**
3. **En el cuadro de diálogo, pega tu token JWT:**
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...
   ```
4. **Haz clic en "Authorize"**
5. **Haz clic en "Close"**

### **¿Cómo obtener un token JWT?**

Debes autenticarte en el **Auth Service** (.NET):

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
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

---

## 📝 Cómo Usar Swagger para Pruebas

### **Ejemplo 1: Crear un Restaurante**

1. Expande la sección **Restaurantes**
2. Haz clic en `POST /brasa33/v1/restaurants`
3. Haz clic en **"Try it out"**
4. Completa el formulario:
   ```json
   {
     "name": "Brasa 33 Sucursal Norte",
     "address": "Calle 100, Apartado 501",
     "phone": "+57 1 700 0000"
   }
   ```
5. Haz clic en **"Execute"**
6. Visualiza la **Response**

### **Ejemplo 2: Crear una Orden**

1. Primero, **obtén tu token JWT** (ver sección anterior)
2. Haz clic en **"Authorize"** y pega tu token
3. Expande la sección **Órdenes**
4. Haz clic en `POST /brasa33/v1/orders`
5. Haz clic en **"Try it out"**
6. Completa el Request Body:
   ```json
   {
     "items": [
       {
         "menu_id": 1,
         "quantity": 2,
         "price": 45.99
       },
       {
         "menu_id": 3,
         "quantity": 1,
         "price": 22.50
       }
     ]
   }
   ```
7. Haz clic en **"Execute"**

---

## 📊 Códigos de Respuesta HTTP

| Código | Significado | Descripción |
|--------|-------------|-------------|
| **200** | ✅ OK | Solicitud exitosa |
| **201** | ✅ Created | Recurso creado exitosamente |
| **400** | ❌ Bad Request | Datos inválidos o incompletos |
| **401** | 🔒 Unauthorized | Token JWT faltante o inválido |
| **404** | ❌ Not Found | Recurso no encontrado |
| **500** | ⚠️ Server Error | Error interno del servidor |

---

## 🎨 Formato de Respuestas

### **Respuesta de Éxito**
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

### **Respuesta de Error**
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos del error"
}
```

---

## 🔍 Filtrado y Búsqueda

### **Parámetros de Query Comunes**

#### **En Reportes:**
- `start_date` (fecha inicial) - Formato: `YYYY-MM-DD`
- `end_date` (fecha final) - Formato: `YYYY-MM-DD`
- `limit` (cantidad máxima) - Por defecto: `10`

**Ejemplo:**
```
GET /brasa33/v1/reports/sales-by-date?start_date=2024-01-01&end_date=2024-02-29
```

---

## 🛠️ Parámetros de Ruta

Los parámetros en la ruta se indican con `{parametro}`:

```
GET /brasa33/v1/restaurants/{id}
```

En Swagger, verás un campo de entrada donde debes especificar el valor, p. ej.: `1`

---

## 📋 Campos Obligatorios vs Opcionales

Al usar un endpoint, Swagger indica:
- 🔴 **Campos con asterisco (*)** = Obligatorios
- ⚪ **Campos sin asterisco** = Opcionales

**Ejemplo al crear un plato:**
```
name* (obligatorio)
description (opcional)
price* (obligatorio)
stock* (obligatorio)
restaurant_id* (obligatorio)
```

---

## 💡 Tips y Mejores Prácticas

### ✅ DO's
- ✔️ **Siempre autentícate** antes de usar endpoints protegidos
- ✔️ **Verifica los parámetros requeridos** antes de enviar
- ✔️ **Usa "Try it out" para probar** antes de implementar en código
- ✔️ **Revisa las respuestas de error** para entender qué falló

### ❌ DON'Ts
- ❌ **No expongas tu token JWT** en repositorios públicos
- ❌ **No modifiques datos de otros usuarios** sin autorización
- ❌ **No hagas solicitudes repetidas** sin necesidad
- ❌ **No ignores los límites de rate limiting** si está configurado

---

## 🔗 Endpoints de Salud y Status

### **Health Check**
```
GET http://localhost:3000/brasa33/v1/health
```

**Respuesta:**
```json
{
  "success": true,
  "status": "healthy",
  "service": "Brasa 33 Restaurant Manager",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 📱 Integración con Cliente

### **JavaScript/Fetch API**
```javascript
// Obtener restaurantes
const response = await fetch('http://localhost:3000/brasa33/v1/restaurants');
const data = await response.json();

// Con autenticación
const token = 'tu_token_jwt_aqui';
const response = await fetch('http://localhost:3000/brasa33/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    items: [
      { menu_id: 1, quantity: 2, price: 45.99 }
    ]
  })
});
```

### **cURL**
```bash
# Obtener restaurantes
curl -X GET http://localhost:3000/brasa33/v1/restaurants

# Crear orden con token
curl -X POST http://localhost:3000/brasa33/v1/orders \
  -H "Authorization: Bearer tu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{"items": [{"menu_id": 1, "quantity": 2, "price": 45.99}]}'
```

---

## 📞 Soporte y Contacto

- 📧 **Email:** support@brasa33.com
- 🌐 **Sitio web:** https://brasa33.com
- 📚 **Documentación:** Este archivo

---

## 📝 Notas Importantes

1. **Autenticación:** La mayoría de endpoints POST, PUT, DELETE y algunos GET requieren token JWT
2. **CORS:** La API está configurada con CORS para aceptar solicitudes desde clientes web
3. **Rate Limiting:** Hay límites de velocidad para proteger la API de abuso
4. **Seguridad:** Todos los datos sensibles se validan y sanitizan en el servidor

---

¡Gracias por usar **Brasa 33 Restaurant Manager API**! 🍽️✨
