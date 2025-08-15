No backend at all. Frontend only.
A dark-themed, sleek, and cinematic one-page portfolio with scroll-triggered animations, animated navigation, interactive hover effects, and fluid transitions.
Every section is self-contained in a component, imported into a single App.jsx, keeping code clean and modular.


We’ll keep contrast high and colors punchy against black:
Background: #000000 (Black)
Primary Accent: #14B8A6 (Teal 400)
Secondary Accent: #0D9488 (Teal 600 / Tar)
Highlight: #94A3B8 (Slate 400)
Text: #E5E7EB (Gray 200) and #FFFFFF (Pure White)

Use lucide icons for everything.. use lottie files animations.

🏗 Tech Stack
NextJS
Language: TypeScript
Styling: Tailwind CSS
Animations: Framer Motion (for component-level animations, staggering, transitions)
Scroll Animations: framer-motion’s useInView + custom hooks for reveal
Icons: Heroicons or Lucide React
Type Effects: react-simple-typewriter or react-type-animation
Smooth Scroll: Native scroll-behavior + react-scroll

Sections & Their Purpose
1. Navigation Bar
Type: Sticky top navigation with transparent background → solid on scroll.
Desktop: Horizontal nav links with hover underline animation.
Mobile: Hamburger menu sliding in from left (animated drawer).
Extras: Smooth scroll to sections, active link highlight.

2. Hero Section (Full-Screen)
Purpose: Instantly introduce you and your personal brand.
Layout: Centered text + animated role list + 2 CTA buttons.

Animations:
Text fades in from top
Roles stagger in one by one
Buttons slide in with scale-up effect

Optional Flair:
Floating particle background
Subtle moving gradient blob behind text

3. About Section
Purpose: Personal story + image + personality
Layout: Two-column: left (animated profile image), right (animated text)

Animations:
Image slides in from left
Text fades in from right
On mobile, stacked with smooth fade transitions

4. Skills Section

Purpose: Show tech stack visually
Layout: Grid of icons
Animations:
Hover tilt effect on each skill card
Appear with staggered fade-up animation

5. Projects Section

Purpose: Showcase your work
Layout:
Project cards with image slideshow, title, short desc, tags for each.

Animations:
Cards fade up in stagger when scrolling into view
Hover reveal overlay with project details + link buttons

6. Contact Section

Purpose: Let people connect with you
Layout:
Animated form (name, email, message)
Social icons with hover glow

Animations:
Inputs slide in sequentially
Success animation on submit (green check mark popping in)

7. Footer

Purpose: Wrap-up with quick links & copyright
Layout:
Small, clean text
Minimal hover animations on links

Animation Style Summary
Section Entrance: Fade + translate (Framer Motion)
Text: Stagger reveal
Buttons: Scale hover + gradient shift
Images: Parallax effect on scroll
Nav Links: Underline grow animation on hover
Mobile Menu: Slide-in from side with opacity fade

Responsiveness
Mobile First: Sections stack vertically, padding adjusted for smaller screens
Tablet: 2-column layouts where applicable
Desktop: Max-width containers to avoid overly wide text

Content
Hero Section
<hello world>
I'm Chris Mathew Aje
Bridging tech & creativity - one step at a time
Typewrite effect things: Aspiring Software Developer, BCA Student, Ethical Hacking Explorer, Videographer, Tech Enthusiast, Filmmaker


About Me
BCA student passionate about technology, problem-solving and innovation. Eager to learn and apply skills in a professional setting while continuously expanding knowledge in the field.

Certifications (cards, there'll be many more to be added..)
Ethical Hacking
NSDC Academy & Internshala
Issued March 2025 · No Expiration

Digital Engineering
Nasscom
Issued Oct 2023 · No Expiration

HTML
University of Michigan
Issued Apr 2023 · No Expiration

Education (timeline format)
2023 - Present
Kristu Jayanti College
Bachelor of Computer Applications
Coursework includes Data Structures, Database Systems, Programming languages and Software Engineering.

2023
The Indian School, Kingdom of Bahrain
Higher Secondary Education
Focus on Commerce stream with Computer Science as elective. Achieved 79% in final examinations.

2021
The Indian School, Kingdom of Bahrain
Secondary Education
Achieved 81% in final examinations.

Languages, Frameworks
- HTML, CSS, JavaScript, TypeScript, Python, VB.Net
- React, Node.js
- CSS3, Tailwind CSS, Framer Motion

Social Links
https://github.com/chrismat-05
https://www.linkedin.com/in/chrismaje/
https://wa.me/+918848914245
mailto:chrismaje63@gmail.com
https://www.credly.com/users/chrismaje

Projects
Name: forms.thecma.xyz
Tags: 🗂️Major Project, 🧪Testing
Built with HTML, CSS, JavaScript, and formBuilder.js, the platform enables users to create, preview, and share customizable forms with themes, analytics, and export options. Data is securely handled using Firebase Auth and Firestore, while responses are managed through a custom-built interface supporting sheet view, graph view, and individual response view. Export options include CSV, Excel, and PDF formats using SheetJS and jsPDF. Hosted on Netlify with code managed on GitHub, the tool empowers users with complete control over form creation and response management; without relying on third-party integrations.
https://forms.thecma.xyz/

Quotzy
📄Minor Project
📦Package
🌐Open Source
Quotzy is a fully open-source quote generator built as both a CLI tool and a JS module. It features handpicked quotes across six diverse categories: Movies, Bible Verses, Fun, Christian, Deep, and Inspirational. Quotzy supports both terminal-based use and programmatic integration. Published to npm and GitHub Packages, with automated CI/CD using GitHub Actions.
Check out the Repo for install and setup instructions.
https://github.com/chrismat-05/quotzy

SecuriHeader
📄Minor Project
🟢Live
🌐Open Source
A tool that analyzes the HTTP response headers of any website and checks for missing or misconfigured security-related headers like X-Frame-Options, Content-Security-Policy, and more. Ideal for developers and security-conscious users looking to audit basic web hygiene.
Clean interface, instant results.
https://scrihdr.thecma.xyz/

Req API
📄Minor Project
🟢Live
🌐Open Source
A lightweight, developer-friendly API request debugger built using React, Tailwind CSS, Axios, and Framer Motion. It allows users to test HTTP methods like GET, POST, PUT, and DELETE by entering a URL, headers, and body, and instantly viewing a formatted response with status, headers, and even the time taken. Designed with an animated UI and no login or tracking, it's fully open source and perfect for developers who need a fast, focused tool to inspect APIs on the go.
https://reqapi.thecma.xyz/

theCMA.xyz (v1)
📄Minor Project
🟢Live
theCMA.xyz – My personal portfolio website, built primarily with HTML5, CSS3, and a touch of JavaScript for interactivity. It's a fully static site hosted on GitHub Pages with a custom domain. theCMA.xyz showcases my tech projects, creative work, and personal milestones, all in one evolving space.
https://thecma.xyz/

AMC
🟢Live
🌐Open Source
🎓 College project
A user-friendly Annual Maintenance Contract (AMC) Management System built using VB.NET and SQL Server 2022. It streamlines contract, client, asset, and service request management with secure login roles, intuitive dashboards, and admin reporting; enhancing efficiency for individuals or teams managing multiple maintenance contracts.
https://github.com/chrismat-05/AMC