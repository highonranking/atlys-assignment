export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  emoji?: string;
  timestamp: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
}
