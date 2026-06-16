import { AnnouncementBar, Nav, Hero, TrustBar } from "../components/Header";
import { ProductSuite, CDSS } from "../components/ProductSuite";
import { ForDoctors } from "../components/ForDoctors";
import { Features } from "../components/Features";
import { AIDemo } from "../components/AIDemo";
import { PatientApp } from "../components/PatientApp";
import { Stats, Testimonials, Integrations, Certifications, Blog } from "../components/Sections";
import { FinalCTA, Footer } from "../components/Footer";

// NOTE (early stage): we don't have real customers or compliance
// certifications yet, so the sections that claim them are commented out
// below. Re-enable each one once it's backed by something real:
//   <TrustBar />       — partner / hospital logos      (needs real clients)
//   <Stats />          — waitlist / pilot-clinic counts (needs real traction)
//   <Testimonials />   — named doctor quotes            (needs real customers)
//   <Certifications /> — ABDM / FHIR / HIPAA / DPDP / AWS (needs real audits)
// The component code is untouched — just uncomment the line to bring it back.

export default function Home() {
  // Suppress "unused import" lint while these are parked for re-enable.
  void TrustBar;
  void Stats;
  void Testimonials;
  void Certifications;

  return (
    <>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        {/* <TrustBar />  — re-enable when we have real partner/client logos */}
        <ProductSuite />
        <CDSS />
        <ForDoctors />
        <Features />
        <AIDemo />
        <PatientApp />
        {/* <Stats />  — re-enable when waitlist / pilot-clinic numbers are real */}
        {/* <Testimonials />  — re-enable when we have real customer testimonials */}
        <Integrations />
        {/* <Certifications />  — re-enable once ABDM / FHIR / HIPAA / DPDP / AWS are actually in place */}
        <Blog />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
