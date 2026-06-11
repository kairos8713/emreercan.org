export const allPostsQuery = (locale: string) => `
  *[_type == "post" && locale == "${locale}"] | order(publishedAt desc) {
    _id, title, slug, publishedAt, excerpt, tags, coverImage, locale
  }
`;

export const postBySlugQuery = (slug: string, locale: string) => `
  *[_type == "post" && slug.current == "${slug}" && locale == "${locale}"][0] {
    _id, title, slug, publishedAt, excerpt, body, tags, coverImage, locale
  }
`;

export const allPostSlugsQuery = `
  *[_type == "post"] {
    slug, locale
  }
`;

export const allProjectsQuery = `
  *[_type == "project"] | order(order asc) {
    _id, title, slug, description, tech, githubUrl, liveUrl, coverImage
  }
`;

export const latestPostsQuery = (locale: string, count: number) => `
  *[_type == "post" && locale == "${locale}"] | order(publishedAt desc) [0...${count}] {
    _id, title, slug, publishedAt, excerpt, tags, coverImage, locale
  }
`;
