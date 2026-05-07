'use client';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hello! I'm interested in your collection at Sasthi Boutique.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
