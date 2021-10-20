export interface Video {
  id: number;
  title: string;
  description: string;
  video: string | ArrayBuffer | null;
  thumbnail: string;
  user_id: number;
  username: string;
  user_photo: string;
  created_at: string;
  updated_at: string;
}
