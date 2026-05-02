# 🧪 Guía de Pruebas Interactivas con Swagger

Esta guía proporciona pasos detallados para probar cada endpoint usando la interfaz **Swagger UI** de forma interactiva.

---

## 🚀 Acceso a Swagger UI

1. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

2. **Abre tu navegador:**
   ```
   http://localhost:3000/brasa33/v1/docs
   ```

3. **Deberías ver una interfaz como esta:**
   ```
   ╔════════════════════════════════════════════════════╗
   ║  Brasa 33 Restaurant Manager API                  ║
   ║  Version: 1.0.0                        [Authorize]║
   ╚════════════════════════════════════════════════════╝
   ```

---

## 🔐 Configurar Autenticación JWT

### Primer Paso: Obtener Token

Necesitas obtener un token JWT desde el **Auth Service** (.NET):

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Copia el token** de la respuesta (sin las comillas):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ...
```

### Segundo Paso: Agregar Token en Swagger

1. **Haz clic en el botón "Authorize"** (arriba a la derecha, junto a los filtros)
2. **Se abrirá un modal** con un campo de entrada
3. **En el campo "Value", pega:**
   ```
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ...
   ```
   (Asegúrate de incluir la palabra "Bearer " al inicio)

4. **Haz clic en "Authorize"**
5. **Deberías ver "Authorize (token)"** - esto significa que estás autenticado
6. **Haz clic en "Close"**

---

## 🏨 Prueba 1: Restaurantes (Sin JWT)

### 1️⃣ Obtener Todos los Restaurantes

**Ruta:** `GET /brasa33/v1/restaurants`

**Pasos en Swagger:**
1. Expande **"Restaurantes"**
2. Haz clic en **"GET /brasa33/v1/restaurants"** (color azul)
3. El panel se expande mostrando detalles
4. Haz clic en **"Try it out"** (botón amarillo)
5. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Brasa 33 Centro",
      "address": "Calle Principal 123",
      "phone": "+57 1 234 5678",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Status:** `200 OK`

---

### 2️⃣ Obtener Restaurante por ID

**Ruta:** `GET /brasa33/v1/restaurants/{id}`

**Pasos en Swagger:**
1. Haz clic en **"GET /brasa33/v1/restaurants/{id}"** (color azul)
2. Haz clic en **"Try it out"**
3. En el campo **"id"**, ingresa: `1`
4. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Brasa 33 Centro",
    "address": "Calle Principal 123",
    "phone": "+57 1 234 5678",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

**Status:** `200 OK`

---

## 🏨 Prueba 2: Restaurantes (Con JWT)

### 3️⃣ Crear Restaurante

**Ruta:** `POST /brasa33/v1/restaurants` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. **Asegúrate de estar autenticado** (botón "Authorize" configurado)
2. Haz clic en **"POST /brasa33/v1/restaurants"** (color verde)
3. Haz clic en **"Try it out"**
4. En el **Request body**, reemplaza con:
   ```json
   {
     "name": "Brasa 33 Sucursal Nueva",
     "address": "Avenida Secundaria 456",
     "phone": "+57 1 999 8888"
   }
   ```
5. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Brasa 33 Sucursal Nueva",
    "address": "Avenida Secundaria 456",
    "phone": "+57 1 999 8888",
    "created_at": "2024-01-15T15:30:00Z"
  }
}
```

**Status:** `201 Created`

---

### 4️⃣ Actualizar Restaurante

**Ruta:** `PUT /brasa33/v1/restaurants/{id}` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"PUT /brasa33/v1/restaurants/{id}"** (color naranja)
2. Haz clic en **"Try it out"**
3. En el campo **"id"**, ingresa: `5`
4. En el **Request body**, ingresa:
   ```json
   {
     "name": "Brasa 33 Sucursal Actualizado",
     "address": "Avenida Secundaria 456 - Piso 2",
     "phone": "+57 1 888 7777"
   }
   ```
5. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Brasa 33 Sucursal Actualizado",
    "address": "Avenida Secundaria 456 - Piso 2",
    "phone": "+57 1 888 7777",
    "created_at": "2024-01-15T15:30:00Z"
  }
}
```

**Status:** `200 OK`

---

## 🍽️ Prueba 3: Menú

### 5️⃣ Listar Platos del Menú

**Ruta:** `GET /brasa33/v1/menu` (Sin JWT)

**Pasos en Swagger:**
1. Expande **"Menú"**
2. Haz clic en **"GET /brasa33/v1/menu"** (azul)
3. Haz clic en **"Try it out"**
4. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Brasas a la Parrilla",
      "description": "Carnes premium",
      "price": 45.99,
      "stock": 50,
      "restaurant_id": 1,
      "created_at": "2024-01-15T09:00:00Z"
    }
  ]
}
```

---

### 6️⃣ Crear Plato

