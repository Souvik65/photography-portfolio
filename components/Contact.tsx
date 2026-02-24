'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MessageSquare, Send, CheckCircle, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-stone-100 text-stone-900 scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-stone-500 mb-4">
              Contact Me
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold mb-8 leading-tight text-stone-900">
              Send an Inquiry
            </h3>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light">
              Have a question or want to discuss a potential project? Send me a message, and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200"
          >
            <div aria-live="polite">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h4 className="font-serif text-3xl font-bold mb-4 text-stone-900">Message Sent!</h4>
                <p className="text-lg text-stone-600 font-light">
                  Thank you for reaching out. I&apos;ve received your message and will be in touch shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-8 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-stone-500" />
                      </div>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.name ? 'border-red-500' : 'border-stone-200'} rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-shadow`}
                        placeholder="Jane Doe"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-stone-500" />
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.email ? 'border-red-500' : 'border-stone-200'} rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-shadow`}
                        placeholder="jane@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div className="md:col-span-2">
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HelpCircle className="h-5 w-5 text-stone-500" />
                      </div>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`block w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.subject ? 'border-red-500' : 'border-stone-200'} rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-shadow`}
                        placeholder="Inquiry about..."
                      />
                    </div>
                    {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label htmlFor="contact-message" className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-stone-500" />
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`block w-full pl-12 pr-4 py-3 bg-stone-50 border ${errors.message ? 'border-red-500' : 'border-stone-200'} rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-shadow resize-none`}
                        placeholder="How can I help you?"
                      />
                    </div>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                </div>

                {submitError && (
                  <p className="text-sm text-red-500 text-center">{submitError}</p>
                )}

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-12 py-4 bg-stone-900 text-white rounded-full font-medium tracking-wide hover:bg-stone-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
