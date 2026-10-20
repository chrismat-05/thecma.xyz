import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GraduationCap, Award, Code, Database, Globe, Palette, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionTitleReveal } from "@/components/ui/SectionTitleReveal";
import { ContactButton } from "@/components/ui/ContactButton";

export const AboutPage: React.FC = () => {
  const education = [
    {
      year: "2026 - 2028",
      institution: "Kristu Jayanti University",
      degree: "Master of Science in Cybersecurity",
      focus: "Advanced Cyber Threat Intelligence & Security Engineering",
    },
    {
      year: "2023 - 2026",
      institution: "Kristu Jayanti College",
      degree: "Bachelor of Computer Applications",
      focus: "Coding, systems, databases, web development etc. (First Class)",
    },
    {
      year: "2023",
      institution: "The Indian School, Kingdom of Bahrain",
      degree: "Higher Secondary Education",
      focus: "Commerce stream with Computer Science (79%)",
    },
    {
      year: "2021",
      institution: "The Indian School, Kingdom of Bahrain",
      degree: "Secondary Education",
      focus: "Foundational sciences, mathematics, general studies (81%)",
    },
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: ["TypeScript", "JavaScript", "Python", "VB.NET", "CSS3 / HTML5"],
    },
    {
      title: "Frameworks & 3D",
      icon: Globe,
      skills: ["React", "Three.js / WebGL", "Tailwind CSS", "Node.js", "Express.js"],
    },
    {
      title: "Databases & Cloud",
      icon: Database,
      skills: ["Supabase", "Firebase & Firestore", "PostgreSQL", "MongoDB Atlas", "SQL Server"],
    },
    {
      title: "Creative Tech & Studio",
      icon: Palette,
      skills: ["Motion Graphics", "Videography & Direction", "Figma Design Systems", "Sound Design"],
    },
  ];

  const certifications = [
    {
      title: "Salesforce Administrator Explorer",
      issuer: "Nasscom",
      date: "July 2025",
      link: "https://fsp-assessment-certificates.s3.ap-southeast-1.amazonaws.com/%27/s3/buckets/fsp-assessment-certificates%27/CHRIS%2BMATHEW%2BAJE_148550316.pdf.pdf",
    },
    {
      title: "Problem Solving",
      issuer: "HackerRank",
      date: "May 2025",
      link: "https://www.hackerrank.com/certificates/fbca630d6812",
    },
    {
      title: "REST API",
      issuer: "HackerRank",
      date: "May 2025",
      link: "https://www.hackerrank.com/certificates/7067cb8f76d2",
    },
    {
      title: "Securing MongoDB Atlas: Authentication & Authorization",
      issuer: "MongoDB",
      date: "May 2025",
      link: "https://www.credly.com/badges/d42ba4a5-27fa-4bbb-ae5f-5b87323f3b2e/linked_in_profile",
    },
    {
      title: "Securing MongoDB Self-Managed: Authentication & Authorization",
      issuer: "MongoDB",
      date: "May 2025",
      link: "https://www.credly.com/badges/f0b99dd0-aabf-48a3-8eed-02a0b1ec833a/linked_in_profile",
    },
    {
      title: "Ethical Hacking",
      issuer: "NSDC Academy & Internshala",
      date: "March 2025",
      link: "https://trainings.internshala.com/s/v/3610844/1c4beaba",
    },
    {
      title: "Digital Engineering",
      issuer: "Nasscom",
      date: "October 2023",
      link: "https://fsp-assessment-certificates.s3-ap-southeast-1.amazonaws.com/ChrisMathewAje-124647283.pdf",
    },
    {
      title: "Get started with Figma",
      issuer: "Coursera",
      date: "October 2023",
      link: "https://www.coursera.org/account/accomplishments/verify/KG4BZ57MXM64",
    },
    {
      title: "Work with Components in Figma",
      issuer: "Coursera",
      date: "October 2023",
      link: "https://www.coursera.org/account/accomplishments/verify/JPM7L2GU3CGM",
    },
    {
      title: "HTML",
      issuer: "University of Michigan",
      date: "April 2023",
      link: "https://www.coursera.org/account/accomplishments/verify/45YW8F3CQXG2",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white selection:bg-white selection:text-black">
      <Navigation />

      <main className="container mx-auto px-4 max-w-6xl pt-36 pb-28">
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            data-cursor="button"
          >
            <ArrowLeft size={16} />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        <SectionTitleReveal
          title="About The Engineer."
          subtitle="A comprehensive compilation of academic milestones, cybersecurity depth, technical skill stacks, and certified credentials."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="relative group">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-white/20 bg-neutral-900/60 p-2 backdrop-blur-xl shadow-2xl shadow-black/80">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img
                    src="/media/cover.png"
                    alt="Chris Mathew Aje"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              <div className="absolute -bottom-3 left-6 sm:left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/90 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-neutral-300">Bengaluru, India</span>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black tracking-tight text-white">Chris Mathew Aje</h3>
              <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest mt-1">
                Full-Stack Engineer & Creative Designer
              </p>
            </div>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Cybersecurity student and creative developer bridging technical resilience with cinematic UI/UX. Passionate about privacy, zero-knowledge mechanics, and modern WebGL digital systems.
            </p>

            <div className="pt-4">
              <ContactButton label="Initiate Contact" href="mailto:chrismaje05@gmail.com" isScroll={false} />
            </div>
          </div>

          {/* Right Column: Narrative + Milestones */}
          <div className="lg:col-span-7 space-y-12">
            {/* 1. Philosophy */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/[0.08] backdrop-blur-sm space-y-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                01 // What I believe
              </span>
              <h4 className="text-2xl font-bold text-white tracking-tight">
                Creativity and technology go hand-in-hand.
              </h4>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                I enjoy digging into tech, discovering, and building solutions that work well to suit real needs—whether that's full-stack web platforms, backend architectures, or security utilities, figuring out how to make complex systems simpler and smoother.
              </p>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                But I'm not all code and logic. I have a deep passion for visual design, typography, color harmony, and cinematic motion. I look into the fine details of how an interface feels, striving to build digital experiences that feel fresh, intentional, and reflective of genuine personality.
              </p>
            </div>

            {/* 2. Education */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/[0.08] backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <GraduationCap size={20} />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Academic Background
                </h4>
              </div>

              <div className="space-y-6 divide-y divide-white/[0.06]">
                {education.map((item, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-5" : ""}>
                    <div className="flex justify-between items-baseline">
                      <h5 className="font-semibold text-white text-base">{item.degree}</h5>
                      <span className="text-xs font-mono text-neutral-400">{item.year}</span>
                    </div>
                    <p className="text-neutral-400 text-sm mt-0.5">{item.institution}</p>
                    <p className="text-neutral-500 text-xs mt-1 font-mono">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Skills */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/[0.08] backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Code size={20} />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Skills & Technical Domains
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {skillCategories.map((category, idx) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-neutral-400" />
                        <h6 className="font-semibold text-white text-sm">{category.title}</h6>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {category.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Certifications */}
            <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/[0.08] backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                  <Award size={20} />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  Verified Certifications
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((cert, idx) => (
                  <a
                    key={idx}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/30 transition-all duration-200 flex flex-col justify-between group"
                    data-cursor="button"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-semibold text-xs text-white group-hover:text-white line-clamp-2">
                          {cert.title}
                        </span>
                        <ExternalLink
                          size={13}
                          className="text-neutral-500 group-hover:text-white shrink-0 mt-0.5"
                        />
                      </div>
                      <p className="text-[11px] text-neutral-400">{cert.issuer}</p>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 mt-3 block">
                      {cert.date}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
