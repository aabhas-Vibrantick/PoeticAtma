// WhatsAppWidget.jsx
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";


const WhatsAppWidget = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+91 98883 23607"
      accountName="Poeticatma"
      avatar="/assets/images/Poeticatma_logo.png"
      chatMessage="Hi there! 👋 How can we help you today?"
      placeholder="Type your message..."
      statusMessage="Typically replies within a day"
      buttonStyle={{ right: '20px', bottom: '30px' }}
      position="right"
      darkMode={false}
      allowEsc
      allowClickAway
      notification
      notificationSound
    />
  );
};

export default WhatsAppWidget;
