import React, { useState } from 'react';
import { Plus, Minus, CreditCard } from 'lucide-react';
import { Client, Functions } from "appwrite";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

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

    // Function to load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Sample cart items for testing
    const sampleCartItems = [
        {
            id: "prod_001",
            name: "Sample Product 1",
            price: 50,
            qty: 1
        },
        {
            id: "prod_002", 
            name: "Sample Product 2",
            price: 25,
            qty: 2
        }
    ];

    // Function to handle payment using Appwrite SDK
    // Function to handle payment using Appwrite SDK
    // Function to handle payment using Appwrite SDK
const handlePayment = async () => {
    try {
        setPaymentLoading(true);

        // 1. Load Razorpay script
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            throw new Error("Razorpay SDK failed to load");
        }

        // 2. Initialize Appwrite client
        const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('6787abc7002752f0a768'); // Your project ID

        const functions = new Functions(client);

        // 3. Call order creation function
        console.log("Calling order creation function...");
        const orderExecution = await functions.createExecution(
            '67d873e40002be597c65', // Your function ID
            JSON.stringify({ totalAmount: 1000 }), // 1000 rupees
            false
        );
        
        console.log("Order creation response:", orderExecution);
        
        // Check if the execution was successful
        if (orderExecution.status === 'failed' || !orderExecution.responseBody) {
            throw new Error("Order creation failed: " + (orderExecution.errors || "Unknown error"));
        }
        
        // Parse the order from the function response
        const responseData = JSON.parse(orderExecution.responseBody);
        console.log("Parsed response:", responseData);
        
        // Make sure we have an order object
        if (!responseData.order || !responseData.order.id) {
            throw new Error("Invalid order response format");
        }
        
        const order = responseData.order;
        
        // 4. Initialize Razorpay options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your actual key
            amount: order.amount,
            currency: order.currency,
            name: "Your Company Name",
            description: "Test Payment",
            order_id: order.id,
            handler: async (response) => {
                try {
                    // 5. Call payment verification function
                    console.log("Calling payment verification function...");
                    const verifyExecution = await functions.createExecution(
                        '67d96ea800216b46b671', // Your verification function ID
                        JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            cartItems: sampleCartItems
                        }),
                        false
                    );
                    
                    console.log("Verification response:", verifyExecution);
                    
                    if (verifyExecution.status === 'failed' || !verifyExecution.responseBody) {
                        throw new Error("Verification failed: " + (verifyExecution.errors || "Unknown error"));
                    }
                    
                    const verificationResult = JSON.parse(verifyExecution.responseBody);
                    
                    // 6. Handle success
                    alert("Payment successful!");
                } catch (error) {
                    console.error("Payment verification failed:", error);
                    alert("Payment verification failed. Please contact support.");
                }
            },
            prefill: {
                name: "Customer Name",
                email: "customer@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#3B82F6"
            }
        };

        // 7. Create Razorpay instance and open payment modal
        const razorpay = new window.Razorpay(options);
        razorpay.open();

    } catch (error) {
        console.error("Payment initiation failed:", error);
        alert("Could not initiate payment: " + error.message);
        setPaymentLoading(false);
    }
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

            {/* Test Payment Button */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    <CreditCard className="w-5 h-5" />
                    {paymentLoading ? "Processing..." : "Test Razorpay Payment (₹100)"}
                </button>
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