import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ContactForm = ({ title = "Business Requirement Form", type = "business" }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    project_description: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      toast({
        title: "Validation Error",
        description: "Full name is required",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    // Normalize contact number to digits only for validation
    const contactDigits = String(formData.contact_number || '').replace(/\D/g, '');
    if (!contactDigits) {
      toast({
        title: "Validation Error",
        description: "Contact number is required",
        variant: "destructive",
      });
      return false;
    }
    // enforce reasonable length (match server-side rules)
    if (contactDigits.length < 6 || contactDigits.length > 20) {
      toast({
        title: "Validation Error",
        description: "Contact number looks invalid",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.project_description.trim()) {
      toast({
        title: "Validation Error",
        description: "Project description is required",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // sanitize contact number to digits-only before sending
      const contactDigits = String(formData.contact_number || '').replace(/\D/g, '');
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        contact_number: contactDigits,
        project_description: formData.project_description.trim(),
        budget: type === "rfp" ? formData.budget.trim() : null,
        type: type
      };

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([payload])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        toast({
          title: "Form Submitted Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          full_name: '',
          email: '',
          contact_number: '',
          project_description: '',
          budget: ''
        });
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              name="full_name"
              required
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contact_number">Contact Number *</Label>
            <Input
              id="contact_number"
              name="contact_number"
              type="tel"
              required
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
          {type === "rfp" && (
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Input
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., $5,000 - $10,000"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_description">
            {type === "rfp" ? "Project Description *" : "Brief Project Description *"}
          </Label>
          <Textarea
            id="project_description"
            name="project_description"
            rows={4}
            required
            value={formData.project_description}
            onChange={handleChange}
            placeholder="Help us come back better prepared. Describe your project requirements..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;