# Valentino Pages — Portfolio

> Sitio web personal de Valentino Pagés, desarrollador frontend.

## Stack

- **HTML / CSS / JS**
- **Vite** como bundler y dev server
- **Tailwind CSS v4** para estilos
- **Font Awesome** para iconografía
- **Google Fonts** — Montserrat, Bricolage Grotesque

## Estructura

```
├── index.html          ← punto de entrada, todas las secciones
├── src/
│   ├── main.js         ← navegación por slides, menú móvil, formulario
│   └── style.css       ← tema de Tailwind, animaciones, utilidades
├── dist/               ← build de producción + assets estáticos (fotos)
└── public/             ← favicon, CV en PDF
```

## Desarrollo

```bash
npm install
npm run dev        # servidor en localhost
npm run build      # build a dist/
npm run preview    # preview del build
```

## Secciones

| Sección | Descripción |
|---------|-------------|
| **Hero** | Presentación con animación de escritura |
| **Sobre mí** | Bio, stack tecnológico y links sociales |
| **Habilidades** | Grid de tecnologías + herramientas backend e IA |
| **Proyectos** | Cards con screenshots, links a GitHub y demo |
| **Contacto** | Formulario + email, LinkedIn, GitHub |

## Navegación

El sitio usa **scroll suave** entre secciones. El navbar permite saltar directamente a cada sección con animación de transición.
