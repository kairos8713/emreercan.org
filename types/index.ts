export interface SanitySlug {
  current: string;
}

export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImage {
  _type: 'image';
  asset: SanityImageAsset;
  hotspot?: SanityImageHotspot;
}

export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt: string;
  coverImage?: SanityImage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  tags?: string[];
  locale: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: SanitySlug;
  description: string;
  tech?: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage?: SanityImage;
  order?: number;
}
