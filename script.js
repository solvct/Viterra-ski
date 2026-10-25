const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");

if (menuToggle && menuPanel) {
  const closeMenu = () => {
    menuPanel.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = menuPanel.hidden;
    menuPanel.hidden = !willOpen;
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", willOpen);
  });

  menuPanel.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const boards = {
  shard: { name: "SHARD", image: "https://framerusercontent.com/images/0ORYJFweYwamOgk7PGok1FyvOtM.png?width=1920&height=1080" },
  obsidian: { name: "OBSIDIAN", image: "https://framerusercontent.com/images/uiRuE6NkpVUuJBwmpgs4y74GswI.png?width=1920&height=1080" },
  caster: { name: "CASTER", image: "https://framerusercontent.com/images/ecUgKnIHBPyHRekbYkNISt5Ups.png?width=1920&height=1080" },
  ravenger: { name: "RAVENGER", image: "https://framerusercontent.com/images/SQr8qXZueJjqWSzW2YRJzgEWKhw.png?width=1920&height=1080" },
};

// The reference includes four portfolio case studies and eight editorial pages
// in addition to the Viterra landing page and board catalog.
const projects = {
  destello: {
    name: "Destello", image: "https://framerusercontent.com/images/ZXLR3OdMHWvVAqdWWowS6orbak.png?width=1600&height=1200",
    description: "Destello is a modern Framer Studio template built for professionals who value minimalism and clarity. With a clean grid, elegant typography, and smooth subtle motion, it helps you present your work in a way that feels both refined and approachable. Ideal for designers, developers, and studios seeking a sleek online presence.",
    date: "November 18, 2025", client: "Maya L — Director at Destello", industry: "Agency / Editorial", services: "UIUX Design / Branding / Framer Development / AI Automation", live: "https://destello.framer.website/",
    gallery: ["mH5AhsOpoPLl69GW8XreL2RyUc", "uBKoM5kteJLHRpnnWPyis6pgHMA", "Qh5kB5o8HKNUzbJkiw7WAluZV7g", "RNCxCWsbL0FEtv5Rd5jBquWpec"]
  },
  zayla: {
    name: "Zayla", image: "https://framerusercontent.com/images/LorI45uGRevzIjE2JAwxPHsoHx8.png?width=1600&height=1200",
    description: "Zayla is a dramatic yet refined Framer template designed for those who embrace bold visuals and high-impact storytelling. Whether you’re a creative designer, digital artist, innovative developer, or any professional craving a daring web presence, this versatile portfolio template empowers you to showcase your talent with style and confidence. With a sleek dark aesthetic, vibrant imagery, and engaging layout, Zayla helps you highlight your work, share your mission, connect through compelling case studies, and convert visitors into clients.",
    date: "November 18, 2025", client: "Zayla Monroe", industry: "Personal / Animated / Graphic Design", services: "Web Development / Content Creation", live: "https://zaylamonroe.framer.website/",
    gallery: ["OqAdQuoi6VyD7dQBXTttfCcXGr0", "4RhS7yPXqAnX7oHQzraUr6lU95I", "omhP5vf50XDxzbIH8hTVLlSJRc", "WT3n6IqckZ0sQ8NUsL4ElfXXrQ"]
  },
  veon: {
    name: "Veon", image: "https://framerusercontent.com/images/fl7dEAIvWqIK6fpl2FzvxgVgo.png?width=1600&height=1200",
    description: "Veon is a sleek and modern Framer template crafted for fashion-focused e-commerce stores. With seamless Shopify integration via Framercommerce, it’s optimized for speed, conversions, and an effortless mobile shopping experience.",
    date: "November 18, 2025", client: "Fabian Clark — CO at Veon", industry: "Fashion / E-Commerce / Store", services: "E-Commerce / UIUX Design / Shopify / Framer Development", live: "https://veonn.framer.website/?via=zaidkhan3419",
    gallery: ["Ct75shsxtYxdaGkq3TJf9jLjc2I", "LjRK779lEuQCwPemKYjGvDoKhs", "yvYt82qQzCZ1DcP2cdPGJOSe4", "kInZL2wb1yfZhCKJKTgB3HjsTg"]
  },
  sienna: {
    name: "Sienna", image: "https://framerusercontent.com/images/6sb1JjYXS6TV4Lk4wuybSLhLYvA.png?width=1600&height=1200",
    description: "Showcase your talent with Sienna — a refined Framer template crafted for photographers and freelancers. Its sleek, modern layout highlights portfolios, services, and client stories, helping creative work stand out.",
    date: "November 18, 2025", client: "Sienna", industry: "Photography / Portfolio", services: "Web design / Branding / Framer development", live: "https://sienna.framer.photos/?via=zaidkhan3419",
    gallery: ["9sNfeTBgRTze901nMrqPY10", "9mrWsbxW5ZpThK7bQuYFfE28I", "Nv6yi8vPJw2DtFneTOcSqKxy4eg", "oll8pq7yV1u0vqbmAzgOHcdwfw"]
  }
};

