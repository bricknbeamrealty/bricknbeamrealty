import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Brick N Beams",
  description:
    "Privacy Policy for Brick N Beams. Learn how we collect, use, process, and protect your personal information in accordance with Indian privacy laws.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-[#a01115] selection:text-white relative overflow-x-hidden font-sans">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-stone-200/80 shadow-xs backdrop-blur-md mb-6 text-xs sm:text-sm text-stone-600 font-medium"
          >
            <Link href="/" className="hover:text-[#a01115] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-900">Privacy Policy</span>
          </nav>

          {/* Header Title Section */}
          <div className="mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#a01115]/10 text-[#a01115] border border-[#a01115]/20 backdrop-blur-xs mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a01115]" />
              Data Protection &amp; Privacy
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-stone-500">
              Last Updated: October 2026
            </p>
          </div>

          {/* Legal Content Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xs space-y-10 text-stone-700 leading-relaxed text-sm sm:text-base">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                1. Overview &amp; Scope
              </h2>
              <p>
                Brick N Beams (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a premier real estate advisory firm operating in Thane, Maharashtra. We respect your privacy and are committed to protecting the personal data you share with us.
              </p>
              <p>
                This Privacy Policy explains what personal information we collect through our website, enquiry channels, and communication touchpoints, how that information is utilized, the third-party infrastructure used to securely process it, and your legal rights regarding your information under applicable Indian law, including the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                2. What Personal Data We Collect
              </h2>
              <p>
                We only collect personal information that is reasonably necessary to fulfill your real estate discovery and consultation enquiries. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contact Details:</strong> Your full name and phone number (collected when you submit an enquiry form or request a callback).
                </li>
                <li>
                  <strong>Enquiry Preferences:</strong> Property configurations of interest (e.g., 2 BHK, 3 BHK, penthouse), preferred localities in Thane, budget ranges, and any specific requirements you choose to share with our advisory team.
                </li>
                <li>
                  <strong>Technical &amp; Usage Data:</strong> Anonymized interaction metrics, device type, browser information, and referral sources collected via standard server logs and analytical cookies to maintain website stability and performance.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                3. How We Collect Your Information
              </h2>
              <p>We collect personal information directly from you through the following channels:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Website Enquiry Forms:</strong> Digital lead consultation forms embedded on our homepage and property detail sections.
                </li>
                <li>
                  <strong>WhatsApp Messaging Click-Throughs:</strong> Direct communication initiated by you through our interactive WhatsApp advisory button.
                </li>
                <li>
                  <strong>Direct Inbound Communications:</strong> Phone calls, SMS, or emails initiated by you using the contact details provided on our platform.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                4. Why We Collect and Use Your Data
              </h2>
              <p>The information collected is used exclusively for legitimate business and customer service purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your specific real estate enquiries and share accurate property brochures, floor plans, and pricing details.</li>
                <li>To coordinate Chauffeur-driven or accompanied site visits to developer project sales galleries across Thane.</li>
                <li>To contact you via phone call, SMS, or WhatsApp regarding your requested property consultations.</li>
                <li>To provide developer-direct price negotiations, payment milestone guidance, and zero-brokerage advisory services.</li>
                <li>To comply with regulatory audit requirements and preserve an accurate record of communications.</li>
              </ul>
              <p className="font-medium text-stone-900">
                We do not sell, rent, lease, or trade your personal information to third-party telemarketers, cold-call brokers, or unauthorized advertising networks.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                5. Third-Party Processors &amp; Data Sharing
              </h2>
              <p>
                Your information is accessible to authorized members of Brick N Beams&rsquo; internal advisory team. In operating our digital platforms, we utilize trusted third-party technology providers as data processors:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Supabase:</strong> Used as our managed database service to securely store and process lead form submissions and enquiry metadata. Data is hosted with industry-standard encryption protocols.
                </li>
                <li>
                  <strong>WhatsApp / Meta Platforms:</strong> When you initiate a chat through our WhatsApp interface, communications are transmitted through and governed by Meta&rsquo;s platform infrastructure and end-to-end encryption standards.
                </li>
                <li>
                  <strong>Real Estate Developers:</strong> Only upon your explicit request and confirmation to schedule a project site visit or lock in developer-direct pricing, your contact information may be shared with the authorized sales team of the respective developer for visitor registration.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                6. Data Retention Policy
              </h2>
              <p>
                We retain your personal data only for as long as is necessary to fulfill your property search, manage ongoing transactions or inquiries, or comply with statutory requirements under applicable Indian laws.
              </p>
              <p>
                If your enquiry concludes or you choose not to proceed with property acquisition, your lead information will be archived or securely deleted upon your request.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                7. Your Data Rights &amp; How to Exercise Them
              </h2>
              <p>
                Under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and established privacy principles, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to the personal data we hold about you.</li>
                <li>Request the correction or updating of any inaccurate or incomplete details.</li>
                <li>Request the erasure (deletion) of your personal data from our active databases.</li>
                <li>Withdraw your consent to receive real estate communications at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact our data grievance officer with your registered name and phone number at:
              </p>
              <div className="bg-[#faf8f5] border border-stone-200 rounded-xl p-4 sm:p-5 text-sm space-y-1">
                <p><strong>Entity:</strong> Brick N Beams</p>
                <p><strong>Email:</strong> [contact email]</p>
                <p><strong>Phone:</strong> [contact phone]</p>
                <p><strong>Address:</strong> [Brick N Beams registered address]</p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                8. Cookies &amp; Website Analytics
              </h2>
              <p>
                Our website may use standard session cookies and analytical technologies to monitor website traffic, evaluate visitor journeys, and enhance user experience.
              </p>
              <p className="text-stone-500 italic text-xs sm:text-sm">
                [Note: Web analytics integrations such as Google Analytics 4 or Meta Pixel are subject to final deployment configuration. Any tracking cookies deployed adhere to anonymized telemetry standards.]
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                9. Policy Updates
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect modifications in our operational practices, regulatory updates from Indian authorities, or enhancements in our technology infrastructure. Any revisions will be published on this page with an updated &ldquo;Last Updated&rdquo; timestamp.
              </p>
            </section>
          </div>

          {/* Back to Home CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#a01115] hover:text-[#850e12] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home Page</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
