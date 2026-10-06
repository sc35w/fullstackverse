import React from "react";
import SkillVerseHeader from "../../components/SkillVerseHeader";
import SkillVerseFooter from "../../components/SkillVerseFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";

export default function SkillVerseLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SkillVerseHeader />
      <main className="flex-1">{children}</main>
      <SkillVerseFooter />
      <WhatsAppFloat />
    </div>
  );
}
