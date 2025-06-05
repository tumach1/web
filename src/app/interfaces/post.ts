export interface Post {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  createdAt: Date;
  isFollowersOnly: boolean;
}
