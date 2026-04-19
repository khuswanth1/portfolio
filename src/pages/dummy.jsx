      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[400, 600, 800].map((size, i) => (
            <motion.div
              key={size}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full border border-primary/5"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 py-10 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Mobile Image (Visible only on mobile/tablet) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:hidden flex justify-center mb-8"
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                <div className="absolute -inset-2 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 glass-card p-1">
                  <img
                    src={profileImg}
                    alt="Khuswanth Rao Jadav"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="lg:col-span-7 text-center lg:text-left"
            >
              {/* Tag line */}
              <motion.div variants={itemVariants} className="mb-6">
                <span className="font-mono text-primary/70 text-xs sm:text-sm tracking-[0.3em] uppercase border border-primary/20 px-4 py-2 rounded inline-block bg-primary/5">
                  &lt; Full Stack Developer /&gt;
                </span>
              </motion.div>

              {/* Name */}
              <motion.div
                variants={itemVariants}
                className="mb-6 lg:mb-8"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight bg-gradient-to-b from-primary/40 via-white via-50% to-primary/40 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:drop-shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-500 cursor-default">
                  Khuswanth Rao Jadav
                </h1>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8 min-h-[3rem] px-4 lg:px-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <div className="h-px w-8 bg-primary/30" />
                  <span className="font-mono text-primary/60 text-[10px] tracking-[0.3em] uppercase">Specialization</span>
                </div>
                <span className="font-mono text-white/50 text-sm sm:text-lg leading-relaxed block">
                  <TypeAnimation
                    sequence={[
                      'Building enterprise applications with Java & Spring Boot',
                      2500,
                      'Designing RESTful APIs for scalable backends',
                      2500,
                      'Crafting responsive frontends with React',
                      2500,
                      'Solving problems, one line of code at a time',
                      2500
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="text-white/80 font-medium"
                  />
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-10 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-white/60 font-mono text-[10px] tracking-wider uppercase">
                    Available for New Roles
                  </span>
                </div>
                <span className="text-white/20 font-mono text-[10px] tracking-[0.2em] uppercase">
                  Tirupati, India
                </span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-14">
                <Link to="/projects" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-dark-500 font-heading font-bold tracking-widest text-sm uppercase clip-corner transition-all duration-300"
                  >
                    View Projects
                    <ArrowForward sx={{ fontSize: 18 }} />
                  </motion.button>
                </Link>
                <a href={resume} download className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 border border-primary/50 text-white font-heading font-semibold tracking-widest text-sm uppercase clip-corner hover:bg-primary/10 transition-all duration-300"
                  >
                    <FileDownload sx={{ fontSize: 18 }} />
                    Resume
                  </motion.button>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-6">
                <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00ffa240]" />
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-11 h-11 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-xl flex items-center justify-center text-[#00ffa2] shadow-[0_0_20px_rgba(0,255,162,0.1)] hover:shadow-[0_0_25px_rgba(0,255,162,0.3)] transition-all duration-400 group"
                >
                  <GitHub sx={{ fontSize: 22 }} />
                </motion.a>
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-11 h-11 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-xl flex items-center justify-center text-[#00ffa2] shadow-[0_0_20px_rgba(0,255,162,0.1)] hover:shadow-[0_0_25px_rgba(0,255,162,0.3)] transition-all duration-400"
                >
                  <LinkedIn sx={{ fontSize: 22 }} />
                </motion.a>
                <div className="h-[1px] w-32 bg-gradient-to-r from-[#00ffa240] to-transparent" />
              </motion.div>

            </motion.div>

            {/* Desktop Image (High Fidelity Fixed Position) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative z-10">
                {/* Fixed position glowing aura */}
                <div className="absolute -inset-10 bg-primary/10 blur-[120px] rounded-full opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/5 to-transparent blur-3xl rounded-full" />

                <div className="relative">
                  {/* Premium Framing (No scanning, fixed and stable) */}
                  <div className="absolute -inset-1 border-t border-l border-primary/20 rounded-3xl" />
                  <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-md rounded-3xl" />

                  <div className="relative rounded-3xl overflow-hidden p-3 shadow-[0_0_80px_rgba(0,0,0,0.4)] transition-all duration-700 hover:scale-[1.02]">
                    <img
                      src={profileImg}
                      alt="Khuswanth Rao Jadav"
                      className="w-full h-auto rounded-2xl block"
                    />
                  </div>

                  {/* High-tech status indicator overlay */}
                  <div className="absolute bottom-6 right-6 px-4 py-2 bg-dark-500/80 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xll">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00ffa2] shadow-[0_0_10px_#00ffa2]" />
                      <span className="text-white/60 font-mono text-[9px] tracking-widest uppercase">Verified Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>