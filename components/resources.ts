// ----------------------------------------------------------------
// Resources / "reads" content.
//
// This is the single source of truth for the Resources section and the
// /resources article pages. Each article is plain, honest content — no
// client names or unverified benchmarks (we're pre-launch). To add a new
// read, append an Article here; the index page and [slug] page pick it up
// automatically, and the homepage Blog teaser shows the first three.
// ----------------------------------------------------------------

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Article {
  slug: string;
  tag: string;
  title: string;
  desc: string; // one-line excerpt used on cards + meta description
  time: string; // read time
  date: string; // ISO date for sorting / structured data
  dateLabel: string; // human-friendly date
  color: string; // card/header gradient
  body: Block[];
}

export const ARTICLES: Article[] = [
  {
    slug: "why-we-built-on-paper",
    tag: "Product",
    title: "Why we built Adicare on paper, not screens",
    desc: "The OPD is the last room screens haven't disrupted — for good reason. Here's how we got around it.",
    time: "6 min read",
    date: "2026-05-12",
    dateLabel: "May 12, 2026",
    color: "linear-gradient(135deg, #fff5f3 0%, #ffd9cd 100%)",
    body: [
      {
        type: "p",
        text: "Walk into any busy outpatient department in India and you'll notice something: the screen, if there is one, is usually facing away from the patient. The real work happens on paper. The doctor listens, glances up, and writes — a few lines in a script that's half English, half shorthand, half muscle memory. It takes seconds. It never crashes. It works in any language, with no login.",
      },
      {
        type: "p",
        text: "For two decades, health tech has tried to replace that moment with a form. Drop-downs, mandatory fields, a keyboard between the doctor and the person in front of them. It's why so many EMRs are quietly hated by the people forced to use them. The software optimised for the database, not for the consultation.",
      },
      {
        type: "h2",
        text: "The pen was never the problem",
      },
      {
        type: "p",
        text: "We started Adicare with a stubborn belief: the doctor shouldn't have to change how they practise so the computer can keep up. The fastest, most natural interface in the room is already in their hand. The job of technology is to capture what's written — accurately — and do everything downstream automatically.",
      },
      {
        type: "p",
        text: "So instead of asking doctors to type, the Adicare Rx-01 smart prescription pad lets them write the way they always have. The strokes are captured digitally as they happen. The handwriting stays handwriting — for the patient and the pharmacy — while a structured, searchable record is built in the background.",
      },
      {
        type: "h2",
        text: "What you get for free when you start from the pen",
      },
      {
        type: "list",
        items: [
          "Zero workflow change — the consultation looks and feels exactly the same to the doctor and the patient.",
          "A digital record for every visit, without a single form being filled.",
          "Safety checks that run quietly in the background, surfacing only when something needs attention.",
          "A prescription the patient can carry home on paper and also keep in their phone.",
        ],
      },
      {
        type: "quote",
        text: "The best interface is the one the doctor already trusts. Our job is to make it smarter, not to replace it.",
      },
      {
        type: "p",
        text: "Screens have their place — for reviewing records, reading reports, planning follow-ups. But the moment of writing a prescription belongs to the pen. Building around that, rather than against it, is the whole idea behind Adicare.",
      },
    ],
  },
  {
    slug: "teaching-ai-to-read-handwriting",
    tag: "Research",
    title: "Teaching AI to read a doctor's handwriting",
    desc: "Indian prescriptions are multilingual, abbreviated, and famously hard to read. Here's how we think about ICR.",
    time: "9 min read",
    date: "2026-04-28",
    dateLabel: "April 28, 2026",
    color: "linear-gradient(135deg, #f3f5fd 0%, #d6dcf5 100%)",
    body: [
      {
        type: "p",
        text: "\"Doctor's handwriting\" is a punchline for a reason. But there's a real engineering problem hiding inside the joke — and it's much harder in India than the textbook version of handwriting recognition you'll find in a research paper.",
      },
      {
        type: "h2",
        text: "Why Indian prescriptions are hard",
      },
      {
        type: "list",
        items: [
          "Languages mix mid-line — a drug name in English, a dosage instruction in Hindi or Tamil, a note in shorthand.",
          "Abbreviations are everywhere and aren't standardised: 'OD', 'BD', 'HS', 'x5d', '1-0-1' all carry meaning a model has to learn.",
          "Drug names are long, similar-looking, and easy to confuse — a misread can be dangerous, not just wrong.",
          "Every doctor writes differently, and the same doctor writes differently when they're in a hurry.",
        ],
      },
      {
        type: "p",
        text: "Intelligent Character Recognition (ICR) is the umbrella term for turning handwriting into structured text. Off-the-shelf OCR isn't built for this. It expects printed characters, a single language, and clean lines. A prescription gives it none of those.",
      },
      {
        type: "h2",
        text: "Capturing strokes, not just pixels",
      },
      {
        type: "p",
        text: "Because the Rx-01 pad captures writing as it happens, we don't only get a picture of the finished prescription — we get the strokes: the order, direction, and timing of each pen movement. That signal is enormously helpful. Two letters that look identical as static images often look very different as a sequence of movements. Starting from strokes rather than pixels gives the model a head start.",
      },
      {
        type: "h2",
        text: "Why safety comes before accuracy",
      },
      {
        type: "p",
        text: "It's tempting to chase a single accuracy number. We think that framing is misleading on its own. A model that's right most of the time but confidently wrong on a look-alike drug name is worse than one that knows when to ask. So we care less about a headline percentage and more about calibrated confidence — the system should know what it doesn't know.",
      },
      {
        type: "quote",
        text: "The goal isn't a model that's always right. It's a model that's never confidently wrong about something dangerous.",
      },
      {
        type: "p",
        text: "When confidence is low, Adicare doesn't guess silently. It flags the line for a quick confirmation. When it's reading a drug-and-dose pair, it cross-checks against known interactions and dosing ranges before anything is finalised. The handwriting on the page is never altered — the doctor remains in control of what's prescribed.",
      },
      {
        type: "p",
        text: "We're still early, and we'll publish real numbers when they're earned and independently meaningful. Until then, the honest version is this: reading Indian clinical handwriting reliably is a genuinely hard problem, and we'd rather get the safety architecture right first.",
      },
    ],
  },
  {
    slug: "designing-for-the-indian-opd",
    tag: "Field notes",
    title: "Designing Adicare for the Indian OPD",
    desc: "High volume, short consults, many languages. What it takes to build software that survives a real outpatient department.",
    time: "12 min read",
    date: "2026-03-19",
    dateLabel: "March 19, 2026",
    color: "linear-gradient(135deg, #f0f9f4 0%, #c8eada 100%)",
    body: [
      {
        type: "p",
        text: "An Indian outpatient department is one of the most demanding software environments we've ever designed for. Not because of edge cases — because of the average case. High patient volume, very short consultations, multiple languages in the same waiting room, and connectivity that comes and goes. Software that assumes a calm desk and a stable connection simply doesn't survive here.",
      },
      {
        type: "h2",
        text: "Design under real constraints",
      },
      {
        type: "p",
        text: "When a doctor may see dozens of patients in a session, every second of friction is multiplied. A two-second delay per prescription isn't a UX nitpick — it's minutes lost across a day, and patients still waiting outside. So our first design rule is brutal: nothing the doctor does should get slower because Adicare is in the room.",
      },
      {
        type: "list",
        items: [
          "Time per consult is short — the tool has to keep pace with the pen, not interrupt it.",
          "Connectivity is unreliable — the system has to keep working offline and sync when it can.",
          "Many languages coexist — instructions, reminders, and records have to meet patients where they are.",
          "The front desk is overloaded — anything we can automate (reminders, refills, records) buys back real time.",
        ],
      },
      {
        type: "h2",
        text: "Offline is the default, not the fallback",
      },
      {
        type: "p",
        text: "We treat patchy connectivity as the normal condition. The pad and the app are built to function fully without a network and reconcile later. A dropped connection should never mean a dropped prescription. This single decision shapes a surprising amount of the architecture — and it's non-negotiable for the settings we're building for.",
      },
      {
        type: "h2",
        text: "Giving time back to the front desk",
      },
      {
        type: "p",
        text: "The doctor's room is only half the OPD. The other half is the front desk — appointments, follow-up calls, refill requests, lost reports. A lot of that is repetitive work that quietly eats the day. Pushing prescriptions, reminders, and records to patients automatically over channels they already use takes that load off people who are stretched thin.",
      },
      {
        type: "quote",
        text: "If the software only helps the doctor and ignores the queue outside the door, it hasn't really helped the clinic.",
      },
      {
        type: "h2",
        text: "Meeting patients in their language",
      },
      {
        type: "p",
        text: "A reminder a patient can't read is a reminder that doesn't work. Records and instructions that land in the patient's own language aren't a nice-to-have in India — they're the difference between a prescription being followed and being misunderstood. Multilingual support is built into the foundation, not bolted on at the end.",
      },
      {
        type: "p",
        text: "We're writing these down as field notes rather than conclusions. The OPD has a way of humbling assumptions, and we expect to keep revising as we learn from real practices. But the principles above — keep pace with the pen, assume no network, give the front desk its time back, meet patients in their language — are the ones we keep coming back to.",
      },
    ],
  },
];

export const getArticle = (slug: string): Article | undefined =>
  ARTICLES.find((a) => a.slug === slug);
