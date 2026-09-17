import React from "react";
import SkillVerseHeader from "../../components/SkillVerseHeader";
import SkillVerseFooter from "../../components/SkillVerseFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";

export default function SkillVerseLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <SkillVerseHeader />
      <main>{children}</main>
      <SkillVerseFooter />
      <WhatsAppFloat />
    </div>
  );
}
