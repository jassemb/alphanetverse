"use client";
import { useState, useEffect } from "react";
import {
    FiDownload,
    FiRefreshCw,
    FiPlus,
    FiSend,
    FiStar,
    FiDollarSign,
    FiArrowUpRight,
    FiArrowDownLeft,
} from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { QRCodeSVG } from "qrcode.react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useRouter } from "next/navigation";
import { format } from "date-fns";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface User {
    id: number;
    name: string;
    image: string;
    date: string;
    status: String;
    wallet_user: String;
}

// const handleWithdraw = async () => {
    
//     const amount = prompt("Enter amount to withdraw:");
//     if (!amount || isNaN(Number(amount))) return alert("Invalid amount");
//     const token = localStorage.getItem("token");

//     if (!token) {
//         console.error("No token found. User is not authenticated.");
//         router.push("/");
//         return;
//     }

//     try {
//         const response = await fetch("https://api.alphanetverse.com/api/v1/me/wallet/withdraw/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ amount: parseFloat(amount) }),
//         });

//         if (response.ok) {
//             alert("Withdrawal successful!");
//             window.location.reload(); // Refresh balance
//         } else {
//             const errorData = await response.json();
//             console.error("Withdrawal error:", errorData);
//             alert(errorData.message || "Error withdrawing funds");
//         }
//     } catch (error) {
//         console.error("Error processing withdrawal:", error);
//     }
// };

const UserDashboard: React.FC = () => {
    const router = useRouter();

    const [qrValue, setQrValue] = useState<string>("user123");
    const [walletInfo, setWalletInfo] = useState<{
        ac_cash: string;
    } | null>(null);
    const [transactions, setTransactions] = useState<
        Array<{
            id: string;
            created_at: string;
            amount: number;
            receiver: string;
            status: string;
        }>
    >([]);

    useEffect(() => {
        const fetchWalletInfo = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found. User is not authenticated.");
                router.push("/");
                return;
            }

            try {
                const response = await fetch("https://api.alphanetverse.com/api/v1/me/wallet/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setWalletInfo(data);
                    console.log("Wallet info:", data);
                } else {
                    const errorData = await response.json();
                    console.error("Error fetching wallet info:", errorData);
                }
            } catch (error) {
                console.error("An error occurred while fetching wallet info:", error);
            }
        };

        const fetchTransactions = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("No token found. User is not authenticated.");
                router.push("/");
                return;
            }

            try {
                const response = await fetch(
                    "https://api.alphanetverse.com/api/v1/me/wallet/transactions/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data);
                    updateWalletBalance(data); // Update wallet balance when transactions are fetched
                    console.log("Transactions:", data);
                } else {
                    const errorData = await response.json();
                    console.error("Error fetching wallet info:", errorData);
                }
            } catch (error) {
                console.error("An error occurred while fetching wallet info:", error);
            }
        };

        const updateWalletBalance = (transactions: Array<any>) => {
            if (walletInfo) {
                let updatedBalance = parseFloat(walletInfo.ac_cash);

                transactions.forEach((transaction) => {
                    if (transaction.status === "pending") {
                        updatedBalance -= transaction.amount;
                    }
                });

                setWalletInfo({
                    ac_cash: updatedBalance.toString(),
                });
            }
        };

        fetchTransactions();
        fetchWalletInfo();
    }, []);

    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Balance History",
                data: [3000, 3500, 3200, 4000, 3800, 4200],
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    const recentUsers: User[] = [
        {
            id: 1,
            name: "John Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            date: "2024-01-15",
            status: "Connected",
            wallet_user: "0x1234...5678",
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            date: "2024-01-14",
            status: "Pending",
            wallet_user: "0x1234...5678",
        },
    ];

    const regenerateQR = () => {
        setQrValue(`user123-${Date.now()}`);
    };

    return (
        <div className={`min-h-screen p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}>
            <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

            {/* Wallet, QR Code, Chart, and Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Wallet Section */}
                <div className="bg-ultramarine col-span-1 md:col-span-2 p-6 rounded-xl text-white">
                    <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
                    <div className="text-4xl font-bold mb-6">${walletInfo?.ac_cash || "N/A"}</div>
                    <div className="grid grid-cols-3 gap-4">
                        <button className="flex items-center justify-center p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                            <FiArrowDownLeft className="mr-2" /> Withdraw
                        </button>
                        <button className="flex items-center justify-center p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                            <FiArrowUpRight className="mr-2" /> Transfer
                        </button>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Your QR Code</h2>
                    <div className="flex flex-col items-center">
                        <QRCodeSVG value={qrValue} size={150} />
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={regenerateQR}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                            >
                                <FiRefreshCw />
                            </button>
                            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                                <FiDownload />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="col-span-1 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Balance Trend</h2>
                    <Line data={chartData} options={{ responsive: true }} />
                </div>

                {/* Transactions Section */}
                <div className="col-span-1 md:col-span-2 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                    <div className="overflow-y-auto max-h-64">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="pb-4">Date</th>
                                    <th className="pb-4">Type</th>
                                    <th className="pb-4">Amount</th>
                                    <th className="pb-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map((transaction, index) => (
                                    <tr key={`${transaction.id || index}-${transaction.created_at}`} className="border-t">
                                        <td className="py-3">
                                            {format(new Date(transaction.created_at), "yyyy-MM-dd HH:mm")}
                                        </td>
                                        <td className="py-3">{transaction.status}</td>
                                        <td
                                            className={`py-3 ${transaction.amount > 0 ? "text-red" : "text-red"
                                                }`}
                                        >
                                            - ${Math.abs(transaction.amount)}
                                        </td>
                                        <td className="py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-sm ${transaction.status === "completed"
                                                    ? "bg-kellygreen text-white"
                                                    : "bg-red text-white"
                                                    }`}
                                            >
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Users Section */}
                <div className="col-span-1 md:col-span-2 p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-300">
                    <h2 className="text-xl font-bold mb-4">Recent Connections</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* {recentUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                            >
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="ml-4 flex-1">
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.status}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors">
                                        <FiStar />
                                    </button>
                                    <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors">
                                        <FiSend />
                                    </button>
                                </div>
                            </div>
                        ))} */}

                        <span className="text-black text-l "> Comming soon be patient ...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
function updateWalletBalance(updatedTransactions: { id: string; created_at: string; amount: number; receiver: string; status: string; }[]) {
    throw new Error("Function not implemented.");
}

