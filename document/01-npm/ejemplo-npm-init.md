# 📦 Ejemplo completo – npm + Express (paso a paso)

Este proyecto demuestra cómo crear desde cero una app Node.js básica que usa Express. Aprenderás a:

- Iniciar un proyecto con `npm`
- Instalar dependencias
- Crear un archivo principal `index.js`
- Configurar scripts en `package.json`
- Ejecutar el servidor en modo normal y desarrollo
- Ignorar carpetas como `node_modules/` usando `.gitignore`

---

## ✅ Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior)
- Tener terminal o consola de comandos (cmd, PowerShell, Bash...)

---

## ▶️ Crear el proyecto desde cero

1. **Abrir tu terminal y ejecutar paso a paso lo siguiente**:

```bash
# Crear carpeta del proyecto
mkdir ejemplo-npm-init
cd ejemplo-npm-init

# Inicializar el proyecto con package.json por defecto
npm init -y

# Instalar Express como dependencia
npm install express

# Instalar nodemon como dependencia de desarrollo
npm install --save-dev nodemon

# Copiar contenido index.js
touch index.js

# Copiar contenido .gitignore
touch .gitignore

# Revisar que el contenido de package.json

```

**📝 Copiar del archivo `index.js`**

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("¡Hola desde Express!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
```

**📝 Copiar del archivo `.gitignore`**

```text
node_modules/
.env
```

**📝 Comprobar del archivo `package.json`**

```json
{
  "name": "ejemplo-npm-init",
  "version": "1.0.0",
  "description": "Proyecto básico con Express y npm",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "author": "SkillForgeTTEC",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

2. **Ejecutar el servidor**:

```bash
# Instalar dependencias (si no lo hiciste aún):
npm install

# Ejecutar en modo normal:
npm start

# Ejecutar en modo desarrollo (con reinicio automático):
npm run dev
```

🔄 nodemon reinicia automáticamente el servidor cada vez que modificas un archivo .js

#### Después de ejecutar, abre tu navegador en:

```text
http://localhost:3000
```

#### Y deberías ver:

```text
¡Hola desde Express!
```

---

## 💡 Sugerencias útiles para Visual Studio Code

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) – para detectar errores de estilo/sintaxis
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) – para formatear automáticamente tu código
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense) – autocompletado para dependencias npm
