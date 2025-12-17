"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogOut,
    Plus,
    Clock,
    CheckCircle2,
    DollarSign,
    Search,
    ArrowUpRight,
    TrendingUp,
    Activity,
    X,
    Copy,
    Wallet
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("pending");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [copied, setCopied] = useState(false);

    const handleLogout = () => {
        router.push("/");
    };

    const copyToClipboard = () => {
        // Mock copy
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const walletAddress = "TGk3tUxuQ2P5SLxFqWqJ8EvxypYLEieVco";



    const pendingOperations = [
        { id: 1, swift: "BCOEESMM//WFBIUS6SXXX//10,000,00//MT199//MT103//", amount: "10,000,00 $", date: "2024-12-17" },
    ];

    const completedOperations = [
        { id: 2, swift: "BCOEESMM//WFBIUS6SXXX//10,000,00//MT199//MT103//", amount: "10,000,00 $", date: "2024-12-17" },
    ];

    return (
        <div className="min-h-screen w-full bg-black text-[#00FF00] font-sans selection:bg-[#00FF00] selection:text-black overflow-x-hidden relative">
            {/* Background Ambience & Particles */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00FF00]/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00FF00]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-[#00FF00]/5 rounded-full blur-[80px]" />
            </div>

            {/* Header */}
            <nav className="border-b border-[#00FF00]/10 bg-black/40 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-24">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 relative group cursor-pointer">
                                <div className="absolute inset-0 bg-[#00FF00]/20 blur-xl rounded-full group-hover:bg-[#00FF00]/40 transition-all duration-500" />
                                <Image
                                    src="/logo-header.png"
                                    alt="SWIFT Logo"
                                    fill
                                    className="object-contain relative z-10"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                                SWIFT<span className="text-[#00FF00]">.</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-[#00FF00] tracking-wide">alemanrockefeller7</span>
                                <span className="text-[10px] uppercase tracking-widest text-[#00FF00]/50 border border-[#00FF00]/20 px-2 py-0.5 rounded-full mt-1">Administrator</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-3 rounded-xl bg-[#00FF00]/5 hover:bg-[#00FF00] hover:text-black border border-[#00FF00]/20 hover:border-[#00FF00] transition-all duration-300 group"
                            >
                                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">



                {/* Action Bar */}
                <div className="flex flex-col xl:flex-row justify-between items-center mb-10 gap-6">
                    <div className="flex sm:space-x-1 bg-black/40 p-1 rounded-xl border border-[#00FF00]/10 backdrop-blur-sm w-full xl:w-auto">
                        {['pending', 'completed'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative flex-1 xl:flex-none px-4 py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-300 uppercase tracking-wide overflow-hidden ${activeTab === tab
                                    ? 'text-black shadow-[0_0_15px_rgba(0,255,0,0.4)]'
                                    : 'text-[#00FF00]/60 hover:text-[#00FF00] hover:bg-[#00FF00]/5'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#00FF00] z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 whitespace-nowrap">{tab === 'pending' ? 'Operaciones Pendientes' : 'Operaciones Concluidas'}</span>
                            </button>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setSwiftCode("BCOEESMM//WFBIUS6SXXX//10,000,00//MT199//MT103//");
                            setAmount("10,000,00");
                            setIsModalOpen(true);
                        }}
                        className="group relative w-full xl:w-auto flex justify-center items-center space-x-2 bg-[#00FF00] text-black px-6 py-2.5 rounded-xl font-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,0,0.6)] transition-all duration-300 uppercase tracking-wider text-sm"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Concluir Pago</span>
                        <div className="absolute inset-0 rounded-xl ring-1 ring-white/50 group-hover:ring-offset-1 transition-all duration-300" />
                    </motion.button>
                </div>

                {/* Content Table */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-black/40 border border-[#00FF00]/10 rounded-3xl overflow-hidden backdrop-blur-md"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-[#00FF00]/10 bg-[#00FF00]/5">
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60">Codigo Swift</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60">Monto</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60 text-right">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#00FF00]/5">
                                    {(activeTab === 'pending' ? pendingOperations : completedOperations).map((op, idx) => (
                                        <motion.tr
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={op.id}
                                            className="group hover:bg-[#00FF00]/5 transition-colors duration-300"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 rounded-xl bg-[#00FF00]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 border border-[#00FF00]/20 group-hover:border-[#00FF00]">
                                                        <Activity className="h-5 w-5 text-[#00FF00]" />
                                                    </div>
                                                    <span className="font-mono text-sm tracking-wider text-white group-hover:text-[#00FF00] transition-colors">{op.swift}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-bold text-[#00FF00] drop-shadow-[0_0_5px_rgba(0,255,0,0.3)]">{op.amount}</td>
                                            <td className="px-6 py-5 text-right">
                                                <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${activeTab === 'pending'
                                                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]'
                                                    : 'bg-[#00FF00]/10 text-[#00FF00] border-[#00FF00]/20 shadow-[0_0_10px_rgba(0,255,0,0.1)]'
                                                    }`}
                                                >
                                                    {activeTab === 'pending' ? 'Pendiente' : 'Pagado'}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-5 border-t border-[#00FF00]/10 bg-[#00FF00]/5 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-[#00FF00]/40 font-mono">
                            <span>DISPLAYING {activeTab === 'pending' ? pendingOperations.length : completedOperations.length} RECORDS</span>
                            <div className="flex space-x-4">
                                <button className="hover:text-[#00FF00] transition-colors">PREV</button>
                                <span>/</span>
                                <button className="hover:text-[#00FF00] transition-colors">NEXT</button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

            </main>

            {/* Payment Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-black border border-[#00FF00]/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,255,0,0.2)] overflow-hidden"
                        >
                            {/* Decorative beams */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#00FF00] blur-sm shadow-[0_0_20px_#00FF00]" />

                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Deposit TRC20</h2>
                                    <p className="text-[#00FF00]/60 text-sm mt-1">Scan the QR code to proceed</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-[#00FF00]/10 transition-colors"
                                >
                                    <X className="h-6 w-6 text-[#00FF00]" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* SWIFT Code Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#00FF00]/70">SWIFT Code</label>
                                    <div className="relative">
                                        <Activity className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#00FF00]" />
                                        <input
                                            type="text"
                                            value={swiftCode}
                                            onChange={(e) => setSwiftCode(e.target.value)}
                                            placeholder="SWFT..."
                                            className="w-full bg-[#050505] border border-[#00FF00]/20 rounded-xl py-4 pl-12 pr-4 text-white text-lg font-mono focus:border-[#00FF00] focus:ring-1 focus:ring-[#00FF00] outline-none transition-all placeholder-[#00FF00]/20 uppercase"
                                        />
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-[#00FF00]/70">Amount (USD)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#00FF00]" />
                                        <input
                                            type="text"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-[#050505] border border-[#00FF00]/20 rounded-xl py-4 pl-12 pr-4 text-white text-lg font-mono focus:border-[#00FF00] focus:ring-1 focus:ring-[#00FF00] outline-none transition-all placeholder-[#00FF00]/20"
                                        />
                                    </div>
                                </div>

                                {/* QR Code */}
                                <div className="flex justify-center py-6">
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF00] to-[#00aa00] rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                                        <div className="relative w-48 h-48 bg-white p-2 rounded-lg flex items-center justify-center overflow-hidden">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src="/qr-code.png"
                                                    alt="TRC20 QR Code"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Wallet Address */}
                                <div className="bg-[#00FF00]/5 border border-[#00FF00]/20 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#00FF00]/10 rounded-lg">
                                            <Wallet className="h-5 w-5 text-[#00FF00]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#00FF00]/50 uppercase tracking-widest">Wallet Address</span>
                                            <span className="text-sm text-white font-mono truncate max-w-[200px]">{walletAddress}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 hover:bg-[#00FF00]/10 rounded-lg transition-colors relative"
                                    >
                                        <AnimatePresence>
                                            {copied ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <CheckCircle2 className="h-5 w-5 text-[#00FF00]" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Copy className="h-5 w-5 text-[#00FF00]/60" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>

                                <button className="w-full bg-[#00FF00] text-black font-black py-4 rounded-xl text-lg uppercase tracking-widest hover:bg-[#00CC00] hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all transform active:scale-95">
                                    Verify Payment
                                </button>
                            </div>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
