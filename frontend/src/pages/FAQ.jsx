import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  ShoppingBag,
  Truck,
  CreditCard,
  RotateCcw,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    title: "Shopping & Products",
    icon: ShoppingBag,
    questions: [
      {
        question: "What products does Voltora sell?",
        answer:
          "Voltora offers a wide range of electronics including smartphones, laptops, tablets, headphones, cameras, smartwatches, televisions, home appliances, and office equipment.",
      },
      {
        question: "How can I find a specific product?",
        answer:
          "You can use the search option in the navigation bar or browse products through the Shop and Categories pages.",
      },
      {
        question: "Can I view product details before buying?",
        answer:
          "Yes. Open any product to view its details, price, rating, availability, and other product information before adding it to your cart.",
      },
      {
        question: "Can I add products to my wishlist?",
        answer:
          "Yes. You can use the wishlist option on supported products to save items you may want to purchase later.",
      },
    ],
  },
  {
    title: "Orders & Delivery",
    icon: Truck,
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Add the products you want to your cart, review your cart, continue to checkout, provide your delivery information, and complete the order process.",
      },
      {
        question: "How can I check my order status?",
        answer:
          "After signing in, you can visit your Orders page to view your orders and their current status.",
      },
      {
        question: "Can I save multiple delivery addresses?",
        answer:
          "Yes. Your account can contain multiple saved addresses. You can also choose one address as your default delivery address.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Delivery time can vary depending on the order, destination, and delivery service. The available delivery information will be provided during the ordering process.",
      },
    ],
  },
  {
    title: "Payment & Checkout",
    icon: CreditCard,
    questions: [
      {
        question: "What payment methods are available?",
        answer:
          "Available payment methods depend on the checkout configuration of the store. Payment options can be expanded when the backend payment system is connected.",
      },
      {
        question: "Can I review my order before placing it?",
        answer:
          "Yes. The checkout process allows you to review your selected products, delivery information, and order total before completing the order.",
      },
      {
        question: "Is my checkout information secure?",
        answer:
          "The frontend is designed with a secure shopping experience in mind. Real payment and data security will depend on the backend, database, authentication, and payment systems connected to the store.",
      },
    ],
  },
  {
    title: "Returns & Support",
    icon: RotateCcw,
    questions: [
      {
        question: "Can I return a product?",
        answer:
          "Return eligibility depends on the store's return policy and the specific product. Please review the Return Policy page for the applicable conditions.",
      },
      {
        question: "How can I contact Voltora?",
        answer:
          "You can contact us through the Contact page using the contact form or the available contact information.",
      },
      {
        question: "Where can I read the store policies?",
        answer:
          "You can find the Privacy Policy, Terms of Service, Shipping Policy, and Return Policy through the relevant policy pages.",
      },
    ],
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-[#E5E7EB] last:border-b-0">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-[#14181F]">
          {question}
        </span>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
            isOpen ? "bg-[#FFB020] text-[#0A0E14]" : "bg-[#F3F4F6] text-[#6B7280]"
          }`}
        >
          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="pb-5 pr-10">
          <p className="text-sm leading-7 text-[#6B7280]">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(
    "What products does Voltora sell?"
  );

  const handleToggle = (question) => {
    setOpenQuestion((current) => (current === question ? null : question));
  };

  return (
    <main className="voltora-body bg-[#FAFAF8]">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Hero */}
      <section className="border-b border-[#E5E7EB] bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFB020]">
            <HelpCircle size={26} className="text-[#0A0E14]" />
          </div>

          <p className="mt-5 text-sm font-medium text-[#FFB020]">
            Help center
          </p>

          <h1 className="voltora-heading mt-3 text-4xl font-semibold text-white sm:text-5xl">
            Frequently asked questions
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Find answers to common questions about shopping, products,
            orders, delivery, payments, and support.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqCategories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.title}
                  className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-4 border-b border-[#E5E7EB] bg-[#FAFAF8] px-5 py-4 sm:px-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF6E7]">
                      <Icon size={19} className="text-[#B8791A]" />
                    </div>

                    <h2 className="voltora-heading font-semibold text-[#14181F]">
                      {category.title}
                    </h2>
                  </div>

                  {/* Questions */}
                  <div className="px-5 sm:px-6">
                    {category.questions.map((item) => (
                      <FAQItem
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openQuestion === item.question}
                        onClick={() => handleToggle(item.question)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="border-t border-[#E5E7EB] bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF6E7]">
            <MessageCircle size={21} className="text-[#B8791A]" />
          </div>

          <h2 className="voltora-heading mt-5 text-2xl font-semibold text-[#14181F]">
            Still have questions?
          </h2>

          <p className="mt-3 leading-7 text-[#6B7280]">
            If you couldn't find the answer you're looking for, our
            contact page is the next place to get help.
          </p>

          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFB020] px-6 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
          >
            Contact us
            <MessageCircle size={18} />
          </Link>
        </div>
      </section>

      {/* Policies */}
      <section className="border-t border-[#E5E7EB] bg-[#FAFAF8] py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="shrink-0 text-[#B8791A]" />

            <div>
              <p className="voltora-heading font-semibold text-[#14181F]">
                Need more information?
              </p>

              <p className="text-sm text-[#6B7280]">
                Review our store policies.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm">
            <Link
              to="/shipping-policy"
              className="text-[#6B7280] transition hover:text-[#B8791A]"
            >
              Shipping policy
            </Link>

            <Link
              to="/return-policy"
              className="text-[#6B7280] transition hover:text-[#B8791A]"
            >
              Return policy
            </Link>

            <Link
              to="/privacy-policy"
              className="text-[#6B7280] transition hover:text-[#B8791A]"
            >
              Privacy policy
            </Link>

            <Link
              to="/terms"
              className="text-[#6B7280] transition hover:text-[#B8791A]"
            >
              Terms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}