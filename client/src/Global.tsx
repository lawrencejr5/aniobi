import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import axios from "axios";

import { MessageType, NotificationType, AdminType } from "./types.tsx";
import { EndPoints, LocalStorage } from "./enums.tsx";

export interface ContextAppType {
  messages: MessageType[] | null;
  getMessages: () => Promise<void>;
  writeMessage: (input: string) => Promise<void>;
  updateMessage: (id: string, msg: string) => Promise<void>;
  updateShowMessage: (id: string, show: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  notification: NotificationType | null;
  setNotification: Dispatch<SetStateAction<NotificationType>>;

  // Sign in state
  signedIn: AdminType | null;
  setSignedIn: Dispatch<SetStateAction<AdminType>>;

  // Modals with improved type safety
  modalDelOpen: boolean;
  modalCrtOpen: boolean;
  modalEditOpen: boolean;
  setModalCrtOpen: Dispatch<SetStateAction<boolean>>;
  setModalDelOpen: Dispatch<SetStateAction<boolean>>;
  setModalEditOpen: Dispatch<SetStateAction<boolean>>;

  // Selected message for edit/delete
  selectedMessage: MessageType | null;
  setSelectedMessage: Dispatch<SetStateAction<MessageType | null>>;
}

const ContextApp = createContext<ContextAppType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Notification state
  const [notification, setNotification] = useState<NotificationType>({
    text: "",
    status: false,
    theme: "",
  });

  const [signedIn, setSignedIn] = useState<AdminType>({
    _id: "",
    username: "",
  });

  // Auto dismiss notification only when it is active, and depend on notification.status
  useEffect(() => {
    if (notification.status) {
      const notiTimeout = setTimeout(() => {
        setNotification((prev) => ({ ...prev, status: false }));
      }, 2000);
      return () => clearTimeout(notiTimeout);
    }
  }, [notification.status]);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const getMessages = async () => {
    try {
      const { data } = await axios.get(EndPoints.messages, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setMessages(data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  const writeMessage = async (input: string) => {
    try {
      await axios.post(
        EndPoints.messages,
        { msg: input },
        {
          headers: { Authorization: `Bearer ${LocalStorage.token}` },
        }
      );
      setNotification({
        text: "Message sent",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg,
        status: true,
        theme: "danger",
      });
    }
  };

  const updateMessage = async (id: string, msg: string) => {
    try {
      await axios.patch(
        `${EndPoints.messages}/${id}`,
        { msg },
        {
          headers: { Authorization: `Bearer ${LocalStorage.token}` },
        }
      );
      setNotification({
        text: "Message updated successfully",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error updating message",
        status: true,
        theme: "danger",
      });
    }
  };

  const updateShowMessage = async (id: string, show: string) => {
    try {
      await axios.patch(
        `${EndPoints.messages}/${id}`,
        { show },
        { headers: { Authorization: `Bearer ${LocalStorage.token}` } }
      );
    } catch (err: any) {
      console.log(err);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(`${EndPoints.messages}/${id}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setNotification({
        text: `Message with id ${id} has been deleted`,
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error deleting message",
        status: true,
        theme: "danger",
      });
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(`${EndPoints.admin}/signin`, {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.log(err);
    }
  };

  // Modals with proper type set-up
  const [modalDelOpen, setModalDelOpen] = useState<boolean>(false);
  const [modalCrtOpen, setModalCrtOpen] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);

  // New: Selected message for delete and edit
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <ContextApp.Provider
      value={{
        messages,
        getMessages,
        writeMessage,
        updateMessage,
        updateShowMessage,
        deleteMessage,
        signIn,
        setNotification,
        notification,
        signedIn,
        setSignedIn,
        modalDelOpen,
        modalCrtOpen,
        modalEditOpen,
        setModalCrtOpen,
        setModalDelOpen,
        setModalEditOpen,
        selectedMessage,
        setSelectedMessage,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(ContextApp);
};

export { GlobalProvider, useGlobalContext };
