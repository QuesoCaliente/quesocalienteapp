import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    stylesheet: "/pretty-feed-v3.xsl",
    title: "quesocaliente.dev",
    description:
      "quesocaliente.dev es un blog personal de un desarrollador web que comparte sus experiencias y aprendizajes en el mundo de la programación.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.createdAt),
      updatedAt: post.data.updatedAt,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
      categories: post.data.tags,
      // Calcula el link RSS desde el `slug` del post
      // Este ejemplo asume que todos los posts son renderizados como rutas `/blog/[slug]`
      link: `/blog/${post.slug}/`,
    })),
  });
}
