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
}

const ContextApp = createContext<ContextAppType | null>(null);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/messages");
      setMessages(data.messages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <ContextApp.Provider value={{ messages, getMessages }}>
      {children}
    </ContextApp.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(ContextApp);
};

export { GlobalProvider, useGlobalContext };
