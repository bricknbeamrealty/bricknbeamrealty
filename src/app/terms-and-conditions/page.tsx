import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Brick N Beams",
  description:
    "Terms and Conditions governing the use of the Brick N Beams real estate advisory website and discovery services in Thane, Maharashtra.",
};

export default function TermsAndConditionsPage() {
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
            <span className="text-stone-900">Terms &amp; Conditions</span>
          </nav>

          {/* Header Title Section */}
          <div className="mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium font-sans tracking-wider uppercase bg-[#a01115]/10 text-[#a01115] border border-[#a01115]/20 backdrop-blur-xs mb-4">
              <Scale className="w-3.5 h-3.5 text-[#a01115]" />
              Terms of Use &amp; Service
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-stone-500">
              Last Updated: October 2026
            </p>
          </div>

          {/* Legal Content Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-stone-200/80 rounded-2xl p-6 sm:p-10 md:p-12 shadow-xs space-y-10 text-stone-700 leading-relaxed text-sm sm:text-base">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p>
                Welcome to Brick N Beams (&ldquo;Brick N Beams,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing, browsing, or utilizing this website, requesting consultations, or submitting enquiry forms, you acknowledge that you have read, understood, and agreed to be bound by these Terms &amp; Conditions.
              </p>
              <p>
                If you do not agree to these terms, please discontinue the use of this website immediately.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                2. Nature of Service: Broker / Advisory Facilitator
              </h2>
              <p>
                Brick N Beams operates strictly as an independent real estate advisory firm, channel partner, and transaction facilitator.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Not a Developer or Property Owner:</strong> Brick N Beams is not the developer, builder, constructor, promoter, or legal owner of any real estate projects featured on this platform.
                </li>
                <li>
                  <strong>Discovery &amp; Consultation Platform:</strong> This website is an informational discovery and advisory platform intended to help prospective buyers explore residential developments across Thane. It does not constitute a binding transactional platform, and real estate purchases cannot be completed directly through this website.
                </li>
                <li>
                  <strong>Direct Verification Required:</strong> All property transactions are executed directly between the purchaser and the respective authorized builder/developer through formal legal agreements.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                3. Listing Accuracy &amp; Project Details
              </h2>
              <p>
                While we make reasonable efforts to curate accurate, up-to-date information regarding projects, floor plans, carpet areas, pricing, and amenities in Thane:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  All details, configurations, base prices, floor rises, parking allocations, and availability schedules are determined by the respective developers and are subject to change without prior notice.
                </li>
                <li>
                  Images, architectural visualizations, 3D renderings, floor layouts, and maps displayed on this website are illustrative and artistic impressions.
                </li>
                <li>
                  Users must verify all project specifications, payment schedules, sanctions, and title documents directly with our advisors and the developer&rsquo;s official sales team prior to executing any booking or financial commitment.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                4. User Conduct &amp; Acceptable Use
              </h2>
              <p>When using our website, enquiry forms, and WhatsApp channels, you agree that you will not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit false, fraudulent, deceptive, or misleading names, contact numbers, or property requests.</li>
                <li>Deploy automated bots, scrapers, data-mining scripts, or extraction crawlers to capture content or listings from this website.</li>
                <li>Transmit malicious code, viruses, or disruptive scripts that impair the functionality of the website or connected server infrastructure.</li>
                <li>Use contact forms to send unsolicited commercial solicitations, spam, promotional pitches, or non-real-estate materials.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                5. Intellectual Property
              </h2>
              <p>
                All content published on this website—including proprietary branding, logos, graphics, text layouts, page designs, software code, and curated marketing materials—is the exclusive intellectual property of Brick N Beams or used under permission from respective project developers.
              </p>
              <p>
                Unauthorized copying, reproduction, distribution, republishing, or commercial exploitation of any site content without prior written permission from Brick N Beams is strictly prohibited.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                6. Third-Party Links &amp; Services
              </h2>
              <p>
                Our platform may contain links or embeds directing to external third-party websites, including official MahaRERA verification portals, banking institutions for home loans, or mapping platforms.
              </p>
              <p>
                These links are provided purely as a convenience. Brick N Beams does not control, endorse, or assume responsibility for the content, privacy practices, terms of service, or operations of any third-party websites.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                7. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable Indian law, Brick N Beams, its founders, advisors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your access to, use of, or inability to access or use this website.</li>
                <li>Any purchasing or investment decisions made solely in reliance on information or content presented on this website without independent verification and formal advisory consultation.</li>
                <li>Any delays, construction milestones, title defects, or contractual defaults attributable to third-party developers, builders, or financial institutions.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                8. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms &amp; Conditions shall be governed by, construed, and enforced in accordance with the laws of the Republic of India.
              </p>
              <p>
                Any dispute, claim, or controversy arising out of or relating to the use of this website or our advisory services shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>Thane / Maharashtra, India</strong>.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                9. Contact Information
              </h2>
              <p>
                For questions, clarifications, or feedback concerning these Terms &amp; Conditions, please reach out to our legal and advisory desk:
              </p>
              <div className="bg-[#faf8f5] border border-stone-200 rounded-xl p-4 sm:p-5 text-sm space-y-1">
                <p><strong>Entity:</strong> Brick N Beams</p>
                <p><strong>Email:</strong> [contact email]</p>
                <p><strong>Phone:</strong> [contact phone]</p>
                <p><strong>Address:</strong> [Brick N Beams registered address]</p>
              </div>
            </section>
          </div>

          {/* Back to Home CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold font-sans text-[#a01115] hover:text-[#850e12] transition-colors"
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
