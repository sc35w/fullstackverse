import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello Fullstackverse, I'd like to discuss my project idea.");
    window.open(`https://wa.me/917042709578?text=${message}`, '_blank');
  };

  return (
    <button type="button" className="floating-whatsapp" onClick={handleWhatsAppClick} aria-label="Chat on WhatsApp">
      <MessageCircle className="h-6 w-6 text-white" />
    </button>
  );
};

export default WhatsAppFloat;
