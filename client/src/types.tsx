export interface MessageType {
  _id: string;
  message: string;
  show: boolean;
  createdAt: string;
}

export interface NotificationType {
  theme: string | null;
  text: string | null;
  status: boolean | null;
}

export interface AdminType {
  _id: string;
  username: string;
}
