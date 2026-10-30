Sistema de Gestión de Tickets de Soporte Técnico

Autor: Josefa Lagos

Descripción del Proyecto

Aplicación web desarrollada para gestionar solicitudes de soporte técnico. Permite registrar, consultar, actualizar y eliminar tickets en tiempo real, manteniendo persistencia de datos mediante una API REST en Node.js conectada a Microsoft SQL Server y almacenamiento auxiliar en el navegador (localStorage).

Tecnologías Utilizadas

Frontend: Angular 22 (Standalone Components, HttpClient, FormsModule, CSS3)

Backend: Node.js, Express.js

Base de Datos: Microsoft SQL Server (Consultas parametrizadas con mssql)

Control de Versiones: Git & GitHub

Estructura General del Proyecto

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


Instrucciones de Instalación y Ejecución

1. Requisitos Previos

Node.js v18+ instalado.

Instancia de SQL Server en ejecución con la tabla Tickets creada.

2. Configuración y Ejecución del Backend

cd backend
npm install
node server.js


El servidor iniciará en http://localhost:3000.

3. Configuración y Ejecución del Frontend

cd tickets-angular
npm install
ng serve


Acceso desde el navegador en http://localhost:4200.

Funcionalidades Implementadas (CRUD)

GET (Consultar): Carga los tickets almacenados en la base de datos SQL Server y los muestra en una tabla interactiva.

POST (Registrar): Formulario dinámico para agregar nuevos tickets validando campos obligatorios.

PUT (Actualizar): Modificación de estado, prioridad y descripción de tickets existentes.

DELETE (Eliminar): Eliminación de registros con confirmación previa del usuario.

Persistencia Doble: Datos mantenidos ante reinicios del backend o recargas del navegador.

Diseño Visual: Distinción de prioridades mediante badges de colores (Alta/Media/Baja).

Pruebas Realizadas

Prueba GET: Verificación de consulta inicial desde SQL Server.

Prueba POST: Inserción de nuevos tickets desde la interfaz hacia la base de datos.

Prueba PUT: Edición de datos y actualización inmediata en pantalla y BD.

Prueba DELETE: Eliminación física en BD y filtrado reactivo en el frontend.

Prueba Persistencia: Carga exitosa con localStorage al simular caídas de la API.

Declaración de Uso de Inteligencia Artificial

Herramienta utilizada: Gemini.

Actividades apoyadas: Conexión de base de datos SQL Server con el proyecto, estructuración modular en Angular, optimización de estilos CSS y depuración de errores TypeScript (TS2741).
