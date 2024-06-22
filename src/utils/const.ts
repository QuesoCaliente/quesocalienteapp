export const CATEGORIES = [
  { id: 1, name: "Noticias" },
  { id: 2, name: "NextJS" },
  { id: 3, name: "Astro" },
  { id: 4, name: "Videojuegos" },
  { id: 5, name: "React" },
  { id: 6, name: "Html" },
  { id: 7, name: "Css" },
  { id: 8, name: "Javascript" },
  { id: 9, name: "Google Cloud" },
  { id: 10, name: "Vercel" },
  { id: 11, name: "Netlify" },
  { id: 12, name: "Firebase" },
  { id: 13, name: "Svelte" },
  { id: 14, name: "Vue" },
  { id: 15, name: "Angular" },
  { id: 16, name: "NodeJS" },
  { id: 17, name: "Deno" },
  { id: 18, name: "Python" },
  { id: 19, name: "Django" },
  { id: 20, name: "Flask" },
  { id: 21, name: "FastAPI" },
  { id: 22, name: "Ruby" },
  { id: 23, name: "Ruby on Rails" },
  { id: 24, name: "PHP" },
  { id: 25, name: "Inteligencia Artificial" },
  { id: 26, name: "Utilidades" },
] as const;

export const CATEGORIES_NAMES = CATEGORIES.map((category) => category.name) as [
  string,
  ...string[]
];