const articleImages = {
  "why-framer-development-is-modern-creation": "S3jIKYuptphdBG2Q6OLSjygAT0.jpg?width=2400&height=1200",
  "the-roadmap-behind-great-design": "VmBcaXsqzT56M2wQ7aObuD7xU.png?width=448&height=640",
  "designing-a-brand-that-speaks-without-words": "7iG15XWImGliCIbvEhn2EVHqyk.png?width=480&height=640",
  "building-brand-atmosphere-through-color-typography": "SlMq9wne6yAmbseRAMo8cwsh3Ts.png?width=640&height=427",
  "from-design-to-fully-functional-websites": "Yr92WHVn4AOvN6mpg1m47ezTLJk.webp?width=1280&height=720",
  "how-visual-hierarchy-shapes-user-decisions": "zCNtyibWiSP3Pwbmzgx6vWIoA.png?width=640&height=640",
  "why-framer-makes-the-workflow-effortless": "2MOgSehFWWqvrD8vrnyJn3y7Q.png?width=1024&height=964",
  "designing-with-intent-why-clarity-beats-complexity": "WLysvcjMJXkWCAKK2BdgCCHZ4ho.png?width=1680&height=2400"
};
const articleTitles = {
  "why-framer-development-is-modern-creation": "Why Framer Development is Modern Creation",
  "the-roadmap-behind-great-design": "The Roadmap Behind Great Design",
  "designing-a-brand-that-speaks-without-words": "Designing a Brand That Speaks Without Words",
  "building-brand-atmosphere-through-color-typography": "Building Brand Atmosphere Through Color & Typography",
  "from-design-to-fully-functional-websites": "From Design to Fully Functional Websites",
  "how-visual-hierarchy-shapes-user-decisions": "How Visual Hierarchy Shapes User Decisions",
  "why-framer-makes-the-workflow-effortless": "Why Framer Makes the Workflow Effortless",
  "designing-with-intent-why-clarity-beats-complexity": "Designing With Intent: Why Clarity Beats Complexity"
};
const articleLeads = {
  "why-framer-development-is-modern-creation": "Framer has shifted the way designers and developers think about building for the web. It brings visual design, animation, and production-ready development into one workflow.",
  "the-roadmap-behind-great-design": "Design isn’t just about visuals — it’s about purpose. A strong design strategy connects business objectives with user needs and turns ideas into meaningful experiences.",
  "designing-a-brand-that-speaks-without-words": "Design is more than making things look good. It connects a brand’s goals with what people need, creating a consistent experience across every interaction.",
  "building-brand-atmosphere-through-color-typography": "A strong brand is felt as much as it is recognized. Color and typography shape that atmosphere before a visitor reads a word.",
  "from-design-to-fully-functional-websites": "Modern websites need to be visually clear, responsive, and interactive. A connected design-to-development workflow helps turn an idea into a polished experience.",
  "how-visual-hierarchy-shapes-user-decisions": "Visual hierarchy guides attention. Clear scale, contrast, and spacing help people understand what matters and choose their next step.",
  "why-framer-makes-the-workflow-effortless": "A connected visual workflow brings design, interaction, and publishing into one place, making it easier to move from an early idea to a finished site.",
  "designing-with-intent-why-clarity-beats-complexity": "Clarity gives every design choice a job. A focused interface helps people understand a message without getting in the way."
};
const articleSections = {
  "why-framer-development-is-modern-creation": [
    ["A New Standard for Speed & Precision", "One of Framer’s strongest advantages is how quickly ideas turn into functional layouts. Design, refinement, and publishing can happen directly in the same environment. Real-time updates keep design decisions intact and reduce development time."],
    ["Built-In Animations That Actually Feel Premium", "Scroll effects, transitions, and micro-interactions can be created visually without sacrificing performance. Subtle fade-ins, parallax movement, magnetic interactions, and dynamic page transitions help a site feel modern and alive."],
    ["Why I Choose Framer for My Projects", "Framer bridges the gap between design vision and real-world execution. It lets me move faster, design freely, and deliver experiences that feel thoughtful and polished."]
  ],
  "the-roadmap-behind-great-design": [
    ["Start With Understanding", "Every strategy begins with insight. Understanding users, their behavior, and their motivations helps shape solutions that resonate. Research, interviews, and user personas form the foundation for thoughtful design."],
    ["Align Design With Goals", "Whether the objective is to drive conversions, build trust, or communicate a brand story, every choice should contribute to that goal. Design should be purposeful, not just beautiful."],
    ["Iterate and Evolve", "Prototyping, testing, and refining ideas through feedback loops uncovers challenges and improves the experience. A solid strategy keeps hierarchy, color, typography, and interactions cohesive."],
    ["Conclusion", "By combining research, insight, and iterative problem-solving, design strategy turns creativity into action and makes every experience more meaningful."]
  ],
  "designing-a-brand-that-speaks-without-words": [
    ["Understanding the Audience", "A successful strategy begins with empathy. User behavior, pain points, and motivations help create designs that resonate. Research, surveys, and persona development ground each decision."],
    ["Aligning Business Goals with Design", "Whether a project needs to increase conversions, build trust, or drive engagement, every element—from layout to typography to micro-interactions—should serve a purpose."],
    ["Iterative Problem Solving", "Prototypes, testing, and feedback loops refine ideas into practical solutions. Each iteration validates assumptions, uncovers challenges, and polishes the experience."],
    ["Bringing Vision to Life", "A clear strategy bridges creativity and execution, reduces inconsistencies, and turns abstract ideas into an actionable plan that reflects the brand’s vision."]
  ],
  "building-brand-atmosphere-through-color-typography": [
    ["Color as the Emotional Foundation", "Color is often the first thing people register. Warm tones can feel energetic or bold, cool tones can communicate calm and trust, and neutrals bring simplicity and sophistication."],
    ["Typography as the Voice of the Brand", "A sleek sans-serif may feel modern and minimal, while a refined serif can feel premium and timeless. Typography shapes readability and rhythm, and strengthens recognition through intentional sizing, spacing, and pairing."],
    ["Creating Harmony Between Color & Type", "The real magic happens when color and typography support one another. Together they work as a visual language that speaks before the content does."]
  ],
  "from-design-to-fully-functional-websites": [
    ["Designing Within Real Constraints", "Traditional design tools can leave responsiveness, spacing, and animation behavior uncertain. Working with real web layouts lets a designer see how a design behaves across screen sizes."],
    ["Animations That Feel Natural", "Animations can guide users, improve usability, and make digital experiences feel alive. Built-in tools make it possible to craft smooth interactions without a separate motion-code workflow."],
    ["The Perfect Balance Between Designer & Developer", "Framer balances visual authoring and custom development. Designers can create production-ready sites, while developers can extend them with code components, APIs, and scripts."],
    ["Optimizing Performance and SEO", "A site needs to load efficiently and remain discoverable. Performance and structured content matter alongside visual polish."]
  ],
  "how-visual-hierarchy-shapes-user-decisions": [
    ["A Visual Path Through the Page", "Every size, color, contrast, and spacing decision guides what visitors notice first, explore next, and ultimately choose. Poor hierarchy adds friction; good hierarchy makes decisions feel easy."],
    ["Build Around Natural Scanning", "Larger type demands attention, bolder colors draw the eye, and strategic spacing creates breathing room. Familiar F-pattern and Z-pattern layouts align with the way people naturally scan information."],
    ["Create Order and Momentum", "A strong headline draws people in, a clear subheading builds understanding, and a standout call to action points to what comes next. Hierarchy creates order in a noisy digital world."]
  ],
  "why-framer-makes-the-workflow-effortless": [
    ["Designing With Real Constraints", "Designing with real layout rules—padding, flex, grids, and breakpoints—means decisions reflect actual web behavior. You can see how a page works on mobile instead of guessing."],
    ["Real-Time Development Without the Rebuild Cycle", "Traditional handoffs can loop through design, development, feedback, adjustment, rebuild, and test. Framer compresses the process to design and publish; changes update immediately."],
    ["Why This Matters for Real Projects", "Clients get faster delivery, cleaner execution, more control, and better long-term maintainability. Creators gain room to experiment and refine details that can get lost in handoff cycles."]
  ],
  "designing-with-intent-why-clarity-beats-complexity": [
    ["The Intentional Designer’s Mindset", "Every element—from one icon to the site architecture—should serve a purpose. Start by defining what the user and the business need to achieve."],
    ["The Power of Omission", "A new feature adds cognitive load. Ask whether it improves the user journey or distracts from it, and keep the message focused so the next step remains clear."],
    ["SEO and User Experience Go Hand-in-Hand", "Modern search rewards useful, clear experiences. A simple design helps visitors understand the page and signals quality and authority."]
  ]
};

