# 🎬 INICIO RÁPIDO - Comandos Esenciales

## 🚀 Ejecutar en 5 Minutos

```bash
# 1. Navega al directorio
cd restaurant-manager

# 2. Instala dependencias (si no lo hiciste)
npm install

# 3. Configura .env (copia y edita .env.example)
cp .env.example .env

# 4. Inicia el servidor
npm run dev
```

**Deberías ver:**
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

---

## 🌐 Acceso Inmediato

| Elemento | URL |
|----------|-----|
| 📚 **Swagger UI** | http://localhost:3000/brasa33/v1/docs |
| 🏥 **Health Check** | http://localhost:3000/brasa33/v1/health |
| 📍 **API Base** | http://localhost:3000/brasa33/v1 |

---

## 🔐 Configurar Autenticación (Primer Uso)

### Paso 1: Obtener Token
```bash
# Desde Auth Service (.NET)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Copia el token de la respuesta
```

### Paso 2: Agregar en Swagger
1. Abre http://localhost:3000/brasa33/v1/docs
2. Haz clic en [Authorize]
3. Pega: `Bearer tu_token_aqui`
4. Haz clic en Authorize
5. ¡Listo!

---

## 🧪 Prueba Rápida

### Sin JWT (Público)
```bash
curl -X GET http://localhost:3000/brasa33/v1/restaurants
```

### Con JWT (Protegido)
```bash
curl -X POST http://localhost:3000/brasa33/v1/orders \
  -H "Authorization: Bearer tu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"menu_id": 1, "quantity": 2, "price": 45.99}]
  }'
```

---

## 📖 Documentación Recomendada

| Paso | Documento | Tiempo |
|------|-----------|--------|
| 1️⃣ | [README.md](README.md) | 15 min |
| 2️⃣ | [SWAGGER_GUIDE.md](SWAGGER_GUIDE.md) | 20 min |
| 3️⃣ | [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md) | 30 min |
| 4️⃣ | [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) | 45 min |

**Total para maestría: ~2 horas** ⏱️

---

## ✅ Validaciones Rápidas

```bash
# 1. ¿El servidor está corriendo?
curl http://localhost:3000/brasa33/v1/health

# 2. ¿Puedo acceder a Swagger?
curl http://localhost:3000/brasa33/v1/docs

# 3. ¿Los restaurantes están disponibles?
curl http://localhost:3000/brasa33/v1/restaurants

# Todas las respuestas deben ser 200 OK ✓
```

---

## 🎯 Ejemplos por Caso de Uso

### 📋 Crear una Orden Completa
```javascript
// 1. Obtener token
const auth = await fetch('http://localhost:5000/api/auth/login', {...});
const { token } = await auth.json();

// 2. Crear orden
const order = await fetch('http://localhost:3000/brasa33/v1/orders', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    items: [{menu_id: 1, quantity: 2, price: 45.99}]
  })
});

// 3. Ver respuesta
const data = await order.json();
console.log('Orden creada:', data.data.id);
```

### 📊 Obtener Reportes
```bash
# Ingresos totales
curl http://localhost:3000/brasa33/v1/reports/total-revenue

# Productos más vendidos
curl http://localhost:3000/brasa33/v1/reports/top-products

# Órdenes por estado
curl http://localhost:3000/brasa33/v1/reports/orders-by-status
```

---

## 🆘 Problemas Comunes

### ❌ "Cannot connect to localhost:3000"
**Solución:** Asegúrate de ejecutar `npm run dev`

### ❌ "401 Unauthorized"
**Solución:** Configura JWT en Swagger (ve a Paso 2 arriba)

### ❌ "Database connection failed"
**Solución:** Verifica que PostgreSQL esté corriendo y .env es correcto

### ❌ "Port 3000 already in use"
**Solución:** Cambia PORT en .env o cierra la app en ese puerto

---

## 📚 Documentación Completa

```
DOCUMENTATION_INDEX.md
├─ Mapa de todos los documentos
├─ Búsqueda rápida
└─ Guía por caso de uso

README.md
├─ Descripción general
├─ Instalación
├─ Configuración
└─ Endpoints

SWAGGER_GUIDE.md
├─ Cómo usar Swagger
├─ Configurar JWT
├─ Códigos HTTP
└─ Mejores prácticas

TECHNICAL_DOCUMENTATION.md
├─ Arquitectura
├─ Base de datos
├─ Patrones
└─ Deployment

USAGE_EXAMPLES.md
├─ Casos de uso
├─ Ejemplos código
├─ Integración React
└─ Troubleshooting

SWAGGER_TESTING_GUIDE.md
├─ Pruebas step-by-step
├─ 18 pruebas detalladas
├─ Soluciones
└─ Checklist
```

---

## 🎨 Estructura de Respuestas

### ✅ Éxito
```json
{
  "success": true,
  "data": { /* resultado */ }
}
```

### ❌ Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos"
}
```

---

## 🔗 Endpoints Principales

| Método | Ruta | Descripción |
|--------|------|------------|
| GET | `/restaurants` | Ver restaurantes |
| GET | `/menu` | Ver menú |
| POST | `/orders` | Crear orden |
| GET | `/orders/my-orders` | Mis órdenes |
| POST | `/reservations` | Hacer reserva |
| GET | `/reports/total-revenue` | Ingresos |

---

## 📞 ¿Necesitas Ayuda?

1. **Documentación:** Ver [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
2. **Ejemplos:** Ver [USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)
3. **Pruebas:** Ver [SWAGGER_TESTING_GUIDE.md](SWAGGER_TESTING_GUIDE.md)
4. **Técnico:** Ver [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)

---

## ✨ ¡Estás Listo!

Tu API está completa, documentada y lista para:
- ✅ Desarrollo
- ✅ Testing
- ✅ Integración
- ✅ Producción

**¡Que disfrutes! 🍽️**

---

**Versión:** 1.0.0  
**Estado:** ✅ Production Ready  
**Última actualización:** Enero 2024
