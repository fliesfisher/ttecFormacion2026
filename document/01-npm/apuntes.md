# 📦 Módulo 01: Fundamentos de npm

## ¿Qué es Node.js?

[Node.js](https://nodejs.org/) es un entorno de ejecución para JavaScript que permite correr código fuera del navegador. Está construido sobre el motor V8 de Chrome y es ideal para crear aplicaciones de backend como APIs, scripts CLI, servidores, automatizaciones, etc.

Al instalar Node.js también se instala automáticamente `npm`, el gestor de paquetes.

Para verificar que tienes Node.js y npm instalados, ejecuta en la terminal:

```bash
node -v
npm -v
```

## ¿Qué es npm?

`npm` (Node Package Manager) es el gestor de paquetes oficial de Node.js. Permite:

- Instalar librerías de terceros.
- Gestionar las dependencias de tu proyecto.
- Ejecutar scripts automatizados.
- Compartir tu propio código como paquete.

---

## 🎯 Objetivos del módulo

- Comprender qué es `npm` y para qué sirve.
- Iniciar un proyecto Node con `package.json`.
- Instalar paquetes (dependencias).
- Usar scripts definidos en `package.json`.

---

## 📁 Estructura típica del proyecto

```bash
mi-proyecto/
├── node_modules/       # Dependencias instaladas
├── package.json        # Metadatos y scripts del proyecto
├── package-lock.json   # Versiones exactas de dependencias
└── index.js            # Archivo principal (ejemplo)
```

---

## 🔧 Comandos esenciales de npm

| Comando                         | Descripción                                         |
| ------------------------------- | --------------------------------------------------- |
| `npm init`                      | Inicia el `package.json` paso a paso                |
| `npm init -y`                   | Crea un `package.json` con valores por defecto      |
| `npm install nombre-paquete`    | Instala una dependencia y la guarda automáticamente |
| `npm install --save-dev nombre` | Instala como dependencia de desarrollo              |
| `npm uninstall nombre`          | Elimina un paquete instalado                        |
| `npm list`                      | Muestra las dependencias instaladas                 |
| `npm outdated`                  | Muestra si hay versiones más recientes disponibles  |
| `npm audit`                     | Analiza vulnerabilidades de seguridad               |
| `npm run script`                | Ejecuta un script definido en `package.json`        |

---

## 🔧 Comandos útiles de Node.js

| Comando              | Descripción                          |
| -------------------- | ------------------------------------ |
| `node archivo.js`    | Ejecuta un archivo JS con Node.js    |
| `node`               | Abre el REPL interactivo de Node     |
| `CTRL + C`           | Salir del REPL o terminar ejecución  |
| `require('modulo')`  | Cargar un módulo dentro de un script |
| `console.log(valor)` | Imprime valor en consola             |
| `process.exit()`     | Finaliza el proceso manualmente      |

## 📝 Ejemplo de `package.json`

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

---

## 🔒 Buenas prácticas

- Nunca subas `node_modules/` al repositorio (usa `.gitignore`).
- Usa `package-lock.json` para asegurar la misma versión en todos los equipos.
- Mantén organizados los scripts (`start`, `dev`, `build`, `test`, etc.).
- Utiliza `npm audit` y `npm outdated` regularmente para revisar seguridad y actualizaciones.
- Usa scripts para tareas comunes como test, build o limpiar carpetas temporales.

---

## 📌 Recursos recomendados

- [📘 Documentación oficial de npm](https://docs.npmjs.com/)
- [📄 npm cheatsheet](https://devhints.io/npm)
- [📊 npm trends – Comparar popularidad de paquetes](https://www.npmtrends.com/)
- [🧠 nodejs.dev – Guía oficial de Node.js](https://nodejs.dev/learn)
