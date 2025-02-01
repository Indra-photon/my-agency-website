import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How long does it take to build a website?",
            answer: "The development timeline for a website typically ranges from 2-6 weeks, depending on the project complexity. We follow an agile methodology to ensure quick iterations and continuous feedback, helping us deliver a functional product that meets your core requirements efficiently."
        },
        {
            question: "How do we get started?",
            answer: "Getting started is simple: 1) Schedule a free consultation call, 2) We'll discuss your requirements and provide a detailed proposal, 3) Once approved, we'll begin with design and development sprints, keeping you involved throughout the process."
        },
        {
            question: "Do you provide ongoing support?",
            answer: "Yes, we offer comprehensive post-launch support including bug fixes, performance monitoring, security updates, and feature enhancements. Our support packages are flexible and can be tailored to your specific needs and budget."
        },
        {
            question: "What technologies do you use?",
            answer: "We specialize in modern web technologies including React, Next.js, Node.js, and Mongodb, Appwrite, firebase, Wordpress, Shopify for development. For design, we use Figma and Adobe Creative Suite. Our tech stack is always adapted to best suit your project's specific needs and requirements."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-black mx-auto px-4 sm:px-28">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Frequently Asked <span className="text-[#3B82F6]">Questions</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Don't just take our word for it - find answers to common questions about working with us
                </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-[#0F172A] rounded-xl overflow-hidden border border-gray-800/50"
                    >
                        {/* Question */}
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-[#1E293B]"
                        >
                            <span className="text-lg font-medium text-white">
                                {faq.question}
                            </span>
                            <span className="flex-shrink-0 ml-4">
                                {openIndex === index ? (
                                    <Minus className="w-6 h-6 text-[#3B82F6]" />
                                ) : (
                                    <Plus className="w-6 h-6 text-[#3B82F6]" />
                                )}
                            </span>
                        </button>

                        {/* Answer */}
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === index ? 'max-h-96' : 'max-h-0'
                            }`}
                        >
                            <div className="p-6 text-gray-400 border-t border-gray-800/50 bg-[#1E293B]/50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;