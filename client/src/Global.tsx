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

import {
  MessageType,
  NotificationType,
  AdminType,
  CommentType,
} from "./types.tsx";
import { EndPoints, LocalStorage } from "./enums.tsx";

export interface ContextAppType {
  messages: MessageType[] | null;
  getMessages: () => Promise<void>;
  allMessages: MessageType[] | null;
  getAllMessages: () => Promise<void>;
  writeMessage: (
    input: string,
    from: string | null | undefined,
    to: string | null | undefined
  ) => Promise<void>;
  updateMessage: (id: string, msg: string) => Promise<void>;
  updateShowMessage: (id: string, show: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Comments
  messageComments: CommentType[] | null;
  setMessageComments: Dispatch<SetStateAction<CommentType[] | null>>;
  getMessageComments: (messageId: string) => void;
  makeComment: (
    messageId: string | null | undefined,
    comment: string,
    authorId: string | null | undefined
  ) => Promise<void>;
  getCommentCount: (messageId: string) => Promise<number>;

  // Likes
  toggleLikeMessage: (userId: string, messageId: string) => Promise<void>;
  checkLiked: (messageId: string) => Promise<boolean | undefined>;
  getUserLikedMessages: (userId: string) => Promise<void>;
  userLikedMessages: MessageType[];
  setUserLikedMessages: Dispatch<SetStateAction<MessageType[]>>;
  // Notifications
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

  // Nav box state
  navBoxOpen: boolean;
  setNavBoxOpen: Dispatch<SetStateAction<boolean>>;

  // Loading states
  messageLoading: boolean;
  commentLoading: boolean;
  setMessageLoading: Dispatch<SetStateAction<boolean>>;
  setCommentLoading: Dispatch<SetStateAction<boolean>>;

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

  // Format time function
  formatTime: (createdAt?: string) => string;

  // User details state
  user: AdminType | null;

  // User messages state
  userMessages: MessageType[];
  getUserMessages: (id: string) => Promise<void>;
  userSentMessages: MessageType[];
  getUserSentMessages: (id: string) => Promise<void>;
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
  const [navBoxOpen, setNavBoxOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>(null);

  // Comment modal
  const [commentModalOpen, setCommentModalOpen] = useState<boolean>(false);

  // Loading states
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

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
    setMessageLoading(true);
    try {
      const { data } = await axios.get(
        `${EndPoints.messages}?to=${null}&show=${true}`,
        {
          headers: { Authorization: `Bearer ${LocalStorage.token}` },
        }
      );
      setMessageLoading(false);
      setMessages(data.messages);
    } catch (err) {
      setMessageLoading(false);
      console.log(err);
    }
  };

  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const getAllMessages = async () => {
    setMessageLoading(true);
    try {
      const { data } = await axios.get(`${EndPoints.messages}?to=${null}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setMessageLoading(false);
      setAllMessages(data.messages);
    } catch (err) {
      setMessageLoading(false);
      console.log(err);
    }
  };

  const [userMessages, setUserMessages] = useState<MessageType[]>([]);
  const getUserMessages = async (id: string): Promise<void> => {
    if (!id) return;
    setMessageLoading(true);
    try {
      const { data } = await axios.get(`${EndPoints.messages}?to=${id}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setUserMessages(data.messages);
      setMessageLoading(false);
    } catch (err: any) {
      console.error(err);
      setMessageLoading(false);
      setNotification({
        text: err?.response?.data?.msg || "Error fetching user messages",
        status: true,
        theme: "danger",
      });
    }
  };

  const [userSentMessages, setUserSentMessages] = useState<MessageType[]>([]);
  const getUserSentMessages = async (id: string): Promise<void> => {
    if (!id) return;
    setMessageLoading(true);
    try {
      const { data } = await axios.get(`${EndPoints.messages}?from=${id}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setUserSentMessages(data.messages);
      setMessageLoading(false);
    } catch (err: any) {
      console.error(err);
      setMessageLoading(false);
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

  const [messageComments, setMessageComments] = useState<CommentType[] | null>(
    []
  );
  // Fetch all comments for a message
  const getMessageComments = async (messageId: string): Promise<void> => {
    setCommentLoading(true);
    try {
      const { data } = await axios.get(
        `${EndPoints.comment}?message=${messageId}`
      );
      setCommentLoading(false);
      setMessageComments(data.comments);
    } catch (err: any) {
      setCommentLoading(false);
      setNotification({
        text: err?.response?.data?.msg || "Error fetching comments",
        status: true,
        theme: "danger",
      });
      console.log(err);
    }
  };

  // Get comment count for a message
  const getCommentCount = async (messageId: string): Promise<number> => {
    try {
      const { data } = await axios.get(
        `${EndPoints.comment}?message=${messageId}`
      );
      return data.comments?.length ?? 0;
    } catch (error) {
      console.error("Error fetching comment count:", error);
      return 0;
    }
  };

  //Make comment
  const makeComment = async (
    messageId: string | null | undefined,
    comment: string,
    authorId: string | null | undefined
  ): Promise<void> => {
    try {
      await axios.post(
        EndPoints.comment,
        { message: messageId, comment, author: authorId },
        { headers: { Authorization: `Bearer ${LocalStorage.token}` } }
      );
      setNotification({
        text: "Comment added successfully",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error adding comment",
        status: true,
        theme: "danger",
      });
    }
  };

  // Liking messages
  const toggleLikeMessage = async (
    userId: string,
    messageId: string
  ): Promise<void> => {
    try {
      await axios.post(
        `${EndPoints.like}/${messageId}`,
        { userId },
        { headers: { Authorization: `Bearer ${LocalStorage.token}` } }
      );
      setNotification({
        text: "Message liked successfully",
        status: true,
        theme: "success",
      });
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error liking message",
        status: true,
        theme: "danger",
      });
    }
  };

  const checkLiked = async (
    messageId: string
  ): Promise<boolean | undefined> => {
    try {
      const { data } = await axios.get(
        `${EndPoints.like}/check/${messageId}?userId=${signedIn?._id}`,
        {
          headers: { Authorization: `Bearer ${LocalStorage.token}` },
        }
      );
      return data.liked;
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error checking like status",
        status: true,
        theme: "danger",
      });
    }
  };

  // Get messages liked by user
  const [userLikedMessages, setUserLikedMessages] = useState<MessageType[]>([]);
  const getUserLikedMessages = async (userId: string): Promise<void> => {
    try {
      const { data } = await axios.get(`${EndPoints.like}/user/${userId}`, {
        headers: { Authorization: `Bearer ${LocalStorage.token}` },
      });
      setUserLikedMessages(data.likedMessages);
    } catch (err: any) {
      setNotification({
        text: err?.response?.data?.msg || "Error fetching liked messages",
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

  // Helper function to format createdAt timestamp
  const formatTime = (createdAt?: string): string => {
    if (!createdAt) return "just now";

    const commentDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - commentDate.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) {
      return "just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) {
      return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
    }

    const diffMonths = Math.floor(diffWeeks / 4);
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
    }

    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
  };

  useEffect(() => {
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
        allMessages,
        getAllMessages,
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
        navBoxOpen,
        setNavBoxOpen,
        //
        commentModalOpen,
        setCommentModalOpen,
        //
        toggleLikeMessage,
        checkLiked,
        getUserLikedMessages,
        userLikedMessages,
        setUserLikedMessages,
        //
        messageComments,
        getMessageComments,
        setMessageComments,
        makeComment,
        getCommentCount,
        //
        messageLoading,
        setMessageLoading,
        commentLoading,
        setCommentLoading,
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
        userSentMessages,
        getUserSentMessages,
        //
        formatTime,
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
