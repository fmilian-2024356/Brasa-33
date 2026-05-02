# 🎯 Casos de Uso y Ejemplos Prácticos

Esta guía proporciona ejemplos completos y realistas de cómo usar la API Brasa 33.

---

## 📋 Tabla de Contenidos

1. [Flujo Completo de Usuario](#flujo-completo-de-usuario)
2. [Caso 1: Crear y Procesar una Orden](#caso-1-crear-y-procesar-una-orden)
3. [Caso 2: Gestionar Reservaciones](#caso-2-gestionar-reservaciones)
4. [Caso 3: Analizar Reportes](#caso-3-analizar-reportes)
5. [Caso 4: Operaciones de Admin](#caso-4-operaciones-de-admin)
6. [Errores Comunes y Soluciones](#errores-comunes-y-soluciones)
7. [Integración Frontend](#integración-frontend)

---

## 🔄 Flujo Completo de Usuario

### Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  1. USUARIO SE AUTENTICA                                    │
│     └─→ Auth Service (.NET)                                 │
│     └─→ Recibe JWT Token                                    │
│                                                              │
│  2. EXPLORA RESTAURANTES                                    │
│     └─→ GET /brasa33/v1/restaurants (sin JWT requerido)    │
│                                                              │
│  3. VE MENÚ DEL RESTAURANTE                                 │
│     └─→ GET /brasa33/v1/menu/restaurant/{id}               │
│                                                              │
│  4. CREA UNA ORDEN                                          │
│     └─→ POST /brasa33/v1/orders (con JWT)                  │
│                                                              │
│  5. REALIZA UN PAGO                                         │
│     └─→ POST /brasa33/v1/payments (con JWT)                │
│                                                              │
│  6. VE SUS ÓRDENES                                          │
│     └─→ GET /brasa33/v1/orders/my-orders (con JWT)         │
│                                                              │
│  7. (OPCIONAL) HACE UNA RESERVACIÓN                         │
│     └─→ POST /brasa33/v1/reservations (con JWT)            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛒 Caso 1: Crear y Procesar una Orden

### Paso 1: Obtener Token de Autenticación

```bash
# Solicitud
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "password": "password123"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjbGllbnRlQGV4YW1wbGUuY29tIn0.ABC123...",
    "user": {
      "id": 1,
      "email": "cliente@example.com"
    }
  }
}
```

### Paso 2: Guardar el Token

```javascript
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
localStorage.setItem('jwt_token', token);
```

### Paso 3: Listar Restaurantes

```bash
curl -X GET http://localhost:3000/brasa33/v1/restaurants
```

**Respuesta:**
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
    },
    {
      "id": 2,
      "name": "Brasa 33 Norte",
      "address": "Calle 100 456",
      "phone": "+57 1 700 5678",
      "created_at": "2024-01-15T11:00:00Z"
    }
  ]
}
```

### Paso 4: Ver Menú del Restaurante

```bash
curl -X GET http://localhost:3000/brasa33/v1/menu/restaurant/1
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Brasas a la Parrilla",
      "description": "Carnes premium asadas a fuego lento",
      "price": 45.99,
      "stock": 50,
      "restaurant_id": 1,
      "created_at": "2024-01-15T09:00:00Z"
    },
    {
      "id": 2,
      "name": "Costillar BBQ",
      "description": "Costillares con salsa BBQ casera",
      "price": 52.50,
      "stock": 35,
      "restaurant_id": 1,
      "created_at": "2024-01-15T09:15:00Z"
    },
    {
      "id": 3,
      "name": "Ensalada Fresca",
      "description": "Ensalada mixta con aderezo especial",
      "price": 22.50,
      "stock": 100,
      "restaurant_id": 1,
      "created_at": "2024-01-15T09:30:00Z"
    }
  ]
}
```

### Paso 5: Crear una Orden

```bash
curl -X POST http://localhost:3000/brasa33/v1/orders \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Respuesta:**
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

### Paso 6: Confirmar la Orden

```bash
curl -X PATCH http://localhost:3000/brasa33/v1/orders/101/confirm \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta:**
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

### Paso 7: Crear Pago

```bash
curl -X POST http://localhost:3000/brasa33/v1/payments \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": 101,
    "amount": 114.48,
    "method": "credit_card"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 201,
    "user_id": 1,
    "order_id": 101,
    "amount": 114.48,
    "method": "credit_card",
    "status": "completed",
    "created_at": "2024-01-15T14:35:00Z"
  }
}
```

### Paso 8: Cambiar Estado de Orden

```bash
curl -X PATCH http://localhost:3000/brasa33/v1/orders/101/status \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "status": "ready"
  }'
