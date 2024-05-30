import { CATEGORIES_NAMES } from "@/utils/const";
import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",

  schema: z.object({
    image: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORIES_NAMES),
    createdAt: z.string(),
    updatedAt: z.string(),
    tags: z.string().array(),
    author: reference("authors"),
  }),
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    alias: z.string().optional(),
    bio: z.string(),
    avatar: z.string(),
    networks: z.object({
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      tiktok: z.string().optional(),
      github: z.string().optional(),
    }),
  }),
});

export const collections = {
  blog,
  authors,
};
