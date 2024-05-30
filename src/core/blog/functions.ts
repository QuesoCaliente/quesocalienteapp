import { getCollection } from "astro:content";

export const getLastBlogPost = async () => {
  const posts = await getCollection("blog");
  const filteredPosts = posts.reduce((acc, post) => {
    if (post.data.updatedAt > acc.data.updatedAt) {
      return post;
    }
    return acc;
  });
  return filteredPosts;
};
