export type PostType = {
  id: number;
  date: string;
  description: string;
  imageUrl: string;
  title: string;
};

export interface BlogSliceState {
  posts: PostType[];
  status: string;
}
