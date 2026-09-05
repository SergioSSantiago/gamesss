# gamesss

Diario de videojuegos al estilo Letterboxd: busca cualquier título, recorre consolas de todas las generaciones y registra partidas, notas y listas.

El catálogo sale de [Wikidata](https://www.wikidata.org/) y Wikipedia (portadas y sinopsis). Tu perfil, diario y listas se guardan en este navegador.

## Cómo arrancarlo

```bash
npm install
npm run dev
```

Abre la URL que imprima Vite (por defecto `http://localhost:5173`).

## Producción

El sitio se despliega en Vercel desde este repositorio. Las rutas del cliente (`/games`, `/platforms`, etc.) se reescriben a `index.html`.
