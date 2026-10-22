export type PostSummary = {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  readingTime: number;
  publishedAt: string;
  author: { name: string };
};

export type PostDetails = PostSummary & {
  content: string;
};
