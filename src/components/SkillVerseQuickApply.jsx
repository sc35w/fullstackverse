import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { submitToAppsScript } from "@/lib/appsScript";

const SERVICES = [
  "AI & Machine Learning",
  "Web Development",
  "Data Science",
  "Cyber Security",
  "Study Abroad",
  "Placement Accelerator",
  "Other",
];

// SkillVerse "Quick Apply" lead form. Submits to the Apps Script sheet as
// a "SkillVerse Quick Apply" contact. `defaultService` preselects the dropdown.
export default function SkillVerseQuickApply({ defaultService = "" }) {
  const empty = { fullName: "", phone: "", email: "", service: defaultService };
  const [formData, setFormData] = useState(empty);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitToAppsScript("submit_contact", {
        full_name: formData.fullName,
        contact_number: formData.phone,
        email: formData.email,
        project_description: `Service interested: ${formData.service}`,
        budget: "To be discussed",
        type: "SkillVerse Quick Apply",
      });

      toast({
        title: "Success!",
        description: "Your application has been submitted successfully.",
      });

      setFormData(empty);
    } catch (error) {
      console.error("Quick Apply error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="nb-card space-y-4 p-6 md:p-8">
      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Email Id *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="service">Service you are interested in *</Label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
          className="nb-input mt-1"
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn-solid w-full">
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
