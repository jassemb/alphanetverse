import React, { useState, useEffect } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 24,
    minutes: 60,
    seconds: 60
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        if (newSeconds < 0) {
          const newMinutes = prevTime.minutes - 1;
          if (newMinutes < 0) {
            const newHours = prevTime.hours - 1;
            if (newHours < 0) {
              const newDays = prevTime.days - 1;
              return {
                days: newDays,
                hours: 23,
                minutes: 59,
                seconds: 59
              };
            }
            return {
              ...prevTime,
              hours: newHours,
              minutes: 59,
              seconds: 59
            };
          }
          return {
            ...prevTime,
            minutes: newMinutes,
            seconds: 59
          };
        }
        return {
          ...prevTime,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setIsError(true);
      setMessage("Please enter a valid email address");
      return;
    }

    setIsError(false);
    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-midnightblue bg-opacity-10 backdrop-blur-lg rounded-xl p-8 md:p-12 shadow-2xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img
            src="/assets/logo/logo2.svg"
            alt="Logo"
            className="w-24 h-24 object-contain rounded-full bg-ultramarine p-2"
          />

          <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
            Something Amazing is Coming Soon
          </h1>

          <p className="text-lg md:text-xl text-black text-center max-w-2xl">
            We are working hard to bring you something extraordinary. Stay tuned and be the first to know when we launch!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                <div className="text-3xl md:text-4xl font-bold text-black">{value}</div>
                <div className="text-sm text-black uppercase">{unit}</div>
              </div>
            ))}
          </div>

          

          
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;