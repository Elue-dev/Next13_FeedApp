export interface User {
  email: string;
  id: string;
  joined_at: string;
  last_updated: string;
  name: string;
}

export interface UserPayload {
  name?: string;
  email: string;
  password: string;
}

export interface tokenPayload {
  id: string;
  password: string;
}
