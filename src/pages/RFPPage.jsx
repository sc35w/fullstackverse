import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const RFPPage = () => {
  return (
    <>
      <Helmet>
        <title>Request for Proposal (RFP) - Fullstackverse</title>
        <meta name="description" content="Submit your Request for Proposal (RFP) to Fullstackverse. Provide your project details and budget, and our team will get back to you with a comprehensive proposal." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yellow-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Request for Proposal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start a big project? Submit your RFP here, and our team will prepare a detailed proposal tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm title="Request for Proposal (RFP) Form" type="rfp" />
        </div>
      </section>

      {/* Why Submit an RFP Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Submit an RFP?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Submitting an RFP allows us to provide you with a comprehensive, accurate, and competitive proposal that addresses all your project requirements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h3 className="text-2xl font-semibold mb-2">Detailed Analysis</h3>
                    <p className="text-gray-600">We'll perform an in-depth review of your needs.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <h3 className="text-2xl font-semibold mb-2">Accurate Quoting</h3>
                    <p className="text-gray-600">Get precise cost and timeline estimates.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <h3 className="text-2xl font-semibold mb-2">Tailored Solutions</h3>
                    <p className="text-gray-600">Receive a proposal designed specifically for you.</p>
                </motion.div>
            </div>
        </div>
      </section>
    </>
  );
};

export default RFPPage;