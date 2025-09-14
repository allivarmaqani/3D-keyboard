import type { Metadata } from "next";
import Link from "next/link";
import {
  LuCheck,
  LuChevronRight,
  LuCircleHelp,
 
} from "react-icons/lu";
import Stripe from "stripe";

import { Logo } from "@/components/Logo";
import { FadeIn } from "@/components/FadeIn";

// Stripe instance فقط اگر secret key موجود باشه ساخته میشه
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-07-30.basil",
    })
  : null;

export const metadata: Metadata = {
  title: "Order Confirmation",
  description:
    "Thank you for your purchase! Your order has been confirmed and is being processed.",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  // اگر sessionId موجود نباشه یا Stripe موجود نباشه
  if (!sessionId || !stripe) {
    return (
      <div className="relative mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <LuCircleHelp className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block tracking-tight uppercase">Something</span>
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text tracking-tight text-transparent uppercase">
                Went Wrong
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Unable to load order details
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#01A7E1]/25"
            >
              Return Home
              <LuChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch session details from Stripe
  let orderDetails: {
    sessionId: string;
    customerEmail: string;
    amount: string;
  } = {
    sessionId: sessionId,
    customerEmail: "",
    amount: "",
  };

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    orderDetails = {
      sessionId: session.id,
      customerEmail: session.customer_details?.email || "",
      amount: session.amount_total
        ? (session.amount_total / 100).toFixed(2)
        : "",
    };
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    return (
      <div className="relative mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <LuCircleHelp className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block tracking-tight uppercase">Something</span>
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text tracking-tight text-transparent uppercase">
                Went Wrong
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Failed to load order details
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#01A7E1]/25"
            >
              Return Home
              <LuChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // صفحه موفقیت
  return (
    <div className="relative mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <FadeIn
        targetChildren
        className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* Success Icon and Header */}
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#01A7E1] to-[#0196C9]">
            <LuCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
            <span className="block tracking-tight uppercase">Payment</span>
            <span className="block bg-gradient-to-r from-[#01A7E1] to-[#0196C9] bg-clip-text tracking-tight text-transparent uppercase">
              Successful
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Thank you for your purchase! Your order has been confirmed and is
            being processed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg shadow-black/5 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Order Confirmation</h2>
            <Logo className="h-8 w-auto" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-sm text-gray-900">{orderDetails.sessionId}</span>
            </div>

            {orderDetails.customerEmail && (
              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{orderDetails.customerEmail}</span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">Product:</span>
              <span className="text-gray-900">Vapor75 Keyboard</span>
            </div>

            {orderDetails.amount && (
              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-gray-900">${orderDetails.amount}</span>
              </div>
            )}

            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                <div className="mr-1.5 h-2 w-2 rounded-full bg-green-400" />
                Confirmed
              </span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
