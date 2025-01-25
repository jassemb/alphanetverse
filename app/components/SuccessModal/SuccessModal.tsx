import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

type SuccessModalProps = {
    isVisible: boolean;
    onClose: () => void;
    message?: string;  // Optional message prop for success or error message
    isError?: boolean;  // Optional flag to distinguish error from success
};

const SuccessModal = ({ isVisible, onClose, message, isError }: SuccessModalProps) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="relative bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h3 className={`text-2xl font-bold ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {isError ? 'Error' : 'Success'}!
                    </h3>
                    <p className="mt-2 text-gray-900">{message || (isError ? 'Something went wrong. Please try again.' : 'Your account has been successfully created.')}</p>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
