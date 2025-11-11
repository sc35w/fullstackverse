
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Fullstackverse, I'd like to discuss my project idea.");
    window.open(`https://wa.me/917042709578?text=${message}`, '_blank');
  };

  return (
    <motion.button
      className="floating-whatsapp"
      onClick={handleWhatsAppClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1
      }}
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </motion.button>
  );
};

export default WhatsAppFloat;
