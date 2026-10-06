import React from "react";
import { Helmet } from "react-helmet";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/site/blocks";
import SkillVerseQuickApply from "@/components/SkillVerseQuickApply";
import { ADDRESS_LINES, EMAIL, PHONE, SKILLVERSE_CALL, SKILLVERSE_WHATSAPP_URL } from "@/lib/contact";

const channels = [
  { icon: Phone, title: "Call us", lines: [PHONE, SKILLVERSE_CALL], href: (line) => `tel:${line}` },
  { icon: Mail, title: "Email us", lines: [EMAIL], href: (line) => `mailto:${line}` },
  { icon: MessageCircle, title: "WhatsApp", lines: ["Chat with our team"], href: () => SKILLVERSE_WHATSAPP_URL, external: true },
  { icon: MapPin, title: "Address", lines: [ADDRESS_LINES.join(", ")] },
];

export default function SkillVerseContactPage() {
  return (
    <div className="bg-white">
      <Helmet>
        <title>Contact Us - SkillVerse</title>
        <meta
          name="description"
          content="Contact SkillVerse for courses, workshops, internships, placement support and study abroad guidance. Call, email or WhatsApp our team."
        />
      </Helmet>

      <PageHero
        title="Contact"
        highlight="SkillVerse"
        lead="Questions about courses, workshops, internships, placements or studying abroad? Reach out and our team will get back to you."
      />

      <Section tone="soft">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, title, lines, href, external }) => (
            <div key={title} className="nb-card">
              <span className="nb-icon mb-4">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold text-nb-text">{title}</h2>
              <div className="mt-2 space-y-1 text-sm text-nb-muted">
                {lines.map((line) =>
                  href ? (
                    <a
                      key={line}
                      href={href(line)}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block font-medium text-nb-blue hover:underline [overflow-wrap:anywhere]"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line}>{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="nb-eyebrow mb-3">Get started</div>
            <h2 className="nb-h2">Quick Apply</h2>
            <p className="nb-lead mt-4">
              Your journey starts here! Share your details and the program you are interested in, and we will call you back.
            </p>
          </div>
          <SkillVerseQuickApply />
        </div>
      </Section>
    </div>
  );
}
