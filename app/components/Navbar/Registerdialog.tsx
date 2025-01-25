import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { signup } from '@/app/api/signup';

type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    referralCode: string;
    country: string;
};

const Register = () => {
    let [isOpen, setIsOpen] = useState(false);

    // State for form inputs
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');

    // State for error/success message
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const closeModal = () => setIsOpen(false);

    const openModal = () => setIsOpen(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData: UserData = { firstName, lastName, email, password, phone, referralCode, country };

        try {
            // Log the data before sending the request to confirm it's formatted correctly
            console.log('Sending signup request with data:', userData);

            const result = await signup(referralCode, userData);
            setSuccess('Signup successful!');
            setError(null); // Clear previous errors
            console.log('Signup result:', result);
        } catch (error) {
            console.error('Error during signup:', error);
            setError('Signup failed. Please try again.');
            setSuccess(null); // Clear success message if any
        }
    };

    return (
        <>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <div className='hidden lg:block'>
                    <button
                        className="text-Blueviolet text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out rounded-full bg-semiblueviolet hover:text-white hover:bg-Blueviolet"
                        onClick={openModal}
                    >
                        Sign up
                    </button>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                        <div className="w-full max-w-md space-y-8">
                                            <div>
                                                <img
                                                    className="mx-auto h-12 w-auto"
                                                    src="/assets/logo/logo2.svg"
                                                    alt="Your Company"
                                                />
                                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                    Register your account
                                                </h2>
                                            </div>
                                            <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
                                                <div className="space-y-4">
                                                     {/* First Name */}
                                                     <div>
                                                        <label htmlFor="Country" className="sr-only">
                                                            country
                                                        </label>
                                                        <input
                                                            id="Country"
                                                            name="Country"
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Country"
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                        />
                                                    </div>
                                                    {/* First Name */}
                                                    <div>
                                                        <label htmlFor="first-name" className="sr-only">
                                                            First Name
                                                        </label>
                                                        <input
                                                            id="first-name"
                                                            name="firstName"
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="First Name"
                                                            value={firstName}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Last Name */}
                                                    <div>
                                                        <label htmlFor="last-name" className="sr-only">
                                                            Last Name
                                                        </label>
                                                        <input
                                                            id="last-name"
                                                            name="lastName"
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Last Name"
                                                            value={lastName}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Referral Code */}
                                                    <div>
                                                        <label htmlFor="Code-parent" className="sr-only">
                                                            Code parent
                                                        </label>
                                                        <input
                                                            id="Code-parent"
                                                            name="codeParent"
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Code parent"
                                                            value={referralCode}
                                                            onChange={(e) => setReferralCode(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Phone Number */}
                                                    <div>
                                                        <label htmlFor="Phone-Number" className="sr-only">
                                                            Phone Number 
                                                        </label>
                                                        <input
                                                            id="Phone-Number"
                                                            name="phoneNumber"
                                                            type="text"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Phone Number"
                                                            value={phone}
                                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Email Address */}
                                                    <div>
                                                        <label htmlFor="email-address" className="sr-only">
                                                            Email address
                                                        </label>
                                                        <input
                                                            id="email-address"
                                                            name="email"
                                                            type="email"
                                                            autoComplete="email"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Email address"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>

                                                    {/* Password */}
                                                    <div>
                                                        <label htmlFor="password" className="sr-only">
                                                            Password
                                                        </label>
                                                        <input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            autoComplete="current-password"
                                                            required
                                                            className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-Blueviolet py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    >
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                            <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                                        </span>
                                                        Register Now
                                                    </button>
                                                </div>
                                            </form>

                                            {/* Display error or success messages */}
                                            {error && <p className="text-red-500 mt-2">{error}</p>}
                                            {success && <p className="text-green-500 mt-2">{success}</p>}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Register;
