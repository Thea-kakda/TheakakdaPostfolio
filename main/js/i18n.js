/* ============================================================
   i18n.js — English / Khmer language system (Portfolio V3)
   - Auto-detects browser language, persists in localStorage.
   - Translates [data-i18n] (text), [data-i18n-placeholder],
     [data-i18n-aria-label] and [data-i18n-title].
   - Missing keys fall back to English so nothing goes blank.
   - Technology / product names are intentionally untranslated.
   ============================================================ */
(function () {
  "use strict";

  var translations = {
    en: {
      /* nav + a11y */
      "nav.about": "About", "nav.stats": "Stats", "nav.skills": "Skills",
      "nav.dashboard": "Dashboard", "nav.experience": "Experience", "nav.education": "Education",
      "nav.certificates": "Certificates", "nav.projects": "Projects", "nav.tech": "Tech Stack",
      "nav.ai": "AI Assistant", "nav.contact": "Contact",
      "a11y.skip": "Skip to content",
      "lang.label": "Language", "lang.switch": "Select language",
      "nav.primary": "Primary", "nav.mobile": "Mobile",
      "menu.open": "Open navigation menu", "menu.close": "Close navigation menu",

      /* hero */
      "hero.status": "Open for Freelance & Internships",
      "hero.role1": "Full Stack Developer", "hero.role2": "Database Designer",
      "hero.role3": "Network Engineer", "hero.role4": "ERP System Developer",
      "hero.tagline": "Building scalable software, enterprise systems, network solutions, and AI-assisted applications.",
      "hero.cta1": "View Projects", "hero.cta2": "Contact Me", "hero.cta3": "Download CV",
      "hero.portrait.alt": "Portrait of Thea Kakda", "hero.roles": "Professional roles",

      /* about */
      "about.card1.title": "Software Developer & Systems Thinker",
      "about.card1.p1": "Highly motivated and detail-oriented Software Developer with knowledge in Web Development, Java Programming, Database Design and ERP Systems. Experienced building responsive web applications using HTML, CSS, JavaScript, PHP, Laravel, MySQL, PostgreSQL and SQL Server.",
      "about.card1.p2": "Currently studying Java, Spring Boot, Database Modeling & Analysis and Enterprise Software Development. Skilled in Database Modeling (Conceptual, Logical, Physical), ERD Design, Normalization, SQL Query Optimization and System Analysis.",
      "about.card2.title": "Quick Info",

      /* stats */
      "stats.projects": "Projects", "stats.certs": "Certificates", "stats.tech": "Technologies", "stats.education": "Education",
      "stats.note.projects": "counted from Projects below",
      "stats.note.certs": "9 source cards, 1 duplicate CCNA removed",
      "stats.note.tech": "listed in Skills & Tech Stack",
      "stats.note.education": "High School · RUPP · ETEC · JomNumtech",

      /* skills */
      "skills.title": "Skills",
      "skills.frontend": "Frontend", "skills.backend": "Backend", "skills.database": "Database",
      "skills.networking": "Networking", "skills.design": "Design", "skills.aitools": "AI Tools",

      /* dashboard */
      "dashboard.title": "Developer Dashboard",
      "dashboard.lead": "Visual summary of the data already published on this page. Chart.js loads only when this section enters the viewport.",
      "dashboard.chart.skills": "Skill Distribution", "dashboard.chart.certs": "Certificates by Category",
      "dashboard.chart.tech": "Technology Mentions", "dashboard.chart.timeline": "Learning Timeline",
      "dashboard.note.illustrative": "Illustrative values – not measured proficiency",
      "dashboard.note.certcounts": "Counts derived from the certificate gallery below",
      "dashboard.note.techmentions": "Portfolio mentions, not proficiency",
      "dashboard.note.timeline": "Years taken only from Education & Experience entries",
      "dashboard.chart.skills.aria": "Radar chart of skill areas using illustrative, non-measured values",
      "dashboard.chart.certs.aria": "Doughnut chart of certificates grouped by domain",
      "dashboard.chart.tech.aria": "Horizontal bar chart of confirmed technologies",
      "dashboard.chart.timeline.aria": "Timeline of education and experience by year",
      "dashboard.activity": "Assistant Activity",
      "dashboard.activity.q": "Questions this session:", "dashboard.activity.topics": "Common topics:",
      "dashboard.activity.note": "Local session only. No tracking, no cookies, nothing stored or sent.",
      /* chart labels */
      "chart.radar.ai": "AI", "chart.radar.dataset": "Illustrative",
      "chart.certs.other": "Other", "chart.tech.dataset": "Portfolio mentions (not proficiency)",
      "chart.timeline.hs": "High School",

      /* experience */
      "experience.title": "Projects & School Experience",
      "experience.smartCoffee.title": "Full-Stack Developer — Smart Coffee & Bakery ERP",
      "experience.smartCoffee.org": "Personal Software Development Project",
      "experience.smartCoffee.point1": "Developing a coffee shop and bakery management system using Spring Boot, Next.js, React, and PostgreSQL.",
      "experience.smartCoffee.point2": "Building REST APIs, authentication, product management, inventory features, and role-based access control.",
      "experience.smartCoffee.point3": "Developing the management dashboard, staff POS tablet, and customer storefront.",
      "experience.inventory.title": "Java Developer — Inventory Management System",
      "experience.inventory.org": "Personal Java Project",
      "experience.inventory.point1": "Developed a Java console application for managing products, categories, stock quantities, and transactions.",
      "experience.inventory.point2": "Implemented CSV-based data handling and applied object-oriented programming principles.",
      "experience.inventory.point3": "Successfully ran 44 automated tests.",
      "experience.cafeApp.title": "Team Lead / UI/UX & Requirements — Mobile Cafe App",
      "experience.cafeApp.org": "Royal University of Phnom Penh (RUPP) · Academic Team Project",
      "experience.cafeApp.point1": "Collaborated with an eight-member student team on a mobile cafe application and owner-side experience.",
      "experience.cafeApp.point2": "Contributed to cafe workflows, project requirements, UI/UX concepts, and Figma prototypes.",
      "experience.etec.title": "IT Training — UI/UX, Web Development & Networking",
      "experience.etec.org": "ETEC Center · Technical Training",
      "experience.etec.point1": "Studied UI/UX design, front-end development, back-end development, and networking.",
      "experience.etec.point2": "Practiced web development fundamentals, interface design, and technical problem-solving.",
      "experience.jomNumTech.title": "Database Modeling, Java & Python Programming",
      "experience.jomNumTech.org": "JomNumTech Online School · Scholarship-Supported Training",
      "experience.jomNumTech.point1": "Completed training in Database Modeling and Java Programming.",
      "experience.jomNumTech.point2": "Continuing Python Programming training to strengthen programming fundamentals and problem-solving skills.",

      /* education */
      "education.title": "Education",
      "education.bsc.title": "Bachelor of Computer Science",
      "education.bsc.org": "Royal University of Phnom Penh (RUPP)",
      "education.etec.title": "Network Administration & Cybersecurity · UI/UX · Web",
      "education.etec.desc": "ETEC Center — Cisco, MikroTik, Linux, Wireshark, front-end & back-end.",
      "education.jnt.title": "Java Development · Database Modeling & Analysis",
      "education.jnt.desc": "Java Core, OOP; ERD, DBML, Normalization, SQL Design, Database Architecture and Python.",
      "education.hs.title": "High School Diploma",
      "education.hs.desc": "Techo Hun Sen Suong High School — science track.",

      /* certificates */
      "certificates.title": "Certificate Gallery",
      "certs.lead1": "Click any card to preview. Filter by category. Verification links are ",
      "certs.lead2": " — no links are invented.",
      "certs.filter": "Filter certificates", "certs.unverified": "Unverified",
      "certs.close": "Close certificate preview", "certs.verify": "Verify certificate",
      "certs.verifyMissing": "Verification link: NEEDS USER INPUT",
      "certs.oop.title": "C / C++ & OOP", "certs.oop.desc": "Basic, Advanced C/C++, OOP and Project Courses.",
      "certs.cisco.title": "Cisco Packet Tracer", "certs.cisco.desc": "Basic Computer Networking & Configuration.",
      "certs.hw.title": "Hardware Specialist", "certs.hw.desc": "Computer Networking & System Installation.",
      "certs.mikrotik.title": "MikroTik MTCNA", "certs.mikrotik.desc": "Advanced MikroTik RouterOS & Configuration.",
      "certs.uiux.title": "UI/UX Design", "certs.uiux.desc": "Advanced UX/UI Design & Project Prototyping.",
      "certs.webfe.title": "Web Frontend", "certs.webfe.desc": "HTML, CSS, JS, Vue.js & Modern Frameworks.",
      "certs.ccna.title": "CCNA: Enterprise Networking", "certs.ccna.desc": "Cisco offered by Royal University of Phnom Penh through the Cisco Networking Academy program.",
      "certs.dm.title": "Data Modeling", "certs.dm.desc": "Database Design, Relationships & PostgreSQL.",
      "gallery.all": "All", "gallery.programming": "Programming", "gallery.networking": "Networking",
      "gallery.database": "Database", "gallery.uiux": "UI/UX",

      /* projects */
      "projects.title": "Featured Work",
      "projects.lead": "Two near-duplicate workspace cards were merged; unverifiable/ambiguous links are marked NEEDS USER INPUT.",
      "projects.p1.title": "Hanuman Web Concept",
      "projects.p1.desc": "A modern marketing and promotional website concept designed for Hanuman, using a highly structured layout.",
      "projects.p1.alt": "Hanuman website project screenshot", "projects.view": "View Project",
      "projects.p2.title": "Interactive UI/UX Workspace",
      "projects.p2.desc": "Responsive dashboard layouts, custom UI components and wireframes focused on fluid navigation flows.",
      "projects.p2.alt": "Interactive UI/UX workspace design mockup", "projects.viewFigma": "View Figma Prototype",
      "projects.p3.title": "Portfolio Website Design",
      "projects.p3.desc": "A web design concept showcasing skills and projects, designed in Figma, Adobe Photoshop and Adobe XD.",
      "projects.p3.alt": "Portfolio website design mockup created in Figma", "projects.viewDesign": "View Design",

      /* tech stack */
      "tech.title": "Technology Stack",
      "tech.role.systems": "Systems", "tech.role.analysis": "Analysis",
      "tech.role.lab": "Lab", "tech.role.modeling": "Modeling",

      /* ai section */
      "ai.title": "AI Assistant",
      "ai.lead": "A Gemini-powered assistant that answers only about Kakda's skills, projects, certificates, experience, education and contact — in English or Khmer.",
      "ai.f1": "Gemini integration with a scoped system prompt",
      "ai.f2": "English & Khmer answers",
      "ai.f3": "Suggested questions & quick chips",
      "ai.f4": "Copy response, clear chat",
      "ai.f5": "Session-only analytics (no tracking)",
      "ai.f6": "Online status + typing indicator",
      "ai.f7": "Safe Markdown rendering (input escaped)",
      "ai.launch.title": "Ask about the portfolio",
      "ai.launch.p1": "The API key is held only on the server (",
      "ai.launch.p2": "). If the backend is unavailable, the assistant falls back to verified on-page facts.",
      "ai.open": "Open Assistant",

      /* contact */
      "contact.title": "Get in Touch",
      "contact.name": "Your Name", "contact.email": "Your Email", "contact.message": "Message",
      "contact.send": "Send Message", "contact.message.ph": "How can I help you?", "contact.cv": "Download CV",
      "contact.name.ph": "Your Name",
      "contact.sending": "Sending…",
      "contact.success": "Thanks! Your message has been sent.",
      "contact.error": "Sorry, your message couldn't be sent. Please check the fields and try again.",
      "contact.rateLimit": "Too many messages. Please wait a moment and try again.",
      "contact.validation.name": "Please enter your name.",
      "contact.validation.email": "Please enter a valid email address.",
      "contact.validation.message": "Please enter a message.",
      "form.err.name": "Please enter your name (2+ characters).",
      "form.err.email": "Please enter a valid email address.",
      "form.err.message": "Please enter a message (10+ characters).",
      "form.err.fix": "Please fix the highlighted fields.",
      "form.sending": "Sending…",
      "form.success.sent": "Thanks! Your message has been sent.",
      "form.success": "Thanks! Your email app should open with the message ready to send.",

      /* chat widget */
      "chat.title": "KAKDA AI Assistant", "chat.status": "Online & ready to chat",
      "chat.placeholder": "Type a message...", "chat.clear": "Clear chat",
      "chat.open.aria": "Open AI assistant", "chat.close.aria": "Close chat",
      "chat.body.aria": "Chat messages", "chat.input.aria": "Message", "chat.send.aria": "Send message",
      "chat.greet": "Hi! I'm Kakda's AI assistant. Ask me about his skills, projects, certificates, experience or how to contact him.",
      "chat.sug1": "Skills?", "chat.sug2": "Freelance?", "chat.sug3": "Projects", "chat.sug4": "Contact?",
      "chat.copy": "Copy", "chat.copied": "Copied",
      "chat.loading": "Preparing an answer...",
      "chat.error": "Sorry, I couldn't get a response right now. Please try again.",
      "chat.retry": "Retry",
      "chat.rateLimited": "You're sending too many messages. Please wait a moment.",
      "chat.notConfigured": "The assistant isn't available right now.",
      "chat.timeout": "The assistant took too long to answer. Please try again.",
      "chat.fb.skills": "Kakda works across **Frontend** (Next.js, Vue, JavaScript, TypeScript), **Backend** (PHP, Laravel, Java, Spring Boot, REST), **Database** (PostgreSQL, MySQL, SQL Server, DBML/ERD), **Networking** (Cisco, MikroTik, Linux, Wireshark, EVE-NG) and **Design** (Figma, Adobe XD, Photoshop).",
      "chat.fb.projects": "Featured work includes the **Hanuman** web concept, an **interactive UI/UX design workspace**, and a **portfolio website design**. Details are in the Projects section.",
      "chat.fb.certificates": "Certificates cover OOP, Cisco Packet Tracer, Hardware, MikroTik MTCNA, UI/UX, Web Frontend, CCNA and Data Modeling. Open the Certificate Gallery to preview them.",
      "chat.fb.experience": "Experience includes the **Smart Coffee & Bakery ERP** (full-stack), a **Java Inventory Management System**, a **RUPP team Mobile Cafe app** (Team Lead / UI-UX), **ETEC** IT training, and **JomNumTech** database, Java and Python training.",
      "chat.fb.contact": "Please use the contact form in the Contact section, or the email / Telegram links there.",
      "chat.fb.freelance": "Yes — Kakda is open to freelance, junior roles and internships. Use the contact form to reach out.",
      "chat.fb.default": "I don't have verified information about that. You can ask about skills, projects, certificates, experience, or contact.",

      /* footer */
      "footer.rights": "© 2026 Thea Kakda. All rights reserved."
    },
    km: {
      /* nav + a11y */
      "nav.about": "អំពីខ្ញុំ", "nav.stats": "ស្ថិតិ", "nav.skills": "ជំនាញ",
      "nav.dashboard": "ផ្ទាំងព័ត៌មាន", "nav.experience": "បទពិសោធន៍", "nav.education": "ការសិក្សា",
      "nav.certificates": "វិញ្ញាបនបត្រ", "nav.projects": "គម្រោង", "nav.tech": "បច្ចេកវិទ្យា",
      "nav.ai": "ឧបករណ៍ AI", "nav.contact": "ទំនាក់ទំនង",
      "a11y.skip": "រំកិលទៅខ្លឹមសារ",
      "lang.label": "ភាសា", "lang.switch": "ជ្រើសរើសភាសា",
      "nav.primary": "ចម្បង", "nav.mobile": "ចល័ត",
      "menu.open": "បើកម៉ឺនុយរុករក", "menu.close": "បិទម៉ឺនុយរុករក",

      /* hero */
      "hero.status": "បើកចំហសម្រាប់ Freelance និង Internship",
      "hero.role1": "អ្នកអភិវឌ្ឍន៍ Full-Stack", "hero.role2": "អ្នករចនាមូលដ្ឋានទិន្នន័យ",
      "hero.role3": "វិស្វករបណ្ដាញ", "hero.role4": "អ្នកអភិវឌ្ឍន៍ប្រព័ន្ធ ERP",
      "hero.tagline": "បង្កើតកម្មវិធីអាចពង្រីកបាន ប្រព័ន្ធគ្រីស្តា ដំណោះស្រាយបណ្ដាញ និងកម្មវិធីមាន AI ជំនួយ។",
      "hero.cta1": "មើលគម្រោង", "hero.cta2": "តភ្ជាប់ខ្ញុំ", "hero.cta3": "ទាញយក CV",
      "hero.portrait.alt": "រូបថតរបស់ ថេអា កាក់ដា", "hero.roles": "តួនាទីវិជ្ជាជីវៈ",

      /* about */
      "about.card1.title": "អ្នកអភិវឌ្ឍន៍កម្មវិធី និងអ្នកវិភាគប្រព័ន្ធ",
      "about.card1.p1": "អ្នកអភិវឌ្ឍន៍កម្មវិធីដែលមានការទទួលខុសត្រូវខ្ពស់ និងយកចិត្តទុកដាក់លើព័ត៌មានលម្អិត មានចំណេះដឹងផ្នែកការអភិវឌ្ឍគេហទំព័រ ការសរសេរកម្មវិធី Java ការរចនាមូលដ្ឋានទិន្នន័យ និងប្រព័ន្ធ ERP។ មានបទពិសោធន៍ក្នុងការបង្កើតកម្មវិធីគេហទំព័រឆ្លើយតបល្អ ដោយប្រើ HTML, CSS, JavaScript, PHP, Laravel, MySQL, PostgreSQL និង SQL Server។",
      "about.card1.p2": "កំពុងសិក្សា Java, Spring Boot, ការរចនា និងវិភាគមូលដ្ឋានទិន្នន័យ និងការអភិវឌ្ឍកម្មវិធីសម្រាប់អាជីវកម្ម។ មានជំនាញក្នុងការរចនាមូលដ្ឋានទិន្នន័យ (Conceptual, Logical, Physical), ការរចនា ERD, Normalization, ការបង្កើនប្រសិទ្ធភាព SQL Query និងការវិភាគប្រព័ន្ធ។",
      "about.card2.title": "ព័ត៌មានសង្ខេប",

      /* stats */
      "stats.projects": "គម្រោង", "stats.certs": "វិញ្ញាបនបត្រ", "stats.tech": "បច្ចេកវិទ្យា", "stats.education": "ការសិក្សា",
      "stats.note.projects": "រាប់ពីគម្រោងខាងក្រោម",
      "stats.note.certs": "កាតប្រភពចំនួន ៩ បានលុប CCNA ដែលស្ទួន ១ ចេញ",
      "stats.note.tech": "បានបញ្ជីក្នុង ជំនាញ និង បច្ចេកវិទ្យា",
      "stats.note.education": "មធ្យមសិក្សា · RUPP · ETEC · JomNumtech",

      /* skills */
      "skills.title": "ជំនាញ",
      "skills.frontend": "ផ្នែកខាងមុខ", "skills.backend": "ផ្នែកខាងក្រោយ", "skills.database": "មូលដ្ឋានទិន្នន័យ",
      "skills.networking": "បណ្ដាញ", "skills.design": "ការរចនា", "skills.aitools": "ឧបករណ៍ AI",

      /* dashboard */
      "dashboard.title": "ផ្ទាំងព័ត៌មានអភិវឌ្ឍន៍",
      "dashboard.lead": "សេចក្ដីសង្ខេបជាគំនូរនូវទិន្នន័យដែលបានបោះពុម្ពលើទំព័រនេះ។ Chart.js ផ្ទុកលុះត្រាតែផ្នែកនេះចូលក្នុងចក្ខុវិស័យ។",
      "dashboard.chart.skills": "ការបែងចែកជំនាញ", "dashboard.chart.certs": "វិញ្ញាបនបត្រតាមប្រភេទ",
      "dashboard.chart.tech": "ការលើកឡើងបច្ចេកវិទ្យា", "dashboard.chart.timeline": "ខ្សែពេលវេលានៃការសិក្សា",
      "dashboard.note.illustrative": "តម្លៃគំរូប៉ុណ្ណោះ – មិនមែនជាការវាស់វែងជំនាញទេ",
      "dashboard.note.certcounts": "ចំនួនបានមកពីវិចិត្រសាលវិញ្ញាបនបត្រខាងក្រោម",
      "dashboard.note.techmentions": "ការលើកឡើងក្នុង Portfolio មិនមែនជាកម្រិតជំនាញ",
      "dashboard.note.timeline": "ឆ្នាំយកតែពីបំណិនការសិក្សា និងបទពិសោធន៍តែប៉ុណ្ណោះ",
      "dashboard.chart.skills.aria": "គ្រាផ្កាយរណបនៃវិស័យជំនាញ ដោយប្រើតម្លៃគំរូ មិនមែនវាស់វែង",
      "dashboard.chart.certs.aria": "គ្រារង្វង់នៃវិញ្ញាបនបត្របែងតាមវិស័យ",
      "dashboard.chart.tech.aria": "គំនូរប្រដាប់ដោយរបារផ្ដេកនៃបច្ចេកវិទ្យាដែលបានបញ្ជាក់",
      "dashboard.chart.timeline.aria": "ខ្សែពេលវេលានៃការសិក្សា និងបទពិសោធន៍តាមឆ្នាំ",
      "dashboard.activity": "សកម្មភាពឧបករណ៍ជំនួយ",
      "dashboard.activity.q": "សំណួរក្នុងសម័យនេះ៖", "dashboard.activity.topics": "ប្រធានបទទូទៅ៖",
      "dashboard.activity.note": "តែក្នុងសម័យក្នុងម៉ាស៊ីនតែប៉ុណ្ណោះ។ គ្មានការតាមដាន គ្មាន cookies គ្មានការរក្សាទុក ឬផ្ញើ។",
      /* chart labels */
      "chart.radar.ai": "AI", "chart.radar.dataset": "គំរូប៉ុណ្ណោះ",
      "chart.certs.other": "ផ្សេងៗ", "chart.tech.dataset": "ការលើកឡើងក្នុង Portfolio (មិនមែនជាកម្រិតជំនាញ)",
      "chart.timeline.hs": "មធ្យមសិក្សា",

      /* experience */
      "experience.title": "គម្រោង និងបទពិសោធន៍សិក្សា",
      "experience.smartCoffee.title": "អ្នកអភិវឌ្ឍន៍ Full-Stack — ប្រព័ន្ធ Smart Coffee & Bakery ERP",
      "experience.smartCoffee.org": "គម្រោងអភិវឌ្ឍកម្មវិធីផ្ទាល់ខ្លួន",
      "experience.smartCoffee.point1": "កំពុងអភិវឌ្ឍប្រព័ន្ធគ្រប់គ្រងហាងកាហ្វេ និងហាងនំ ដោយប្រើ Spring Boot, Next.js, React និង PostgreSQL។",
      "experience.smartCoffee.point2": "កំពុងបង្កើត REST APIs ប្រព័ន្ធផ្ទៀងផ្ទាត់អត្តសញ្ញាណ មុខងារគ្រប់គ្រងផលិតផល និងសារពើភ័ណ្ឌ ព្រមទាំងការកំណត់សិទ្ធិតាមតួនាទី។",
      "experience.smartCoffee.point3": "កំពុងអភិវឌ្ឍផ្ទាំងគ្រប់គ្រង បរិក្ខារ POS សម្រាប់បុគ្គលិក និងគេហទំព័រសម្រាប់អតិថិជន។",
      "experience.inventory.title": "អ្នកអភិវឌ្ឍន៍ Java — ប្រព័ន្ធគ្រប់គ្រងសារពើភ័ណ្ឌ",
      "experience.inventory.org": "គម្រោង Java ផ្ទាល់ខ្លួន",
      "experience.inventory.point1": "បានបង្កើតកម្មវិធី Java Console សម្រាប់គ្រប់គ្រងផលិតផល ប្រភេទផលិតផល បរិមាណស្តុក និងប្រតិបត្តិការ។",
      "experience.inventory.point2": "បានអនុវត្តការគ្រប់គ្រងទិន្នន័យតាមរយៈ CSV និងគោលការណ៍ Object-Oriented Programming។",
      "experience.inventory.point3": "បានដំណើរការតេស្តស្វ័យប្រវត្តិចំនួន ៤៤ ដោយជោគជ័យ។",
      "experience.cafeApp.title": "ប្រធានក្រុម / UI/UX និងការវិភាគតម្រូវការ — Mobile Cafe App",
      "experience.cafeApp.org": "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP) · គម្រោងសិក្សាជាក្រុម",
      "experience.cafeApp.point1": "បានសហការជាមួយក្រុមនិស្សិតចំនួន ៨ នាក់ ដើម្បីអភិវឌ្ឍគំនិតកម្មវិធី Mobile Cafe និងផ្នែកគ្រប់គ្រងសម្រាប់ម្ចាស់ហាង។",
      "experience.cafeApp.point2": "បានចូលរួមរៀបចំលំហូរការងារហាងកាហ្វេ តម្រូវការគម្រោង គំនិត UI/UX និងគំរូអន្តរកម្មដោយប្រើ Figma។",
      "experience.etec.title": "ការបណ្ដុះបណ្ដាល IT — UI/UX, Web Development និង Networking",
      "experience.etec.org": "ETEC Center · ការបណ្ដុះបណ្ដាលបច្ចេកទេស",
      "experience.etec.point1": "បានសិក្សាអំពី UI/UX Design, Front-End Development, Back-End Development និង Networking។",
      "experience.etec.point2": "បានអនុវត្តចំណេះដឹងមូលដ្ឋាននៃការអភិវឌ្ឍគេហទំព័រ ការរចនាចំណុចប្រទាក់ និងការដោះស្រាយបញ្ហាបច្ចេកទេស។",
      "experience.jomNumTech.title": "Database Modeling, Java និង Python Programming",
      "experience.jomNumTech.org": "JomNumTech Online School · វគ្គបណ្ដុះបណ្ដាលដែលគាំទ្រដោយអាហារូបករណ៍",
      "experience.jomNumTech.point1": "បានបញ្ចប់វគ្គសិក្សា Database Modeling និង Java Programming។",
      "experience.jomNumTech.point2": "កំពុងបន្តសិក្សា Python Programming ដើម្បីពង្រឹងមូលដ្ឋានគ្រឹះនៃការសរសេរកម្មវិធី និងសមត្ថភាពដោះស្រាយបញ្ហា។",

      /* education */
      "education.title": "ការសិក្សា",
      "education.bsc.title": "បឋមសិក្សាផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ",
      "education.bsc.org": "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ (RUPP)",
      "education.etec.title": "ការគ្រប់គ្រងបណ្ដាញ និងសុវត្ថិភាពស៊ីប័រ · UI/UX · គេហទំព័រ",
      "education.etec.desc": "ETEC Center — Cisco, MikroTik, Linux, Wireshark, ផ្នែកខាងមុខ និងខាងក្រោយ។",
      "education.jnt.title": "ការអភិវឌ្ឍ Java · ការរចនា និងវិភាគមូលដ្ឋានទិន្នន័យ",
      "education.jnt.desc": "Java Core, OOP; ERD, DBML, Normalization, ការរចនា SQL, ស្ថាបត្យកម្មមូលដ្ឋានទិន្នន័យ និង Python។",
      "education.hs.title": "សញ្ញាបត្រមធ្យមសិក្សា",
      "education.hs.desc": "សាលាមធ្យមសិក្សា ទេចោ ហ៊ុន សែន សួង — គម្រោងវិទ្យាសាស្ត្រ។",

      /* certificates */
      "certificates.title": "វិចិត្រសាលវិញ្ញាបនបត្រ",
      "certs.lead1": "ចុចលើកាតណាមួយដើម្បីមើល។ ត្រងតាមប្រភេទ។ តំណផ្ទៀងផ្ទាត់គឺ ",
      "certs.lead2": " — គ្មានតំណដែលបានបន្ថែមពិតប្រាកដទេ។",
      "certs.filter": "ត្រងវិញ្ញាបនបត្រ", "certs.unverified": "មិនទាន់ផ្ទៀងផ្ទាត់",
      "certs.close": "បិទការមើលវិញ្ញាបនបត្រ", "certs.verify": "ផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ",
      "certs.verifyMissing": "តំណផ្ទៀងផ្ទាត់៖ NEEDS USER INPUT",
      "certs.oop.title": "C / C++ និង OOP", "certs.oop.desc": "វគ្គ C/C++ មូលដ្ឋាន, កម្រិតខ្ពស់, OOP និងគម្រោង។",
      "certs.cisco.title": "Cisco Packet Tracer", "certs.cisco.desc": "បណ្ដាញកុំព្យូទ័រមូលដ្ឋាន និងការកំណត់រចនាសម្ព័ន្ធ។",
      "certs.hw.title": "ជំនាញ Hardware", "certs.hw.desc": "បណ្ដាញកុំព្យូទ័រ និងការដំឡើងប្រព័ន្ធ។",
      "certs.mikrotik.title": "MikroTik MTCNA", "certs.mikrotik.desc": "MikroTik RouterOS កម្រិតខ្ពស់ និងការកំណត់រចនាសម្ព័ន្ធ។",
      "certs.uiux.title": "ការរចនា UI/UX", "certs.uiux.desc": "ការរចនា UX/UI កម្រិតខ្ពស់ និងគំរូអន្តរកម្មគម្រោង។",
      "certs.webfe.title": "ផ្នែកខាងមុខគេហទំព័រ", "certs.webfe.desc": "HTML, CSS, JS, Vue.js និង Framework ទំនើប។",
      "certs.ccna.title": "CCNA: បណ្ដាញអាជីវៈ", "certs.ccna.desc": "Cisco ដែលផ្ដល់ដោយសាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ តាមរយៈកម្មវិធី Cisco Networking Academy។",
      "certs.dm.title": "ការរចនាទិន្នន័យ", "certs.dm.desc": "ការរចនាមូលដ្ឋានទិន្នន័យ, ទំនាក់ទំនង និង PostgreSQL។",
      "gallery.all": "ទាំងអស់", "gallery.programming": "កម្មវិធី", "gallery.networking": "បណ្ដាញ",
      "gallery.database": "មូលដ្ឋានទិន្នន័យ", "gallery.uiux": "UI/UX",

      /* projects */
      "projects.title": "ការងារលេចធ្លោ",
      "projects.lead": "កាតកន្លែងធ្វើការដែលស្ទួនគ្នាពីរត្រូវបានបញ្ចូលគ្នា; តំណដែលមិនអាចផ្ទៀងផ្ទាត់ ឬស្របល់ត្រូវបានសម្គាល់ NEEDS USER INPUT។",
      "projects.p1.title": "គំនិតគេហទំព័រ Hanuman",
      "projects.p1.desc": "គំនិតគេហទំព័រទីផ្សារ និងប្រកាសល្អទំនើប រចនាសម្រាប់ Hanuman ដោយប្រើប្លង់រចនាសម្ព័ន្ធច្បាស់។",
      "projects.p1.alt": "រូបថតអេក្រង់គម្រោងគេហទំព័រ Hanuman", "projects.view": "មើលគម្រោង",
      "projects.p2.title": "កន្លែងធ្វើការ UI/UX អន្តរកម្ម",
      "projects.p2.desc": "ប្លង់ផ្ទាំងគ្រប់គ្រងឆ្លើយតប សមាសភាគ UI ប្ដូរតាមបំណង និង wireframes ផ្ដោតលើលំហូរការរុករករលូន។",
      "projects.p2.alt": "គំរូរចនាកន្លែងធ្វើការ UI/UX អន្តរកម្ម", "projects.viewFigma": "មើលគំរូ Figma",
      "projects.p3.title": "ការរចនាគេហទំព័រ Portfolio",
      "projects.p3.desc": "គំនិតរចនាគេហទំព័របង្ហាញជំនាញ និងគម្រោង រចនានៅក្នុង Figma, Adobe Photoshop និង Adobe XD។",
      "projects.p3.alt": "គំរូរចនាគេហទំព័រ Portfolio បង្កើតក្នុង Figma", "projects.viewDesign": "មើលការរចនា",

      /* tech stack */
      "tech.title": "បច្ចេកវិទ្យាប្រើប្រាស់",
      "tech.role.systems": "ប្រព័ន្ធ", "tech.role.analysis": "ការវិភាគ",
      "tech.role.lab": "មន្ទីរពិសោធន៍", "tech.role.modeling": "ការរចនាគំរូ",

      /* ai section */
      "ai.title": "ឧបករណ៍ជំនួយ AI",
      "ai.lead": "ឧបករណ៍ជំនួយដែលដំណើរការដោយ Gemini ដែលឆ្លើយតែអំពីជំនាញ គម្រោង វិញ្ញាបនបត្រ បទពិសោធន៍ ការសិក្សា និងទំនាក់ទំនងរបស់ Kakda — ជាភាសាអង់គ្លេស ឬខ្មែរ។",
      "ai.f1": "ការបញ្ចូល Gemini ជាមួយ system prompt មានវិសាលភាព",
      "ai.f2": "ចម្លើយភាសាអង់គ្លេស និងខ្មែរ",
      "ai.f3": "សំណួរណែនាំ និងប៊ូតុងរហ័ស",
      "ai.f4": "ច្លាយចម្លើយ និងសម្អាតការជជែក",
      "ai.f5": "ស្ថិតិតែក្នុងសម័យ (គ្មានការតាមដាន)",
      "ai.f6": "ស្ថានភាពអនឡាញ + សញ្ញាកំពុងវាយ",
      "ai.f7": "ការបង្ហាញ Markdown ប្រកបដោយសុវត្ថិភាព (បានរក្សាសុវត្ថិភាព input)",
      "ai.launch.title": "សួរអំពី Portfolio",
      "ai.launch.p1": "API key ត្រូវបានរក្សាទុកតែលើសេវាកម្ម (",
      "ai.launch.p2": ")។ ប្រសិនបើ backend មិនអាចប្រើបាន ឧបករណ៍ជំនួយនឹងត្រឡប់ទៅព័ត៌មានដែលបានផ្ទៀងផ្ទាត់លើទំព័រវិញ។",
      "ai.open": "បើកឧបករណ៍ជំនួយ",

      /* contact */
      "contact.title": "តភ្ជាប់",
      "contact.name": "ឈ្មោះរបស់អ្នក", "contact.email": "អ៊ីមែលរបស់អ្នក", "contact.message": "សារ",
      "contact.send": "ផ្ញើសារ", "contact.message.ph": "តើខ្ញុំអាចជួយអ្នកយ៉ាងណា?", "contact.cv": "ទាញយក CV",
      "contact.name.ph": "ឈ្មោះរបស់អ្នក",
      "contact.sending": "កំពុងផ្ញើ…",
      "contact.success": "អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។",
      "contact.error": "សូមអភ័យទោស សាររបស់អ្នកមិនអាចផ្ញើបានទេ។ សូមពិនិត្យ និងព្យាយាមម្តងទៀត។",
      "contact.rateLimit": "សារច្រើនពេក។ សូមរង់ចាំបន្តិចរួចព្យាយាមម្តងទៀត។",
      "contact.validation.name": "សូមបញ្ចូលឈ្មោះរបស់អ្នក។",
      "contact.validation.email": "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ។",
      "contact.validation.message": "សូមបញ្ចូលសាររបស់អ្នក។",
      "form.err.name": "សូមបញ្ចូលឈ្មោះរបស់អ្នក (យ៉ាងតិច ២ តួ)។",
      "form.err.email": "សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ។",
      "form.err.message": "សូមបញ្ចូលសារ (យ៉ាងតិច ១០ តួ)។",
      "form.err.fix": "សូមកែត្រងដែលបានសម្គាល់។",
      "form.sending": "កំពុងផ្ញើ…",
      "form.success.sent": "អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើរួច។",
      "form.success": "អរគុណ! កម្មវិធីអ៊ីមែលរបស់អ្នកគួរបើកជាមួយសាររួចរាល់សម្រាប់ផ្ញើ។",

      /* chat widget */
      "chat.title": "ឧបករណ៍ AI របស់ KAKDA", "chat.status": "ដំណើរការ រួចរាល់សម្រាប់ជជែក",
      "chat.placeholder": "វាយសារ...", "chat.clear": "សម្អាតការជជែក",
      "chat.open.aria": "បើកឧបករណ៍ AI", "chat.close.aria": "បិទការជជែក",
      "chat.body.aria": "សារការជជែក", "chat.input.aria": "សារ", "chat.send.aria": "ផ្ញើសារ",
      "chat.greet": "សួស្ដី! ខ្ញុំជាឧបករណ៍ AI របស់ Kakda។ សួរខ្ញុំអំពីជំនាញ គម្រោង វិញ្ញាបនបត្រ បទពិសោធន៍ ឬរបៀបតភ្ជាប់គាត់។",
      "chat.sug1": "ជំនាញ?", "chat.sug2": "Freelance?", "chat.sug3": "គម្រោង", "chat.sug4": "ទំនាក់ទំនង?",
      "chat.copy": "ច្លាយ", "chat.copied": "បានច្លាយ",
      "chat.loading": "កំពុងរៀបចំចម្លើយ...",
      "chat.error": "សូមអភ័យទោស។ មិនអាចទទួលបានចម្លើយនៅពេលនេះទេ។ សូមព្យាយាមម្ដងទៀត។",
      "chat.retry": "ព្យាយាមម្ដងទៀត",
      "chat.rateLimited": "អ្នកកំពុងផ្ញើសារច្រើនពេក។ សូមរង់ចាំបន្តិច។",
      "chat.notConfigured": "ឧបករណ៍ជំនួយមិនអាចប្រើបាននៅពេលនេះទេ។",
      "chat.timeout": "ឧបករណ៍ជំនួយចំពេលយូរពេកក្នុងការឆ្លើយ។ សូមព្យាយាមម្ដងទៀត។",
      "chat.fb.skills": "Kakda ធ្វើការគ្រប់ **ផ្នែកខាងមុខ** (Next.js, Vue, JavaScript, TypeScript), **ផ្នែកខាងក្រោយ** (PHP, Laravel, Java, Spring Boot, REST), **មូលដ្ឋានទិន្នន័យ** (PostgreSQL, MySQL, SQL Server, DBML/ERD), **បណ្ដាញ** (Cisco, MikroTik, Linux, Wireshark, EVE-NG) និង **ការរចនា** (Figma, Adobe XD, Photoshop)។",
      "chat.fb.projects": "ការងារលេចធ្លោរួមមាន គំនិតគេហទំព័រ **Hanuman**, **កន្លែងធ្វើការរចនា UI/UX អន្តរកម្ម**, និង **ការរចនាគេហទំព័រ Portfolio**។ ព័ត៌មានលម្អិតស្ថិតនៅផ្នែក Projects។",
      "chat.fb.certificates": "វិញ្ញាបនបត្រគ្រប់ OOP, Cisco Packet Tracer, Hardware, MikroTik MTCNA, UI/UX, Web Frontend, CCNA និង Data Modeling។ បើកវិចិត្រសាលវិញ្ញាបនបត្រដើម្បីមើល។",
      "chat.fb.experience": "បទពិសោធន៍រួមមាន **Smart Coffee & Bakery ERP** (full-stack), **ប្រព័ន្ធគ្រប់គ្រងសារពើភ័ណ្ឌ Java**, **កម្មវិធី Mobile Cafe ជាក្រុម RUPP** (ប្រធានក្រុម / UI-UX), ការបណ្ដុះបណ្ដាល IT **ETEC**, និងការបណ្ដុះបណ្ដាលមូលដ្ឋានទិន្នន័យ Java និង Python នៅ **JomNumTech**។",
      "chat.fb.contact": "សូមប្រើទម្រង់ទំនាក់ទំនងនៅផ្នែក Contact ឬតំណអ៊ីមែល / Telegram នៅនោះ។",
      "chat.fb.freelance": "បាទ/ចាស — Kakda បើកចំហសម្រាប់ freelance, តួនាទីក្មេង និង internship។ ប្រើទម្រង់ទំនាក់ទំនងដើម្បីតភ្ជាប់។",
      "chat.fb.default": "ខ្ញុំមិនមានព័ត៌មានដែលបានផ្ទៀងផ្ទាត់អំពីរឿងនោះទេ។ អ្នកអាចសួរអំពី ជំនាញ គម្រោង វិញ្ញាបនបត្រ បទពិសោធន៍ ឬ ទំនាក់ទំនង។",

      /* footer */
      "footer.rights": "© ២០២៦ ថេអា កាក់ដា។ រក្សាសិទ្ធិទាំងអស់។"
    }
  };

  function detect() {
    try { var s = localStorage.getItem("lang"); if (s === "en" || s === "km") return s; } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("km") === 0 ? "km" : "en";
  }

  function pick(dict, en, key) {
    if (dict[key] != null) return dict[key];
    if (en[key] != null) return en[key];
    return null; // leave element untouched — never blank it
  }

  function apply(lang) {
    var dict = translations[lang] || translations.en;
    var en = translations.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = pick(dict, en, el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var v = pick(dict, en, el.getAttribute("data-i18n-placeholder"));
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var v = pick(dict, en, el.getAttribute("data-i18n-aria-label"));
      if (v != null) el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var v = pick(dict, en, el.getAttribute("data-i18n-title"));
      if (v != null) el.setAttribute("title", v);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = pick(dict, en, el.getAttribute("data-i18n-alt"));
      if (v != null) el.setAttribute("alt", v);
    });
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang-btn") === lang));
    });
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function setLang(lang) { try { localStorage.setItem("lang", lang); } catch (e) {} apply(lang); }

  function buildSwitcher() {
    var host = document.getElementById("lang-switch");
    if (!host) return;
    host.innerHTML = "";
    [["en", "EN"], ["km", "ខ្មែរ"]].forEach(function (pair) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "lang-btn";
      b.setAttribute("data-lang-btn", pair[0]); b.setAttribute("aria-pressed", "false");
      b.textContent = pair[1];
      b.addEventListener("click", function () { setLang(pair[0]); });
      host.appendChild(b);
    });
  }

  function init() { buildSwitcher(); apply(detect()); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.I18N = {
    get: function () { return document.documentElement.lang || "en"; },
    t: function (key) {
      var lang = window.I18N.get();
      return (translations[lang] || {})[key] != null ? translations[lang][key] : translations.en[key];
    }
  };
})();
