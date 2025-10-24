# 📦 Tech Nexus - Frontend
Bienvenido al repositorio del servicio frontend de Tech Nexus — una aplicación web desarrollada con React, TypeScript y Vite, que ofrece la interfaz gráfica del sistema de comercio online de productos de computación. 

Este proyecto consume la API REST del repositorio Tech Nexus - Backend para gestionar autenticación, productos, pedidos, y usuarios.

> ⚠️ Este repositorio es solo para el **frontend**. El backend se encuentra en otro repositorio: [Tech Nexus - Backend](https://github.com/FDB-52450/proyectoDSW-backend)

## 📚 Tabla de Contenidos

- [🛠 Tecnologías](#-tecnologías)
- [📋 Prerrequisitos](#-prerrequisitos)
- [🚀 Primeros Pasos](#-primeros-pasos)
- [🧾 Estructura del Proyecto](#-estructura-del-proyecto)
- [🌐 Comunicación con la API](#-comunicación-con-la-api)
- [🧪 Pruebas](#-pruebas)
- [🛠 Variables de Entorno](#-variables-de-entorno)
- [📦 Scripts](#-scripts)
- [📞 Contacto](#-contacto)

## 🛠 Tecnologías

- **Lenguaje**: TypeScript
- **Framework**: React
- **Bundler**: Vite
- **Routing**: React Router
- **Componentes**: Mantine UI
- **Pruebas**: Vitest / Playwright

## 📋 Prerrequisitos

Antes de comenzar con la instalación y ejecución del frontend, asegúrate de haber instalado lo siguiente:

- **[Node.js (incluye npm)](https://nodejs.org/)** (v16+ recomendado)

## 🚀 Primeros Pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/FDB-52450/proyectoDSW-frontend.git
cd frontend-repo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Copiar y configurar las variables de entorno (ver sección de variables de entorno)
```bash
cp .env-example .env
```
> 💡 En Windows, usar `copy .env-example .env` en lugar de `cp .env-example .env`


### 4. Construir el proyecto (opcional)
```bash
npm run build
```

### 5. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 🧾 Estructura del Proyecto
```bash
/src
  /assets           → Imágenes, íconos y recursos estáticos
  /componentes      → Componentes reutilizables
    /cart                 → Componentes de carrito.
    /product              → Componentes de producto.
    /confirmationModals   → Componentes de confirmacion.
    /error                → Componente de error.
    /layout               → Componentes de layout.
      /DashboardLayout        → Layout del dashboard de admins.
      /DefaultLayout          → Layout principal del sitio.
  /pages            → Paginas del sitio web
    /dashboard          → Paginas exclusivas del dashboard.
  /notifications    → Sistema de notificaciones.
  /loaders          → Middlewares de autorización
  /entities         → Interfaces de entidades
  /services         → Capa de servicio para llamadas al backend
  main.tsx          → Punto de entrada principal
  App.tsx           → Componente raíz
/docs               → Documentación de la API
/tests              → Pruebas unitarias y E2E
package.json
vite.config.ts
playwright.config.ts
```

## 🌐 Comunicación con la API

Toda comunicación con el backend se realiza a través de la capa de servicios (/src/services), utilizando fetch. En caso de ocurrir un error, se le comunicara al usuario actual con una notificacion de error.

Asegúrate de configurar la variable VITE_API_URL en tu archivo .env para apuntar correctamente a la API.


## 🧪 Pruebas
- **Unitario**: Vitest ([https://vitest.dev/guide/](https://vitest.dev/guide/))
- **E2E**: Playwright ([https://playwright.dev/docs/intro](https://playwright.dev/docs/intro))

### Realizar tests unitarios y de end to end
```bash
npm run test
```

#### Realizar tests unitarios
```bash
npm run test:unit
```

#### Realizar tests end to end
```bash
npm run test:e2e
```

## 🛠️ Variables de Entorno
A continuación se describen las variables necesarias para configurar el entorno del proyecto:

| Variable        | Valor por defecto | Descripción                                         |
|----------------|-------------------|-----------------------------------------------------|
| `PORT`         | `5173`               | Puerto a utilizar para el frontend    |
| `VITE_FRONTEND_URL`       | `http://localhost:5173`               | URL del servicio de frontend                   |
| `VITE_BACKEND_URL`      | `http://localhost:8080`      | URL del servicio del backend                          |

## 📦 Scripts

- `npm run build` - Compila el proyecto TypeScript.
- `npm run dev` - Inicia el servidor en modo desarrollo con hot-reloading.
- `npm run lint` - Detectar errores en el codigo con lint.
- `npm run test` - Ejecuta las pruebas unitarias y de end 2 end.
  - `npm run test:e2e` - Ejecuta las pruebas de end 2 end.
  - `npm run test:unit` - Ejecuta las pruebas unitarias.

## 📞 Contacto
En caso de tener alguna duda con respecto a la documentacion o al projecto en si, comunicarse mediante el siguiente medio:
- **Email**: [francodb2005@outlook.com.ar](mailto:francodb2005@outlook.com.ar)