import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Email,
  Phone,
  Place,
  GitHub,
  LinkedIn,
  WhatsApp,
  Send,
  CheckCircle,
} from "@mui/icons-material";
import toast from "react-hot-toast";

import PageWrapper from "../components/PageWrapper";
import SectionHeader from "../components/SectionHeader";
import { portfolioData } from "../data";

const { personal } = portfolioData;

const contactInfo = [
    {
    icon: <Place />,
    label: "Location",
    value: "Tirupati, Andhra Pradesh",
    href: null,
    color: "#ff6b35",
  },
  {
    icon: <Email />,
    label: "Email",
    value: personal.email,
    href: null,
    color: "#00d4ff",
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: personal.phone,
    href: `tel:${personal.phone}`,
    color: "#7b2fff",
  },
  {
    icon: <GitHub />,
    label: "GitHub",
    value: "github.com/khuswanth1",
    href: personal.github,
    color: "#ffd700",
  },
  {
    icon: <LinkedIn />,
    label: "LinkedIn",
    value: "linkedin.com/in/khuswanth-rao",
    href: personal.linkedin,
    color: "#0077b5",
  }

];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (
        !form.subject.trim() ||
        form.subject.length < 3 ||
        form.subject.length > 120
      ) {
        errs.subject = "Subject must be 3-120 characters";
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
            "Too many messages. Please wait 15 minutes before trying again."
          );
          // Disable the submit button
          setLoading(true);
          setTimeout(() => setLoading(false), 15 * 60 * 1000);
          return;
        }
        throw new Error(data.message || "Failed to send message");
      }

      setSent(true);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      if (!isRateLimited) {
        toast.error(err.message || "Failed to send. Please try again or email directly.");
      }
    } finally {
      if (!isRateLimited) setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <SectionHeader
          tag="Let's Connect"
          title="Get In Touch"
          subtitle="Open to opportunities, collaborations, or just a friendly conversation about tech."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-4 sm:p-5 mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-[#00ffa205] backdrop-blur-xl border border-[#00ffa2]/10 shadow-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,162,0.05)] hover:border-[#00ffa2]/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffa208] to-transparent pointer-events-none" />
              <div className="relative flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00ffa215] flex items-center justify-center flex-shrink-0">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#00ffa2] rounded-full shadow-[0_0_15px_#00ffa2]" />
                    <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#00ffa2] rounded-full animate-ping opacity-60" />
                  </div>
                </div>
                <div>
                  <div className="text-[#00ffa2] text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-0.5 sm:mb-1 font-bold">
                    Availability
                  </div>
                  <div className="text-white font-heading font-semibold text-xs sm:text-sm tracking-wide">
                    Available for <span className="text-[#00ffa2]">Full-time</span> & <span className="text-[#00ffa2]">Internships</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5 }}
              >
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="block">
                    <div className="group relative p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-pointer rounded-xl sm:rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 backdrop-blur-xl transition-all duration-300 shadow-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 text-lg sm:text-xl transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${item.color}15`,
                          color: item.color,
                          boxShadow: `0 0 20px ${item.color}10`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-white/30 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mb-0.5 whitespace-nowrap">
                          {item.label}
                        </div>
                        <div className="text-white/80 font-body text-xs sm:text-sm group-hover:text-white transition-colors duration-300 truncate">
                          {item.value}
                        </div>
                      </div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl pointer-events-none" style={{ background: `radial-gradient(circle at 20px 20px, ${item.color}05 0%, transparent 60%)` }} />
                    </div>
                  </a>
                ) : (
                  <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-lg overflow-hidden">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 text-lg sm:text-xl"
                      style={{
                        background: `${item.color}15`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-white/30 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mb-0.5 whitespace-nowrap">
                        {item.label}
                      </div>
                      <div className="text-white/80 font-body text-xs sm:text-sm truncate">
                        {item.value}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.02] hover:bg-white/[0.03] border border-white/5 backdrop-blur-xl shadow-xl overflow-hidden relative group transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl sm:rounded-2xl" />
              <div className="font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-3 sm:mb-4 relative z-10 font-bold">
                Network Grid
              </div>
              <div className="flex gap-2 sm:gap-4 relative z-10">
                {[
                  {
                    href: personal.github,
                    icon: <GitHub />,
                    label: "GitHub",
                    color: "#ffd700",
                  },
                  {
                    href: personal.linkedin,
                    icon: <LinkedIn />,
                    label: "LinkedIn",
                    color: "#00d4ff",
                  },
                  {
                    href: `https://wa.me/917671085912`,
                    icon: <WhatsApp />,
                    label: "WhatsApp",
                    color: "#25D366",
                  },
                  {
                    href: `mailto:${personal.email}`,
                    icon: <Email />,
                    label: "Email",
                    color: "#7b2fff",
                  },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 transition-all duration-300 group/icon"
                  >
                    <span
                      className="text-lg sm:text-xl text-white/40 group-hover/icon:text-white transition-all duration-300 group-hover/icon:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                      style={{ color: "auto" }}
                    >
                      {s.icon}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-mono text-white/30 group-hover/icon:text-white/80 tracking-wider transition-colors duration-300">
                      {s.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/5 hover:border-white/10 shadow-2xl overflow-hidden group transition-colors duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-primary/[0.02] blur-[80px] sm:blur-[100px] -mr-32 -mt-32 sm:-mr-40 sm:-mt-40 rounded-full group-hover:bg-primary/[0.04] transition-all duration-700" />
              <div className="font-mono text-[9px] sm:text-[10px] text-primary/70 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 sm:mb-6 relative z-10 font-bold">
                Messaging Terminal
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 text-xl sm:text-2xl mb-4"
                  >
                    <CheckCircle />
                  </motion.div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/40 font-body text-xs sm:text-sm mb-6">
                    Thanks for reaching out. I'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-primary font-mono text-xs sm:text-sm tracking-[0.1em] sm:tracking-widest hover:underline hover:text-white transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-white/40 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1.5 sm:mb-2 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Khuswanth Rao"
                        className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/20 font-body text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner ${errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                          }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-[10px] sm:text-xs mt-1.5 font-mono">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/40 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1.5 sm:mb-2 font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/20 font-body text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner ${errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                          }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[10px] sm:text-xs mt-1.5 font-mono">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-white/40 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1.5 sm:mb-2 font-semibold">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Job Opportunity / Collaboration / Hello"
                      className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/20 font-body text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300 shadow-inner ${errors.subject ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                        }`}
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1 font-mono">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/40 text-[10px] sm:text-xs font-mono tracking-widest uppercase mb-1.5 sm:mb-2 font-semibold">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Hi Khuswanth, I'd like to discuss..."
                      className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-white placeholder-white/20 font-body text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all duration-300 resize-none shadow-inner ${errors.message ? "border-red-500/50 bg-red-500/5" : "border-white/10 bg-white/[0.02]"
                        }`}
                    />
                    <div className="flex items-center justify-between">
                      {errors.message && (
                        <p className="text-red-400 text-[10px] sm:text-xs mt-1.5 font-mono">
                          {errors.message}
                        </p>
                      )}
                      <span
                        className={`text-[10px] sm:text-xs font-mono ml-auto mt-1.5 ${form.message.length > 400 ? "text-orange-400" : "text-white/30"}`}
                      >
                        {form.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{
                      scale: loading ? 1 : 1.02,
                      boxShadow: "0 0 30px rgba(0,212,255,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 bg-primary hover:bg-white text-dark-500 font-heading font-black tracking-[0.15em] sm:tracking-widest text-[11px] sm:text-sm uppercase rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,212,255,0.2)] mt-2"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-dark-500/30 border-t-dark-500 rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="scale-75 sm:scale-100" />
                        Send Transmission
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
