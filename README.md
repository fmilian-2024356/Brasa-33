# Sistema-Restaurante-La-33
- Proyecto a nivel escolar del grupo "La 33" del Centro Técnico Laboral Kinal de la sección IN6AV.

## Descripción
- Sistema de gestión de restaurante desarrollado con arquitectura de microservicios que permite la administración integral de usuarios, restaurantes, menú, inventario, reservaciones, pedidos, pagos y generación de reportes estadísticos de manera segura, organizada y escalable. El sistema automatiza los procesos operativos y administrativos del restaurante, optimizando la atención al cliente y el 
control interno.

## Requisitos Previos
- Node.js
- PostgreSQL
- MongoDB

## Funcionalidades Principales
- Registro y autenticación de usuarios con JWT
- Recuperación y restablecimiento de contraseñas
- Sistema de roles y permisos
- Administración de menú y control de inventario
- Gestión de reservaciones
- Creación y seguimiento de pedidos
- Registro y control de pagos
- Envío de notificaciones por correo electrónico
- Middleware de manejo global de errores

## Microservicios
- Servicio de Autenticación y Usuarios
- Servicio de Gestión de Restaurantes
- Servicio de Menú e Inventario
- Servicio de Reservaciones
- Servicio de Pedidos
- Servicio de Pagos


## Servicio de Gestión de Restaurantes
- Administra la información general del restaurante, sucursales, horarios de atención y configuración general del sistema. Permite crear, editar, consultar y eliminar registros relacionados con el restaurante.

## Servicio de Menú e Inventario
- Gestiona los platillos y bebidas disponibles, organizados por categorías. Controla precios, disponibilidad y stock de ingredientes. Actualiza automáticamente el inventario cuando se realiza un pedido.

## Servicio de Reservaciones
- Permite a los clientes realizar reservaciones según disponibilidad. Gestiona fechas, horarios, cantidad de personas y estado de la reserva. Mantiene historial de reservaciones realizadas.

## Servicio de Pedidos
- Permite crear pedidos en mesa o para llevar, asignar estado (pendiente, en preparación, entregado, cancelado) y llevar control detallado de productos solicitados.

## Servicio de Pagos
- Administra los pagos realizados por los clientes, métodos de pago, confirmación de transacciones e historial financiero asociado a pedidos.

## Servicio de Reportes y Estadísticas
- Genera reportes de ventas, productos más vendidos, ingresos por período, estadísticas de reservaciones y desempeño general del restaurante.

## Tecnologías Utilizadas
- Node.js
- Express
- PostgreSQL
- MongoDB

## Base de Datos
- PostgreSQL
- MongoDB
- PostgreSQL para datos estructurados como usuarios, pedidos, pagos, restaurantes y reservaciones.
- MongoDB para almacenamiento de reseñas, logs, estadísticas y datos no estructurados.

## Configuración
- Clona el repositorio: git clone <url-del-repositorio>
- Navega a la carpeta del proyecto: cd restaurante-node
- Instala las dependencias: npm install
- Configura el archivo .env con las variables necesarias:

## Notas de Desarrollo
- El servidor escucha en el puerto definido en .env.
- Las rutas están prefijadas con /api.
- Los tokens JWT expiran según configuración en .env.
- Rate limiting configurado: 100 requests por 15 minutos por IP.
- Las reservaciones se validan según disponibilidad.

## Microservicios
- Servicio de Autenticación y Usuarios
- Servicio de Gestión de Restaurantes
- Servicio de Menú e Inventario
- Servicio de Reservaciones
- Servicio de Pedidos
- Servicio de Pagos
- Servicio de Reportes y Estadísticas

## Base de datos
- PostgreSQL
- MongoDB

## Estructura del proyecto
- Entrega de el proyecto de restaurantes.

## Licencia
Este proyecto está bajo la Licencia MIT.

## Autor
Grupo No. 33 - La 33
Centro Técnico Laboral Kinal