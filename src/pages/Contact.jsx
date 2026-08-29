import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Email,
  Phone,
  Place,
  GitHub,
  LinkedIn,
  WhatsApp,
  Send,
  CheckCircle,
  ContentCopy,
  Check
} from "@mui/icons-material";
import toast from "react-hot-toast";

import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import { portfolioData } from "../data";

const { personal } = portfolioData;

const contactChannels = [
  {
    icon: <Email fontSize="inherit" />,
    label: "Direct Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    color: "#00f2ff",
    copyable: true,
  },
  {
    icon: <Phone fontSize="inherit" />,
    label: "Phone Number",
    value: personal.phone,
    href: `tel:${personal.phone}`,
    color: "#00ff88",
    copyable: true,
  },
  {
    icon: <Place fontSize="inherit" />,
    label: "Location",
    value: "Tirupati, Andhra Pradesh, India",
    color: "#ffe600",
    copyable: false,
  },
  {
    icon: <LinkedIn fontSize="inherit" />,
    label: "LinkedIn Network",
    value: "khuswanth-rao-jadav",
    href: personal.linkedin,
    color: "#00d4ff",
    copyable: false,
  }
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    linkedIn: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full Name is required";
    if (!form.email.trim()) errs.email = "Email Address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email address";
    if (!form.subject.trim() || form.subject.length < 3) {
      errs.subject = "Subject must be at least 3 characters";
    }
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    let isRateLimited = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          isRateLimited = true;
          toast.error(
            "Too many messages. Please wait a few minutes before trying again."
          );
          setLoading(true);
          setTimeout(() => setLoading(false), 15 * 60 * 1000);
          return;
        }
        throw new Error(data.message || "Failed to send message");
      }

      setSent(true);
      toast.success("Message delivered successfully!");
      setForm({ name: "", email: "", subject: "", message: "", linkedIn: "", company: "" });
    } catch (err) {
      if (!isRateLimited) {
        toast.error(err.message || "Failed to send. Please reach out directly via email.");
      }
    } finally {
      if (!isRateLimited) setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader
          tag="Get In Touch"
          title="Let's Connect & Collaborate"
          subtitle="Have a project in mind, looking for a skilled Frontend / React Developer, or seeking to collaborate? Reach out through any of the channels below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Left Panel: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Availability Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-[#00ff88]/25 shadow-xl relative overflow-hidden group backdrop-blur-xl"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent shadow-[0_0_15px_#00ff88]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#00ff88]/15 border border-[#00ff88]/30 flex items-center justify-center shrink-0 shadow-lg">
                  <div className="relative flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-[#00ff88] rounded-full shadow-[0_0_12px_#00ff88]" />
                    <div className="absolute inset-0 w-3.5 h-3.5 bg-[#00ff88] rounded-full animate-ping opacity-75" />
                  </div>
                </div>
                <div>
                  <div className="text-[#00ff88] text-xs font-mono font-bold uppercase tracking-wider mb-0.5">
                    Current Status
                  </div>
                  <div className="text-white font-heading font-black text-base tracking-wide">
                    Available for Full-time Roles
                  </div>
                  <p className="text-white/60 font-mono text-xs mt-0.5">
                    Frontend, React.js & UI/UX Positions
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {contactChannels.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl bg-white/[0.015] border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg group relative overflow-hidden backdrop-blur-xl flex items-center justify-between gap-4"
                >
                  {/* Left accent bar */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                  />

                  <div className="flex items-center gap-4 min-w-0 flex-1 pl-2">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl transition-transform duration-300 group-hover:scale-105 shadow-md"
                      style={{
                        backgroundColor: `${item.color}15`,
                        borderColor: `${item.color}35`,
                        borderWidth: "1px",
                        color: item.color
                      }}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-white/50 text-[11px] font-mono block tracking-normal mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="text-white font-heading font-bold text-sm sm:text-base no-underline transition-colors duration-300 block truncate cursor-pointer"
                          onMouseEnter={(e) => (e.currentTarget.style.color = item.color)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-white font-heading font-bold text-sm sm:text-base block truncate">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.copyable && (
                    <button
                      onClick={() => handleCopy(item.value, item.label)}
                      className="w-9 h-9 rounded-xl border border-white/10 hover:border-white/25 flex items-center justify-center text-white/50 hover:text-white transition-all bg-white/[0.02] hover:bg-white/[0.08] shrink-0"
                      title={`Copy ${item.label}`}
                    >
                      {copiedField === item.label ? (
                        <Check className="text-sm text-[#00ff88]" />
                      ) : (
                        <ContentCopy className="text-sm" />
                      )}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-3xl bg-white/[0.015] border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <div className="font-mono text-xs font-bold text-white/70 tracking-wider uppercase mb-4">
                Connect on Social Networks
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    href: personal.github,
                    icon: <GitHub fontSize="inherit" />,
                    label: "GitHub",
                    color: "#00f2ff",
                  },
                  {
                    href: personal.linkedin,
                    icon: <LinkedIn fontSize="inherit" />,
                    label: "LinkedIn",
                    color: "#00d4ff",
                  },
                  {
                    href: `https://wa.me/917671085912`,
                    icon: <WhatsApp fontSize="inherit" />,
                    label: "WhatsApp",
                    color: "#25D366",
                  },
                  {
                    href: `mailto:${personal.email}`,
                    icon: <Email fontSize="inherit" />,
                    label: "Email",
                    color: "#ffe600",
                  },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all duration-300 group/link shadow-sm no-underline"
                  >
                    <span 
                      className="text-2xl transition-transform duration-300 group-hover/link:scale-110"
                      style={{ color: s.color }}
                    >
                      {s.icon}
                    </span>
                    <span 
                      className="text-[11px] font-mono font-bold text-white/70 group-hover/link:text-white transition-colors duration-300 no-underline"
                    >
                      {s.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 md:p-10 rounded-3xl bg-white/[0.015] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Top Laser Accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent shadow-[0_0_15px_#00f2ff]" />

              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 mb-3 shadow-sm">
                  <Send className="text-xs text-[#00f2ff]" />
                  <span className="font-mono text-xs text-[#00f2ff] font-bold uppercase tracking-wider">
                    Direct Messaging
                  </span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide">
                  Send a Message
                </h3>
                <p className="text-white/70 font-body text-xs sm:text-sm mt-1">
                  Fill out the details below and I'll respond as soon as possible.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-3xl bg-[#00ff88]/15 border border-[#00ff88]/40 flex items-center justify-center text-[#00ff88] text-3xl mb-4 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
                    >
                      <CheckCircle fontSize="inherit" />
                    </motion.div>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2">
                      Message Received!
                    </h3>
                    <p className="text-white/70 font-body text-sm max-w-sm mb-6 leading-relaxed">
                      Thank you for getting in touch. I will review your message and reply promptly.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="px-6 py-2.5 rounded-xl border border-primary/40 bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all shadow-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-white/80 text-xs font-mono font-bold tracking-wide mb-2">
                          Your Name <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Smith"
                          className={`w-full border rounded-xl px-4 py-3.5 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-[#00f2ff]/60 focus:bg-white/[0.04] transition-all duration-300 shadow-inner ${
                            errors.name ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1.5 font-mono">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-white/80 text-xs font-mono font-bold tracking-wide mb-2">
                          Email Address <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="e.g. alex@example.com"
                          className={`w-full border rounded-xl px-4 py-3.5 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-[#00f2ff]/60 focus:bg-white/[0.04] transition-all duration-300 shadow-inner ${
                            errors.email ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1.5 font-mono">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Subject */}
                    <div>
                      <label className="block text-white/80 text-xs font-mono font-bold tracking-wide mb-2">
                        Subject / Project Title <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Frontend Developer Role / Web Project"
                        className={`w-full border rounded-xl px-4 py-3.5 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-[#00f2ff]/60 focus:bg-white/[0.04] transition-all duration-300 shadow-inner ${
                          errors.subject ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-400 text-xs mt-1.5 font-mono">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-white/80 text-xs font-mono font-bold tracking-wide mb-2">
                        Message Details <span className="text-red-500 font-bold">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Please share details about your inquiry, project scope, or opportunity..."
                        className={`w-full border rounded-xl px-4 py-3.5 text-white placeholder-white/40 font-body text-sm focus:outline-none focus:border-[#00f2ff]/60 focus:bg-white/[0.04] transition-all duration-300 shadow-inner resize-none ${
                          errors.message ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1.5 font-mono">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(0, 242, 255, 0.3)' }}
                      whileTap={{ scale: 0.99 }}
                      className="relative w-full py-4 bg-gradient-to-r from-[#00f2ff] to-[#00d4ff] text-[#08090d] font-heading font-black text-sm tracking-wider uppercase transition-all duration-300 rounded-xl flex items-center justify-center gap-3 overflow-hidden shadow-lg disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="text-base" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
