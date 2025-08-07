/**
 * Configuración centralizada de redes sociales y enlaces
 *
 * Este archivo contiene todas las redes sociales, enlaces y proyectos del sitio web
 * para facilitar el mantenimiento y actualización de información en un solo lugar.
 *
 * @example
 * ```ts
 * import { SOCIAL_LINKS, FOOTER_SOCIAL_LINKS, PROJECTS, FEATURED_PROJECTS } from '@/config';
 *
 * // Usar un enlace específico
 * const linkedinUrl = SOCIAL_LINKS.linkedin.url;
 *
 * // Usar un conjunto predefinido
 * const footerLinks = FOOTER_SOCIAL_LINKS;
 *
 * // Obtener todos los proyectos
 * const allProjects = PROJECTS;
 *
 * // Obtener solo proyectos destacados
 * const featuredProjects = FEATURED_PROJECTS;
 * ```
 */ // Configuración centralizada de redes sociales y enlaces
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export const SOCIAL_LINKS: Record<string, SocialLink> = {
  linkedin: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/briancifuentes/",
    icon: "mdi:linkedin",
    username: "briancifuentes",
  },
  github: {
    name: "GitHub",
    url: "https://github.com/QuesoCaliente",
    icon: "mdi:github",
    username: "QuesoCaliente",
  },
  twitter: {
    name: "Twitter",
    url: "https://twitter.com/quesocaliente0",
    icon: "mdi:twitter",
    username: "@quesocaliente0",
  },
  discord: {
    name: "Discord",
    url: "https://discord.gg/whjkMeTKRN",
    icon: "mdi:discord",
  },
  twitch: {
    name: "Twitch",
    url: "https://twitch.tv/quesocaliente0",
    icon: "mdi:twitch",
    username: "quesocaliente0",
  },
  instagram: {
    name: "Instagram",
    url: "https://instagram.com/quesocaliente0",
    icon: "mdi:instagram",
    username: "quesocaliente0",
  },
  kofi: {
    name: "Ko-fi",
    url: "https://ko-fi.com/quesocaliente0",
    icon: "mdi:coffee",
    username: "quesocaliente0",
  },
};

// Enlaces específicos para diferentes secciones
export const FOOTER_SOCIAL_LINKS = [SOCIAL_LINKS.twitter, SOCIAL_LINKS.discord];

export const HERO_SOCIAL_LINKS = [
  SOCIAL_LINKS.discord,
  SOCIAL_LINKS.twitch,
  SOCIAL_LINKS.instagram,
];

// Configuración para SEO
export const SEO_CONFIG = {
  twitter: {
    site: SOCIAL_LINKS.twitter.username,
    creator: SOCIAL_LINKS.twitter.username,
  },
};

// Enlaces de proyectos específicos
export const PROJECT_LINKS = {
  assetBox: "https://asset-box-nine.vercel.app/",
};

// Repositorios de proyectos
export const PROJECT_REPOSITORIES = {
  tictactoe: `${SOCIAL_LINKS.github.url}/tictactoe`,
  pixelate: `${SOCIAL_LINKS.github.url}/pixelate`,
  pomodoro: `${SOCIAL_LINKS.github.url}/pomodoro`,
  koikatsu: `${SOCIAL_LINKS.github.url}/koikatsu`,
};

// Configuración completa de proyectos
export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  github: string;
  reverse?: boolean;
  technologies?: string[];
  status?: "active" | "completed" | "archived";
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    description: "Juego de gato desarrollado con reactjs",
    link: "https://tictactoe-lake-six.vercel.app/",
    image: "/images/projects/tictactoe/image1.webp",
    github: PROJECT_REPOSITORIES.tictactoe,
    technologies: ["React", "JavaScript", "CSS"],
    status: "completed",
    featured: true,
  },
  {
    id: "pixelate",
    title: "Pixelate",
    description:
      "Aplicación para pixelar imágenes desarrollado con nextjs para una hackaton",
    link: "https://pixelate-nine.vercel.app/",
    image: "/images/projects/pixelate/image1.webp",
    github: PROJECT_REPOSITORIES.pixelate,
    reverse: true,
    technologies: ["Next.js", "React", "TypeScript", "Canvas API"],
    status: "completed",
    featured: true,
  },
  {
    id: "pomodoro",
    title: "Pomodoro",
    description: "Aplicación para gestionar el tiempo con la técnica pomodoro",
    link: "https://pomodoro-nine-pi.vercel.app/",
    image: "/images/projects/pomodoro/image1.webp",
    github: PROJECT_REPOSITORIES.pomodoro,
    technologies: ["React", "JavaScript", "Local Storage"],
    status: "active",
    featured: true,
  },
  // {
  //   id: "koikatsu",
  //   title: "Koikatsu FanSite",
  //   description: "Aplicación para gestionar noticias y mangas de Koikatsu",
  //   link: "https://koikatsu-character-manager.vercel.app/",
  //   image: "/images/projects/koikatsu/image1.webp",
  //   github: PROJECT_REPOSITORIES.koikatsu,
  //   technologies: ["React", "TypeScript", "File Management"],
  //   status: "completed",
  //   featured: false,
  // },
];

// Proyectos destacados (featured)
export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

// Proyectos por estado
export const ACTIVE_PROJECTS = PROJECTS.filter(
  (project) => project.status === "active"
);
export const COMPLETED_PROJECTS = PROJECTS.filter(
  (project) => project.status === "completed"
);