**Ruta:** `POST /brasa33/v1/menu` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"POST /brasa33/v1/menu"** (verde)
2. Haz clic en **"Try it out"**
3. En el **Request body**, ingresa:
   ```json
   {
     "name": "Asado de Tira",
     "description": "Corte tradicional asado a la parrilla",
     "price": 55.99,
     "stock": 45,
     "restaurant_id": 1
   }
   ```
4. Haz clic en **"Execute"**

**Status:** `201 Created`

---

### 7️⃣ Actualizar Stock

**Ruta:** `PATCH /brasa33/v1/menu/{id}/stock` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"PATCH /brasa33/v1/menu/{id}/stock"** (amarillo)
2. Haz clic en **"Try it out"**
3. En el campo **"id"**, ingresa: `1`
4. En el **Request body**, ingresa:
   ```json
   {
     "stock": 100
   }
   ```
5. Haz clic en **"Execute"**

**Status:** `200 OK`

---

## 📦 Prueba 4: Órdenes

### 8️⃣ Crear Orden

**Ruta:** `POST /brasa33/v1/orders` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Expande **"Órdenes"**
2. Haz clic en **"POST /brasa33/v1/orders"** (verde)
3. Haz clic en **"Try it out"**
4. En el **Request body**, ingresa:
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
5. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "id": 101,
    "user_id": 1,
    "total": 114.48,
    "status": "pending",
    "created_at": "2024-01-15T14:30:00Z"
  }
}
```

**Status:** `201 Created`

---

### 9️⃣ Ver Mis Órdenes

**Ruta:** `GET /brasa33/v1/orders/my-orders` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"GET /brasa33/v1/orders/my-orders"** (azul)
2. Haz clic en **"Try it out"**
3. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "user_id": 1,
      "total": 114.48,
      "status": "pending",
      "created_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

---

### 🔟 Confirmar Orden

**Ruta:** `PATCH /brasa33/v1/orders/{id}/confirm` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"PATCH /brasa33/v1/orders/{id}/confirm"** (amarillo)
2. Haz clic en **"Try it out"**
3. En el campo **"id"**, ingresa: `101`
4. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "id": 101,
    "user_id": 1,
    "total": 114.48,
    "status": "confirmed",
    "created_at": "2024-01-15T14:30:00Z"
  }
}
```

---

### 1️⃣1️⃣ Cambiar Estado de Orden

**Ruta:** `PATCH /brasa33/v1/orders/{id}/status` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"PATCH /brasa33/v1/orders/{id}/status"** (amarillo)
2. Haz clic en **"Try it out"**
3. En el campo **"id"**, ingresa: `101`
4. En el **Request body**, ingresa:
   ```json
   {
     "status": "preparing"
   }
   ```
   (Estados válidos: `pending`, `confirmed`, `preparing`, `ready`, `completed`, `cancelled`)
5. Haz clic en **"Execute"**

**Status:** `200 OK`

---

## 💳 Prueba 5: Pagos

### 1️⃣2️⃣ Crear Pago

**Ruta:** `POST /brasa33/v1/payments` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Expande **"Pagos"**
2. Haz clic en **"POST /brasa33/v1/payments"** (verde)
3. Haz clic en **"Try it out"**
4. En el **Request body**, ingresa:
   ```json
   {
     "order_id": 101,
     "amount": 114.48,
     "method": "credit_card"
   }
   ```
   (Métodos válidos: `credit_card`, `debit_card`, `cash`, `digital_wallet`)
5. Haz clic en **"Execute"**

**Status:** `201 Created`

---

### 1️⃣3️⃣ Obtener Mis Pagos

**Ruta:** `GET /brasa33/v1/payments/my-payments` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"GET /brasa33/v1/payments/my-payments"** (azul)
2. Haz clic en **"Try it out"**
3. Haz clic en **"Execute"**

---

## 🗓️ Prueba 6: Reservaciones

### 1️⃣4️⃣ Crear Reservación

**Ruta:** `POST /brasa33/v1/reservations` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Expande **"Reservaciones"**
2. Haz clic en **"POST /brasa33/v1/reservations"** (verde)
3. Haz clic en **"Try it out"**
4. En el **Request body**, ingresa:
   ```json
   {
     "restaurant_id": 1,
     "guest_count": 4,
     "reservation_date": "2024-02-20T19:00:00Z",
     "special_requests": "Mesa junto a la ventana, es nuestro aniversario"
   }
   ```
5. Haz clic en **"Execute"**

**Status:** `201 Created`

---

### 1️⃣5️⃣ Ver Mis Reservaciones

**Ruta:** `GET /brasa33/v1/reservations/my-reservations` ⚠️ Requiere JWT

**Pasos en Swagger:**
1. Haz clic en **"GET /brasa33/v1/reservations/my-reservations"** (azul)
2. Haz clic en **"Try it out"**
3. Haz clic en **"Execute"**

