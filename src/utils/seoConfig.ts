import { SEO_CONFIG } from "../config";

export const seoConfig = {
  baseURL: "http://www.quesocaliente.dev/", // Production URL.
  description:
    "quesocaliente.dev es un blog personal de un desarrollador web que comparte sus experiencias y aprendizajes en el mundo de la programación.",
  type: "website",
  image: {
    url: "http://www.quesocaliente.dev/og.jpg",
    alt: "quesocaliente.dev",
    width: 705,
    height: 606,
  },
  siteName: "quesocaliente.dev",
  twitter: {
    card: "summary_large_image",
    site: SEO_CONFIG.twitter.site,
    creator: SEO_CONFIG.twitter.creator,
  },
};
