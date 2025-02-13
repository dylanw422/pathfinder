import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Footer } from "@/components/footer";

const responsibilities = [
  "Booking creation, modification, or cancellation.",
  "Payment processing.",
  "Issuing refunds.",
  "Customer service related to bookings.",
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="italic text-primary text-2xl font-bold">
                Pathfinder
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Disclaimer
            </h1>
            <div className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Please read this disclaimer carefully before using our services.
            </div>
          </div>
          <div className="mt-16">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Legal Disclaimer
                </h2>
                <div className="mt-5 text-gray-600 space-y-4">
                  <h2 className="font-semibold">
                    No Booking or Refund Responsibility
                  </h2>
                  <div>
                    Pathfinder acts as a facilitator connecting users with
                    travel services offered by Expedia. All bookings made
                    through the app are processed and managed solely by Expedia.
                    Pathfinder does not handle any aspect of the booking
                    process, including but not limited to:
                    <ul className="py-2 ml-4">
                      {responsibilities.map((responsibility, index) => (
                        <li key={index}>• {responsibility}</li>
                      ))}
                    </ul>
                    Any inquiries, requests, or disputes regarding bookings,
                    payments, or refunds must be directed to Expedia directly,
                    in accordance with their terms and conditions. Pathfinder is
                    not responsible or liable for any issues arising from
                    bookings made through the app. Please refer to
                    Expedia&apos;s website or contact their customer support for
                    all booking-related matters.
                  </div>
                  <h2 className="font-semibold">Intellectual Property</h2>
                  <div>
                    The company logos and trademarks shown on this app are the
                    intellectual property of their respective owners. They are
                    presented here solely for illustrative and/or educational
                    purposes and do not signify any endorsement, sponsorship, or
                    association with our product or services. We have taken care
                    to ensure that the use of these logos and trademarks adheres
                    to fair use standards and reflects the high regard we hold
                    for these companies. However, if any company wishes to have
                    their logo removed or has specific usage guidelines we have
                    inadvertently not followed, please contact us at
                    dylanwest@pthfindr.com directly for immediate action.
                  </div>
                  <h2 className="font-semibold">Disclaimer of Warranty</h2>
                  <div>
                    Pathfinder is provided &quot;as is&quot; without any
                    warranties of any kind, either express or implied. We do not
                    warrant that the app will be uninterrupted, error-free, or
                    that any information provided through the app is accurate,
                    complete, or reliable.
                  </div>
                  <h2 className="font-semibold">Limitation of Liability</h2>
                  <div>
                    To the fullest extent permitted by law, Pathfinder shall not
                    be liable for any direct, indirect, incidental, special,
                    consequential, or punitive damages arising out of or related
                    to your use of the app, even if we have been advised of the
                    possibility of such damages.
                  </div>
                  <h2 className="font-semibold">Governing Law</h2>
                  <div>
                    This disclaimer shall be governed by and construed in
                    accordance with the laws of Louisiana & The United States.
                  </div>{" "}
                  <h2 className="font-semibold">Changes to this Disclaimer</h2>
                  <div>
                    We reserve the right to modify this disclaimer at any time.
                    Any changes will be posted on this app, and your continued
                    use of the app following the posting of such changes
                    constitutes your acceptance of the revised disclaimer.
                  </div>
                  <h2 className="font-semibold">Changes to this Disclaimer</h2>
                  <div>
                    If you have any questions about this disclaimer, please
                    contact us at: dylanwest@pthfindr.com. By using Pathfinder,
                    you acknowledge that you have read, understood, and agree to
                    be bound by this disclaimer.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Back to Home
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
