import { Photo } from "./Photo";

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  createdAt: Date;
  lastActive: Date | string;
  photoUrl: string | null;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  photos?: Photo[];
}