const slug = location.pathname.replace(/\/$/, "").split("/").pop();
if (document.body.dataset.page === "case-study" && projects[slug]) {
  const project = projects[slug];
  document.title = `${project.name} — Viterra`;
  const root = document.querySelector("[data-case-root]");
  const gallery = project.gallery.map((id, i) => `<img src="https://framerusercontent.com/images/${id}.png?width=1600&height=1200" alt="${project.name} project image ${i + 1}" loading="lazy">`).join("");
  root.innerHTML = `<section class="case-hero"><img src="${project.image}" alt="${project.name} project cover"><div class="case-title"><p class="eyebrow">SELECTED WORK / 0${Object.keys(projects).indexOf(slug) + 1}</p><h1>${project.name}</h1></div></section><section class="case-overview section-frame"><div><p class="eyebrow">OVERVIEW</p><p class="case-description">${project.description}</p><a class="text-link" href="${project.live}" target="_blank" rel="noreferrer">VIEW LIVE PROJECT <span>↗</span></a></div><dl class="case-facts"><div><dt>DATE</dt><dd>${project.date}</dd></div><div><dt>CLIENT</dt><dd>${project.client}</dd></div><div><dt>INDUSTRY</dt><dd>${project.industry}</dd></div><div><dt>SERVICES</dt><dd>${project.services}</dd></div></dl></section><section class="case-gallery section-frame">${gallery}</section><section class="case-next section-frame"><span class="eyebrow">NEXT PROJECT</span><a class="text-link" href="/boards/">EXPLORE ALL WORKS <span>↗</span></a></section>`;
}

