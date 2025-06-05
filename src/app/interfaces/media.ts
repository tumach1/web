export interface Media {
  filePath: string;
  type: 'image' | 'video' | 'audio';
  creatorId: string;
  createdAt: Date;
  postId: string;
}
