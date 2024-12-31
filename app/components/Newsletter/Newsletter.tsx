import Image from "next/image";

const Newsletter = () => {
    // Define social media links
    const socialMediaLinks = [
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/netverse2024',
            icon: '/assets/icons/facebook.svg',
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/netversetunisie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
            icon: '/assets/icons/instagram.svg',
        },
        {
            name: 'WhatsApp',
            url: 'https://wa.me/qr/H55EYPMDK5UOD1',
            icon: '/assets/icons/whatsapp.svg',
        },
    ];

    return (
        <div id="Newsletter" className="mx-auto max-w-1xl md:max-w-5xl">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8">
                {/* Left Column: Text Content */}
                <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Stay Connected!
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            <span className="font-bold">Email:</span> contact@netverse.com
                        </p>
                        <ul className="mt-4 list-disc pl-5 text-gray-700 dark:text-gray-300 text-left">
                            <li>Learn about our new features</li>
                            <li>Stay updated on upcoming events</li>
                            <li>Give us feedback to improve</li>
                        </ul>
                        {/* Social Media Links */}
                        <div className="mt-6 flex justify-center space-x-4">
                            {socialMediaLinks.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                    <Image
                                        src={link.icon}
                                        alt={link.name}
                                        width={32}
                                        height={32}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Us Form */}
                <div className="col-span-12 md:col-span-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h2 className="mb-2 text-2xl tracking-tight font-bold text-center text-gray-900 dark:text-white">
                        Contact Us
                    </h2>
                    <p className="mb-4 font-light text-center text-gray-500 dark:text-gray-400 text-sm">
                        Contactez-nous pour plus d’informations ou pour rejoindre notre réseau 
                    </p>
                    <form action="#" className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="How can we help?"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            style={{ backgroundColor: '#10b981' }} // Direct inline green color
                            className="py-2 px-4 text-sm font-medium text-center text-white rounded-md hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