```

---

## 📅 Caso 2: Gestionar Reservaciones

### Crear una Reservación

```bash
curl -X POST http://localhost:3000/brasa33/v1/reservations \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "restaurant_id": 1,
    "guest_count": 4,
    "reservation_date": "2024-02-20T19:00:00Z",
    "special_requests": "Mesa junto a la ventana, es nuestro aniversario"
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 301,
    "user_id": 1,
    "restaurant_id": 1,
    "guest_count": 4,
    "reservation_date": "2024-02-20T19:00:00Z",
    "status": "pending",
    "special_requests": "Mesa junto a la ventana, es nuestro aniversario",
    "created_at": "2024-01-15T14:40:00Z"
  }
}
```

### Ver Mis Reservaciones

```bash
curl -X GET http://localhost:3000/brasa33/v1/reservations/my-reservations \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 301,
      "user_id": 1,
      "restaurant_id": 1,
      "guest_count": 4,
      "reservation_date": "2024-02-20T19:00:00Z",
      "status": "pending",
      "special_requests": "Mesa junto a la ventana, es nuestro aniversario",
      "created_at": "2024-01-15T14:40:00Z"
    }
  ]
}
```

### Confirmar Reservación (por admin)

```bash
curl -X PATCH http://localhost:3000/brasa33/v1/reservations/301/complete \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📊 Caso 3: Analizar Reportes

### Obtener Ingresos Totales

```bash
curl -X GET http://localhost:3000/brasa33/v1/reports/total-revenue
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "total_revenue": 5250.75,
    "currency": "COP"
  }
}
```

### Ventas por Fecha

```bash
curl -X GET "http://localhost:3000/brasa33/v1/reports/sales-by-date?start_date=2024-01-01&end_date=2024-01-31"
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-15",
      "total_sales": 450.50,
      "order_count": 12
    },
    {
      "date": "2024-01-16",
      "total_sales": 525.00,
      "order_count": 15
    },
    {
      "date": "2024-01-17",
      "total_sales": 380.25,
      "order_count": 10
    }
  ]
}
```

### Productos Más Vendidos

```bash
curl -X GET "http://localhost:3000/brasa33/v1/reports/top-products?limit=5"
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "menu_id": 1,
      "dish_name": "Brasas a la Parrilla",
      "total_quantity_sold": 156,
      "total_revenue": 7174.44
    },
    {
      "menu_id": 2,
      "dish_name": "Costillar BBQ",
      "total_quantity_sold": 98,
      "total_revenue": 5145.00
    },
    {
      "menu_id": 3,
      "dish_name": "Ensalada Fresca",
      "total_quantity_sold": 234,
      "total_revenue": 5265.00
    }
  ]
}
```

### Órdenes por Estado

```bash
curl -X GET http://localhost:3000/brasa33/v1/reports/orders-by-status
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "pending": 5,
    "confirmed": 8,
    "preparing": 3,
    "ready": 2,
    "completed": 189,
    "cancelled": 1
  }
}
```

---

## 👨‍💼 Caso 4: Operaciones de Admin

### Crear Restaurante

```bash
curl -X POST http://localhost:3000/brasa33/v1/restaurants \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brasa 33 Occidente",
    "address": "Carrera 50 #30-40, Occidente",
    "phone": "+57 1 800 0000"
  }'
```

### Crear Plato

```bash
curl -X POST http://localhost:3000/brasa33/v1/menu \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bife de Chorizo",
    "description": "Corte de carne premium, jugoso y sabroso",
    "price": 65.99,
    "stock": 40,
    "restaurant_id": 1
  }'
```

### Actualizar Stock

```bash
curl -X PATCH http://localhost:3000/brasa33/v1/menu/1/stock \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 75
  }'
```

### Actualizar Plato

```bash
curl -X PUT http://localhost:3000/brasa33/v1/menu/1 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "price": 49.99,
    "description": "Brasas premium a la parrilla, carnes seleccionadas"
  }'
```

---

## ⚠️ Errores Comunes y Soluciones

### Error 1: "Token no proporcionado"

**Causa:** Falta el header Authorization  
**Solución:**
```bash
# ❌ Incorrecto
curl -X POST http://localhost:3000/brasa33/v1/orders

# ✅ Correcto
curl -X POST http://localhost:3000/brasa33/v1/orders \
  -H "Authorization: Bearer tu_token_aqui"
```

### Error 2: "Token inválido o expirado"

**Causa:** Token expirado o token incorrecto  
**Solución:**
```javascript
// Obtener un nuevo token
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'user@example.com', 
    password: 'password' 
  })
});
const { data: { token } } = await response.json();
```

### Error 3: "Stock insuficiente"

**Causa:** Intentaste pedir más items que los disponibles  
**Solución:**
```json
{
  "success": false,
  "message": "Stock insuficiente para menu_id 1. Disponible: 5, Solicitado: 10"
}
```

### Error 4: "Restaurante no encontrado" (404)

**Causa:** El ID del restaurante no existe  
**Solución:**
```bash
# Primero, obtén restaurantes válidos
curl -X GET http://localhost:3000/brasa33/v1/restaurants

# Luego usa uno que exista
curl -X GET http://localhost:3000/brasa33/v1/restaurants/1
```

### Error 5: "Datos inválidos" (400)

**Causa:** Faltan campos obligatorios  
**Solución:**
```json
// ❌ Incorrecto - falta 'stock'
{
  "name": "Brasa Nueva",
  "price": 45.99,
  "restaurant_id": 1
}

// ✅ Correcto - incluye todos los campos requeridos
{
  "name": "Brasa Nueva",
  "price": 45.99,
  "stock": 50,
  "restaurant_id": 1,
  "description": "Carnes asadas"
}
```