---

## 📊 Prueba 7: Reportes (Sin JWT)

### 1️⃣6️⃣ Ingresos Totales

**Ruta:** `GET /brasa33/v1/reports/total-revenue` (Sin JWT)

**Pasos en Swagger:**
1. Expande **"Reportes"**
2. Haz clic en **"GET /brasa33/v1/reports/total-revenue"** (azul)
3. Haz clic en **"Try it out"**
4. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "total_revenue": 5250.75,
    "currency": "COP"
  }
}
```

---

### 1️⃣7️⃣ Productos Más Vendidos

**Ruta:** `GET /brasa33/v1/reports/top-products`

**Pasos en Swagger:**
1. Haz clic en **"GET /brasa33/v1/reports/top-products"** (azul)
2. Haz clic en **"Try it out"**
3. (Opcional) En el campo **"limit"**, ingresa: `5`
4. Haz clic en **"Execute"**

---

### 1️⃣8️⃣ Órdenes por Estado

**Ruta:** `GET /brasa33/v1/reports/orders-by-status`

**Pasos en Swagger:**
1. Haz clic en **"GET /brasa33/v1/reports/orders-by-status"** (azul)
2. Haz clic en **"Try it out"**
3. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "data": {
    "pending": 2,
    "confirmed": 5,
    "preparing": 1,
    "ready": 0,
    "completed": 89,
    "cancelled": 0
  }
}
```

---

## 🏥 Prueba 9: Health Check

**Ruta:** `GET /brasa33/v1/health` (Sin JWT)

**Pasos en Swagger:**
1. Busca **"GET /health"**
2. Haz clic en **"Try it out"**
3. Haz clic en **"Execute"**

**Resultado esperado:**
```json
{
  "success": true,
  "status": "healthy",
  "service": "Brasa 33 Restaurant Manager",
  "version": "1.0.0",
  "timestamp": "2024-01-15T15:45:00Z"
}
```

**Status:** `200 OK`

---

## 🐛 Solucionar Problemas en Swagger

### Problema: "Token no válido"

**Solución:**
1. Obtén un nuevo token del Auth Service
2. Haz clic en "Authorize" nuevamente
3. Limpia el campo y pega el nuevo token

### Problema: Endpoint no aparece

**Solución:**
1. Recarga la página (F5)
2. Verifica que esté en la URL correcta
3. Asegúrate que el servidor esté corriendo

### Problema: Response 401 (No autorizado)

**Solución:**
1. Verifica que hayas hecho clic en "Authorize"
2. Verifica que el token incluya "Bearer " al inicio
3. Obtén un nuevo token si el anterior expiró

---

## ✅ Checklist de Pruebas Completas

```
Restaurantes:
  [ ] GET /restaurants (sin JWT)
  [ ] GET /restaurants/{id} (sin JWT)
  [ ] POST /restaurants (con JWT)
  [ ] PUT /restaurants/{id} (con JWT)
  [ ] DELETE /restaurants/{id} (con JWT)

Menú:
  [ ] GET /menu (sin JWT)
  [ ] GET /menu/{id} (sin JWT)
  [ ] POST /menu (con JWT)
  [ ] PUT /menu/{id} (con JWT)
  [ ] PATCH /menu/{id}/stock (con JWT)
  [ ] DELETE /menu/{id} (con JWT)

Órdenes:
  [ ] POST /orders (con JWT)
  [ ] GET /orders (sin JWT)
  [ ] GET /orders/my-orders (con JWT)
  [ ] GET /orders/{id} (sin JWT)
  [ ] PATCH /orders/{id}/confirm (con JWT)
  [ ] PATCH /orders/{id}/status (con JWT)
  [ ] PATCH /orders/{id}/cancel (con JWT)

Pagos:
  [ ] POST /payments (con JWT)
  [ ] GET /payments (sin JWT)
  [ ] GET /payments/my-payments (con JWT)
  [ ] GET /payments/{id} (sin JWT)

Reservaciones:
  [ ] POST /reservations (con JWT)
  [ ] GET /reservations (sin JWT)
  [ ] GET /reservations/my-reservations (con JWT)
  [ ] GET /reservations/{id} (sin JWT)
  [ ] PATCH /reservations/{id}/cancel (con JWT)
  [ ] PATCH /reservations/{id}/complete (con JWT)

Reportes:
  [ ] GET /reports/total-revenue
  [ ] GET /reports/sales-by-date
  [ ] GET /reports/top-products
  [ ] GET /reports/orders-by-status
  [ ] GET /reports/reservations-report

Health:
  [ ] GET /health
```

---

¡**Felicidades!** Ya has probado todos los endpoints de tu API. 🎉

Si encuentras problemas, revisa [SWAGGER_GUIDE.md](SWAGGER_GUIDE.md) o [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md).
