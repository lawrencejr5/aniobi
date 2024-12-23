import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import axios from "axios";

interface Message {
  _id: string;
  message: string;
  createdAt: string;
}

interface ContextAppType {
  messages: Message[] | null;
  getMessages: () => Promise<void>;
  writeMessage: (input: string) => Promise<void>;
  signIn: (input: string) => Promise<void>;
}

enum EndPoints {
  messages = "http://localhost:5000/api/v1/messages",
  passkey = "http://localhost:5000/api/v1/passkey",
}

const ContextApp = createContext<ContextAppType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  
  const [messages, setMessages] = useState<Message[]>([]);

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
      const { data } = await axios.post(EndPoints.messages, { msg: input });
      console.log(data.message);
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
      value={{ messages, getMessages, writeMessage, signIn }}
    >
      {children}
    </ContextApp.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(ContextApp);
};

export { GlobalProvider, useGlobalContext };
