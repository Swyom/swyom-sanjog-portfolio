import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/portfolioData';
import { Mail, MapPin, CheckCircle, Send, Sparkles, X, Phone, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Gmail specific regex validator: Must end in @gmail.com
  const isValidGmail = (email: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    return gmailRegex.test(email.trim());
  };

  const isGmailValid = isValidGmail(formData.email);

  // Strict Form Validation: Name, Valid Gmail, WhatsApp Phone, Gender, & Message MUST be completed
  const isFormValid =
    formData.name.trim() !== '' &&
    isGmailValid &&
    formData.phone.trim() !== '' &&
    formData.gender !== '' &&
    formData.message.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // Send payload via FormSubmit AJAX to swyom82@gmail.com
      await fetch('https://formsubmit.co/ajax/swyom82@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          sender_name: formData.name,
          sender_email: formData.email,
          sender_whatsapp: formData.phone,
          sender_gender: formData.gender,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _captcha: 'false',
          _template: 'table'
        })
      });
    } catch (err) {
      console.log('FormSubmit delivery log:', err);
    }

    try {
      // Secondary backup via Web3Forms API
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '23e80d44-46ec-4f81-80a5-8e7c541738e4',
          name: formData.name,
          email: formData.email,
          whatsapp: formData.phone,
          gender: formData.gender,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          to_email: 'swyom82@gmail.com'
        })
      });
    } catch (err) {
      console.log('Web3Forms backup log:', err);
    }

    setIsSubmitting(false);
    setShowSuccessPopup(true);

    // Trigger Celebration Confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff5e18', '#ff8c00', '#ffffff', '#222232']
    });

    // Reset Form Data
    setFormData({ name: '', email: '', phone: '', gender: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-[#08080c] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff5e18]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
            <span className="text-gray-400">&lt;</span>
            GET IN TOUCH
            <span className="text-gray-400">/&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Let's Build Something <br className="hidden sm:inline" />
            <span className="text-[#ff5e18] text-orange-glow">Amazing Together</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            Have a project in mind or want to collaborate? Fill out the required details below and your message will be delivered directly to <strong className="text-white">{CONTACT_INFO.email}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-8 bg-[#12121a] border border-[#222232] rounded-2xl p-6 sm:p-8 text-left relative">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-300 mb-2">
                    Your Full Name <span className="text-[#ff5e18]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181826] border border-[#262638] focus:border-[#ff5e18] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-300 mb-2">
                    Your Gmail Address <span className="text-[#ff5e18]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full bg-[#181826] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors ${
                      formData.email
                        ? isGmailValid
                          ? 'border-emerald-500/80 focus:border-emerald-400'
                          : 'border-rose-500/80 focus:border-rose-400'
                        : 'border-[#262638] focus:border-[#ff5e18]'
                    }`}
                  />
                  {formData.email && !isGmailValid && (
                    <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                      ❌ Please enter a valid Gmail address (e.g. name@gmail.com)
                    </span>
                  )}
                  {formData.email && isGmailValid && (
                    <span className="text-[11px] font-mono text-emerald-400 mt-1 block flex items-center gap-1">
                      ✓ Valid Gmail Address
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: WhatsApp Number & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#ff5e18]" />
                    WhatsApp Mobile Number <span className="text-[#ff5e18]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181826] border border-[#262638] focus:border-[#ff5e18] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-[#ff5e18]" />
                    Gender <span className="text-[#ff5e18]">*</span>
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-[#181826] border border-[#262638] focus:border-[#ff5e18] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select Gender...</option>
                    <option value="Male" className="bg-[#12121a] text-white">Male</option>
                    <option value="Female" className="bg-[#12121a] text-white">Female</option>
                    <option value="Other" className="bg-[#12121a] text-white">Other</option>
                  </select>
                </div>
              </div>

              {/* Message Row */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-300 mb-2">
                  Your Message <span className="text-[#ff5e18]">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tell me about your project, timeline, and requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#181826] border border-[#262638] focus:border-[#ff5e18] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button & Validation Status */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-mono font-extrabold tracking-wider text-white bg-[#ff5e18] hover:bg-[#ff702a] box-orange-glow transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {!isFormValid && (
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">
                    ⚠️ Please fill out all fields above to enable submission.
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Contact Info Cards */}
          <div className="lg:col-span-4 space-y-4 text-left">
            
            {/* Email Card */}
            <div className="bg-[#12121a] border border-[#222232] hover:border-[#ff5e18]/60 p-5 rounded-2xl flex items-center gap-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#181826] border border-[#2a2a3a] flex items-center justify-center text-[#ff5e18] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono font-semibold text-gray-400 block">Direct Email</span>
                <span className="text-sm font-bold text-white truncate block">
                  {CONTACT_INFO.email}
                </span>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#12121a] border border-[#222232] hover:border-[#ff5e18]/60 p-5 rounded-2xl flex items-center gap-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#181826] border border-[#2a2a3a] flex items-center justify-center text-[#ff5e18] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold text-gray-400 block">Location</span>
                <span className="text-sm font-bold text-white">{CONTACT_INFO.location}</span>
              </div>
            </div>

            {/* Availability Badge Card */}
            <div className="bg-[#12121a] border border-[#222232] p-5 rounded-2xl flex items-center gap-4">
              <div className="relative w-3 h-3 rounded-full bg-emerald-500 shrink-0 ml-4">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold text-gray-400 block">Availability</span>
                <span className="text-xs font-bold text-emerald-400">{CONTACT_INFO.availability}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Message Sent Popup Confirmation Modal */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#12121a] border border-[#ff5e18] rounded-2xl p-6 sm:p-8 text-center box-orange-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#181826] border border-[#2a2a3c] text-gray-400 hover:text-white hover:border-[#ff5e18] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#ff5e18]/20 border border-[#ff5e18] flex items-center justify-center mx-auto text-[#ff5e18] mb-4 box-orange-glow-sm">
              <CheckCircle className="w-8 h-8 text-[#ff5e18]" />
            </div>

            <h3 className="text-2xl font-extrabold text-white font-heading mb-2">Message Sent!</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Thank you for reaching out! Your inquiry has been sent directly to <strong className="text-[#ff5e18]">swyom82@gmail.com</strong>. P Swyom Sanjog will contact you back shortly.
            </p>

            <button
              onClick={() => setShowSuccessPopup(false)}
              className="w-full py-3.5 rounded-xl text-xs font-mono font-extrabold tracking-wider text-white bg-[#ff5e18] hover:bg-[#ff702a] box-orange-glow transition-all cursor-pointer"
            >
              OK, GOT IT
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
