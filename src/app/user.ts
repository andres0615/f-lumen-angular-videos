export interface User {
  id: number;
  username: string;
  photo: string | ArrayBuffer | null;
  created_at: string;
  updated_at: string;
}
