import { motion } from "framer-motion";
import moment from "moment";
import { WavingHand02Icon } from "hugeicons-react";
import React, { useState, useEffect } from "react";

export const ChatGreeting = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "How can I help you today? 😊",
    "What can I do for you? 🤔",
    "Need assistance? I'm here to help! 🙌",
    "Have any questions? Feel free to ask! 💬",
    "Looking for something specific? 🔍",
    "I'm here to make your day easier! 🌟",
  ];

  useEffect(() => {
    const changeMessage = () => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setTimeout(changeMessage, 5000); // Schedule the next message change
    };

    const timeout = setTimeout(changeMessage, 5000); // Initial timeout

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [messages.length]);

  const renderGreeting = () => {
    const date = moment();
    const hours = date.get("hour");
    if (hours < 12) return `Good Morning,`;
    if (hours < 18) return `Good Afternoon,`;
    return `Good Evening,`;
  };

  return (
    <motion.h1
      className="text-xl flex flex-col font-semibold py-2 text-left leading-9 tracking-tight text-zinc-800 dark:text-zinc-100 space-y-8"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
    >
      <span className="text-zinc-300 dark:text-zinc-500 flex items-center flex-row gap-4 ">
        <WavingHand02Icon size={32} strokeWidth="2" />
        Hello, {renderGreeting()}
      </span>
      {messages[messageIndex]}
    </motion.h1>
  );
};
