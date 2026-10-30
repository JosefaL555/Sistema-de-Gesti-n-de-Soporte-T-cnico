# Sistema de Gestión de Tickets de Soporte Técnico
# Autor: Josefa Lagos

# Descripción del proyecto

Aplicación web desarrollada para gestionar solicitudes de soporte técnico. Permite registrar, consultar, actualizar y eliminar tickets en tiempo real, manteniendo persistencia de datos mediante una API REST en Node.js conectada a Microsoft SQL Server y almacenamiento auxiliar en el navegador (localStorage).

## Arquitectura y Tecnologías Utilizadas

- **Frontend:** Angular 22 (Single Page Application - SPA, componentes Standalone, HttpClient, RxJS).
- **Backend:** Node.js con Express (API REST).
- **Base de Datos:** MySQL (driver `mysql2` utilizando consultas parametrizadas contra Inyección SQL).
- **Control de Versiones:** Git y GitHub (repositorio público con historial de commits estructurado).

-------------------------------------------------------------------

## Estructura General del Proyecto

```text
sistemaDeGestion/
├── backend/
│   ├── server.js          # API REST Express y conexión SQL Server
│   └── package.json
└── tickets-angular/
    ├── src/
    │   └── app/
    │       ├── components/
    │       │   └── tickets/   # Vistas, lógica y estilos de tickets
    │       ├── services/      # Servicio HTTP para consumo de API REST
    │       ├── app.config.ts  # Configuración global y provideHttpClient
    │       └── app.routes.ts  # Enrutamiento de la aplicación
    └── package.json
```
-------------------------------------------------------------------

## Comandos para levantar el Backend en la terminal (Nodes.js/Express)

```bash
cd backend
npm install
node server.js
```

## Comandos de Frontend (Angular)
```bash
cd frontend/app-tickets
npm install
ng serve -o
```
-------------------------------------------------------------------

## Operaciones CRUD e Integración Realizada'

GET (Consultar): Carga los tickets almacenados en la base de datos SQL Server y los muestra en una tabla interactiva.

POST (Registrar): Formulario dinámico para agregar nuevos tickets validando campos obligatorios.

PUT (Actualizar): Modificación de estado, prioridad y descripción de tickets existentes.

DELETE (Eliminar): Eliminación de registros con confirmación previa del usuario.

Persistencia Doble: Datos mantenidos ante reinicios del backend o recargas del navegador.

Diseño Visual: Distinción de prioridades mediante badges de colores (Alta/Media/Baja).

-------------------------------------------------------------------

## Pruebas realizadas

Prueba GET: Verificación de consulta inicial desde SQL Server.

Prueba POST: Inserción de nuevos tickets desde la interfaz hacia la base de datos.

Prueba PUT: Edición de datos y actualización inmediata en pantalla y BD.

Prueba DELETE: Eliminación física en BD y filtrado reactivo en el frontend.

Prueba Persistencia: Carga exitosa con localStorage al simular caídas de la API.

-------------------------------------------------------------------

## Declaración sobre el uso de Inteligencia Artificial

Conexión de base de datos SQL Server con el proyecto, estructuración modular en Angular, optimización de estilos CSS y depuración de errores TypeScript (TS2741).
