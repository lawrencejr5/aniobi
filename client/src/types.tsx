export interface MessageType {
  _id: string;
  message: string;
  createdAt: string;
}

export interface NotificationType {
  theme: string | null;
  text: string | null;
  status: boolean | null;
}
