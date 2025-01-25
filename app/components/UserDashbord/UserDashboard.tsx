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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Transaction {
    id: number;
    date: string;
    type: "income" | "expense";
    amount: number;
    status: "completed" | "pending";
}

interface User {
    id: number;
    name: string;
    image: string;
    date: string;
    status: "Connected" | "Pending";
}

const UserDashboard: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [qrValue, setQrValue] = useState<string>("user123");

    useEffect(() => {
        // Mock transaction data
        const mockTransactions: Transaction[] = [
            { id: 1, date: "2024-01-15", type: "income", amount: 1500, status: "completed" },
            { id: 2, date: "2024-01-14", type: "expense", amount: -200, status: "completed" },
            { id: 3, date: "2024-01-13", type: "income", amount: 800, status: "pending" },
            { id: 3, date: "2024-01-13", type: "income", amount: 800, status: "pending" },
            { id: 3, date: "2024-01-13", type: "income", amount: 800, status: "pending" },
            { id: 3, date: "2024-01-13", type: "income", amount: 800, status: "pending" },
            { id: 3, date: "2024-01-13", type: "income", amount: 800, status: "pending" },
        ];
        setTransactions(mockTransactions);
    }, []);

    // Chart data
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

    // Recent users data
    const recentUsers: User[] = [
        {
            id: 1,
            name: "John Doe",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            date: "2024-01-15",
            status: "Connected",
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            date: "2024-01-14",
            status: "Pending",
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
                <div className="bg-ultramarine  col-span-1 md:col-span-2 p-6 rounded-xl  text-white">
                    <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
                    <div className="text-4xl font-bold mb-6">$4,200.00</div>
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
                    {/* Add max-height and overflow properties to this container */}
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
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-t">
                                        <td className="py-3">{transaction.date}</td>
                                        <td className="py-3">{transaction.type}</td>
                                        <td
                                            className={`py-3 ${transaction.amount > 0 ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            ${Math.abs(transaction.amount)}
                                        </td>
                                        <td className="py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-sm ${transaction.status === "completed"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
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
                        {recentUsers.map((user) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
