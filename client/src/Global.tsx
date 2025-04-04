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
  writeMessage: (
    input: string,
    from: string | null | undefined,
    to: string | null | undefined
  ) => Promise<void>;
  updateMessage: (id: string, msg: string) => Promise<void>;
  updateShowMessage: (id: string, show: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
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

  // Comment Modal
  commentModalOpen: boolean;
  setCommentModalOpen: Dispatch<SetStateAction<boolean>>;

  // Selected message for edit/delete
  selectedMessage: MessageType | null;
  setSelectedMessage: Dispatch<SetStateAction<MessageType | null>>;

  // Selected admin for edit/delete
  selectedAdmin: AdminType | null;
  setSelectedAdmin: Dispatch<SetStateAction<AdminType | null>>;

  // Admin data functions and state
  adminUsers: AdminType[];
  setAdminUsers: Dispatch<SetStateAction<AdminType[]>>;
  fetchAdminUsers: () => Promise<void>;
  createAdmin: (adminData: Partial<AdminType>) => Promise<void>;
  updateAdmin: (id: string, adminData: Partial<AdminType>) => Promise<void>;
  deleteAdmin: (id: string) => Promise<void>;
  getUser: (id: string) => Promise<AdminType | null>;

  // Logout function
  logout: () => void;

  // User details state
  user: AdminType | null;

  // User messages state
  userMessages: MessageType[];
  getUserMessages: (id: string) => Promise<void>;
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
    role: "",
  });

  // Modals with proper type set-up
  const [modalDelOpen, setModalDelOpen] = useState<boolean>(false);
  const [modalCrtOpen, setModalCrtOpen] = useState<boolean>(false);
  const [modalEditOpen, setModalEditOpen] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null
  );
  const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>(null);

  // Comment modal
  const [commentModalOpen, setCommentModalOpen] = useState<boolean>(false);

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

  const [userMessages, setUserMessages] = useState<MessageType[]>([]);
  const getUserMessages = async (id: string): Promise<void> => {
    if (!id) return;
    try {
      const { data } = await axios.get(`${EndPoints.messages}?to=${id}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setUserMessages(data.messages);
    } catch (err: any) {
      console.error(err);
      setNotification({
        text: err?.response?.data?.msg || "Error fetching user messages",
        status: true,
        theme: "danger",
      });
    }
  };

  const writeMessage = async (
    input: string,
    from: string | null | undefined,
    to: string | null | undefined
  ) => {
    try {
      await axios.post(
        EndPoints.messages,
        { msg: input, from, to },
        { headers: { Authorization: `Bearer ${LocalStorage.token}` } }
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
        { headers: { Authorization: `Bearer ${LocalStorage.token}` } }
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

  // Create state for admin users
  const [adminUsers, setAdminUsers] = useState<AdminType[]>([]);
  const fetchAdminUsers = async (): Promise<void> => {
    try {
      const { data } = await axios.get(EndPoints.admin, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setAdminUsers(data.admins);
    } catch (err: any) {
      console.log(err);
      setNotification({
        text: err?.response?.data?.msg || "Error fetching admin users",
        status: true,
        theme: "danger",
      });
    }
  };

  const [user, setUser] = useState<AdminType | null>(null);
  const getUser = async (id: string): Promise<AdminType | null> => {
    try {
      const { data } = await axios.get(`${EndPoints.admin}/${id}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      // Adjust response parsing if needed (e.g., data.user or data.admin)
      const fetchedUser = data.admin;
      setUser(fetchedUser); // Save fetched details in state
      return fetchedUser;
    } catch (err: any) {
      console.error(err);
      setNotification({
        text: err?.response?.data?.msg || "Error fetching user details",
        status: true,
        theme: "danger",
      });
      return null;
    }
  };

  const createAdmin = async (adminData: Partial<AdminType>): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${EndPoints.admin}/create`,
        adminData,
        {
          headers: { Authorization: `Bearer ${LocalStorage.token}` },
        }
      );
      setNotification({
        text: "Admin created successfully",
        status: true,
        theme: "success",
      });
      fetchAdminUsers();
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error creating admin",
        status: true,
        theme: "danger",
      });
    }
  };

  const updateAdmin = async (id: string, adminData: Partial<AdminType>) => {
    try {
      await axios.patch(`${EndPoints.admin}/${id}`, adminData, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setNotification({
        text: "Admin updated successfully",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error updating admin",
        status: true,
        theme: "danger",
      });
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      await axios.delete(`${EndPoints.admin}/${id}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setNotification({
        text: "Admin deleted successfully",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error deleting admin",
        status: true,
        theme: "danger",
      });
    }
  };

  // Logout function
  const logout = () => {
    // Clear token and admin data from LocalStorage
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    // Reset signedIn state
    setSignedIn({ _id: "", username: "", role: "" });
    setNotification({
      text: "Logged out successfully",
      status: true,
      theme: "success",
    });
  };

  useEffect(() => {
    getMessages();
    fetchAdminUsers();
    const adminData = LocalStorage?.admin;
    if (adminData) {
      setSignedIn(JSON.parse(adminData));
    }
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
        setNotification,
        notification,
        signedIn,
        setSignedIn,
        //
        modalDelOpen,
        modalCrtOpen,
        modalEditOpen,
        setModalCrtOpen,
        setModalDelOpen,
        setModalEditOpen,
        //
        commentModalOpen,
        setCommentModalOpen,
        //
        selectedMessage,
        setSelectedMessage,
        // Admin data functions and state
        adminUsers,
        setAdminUsers,
        fetchAdminUsers,
        createAdmin,
        updateAdmin,
        deleteAdmin,
        selectedAdmin,
        setSelectedAdmin,
        // Logout function
        logout,
        //
        getUser,
        user,
        // User messages state and function
        userMessages,
        getUserMessages,
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
