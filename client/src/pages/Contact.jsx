import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const Contact = () => {
  // Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const [result, setResult] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("");

    const form = e.target;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const newErrors = {
      name: name === "",
      email: !/\S+@\S+\.\S+/.test(email),
      message: message === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      setResult("❌ Please fix the highlighted fields.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setResult("Sending....");
    formData.append("access_key", "20720aa8-5d0e-4355-b66c-a1b5076e21d8");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("✅ Form submitted successfully!");
        form.reset();
        setErrors({ name: false, email: false, message: false });
      } else {
        setResult(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Something went wrong.");
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div
      ref={ref}
      className="relative w-full px-6 md:px-12 lg:px-[12%] py-10 scroll-mt-20"
    >
      {/* Alert Box */}
      <AnimatePresence>
        {showAlert && result && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -50, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-6 bg-zinc-900 text-white border border-zinc-700 rounded-xl px-6 py-4 shadow-lg z-50 max-w-sm w-[90%] sm:w-full"
          >
            <p
              className={`${
                result.includes("✅") ? "text-green-400" : "text-red-400"
              } font-medium`}
            >
              {result}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heading */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0}
        className="text-center text-3xl md:text-4xl lg:text-5xl"
      >
        Contact
      </motion.h2>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={1}
        className="text-center max-w-2xl mx-auto mt-5 mb-8 text-base md:text-lg"
      >
        You can contact me here.
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={2}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-8">
          <motion.div className="relative" custom={3} variants={fadeUp}>
            <p>Name *</p>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`mt-2 p-3 w-full border rounded-md bg-white outline-none ${
                errors.name ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </motion.div>

          <motion.div className="relative" custom={4} variants={fadeUp}>
            <p>Email *</p>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`mt-2 p-3 w-full border rounded-md bg-white outline-none ${
                errors.email ? "border-red-500" : "border-gray-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid email
              </p>
            )}
          </motion.div>
        </div>

        <motion.div className="relative" custom={5} variants={fadeUp}>
          <p>Message *</p>
          <textarea
            name="message"
            rows={6}
            placeholder="Enter your message"
            className={`mt-2 w-full p-4 border rounded-md bg-white outline-none resize-none ${
              errors.message ? "border-red-500" : "border-gray-400"
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mb-5">
              Message is required
            </p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="mt-5 py-3 px-8 mx-auto flex bg-[#eaaa3c] text-white rounded-full hover:bg-black duration-500"
          custom={6}
          variants={fadeUp}
        >
          Submit now
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;
