import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, ChevronRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Brick N Beams",
  description:
    "Important legal disclaimer regarding property images, indicative pricing, MahaRERA project verification, and real estate advisory services for Brick N Beams.",
};

export default function DisclaimerPage() {
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
            <span className="text-stone-900">Disclaimer</span>
          </nav>

          {/* Header Title Section */}
          <div className="mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium font-sans tracking-wider uppercase bg-[#a01115]/10 text-[#a01115] border border-[#a01115]/20 backdrop-blur-xs mb-4">
              <AlertCircle className="w-3.5 h-3.5 text-[#a01115]" />
              Regulatory &amp; Advisory Notice
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-stone-900 tracking-tight">
              Disclaimer
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
                1. General Information Purpose
              </h2>
              <p>
                The information, visual assets, property descriptions, and promotional literature published on this website are provided by Brick N Beams for general guidance, initial exploration, and marketing discovery purposes only.
              </p>
              <p>
                Nothing contained on this website constitutes a formal offer, guarantee, legal contract, or binding warranty from Brick N Beams or any associated property developer.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                2. Visual Media &amp; Artistic Impressions
              </h2>
              <p>
                All photographs, walkthrough videos, 3D computer-generated renderings, elevation graphics, architectural models, sample flat interiors, landscaping diagrams, and floor layouts displayed across this platform are <strong>artist impressions and conceptual visualizations</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Actual physical properties, tower views, materials, fixtures, fittings, and exterior finishes may differ substantially upon final construction and delivery.</li>
                <li>Furniture, decorative items, appliances, and modular upgrades shown in mockups or sample apartments are illustrative and are generally not included in standard apartment handovers unless explicitly mentioned in the builder-buyer agreement.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                3. Indicative Pricing &amp; Specification Variations
              </h2>
              <p>
                Pricing figures (including starting prices, cost sheets, and payment schemes), carpet areas, floor rise additions, clubhouse charges, maintenance fees, and government taxes (such as GST, Stamp Duty, and Registration) quoted on this site are <strong>strictly indicative</strong> and subject to revision by the developers without prior notification.
              </p>
              <p>
                The final sale consideration and detailed payment milestone terms will be governed entirely by the formal agreement for sale executed directly between the buyer and the developer.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                4. No Guarantee of Property Availability
              </h2>
              <p>
                Real estate inventory across prominent Thane developments fluctuates continuously. Mention of a specific unit type, floor configuration, or tower phase on this platform does not guarantee that such unit remains vacant or available at the time of your enquiry or site visit.
              </p>
              <p>
                Unit allotments and live inventory access must be validated directly through our advisory team at the developer sales gallery.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                5. MahaRERA Verification Disclaimer
              </h2>
              <p>
                Under the Real Estate (Regulation and Development) Act, 2016 (RERA) and rules framed by the <strong>Maharashtra Real Estate Regulatory Authority (MahaRERA)</strong>, all real estate projects and channel partners must hold valid regulatory registrations.
              </p>
              <div className="bg-[#faf8f5] border border-amber-200/80 rounded-xl p-4 sm:p-5 space-y-2 text-stone-800">
                <p className="font-semibold text-stone-900">
                  Important Buyer Advisory:
                </p>
                <p>
                  While Brick N Beams facilitates discovery and coordinates developer-direct transactions for verified landmarks, prospective buyers are strongly advised to independently verify all project registration credentials, approved layout plans, sanctioned FSI, promoter legal disclosures, and projected completion dates by visiting the official MahaRERA website:
                </p>
                <p>
                  <a
                    href="https://maharera.maharashtra.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#a01115] font-medium underline hover:text-[#850e12] transition-colors"
                  >
                    https://maharera.maharashtra.gov.in
                  </a>
                </p>
                <p className="text-xs text-stone-500 pt-1">
                  Brick N Beams Channel Partner RERA Registration: <strong>[MahaRERA number, if applicable]</strong>
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                6. Not Legal, Tax, or Financial Advice
              </h2>
              <p>
                Content, rental yield projections, capital appreciation models, and tax estimations provided on this website are shared solely for illustrative analysis and discussion.
              </p>
              <p>
                They do not constitute professional financial advice, chartered accountancy, legal title opinions, or investment underwriting. Every buyer and investor must independently consult certified advocates, legal counsels, and chartered accountants before executing transactions or committing financial deposits.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tracking-tight">
                7. Contact for Verifications
              </h2>
              <p>
                If you have specific questions or wish to cross-verify any project disclosure or brochure specification, please contact our team:
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