---

## 💻 Integración Frontend

### Ejemplo con Fetch API (JavaScript)

```javascript
class BrasaAPIClient {
  constructor(baseURL = 'http://localhost:3000/brasa33/v1') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('jwt_token');
  }

  // Configurar headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Método genérico para requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : null;
    const headers = this.getHeaders(options.auth !== false);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // ============ RESTAURANTES ============
  getRestaurants() {
    return this.request('/restaurants', { auth: false });
  }

  getRestaurantById(id) {
    return this.request(`/restaurants/${id}`, { auth: false });
  }

  // ============ MENÚ ============
  getMenuByRestaurant(restaurantId) {
    return this.request(`/menu/restaurant/${restaurantId}`, { auth: false });
  }

  // ============ ÓRDENES ============
  createOrder(items) {
    return this.request('/orders', {
      method: 'POST',
      body: { items }
    });
  }

  getMyOrders() {
    return this.request('/orders/my-orders');
  }

  confirmOrder(orderId) {
    return this.request(`/orders/${orderId}/confirm`, {
      method: 'PATCH'
    });
  }

  // ============ PAGOS ============
  createPayment(orderId, amount, method) {
    return this.request('/payments', {
      method: 'POST',
      body: { order_id: orderId, amount, method }
    });
  }

  getMyPayments() {
    return this.request('/payments/my-payments');
  }

  // ============ RESERVACIONES ============
  createReservation(restaurantId, guestCount, reservationDate, specialRequests) {
    return this.request('/reservations', {
      method: 'POST',
      body: { 
        restaurant_id: restaurantId, 
        guest_count: guestCount,
        reservation_date: reservationDate,
        special_requests: specialRequests
      }
    });
  }

  getMyReservations() {
    return this.request('/reservations/my-reservations');
  }

  // ============ REPORTES ============
  getTotalRevenue() {
    return this.request('/reports/total-revenue', { auth: false });
  }

  getTopProducts(limit = 10) {
    return this.request(`/reports/top-products?limit=${limit}`, { auth: false });
  }

  getSalesByDate(startDate, endDate) {
    return this.request(
      `/reports/sales-by-date?start_date=${startDate}&end_date=${endDate}`,
      { auth: false }
    );
  }
}

// Uso
const api = new BrasaAPIClient();

// Obtener restaurantes
api.getRestaurants()
  .then(({ data }) => {
    console.log('Restaurantes:', data);
    document.getElementById('restaurants').innerHTML = data
      .map(r => `<div>${r.name} - ${r.phone}</div>`)
      .join('');
  })
  .catch(error => console.error(error));

// Crear una orden
api.createOrder([
  { menu_id: 1, quantity: 2, price: 45.99 },
  { menu_id: 3, quantity: 1, price: 22.50 }
])
  .then(({ data }) => {
    console.log('Orden creada:', data.id);
    alert(`Tu orden #${data.id} ha sido creada!`);
  })
  .catch(error => console.error(error));
```

### Ejemplo con React

```jsx
import { useState, useEffect } from 'react';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener restaurantes al cargar
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/brasa33/v1/restaurants');
      const { data } = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRestaurant = async (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    try {
      const response = await fetch(
        `http://localhost:3000/brasa33/v1/menu/restaurant/${restaurantId}`
      );
      const { data } = await response.json();
      setMenu(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>🍽️ Brasa 33 Restaurant Manager</h1>
      
      <h2>Restaurantes</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="restaurants">
          {restaurants.map(restaurant => (
            <button
              key={restaurant.id}
              onClick={() => handleSelectRestaurant(restaurant.id)}
              className={selectedRestaurant === restaurant.id ? 'active' : ''}
            >
              {restaurant.name}
            </button>
          ))}
        </div>
      )}

      {selectedRestaurant && (
        <div>
          <h2>Menú</h2>
          <ul>
            {menu.map(dish => (
              <li key={dish.id}>
                <strong>{dish.name}</strong> - ${dish.price}
                <p>{dish.description}</p>
                <small>Stock: {dish.stock}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## ✅ Checklist de Pruebas Manuales

```
Flujo de Orden Completo:
  [ ] Obtener token de autenticación
  [ ] Listar restaurantes
  [ ] Ver menú del restaurante
  [ ] Crear orden
  [ ] Confirmar orden
  [ ] Crear pago
  [ ] Cambiar estado de orden
  [ ] Ver mis órdenes

Flujo de Reservación:
  [ ] Crear reservación
  [ ] Ver mis reservaciones
  [ ] Actualizar reservación
  [ ] Cancelar reservación

Reportes:
  [ ] Obtener ingresos totales
  [ ] Ver ventas por fecha
  [ ] Ver productos top
  [ ] Ver órdenes por estado

Admin:
  [ ] Crear restaurante
  [ ] Actualizar restaurante
  [ ] Crear plato
  [ ] Actualizar stock
  [ ] Eliminar plato
```

---

**¡Listo para empezar a usar la API!** 🚀🍽️