if (document.body.dataset.page === "blog-index") {
  const root = document.querySelector("[data-blog-root]");
  root.innerHTML = `<section class="collection-hero section-frame"><p class="eyebrow">VITERRA / JOURNAL</p><h1>Notes from<br><em>the studio.</em></h1><div class="collection-intro"><span>JOURNAL / 08</span><p>Ideas on design, identity, and the details that make digital experiences feel considered.</p></div></section><section class="blog-grid section-frame">${Object.entries(articleTitles).map(([path, title], i) => `<a class="blog-card" href="/cloth/${path}/"><div class="blog-image"><img src="https://framerusercontent.com/images/${articleImages[path]}" alt="" loading="lazy"><span class="product-index">${String(i + 1).padStart(2, "0")} / 08</span></div><p class="eyebrow">DESIGN NOTES / NOV 18, 2025</p><h2>${title}</h2><p>${articleLeads[path]}</p><span class="text-link">READ ARTICLE <span>↗</span></span></a>`).join("")}</section>`;
}

if (document.body.dataset.page === "article") {
  const title = articleTitles[slug];
  const root = document.querySelector("[data-article-root]");
  if (title && root) {
    document.title = `${title} — Viterra Journal`;
    const lead = articleLeads[slug];
    const sections = (articleSections[slug] || []).map(([heading, body]) => `<h2>${heading}</h2><p>${body}</p>`).join("");
    root.innerHTML = `<section class="article-hero section-frame"><p class="eyebrow"><a href="/cloth/">JOURNAL</a> / DESIGN NOTES / NOV 18, 2025</p><h1>${title}</h1><p class="article-lead">${lead}</p></section><figure class="article-cover section-frame"><img src="https://framerusercontent.com/images/${articleImages[slug]}" alt="${title}" fetchpriority="high"></figure><article class="article-body"><p>${lead}</p>${sections}</article><section class="article-next section-frame"><span class="eyebrow">MORE FROM THE JOURNAL</span><a class="text-link" href="/cloth/">EXPLORE ALL ARTICLES <span>↗</span></a></section>`;
  }
}

if (document.body.dataset.page === "product") {
  const board = boards[new URLSearchParams(window.location.search).get("board")?.toLowerCase()] || boards.shard;
  const title = document.querySelector("#product-title");
  const image = document.querySelector("[data-product-image]");
  const name = document.querySelector("[data-product-name]");
  if (title && image) {
    title.textContent = board.name;
    image.src = board.image;
    image.alt = `${board.name} snowboard from Viterra`;
    document.title = `${board.name} — Viterra`;
  }
  if (name) name.textContent = board.name;
}
