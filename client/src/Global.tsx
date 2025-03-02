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

import { MessageType, NotificationType } from "./types.tsx";
import { EndPoints, LocalStorage } from "./enums.tsx";

interface ContextAppType {
  messages: MessageType[] | null;
  getMessages: () => Promise<void>;
  writeMessage: (input: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  notification: NotificationType | null;
  setNotification: Dispatch<SetStateAction<NotificationType>>;

  // Modals with improved type safety
  modalDelOpen: boolean;
  modalCrtOpen: boolean;
  modalEditOpen: boolean;
  setModalCrtOpen: Dispatch<SetStateAction<boolean>>;
  setModalDelOpen: Dispatch<SetStateAction<boolean>>;
  setModalEditOpen: Dispatch<SetStateAction<boolean>>;
}

const ContextApp = createContext<ContextAppType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Notification state
  const [notification, setNotification] = useState<NotificationType>({
    text: "",
    status: false,
    theme: "",
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
      await axios.post(EndPoints.messages, { msg: input });
      setNotification({
        text: "Message sent",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg,
        status: true,
        theme: "success",
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

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <ContextApp.Provider
      value={{
        messages,
        getMessages,
        writeMessage,
        signIn,
        setNotification,
        notification,
        // Modals
        modalDelOpen,
        modalCrtOpen,
        modalEditOpen,
        setModalCrtOpen,
        setModalDelOpen,
        setModalEditOpen,
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
