"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ArrowRight, Loader2, ShieldCheck, Globe, Terminal, Server, Wifi, Key } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Intro Verification States
  const [introVerified, setIntroVerified] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  // Post-Login Sequence States
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginStep, setLoginStep] = useState(0);

  const router = useRouter();

  // Intro Verification Sequence
  useEffect(() => {
    const steps = [
      { delay: 800, action: () => setIntroStep(1) }, // Initial delay
      { delay: 1200, action: () => setIntroStep(2) }, // Verifying IP
      { delay: 2000, action: () => setIntroStep(3) }, // Checking Crypto Keys
      { delay: 1000, action: () => setIntroStep(4) }, // Access Granted
      { delay: 1000, action: () => setIntroVerified(true) }, // Transition to Login
    ];

    let currentDelay = 0;
    steps.forEach(({ delay, action }) => {
      currentDelay += delay;
      setTimeout(action, currentDelay);
    });
  }, []);

  // Post-Login Sequence
  useEffect(() => {
    if (loginSuccess) {
      const steps = [
        { delay: 500, action: () => setLoginStep(1) }, // Establishing Proxy
        { delay: 1500, action: () => setLoginStep(2) }, // Connecting to Servers
        { delay: 1500, action: () => setLoginStep(3) }, // Encrypting Session
        { delay: 1500, action: () => setLoginStep(4) }, // Complete
        { delay: 1000, action: () => router.push("/dashboard") }, // Redirect
      ];

      let currentDelay = 0;
      steps.forEach(({ delay, action }) => {
        currentDelay += delay;
        setTimeout(action, currentDelay);
      });
    }
  }, [loginSuccess, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate validation delay
    setTimeout(() => {
      if (email === "alemanrockefeller7@gmail.com" && password === "111@222@AAlll$$67::!!") {
        setLoading(false);
        setLoginSuccess(true);
      } else {
        setLoading(false);
        alert("Invalid credentials");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden text-[#00FF00] font-mono select-none">

      {/* Background Starfield */}
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,50,0,0.1),rgba(0,0,0,1))]" />
        {/* Tiny stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* PHASE 1: INTRO VERIFICATION */}
        {!introVerified && !loginSuccess && (
          <motion.div
            key="intro-verification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center z-20 space-y-8 max-w-lg w-full"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-4 border-[#00FF00]/30 border-t-[#00FF00] rounded-full shadow-[0_0_30px_rgba(0,255,0,0.4)] flex items-center justify-center"
            >
              <Globe className="h-16 w-16 text-[#00FF00] animate-pulse" />
            </motion.div>

            <div className="w-full space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: introStep >= 1 ? 1 : 0, x: introStep >= 1 ? 0 : -20 }}
                className="flex items-center space-x-4 bg-black/50 border border-[#00FF00]/20 p-4 rounded-lg backdrop-blur-sm"
              >
                <Wifi className={`h-6 w-6 ${introStep >= 2 ? "text-[#00FF00]" : "text-[#00FF00]/40 animate-pulse"}`} />
                <div className="flex-1">
                  <p className="text-xs text-[#00FF00]/60 uppercase tracking-widest">Network</p>
                  <p className="text-sm font-bold">{introStep >= 2 ? "IP ADDRESS VERIFIED" : "ANALYZING CONNECTION..."}</p>
                </div>
                {introStep >= 2 && <ShieldCheck className="h-5 w-5 text-[#00FF00]" />}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: introStep >= 2 ? 1 : 0, x: introStep >= 2 ? 0 : -20 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 bg-black/50 border border-[#00FF00]/20 p-4 rounded-lg backdrop-blur-sm"
              >
                <Terminal className={`h-6 w-6 ${introStep >= 3 ? "text-[#00FF00]" : "text-[#00FF00]/40 animate-pulse"}`} />
                <div className="flex-1">
                  <p className="text-xs text-[#00FF00]/60 uppercase tracking-widest">Security</p>
                  <p className="text-sm font-bold">
                    {introStep >= 3 ? "ENCRYPTION KEYS MATCHED" : "DECRYPTING SSL HANDSHAKE..."}
                  </p>
                </div>
                {introStep >= 3 && <ShieldCheck className="h-5 w-5 text-[#00FF00]" />}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: introStep >= 4 ? 1 : 0, scale: introStep >= 4 ? 1 : 0.8 }}
                className="text-center pt-4"
              >
                <p className="text-3xl font-black tracking-[0.5em] text-[#00FF00] drop-shadow-[0_0_25px_#00FF00]">
                  ACCESS GRANTED
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: LOGIN FORM WITH GLOBE & LOGOS */}
        {introVerified && !loginSuccess && (
          <motion.div
            key="login-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full absolute inset-0 flex items-center justify-center z-10"
          >
            {/* 3D Globe Background Layer */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-[1000px] h-[1000px] opacity-80 flex items-center justify-center">
                <RotatingEarth width={1000} height={1000} />
              </div>
            </div>

            {/* Connection Beams */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Left Beam */}
              <div className="absolute top-1/2 left-[15%] w-[35%] h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent blur-[1px] animate-pulse" />
              {/* Right Beam */}
              <div className="absolute top-1/2 right-[15%] w-[35%] h-[2px] bg-gradient-to-r from-transparent via-[#00FF00] to-transparent blur-[1px] animate-pulse" />
            </div>

            {/* Main Container Grid */}
            <div className="w-full max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-3 items-center gap-12">

              {/* Left Logo (Coin) */}
              <motion.div
                initial={{ x: -100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 60 }}
                className="hidden md:flex flex-col items-center justify-center relative"
              >
                {/* BKG Bitcoin */}
                <div className="absolute w-[280px] h-[280px] opacity-30 animate-[spin_20s_linear_infinite] pointer-events-none">
                  <Image
                    src="/logo-bitcoin.png"
                    alt="Bitcoin BKG"
                    fill
                    className="object-contain grayscale contrast-125"
                  />
                </div>

                <div className="relative w-64 h-64 animate-[spin_10s_linear_infinite] [animation-play-state:paused] hover:[animation-play-state:running] z-10">
                  <div className="absolute inset-0 bg-[#FFD700]/20 rounded-full blur-3xl animate-pulse" />
                  <Image
                    src="/logo-coin.png"
                    alt="Gold Coin Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                  />
                </div>
              </motion.div>

              {/* Center Login Form */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center justify-center w-full max-w-md mx-auto"
              >
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-[#00FF00]/20 shadow-[0_0_50px_rgba(0,255,0,0.1)] w-full relative overflow-hidden">
                  {/* Globe Highlight behind form */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00FF00]/5 blur-3xl rounded-full pointer-events-none" />

                  <div className="text-center mb-8 relative z-10">
                    <h2 className="text-2xl font-black text-white tracking-[0.2em] mb-2 drop-shadow-md">SECURE LOGIN</h2>
                    <div className="h-1 w-20 bg-[#00FF00] mx-auto rounded-full shadow-[0_0_10px_#00FF00]" />
                  </div>

                  <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest text-[#00FF00]/70 ml-1 uppercase">Identity</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00FF00]/50" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/60 border border-[#00FF00]/20 text-white text-base rounded-xl focus:border-[#00FF00] block p-4 pl-12 outline-none transition-all placeholder-white/20 font-sans"
                          placeholder="ACCESS ID"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest text-[#00FF00]/70 ml-1 uppercase">Passcode</label>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00FF00]/50" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-black/60 border border-[#00FF00]/20 text-white text-base rounded-xl focus:border-[#00FF00] block p-4 pl-12 outline-none transition-all placeholder-white/20 font-sans"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center items-center py-4 px-4 rounded-xl text-black bg-[#00FF00] hover:bg-[#00CC00] hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] font-black text-sm uppercase tracking-widest transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        <>
                          Authenticate
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Right Logo (Emblem) */}
              <motion.div
                initial={{ x: 100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 60 }}
                className="hidden md:flex flex-col items-center justify-center relative"
              >
                {/* BKG Bitcoin */}
                <div className="absolute w-[280px] h-[280px] opacity-30 animate-[spin_20s_linear_infinite] pointer-events-none reverse-spin">
                  <Image
                    src="/logo-bitcoin.png"
                    alt="Bitcoin BKG"
                    fill
                    className="object-contain grayscale contrast-125"
                    style={{ transform: 'scaleX(-1)' }} // Mirror for symmetry
                  />
                </div>

                <div className="relative w-64 h-64 z-10">
                  <div className="absolute inset-0 bg-[#00FF00]/10 rounded-full blur-3xl animate-pulse" />
                  <Image
                    src="/logo-emblem.png"
                    alt="Emblem Logo"
                    fill
                    className="object-contain drop-shadow-[0_0_30px_rgba(0,255,0,0.4)]"
                  />
                </div>
              </motion.div>

            </div>

            {/* Footer Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 w-full max-w-5xl px-4"
            >
              <div className="grid grid-cols-6 gap-px bg-[#00FF00]/20 border border-[#00FF00]/30 rounded-lg overflow-hidden backdrop-blur-sm">
                {[
                  { l: "OAS", v: "7338129", c: "text-green-500" },
                  { l: "ODS", v: "3378863", c: "text-red-500" },
                  { l: "NAV", v: "418749", c: "text-orange-500" },
                  { l: "WAV", v: "4431877", c: "text-blue-500" },
                  { l: "IDS", v: "2451600", c: "text-purple-500" },
                  { l: "VUL", v: "65301", c: "text-yellow-500" },
                ].map((m, i) => (
                  <div key={i} className="bg-black/80 p-3 text-center hover:bg-black/60 transition-colors">
                    <div className="text-[10px] text-[#00FF00]/40 font-bold mb-1">{m.v}</div>
                    <div className={`text-xs font-black tracking-widest ${m.c}`}>{m.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        )}

        {/* PHASE 3: POST-LOGIN SEQUENCE */}
        {loginSuccess && (
          <motion.div
            key="post-login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center z-20 space-y-8 max-w-xl w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#00FF00] blur-xl opacity-50 animate-pulse" />
              <div className="w-24 h-24 bg-black border-2 border-[#00FF00] rounded-2xl flex items-center justify-center relative z-10">
                <ShieldCheck className="h-12 w-12 text-[#00FF00]" />
              </div>
            </motion.div>

            <div className="w-full space-y-4">
              {/* Step 1: Secure Proxy */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 bg-black/50 border border-[#00FF00]/20 p-5 rounded-xl backdrop-blur-sm"
              >
                <Wifi className={`h-6 w-6 ${loginStep >= 1 ? "text-[#00FF00]" : "text-[#00FF00]/40 animate-bounce"}`} />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold tracking-widest">CREATING SAFE TUNNEL</span>
                    {loginStep >= 1 && <span className="text-[#00FF00] text-xs">CONNECTED</span>}
                  </div>
                  <div className="h-1 bg-[#00FF00]/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#00FF00]"
                      initial={{ width: 0 }}
                      animate={{ width: loginStep >= 1 ? "100%" : "30%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Server Handshake */}
              {loginStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4 bg-black/50 border border-[#00FF00]/20 p-5 rounded-xl backdrop-blur-sm"
                >
                  <Server className={`h-6 w-6 ${loginStep >= 2 ? "text-[#00FF00]" : "text-[#00FF00]/40 animate-pulse"}`} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-bold tracking-widest">SERVER HANDSHAKE</span>
                      {loginStep >= 2 && <span className="text-[#00FF00] text-xs">AUTHORIZED</span>}
                    </div>
                    <div className="h-1 bg-[#00FF00]/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#00FF00]"
                        initial={{ width: 0 }}
                        animate={{ width: loginStep >= 2 ? "100%" : "60%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Encryption */}
              {loginStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4 bg-black/50 border border-[#00FF00]/20 p-5 rounded-xl backdrop-blur-sm"
                >
                  <Key className={`h-6 w-6 ${loginStep >= 3 ? "text-[#00FF00]" : "text-[#00FF00]/40 animate-pulse"}`} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-bold tracking-widest">VERIFYING CRYPTOGRAPHY</span>
                      {loginStep >= 3 && <span className="text-[#00FF00] text-xs">SECURE</span>}
                    </div>
                    <p className="text-[10px] text-[#00FF00]/60 font-mono">
                      {loginStep >= 3 ? "SHA-256 ENCRYPTED SESSION ACTIVE" : "GENERATING SESSION KEYS..."}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {loginStep >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-[#00FF00] animate-pulse font-black tracking-widest">REDIRECTING TO DASHBOARD...</p>
              </motion.div>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </div >
  );
}
