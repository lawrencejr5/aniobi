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
import { EndPoints } from "./enums.tsx";

interface ContextAppType {
  messages: MessageType[] | null;
  getMessages: () => Promise<void>;
  writeMessage: (input: string) => Promise<void>;
  signIn: (input: string) => Promise<void>;
  notification: NotificationType | null;
  setNotification: Dispatch<SetStateAction<NotificationType>>;
}

const ContextApp = createContext<ContextAppType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  //Notification
  const [notification, setNotification] = useState<NotificationType>({
    text: "",
    status: false,
    theme: "",
  });
  useEffect(() => {
    const notiTimeout = setTimeout(() => {
      setNotification({ ...notification, status: false });
    }, 2000);
    return () => clearTimeout(notiTimeout);
  }, [notification]);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const getMessages = async () => {
    try {
      const { data } = await axios.get(EndPoints.messages);
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
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async (input: string) => {
    try {
      const { data } = await axios.post(`${EndPoints.passkey}/check`, {
        key: input,
      });
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.log(err);
    }
  };

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
