"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import CodeIcon from "@mui/icons-material/Code";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import LinkIcon from "@mui/icons-material/Link";
import CustomButton from "../components/CustomButton";
import EmblaCarousel from "../components/EmblaCarousel";
import { ServicesPageData } from "../Data";

gsap.registerPlugin(ScrollTrigger);

const headlineGroups = ["Own Search.", "Shape Answers.", "Earn Trust."];

const platforms = ["Google", "ChatGPT", "Gemini", "Perplexity", "Copilot", "AI Overviews"];
const heroSlides = [0, 1, 2];
const heroSliderOptions = { dragFree: false, loop: true };
const heroSliderImages =
  ServicesPageData.services.find((service) => service.slug === "seo-aeo-geo")?.sliderImage ||
  ServicesPageData.services.find((service) => service.slug === "seo")?.sliderImage ||
  [];

const layers = [
  {
    key: "SEO",
    number: "01",
    accent: "seo",
    color: "#3ee5ad",
    title: "SEO – The Foundation",
    label: "You get Found",
    outcome: "Found",
    score: 86,
    text: "Search engines can find your website. Pages rank effectively. AI tools can discover your content.",
    icon: SearchIcon,
  },
  {
    key: "AEO",
    number: "02",
    accent: "aeo",
    color: "#2d73ff",
    title: "AEO – Making Pages Useful",
    label: "You get Answered",
    outcome: "Answered",
    score: 92,
    text: "Your content becomes the answer. AI platforms use your pages to respond to user questions directly.",
    icon: QuestionAnswerIcon,
  },
  {
    key: "GEO",
    number: "03",
    accent: "geo",
    color: "#9d54ff",
    title: "GEO – Building Trust",
    label: "You get Recommended",
    outcome: "Recommended",
    score: 78,
    text: "Reviews, mentions, citations, and authority help generative engines trust your business enough to suggest it.",
    icon: ShieldOutlinedIcon,
  },
];

const pinnedSteps = [
  {
    number: "01",
    title: "SEO builds the foundation.",
    text: "SEO helps your website rank higher in search engines such as Google. It improves visibility, brings visitors, and helps potential customers find your business online.",
    details: ["Crawlable pages", "Technical structure", "Keyword intent", "Search visibility"],
    traits: [
      { label: "Crawlable", icon: PublicIcon },
      { label: "Relevant", icon: SearchIcon },
      { label: "Visible", icon: BarChartIcon },
    ],
  },
  {
    number: "02",
    title: "AEO turns content into answers.",
    text: "Answer Engine Optimization helps AI platforms understand your content and use it to answer user questions.",
    details: ["FAQs on Service Pages", "Schema Markup", "Educational Articles", "Improved Page Structure"],
    traits: [
      { label: "Structured", icon: CodeIcon },
      { label: "Clear", icon: DescriptionOutlinedIcon },
      { label: "Citable", icon: FormatQuoteOutlinedIcon },
    ],
  },
  {
    number: "03",
    title: "GEO earns recommendations.",
    text: "Generative Engine Optimization builds authority and trust so AI tools are more likely to recommend your business.",
    details: ["Google Business Profile", "Review Generation", "Business Citations", "Backlink Building"],
    traits: [
      { label: "Authority", icon: ShieldOutlinedIcon },
      { label: "Trust", icon: StarBorderIcon },
      { label: "Recommendation", icon: AutoAwesomeIcon },
    ],
  },
];

const ecosystemSignals = [
  { label: "Crawlable pages", icon: PublicIcon },
  { label: "Technical structure", icon: CodeIcon },
  { label: "Keyword intent", icon: SearchIcon },
  { label: "Search visibility", icon: BarChartIcon },
  { label: "FAQs on Service Pages", icon: HelpOutlineIcon },
  { label: "Schema Markup", icon: AccountTreeOutlinedIcon },
  { label: "Educational Articles", icon: SchoolOutlinedIcon },
  { label: "Improved Page Structure", icon: DescriptionOutlinedIcon },
  { label: "Google Business Profile", icon: StorefrontOutlinedIcon },
  { label: "Review Generation", icon: EditOutlinedIcon },
  { label: "Business Citations", icon: FormatQuoteOutlinedIcon },
  { label: "Backlink Building", icon: LinkIcon },
];

const stats = [
  { value: 3, suffix: "x", label: "Search visibility system" },
  { value: 24, suffix: "/7", label: "Answer-ready content" },
  { value: 1, suffix: " AI", label: "Recommendation engine" },
];

const dashboardBenefits = [
  {
    title: "Compounding Growth",
    text: "Signals strengthen and reinforce each other",
    icon: TrackChangesIcon,
  },
  {
    title: "AI-Ready Content",
    text: "Structured, clear, and context-aware",
    icon: BarChartIcon,
  },
  {
    title: "Trusted Authority",
    text: "Reputation that AI platforms rely on",
    icon: ShieldOutlinedIcon,
  },
  {
    title: "Sustainable Results",
    text: "Long-term visibility that keeps growing",
    icon: StarBorderIcon,
  },
];

const faqs = [
  {
    question: "Why is SEO alone no longer enough?",
    answer: "SEO still matters, but customers now ask AI tools for direct answers. Your content must be structured for ranking, answering, and recommendation.",
  },
  {
    question: "What does AEO do?",
    answer: "AEO formats your content so search engines and AI platforms can understand questions, extract answers, and cite your pages.",
  },
  {
    question: "What does GEO do?",
    answer: "GEO builds brand credibility through reviews, citations, mentions, and authority signals that help AI systems trust your business.",
  },
];

const heroWord = {
  hidden: { y: "110%", opacity: 0 },
  visible: (index) => ({
    y: "0%",
    opacity: 1,
    transition: { delay: index * 0.08, duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  }),
};

const heroScene = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.1 },
  },
};

const heroReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.1, ease: "easeOut" },
  },
};

const heroBackdrop = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroConsole = {
  hidden: { opacity: 0, x: 54, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      when: "beforeChildren",
      staggerChildren: 0.09,
    },
  },
};

const heroDetail = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const cardContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const softCard = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const SearchEvolution = () => {
  const pageRef = useRef(null);
  const magneticRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".seMaskReveal, .toolCard, .proofStat, .ringCard, .pillarChip", { opacity: 1 });
        return;
      }

      const cursorX = gsap.quickTo(".seCursor", "x", { duration: 0.35, ease: "power3" });
      const cursorY = gsap.quickTo(".seCursor", "y", { duration: 0.35, ease: "power3" });
      const moveCursor = (event) => {
        cursorX(event.clientX);
        cursorY(event.clientY);
      };
      window.addEventListener("mousemove", moveCursor);

      gsap.to(".answerIcon", {
        y: (index) => (index % 2 ? 9 : -9),
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
        ease: "sine.inOut",
      });

      gsap.to(".answerPulse", {
        scale: 1.18,
        opacity: 0.48,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".logoMarquee__track", {
        xPercent: -50,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      const magnetic = magneticRef.current;
      if (magnetic) {
        const toX = gsap.quickTo(magnetic, "x", { duration: 0.32, ease: "power3" });
        const toY = gsap.quickTo(magnetic, "y", { duration: 0.32, ease: "power3" });
        const moveMagnet = (event) => {
          const rect = magnetic.getBoundingClientRect();
          toX((event.clientX - rect.left - rect.width / 2) * 0.22);
          toY((event.clientY - rect.top - rect.height / 2) * 0.22);
        };
        const resetMagnet = () => {
          toX(0);
          toY(0);
        };
        magnetic.addEventListener("mousemove", moveMagnet);
        magnetic.addEventListener("mouseleave", resetMagnet);
      }

      gsap.utils.toArray(".seMaskReveal").forEach((item) => {
        gsap.fromTo(
          item,
          { clipPath: "inset(0 100% 0 0)", y: 24, opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
      });

      gsap.fromTo(
        ".toolCard",
        { opacity: 0, y: 120, rotateX: 8, transformPerspective: 900 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".toolStory",
            start: "top top",
            end: "+=850",
            scrub: 1,
            pin: true,
          },
        }
      );

      gsap.fromTo(
        ".cardSignalPath",
        { strokeDashoffset: 420 },
        {
          strokeDashoffset: 0,
          duration: 1.25,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: ".toolGrid", start: "top 72%" },
        }
      );

      const chartPath = pageRef.current?.querySelector(".chartPath");
      if (chartPath) {
        const chartLength = chartPath.getTotalLength();
        const chartTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".chartPanel", start: "top 74%" },
        });

        gsap.set(chartPath, {
          strokeDasharray: chartLength,
          strokeDashoffset: chartLength,
        });

        chartTimeline
          .to(chartPath, {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: "power3.out",
          })
          .fromTo(
            ".chartArea",
            { opacity: 0 },
            { opacity: 1, duration: 1.1, ease: "power2.out" },
            0.45
          )
          .fromTo(
            ".chartPoint",
            { scale: 0, transformOrigin: "center" },
            { scale: 1, stagger: 0.07, duration: 0.45, ease: "back.out(2)" },
            0.55
          )
          .fromTo(
            ".chartCallout",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power2.out" },
            0.95
          )
          .fromTo(
            ".dashboardBenefit",
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, stagger: 0.09, duration: 0.55, ease: "power2.out" },
            1.05
          );

        const visibilityMetric = pageRef.current?.querySelector(".visibilityMetric");
        if (visibilityMetric) {
          gsap.fromTo(
            visibilityMetric,
            { innerText: 0 },
            {
              innerText: Number(visibilityMetric.dataset.value),
              snap: { innerText: 1 },
              duration: 1.6,
              ease: "power2.out",
              onUpdate() {
                visibilityMetric.textContent = `+${Math.round(
                  Number(visibilityMetric.innerText)
                )}%`;
              },
              scrollTrigger: { trigger: ".chartPanel", start: "top 74%" },
            }
          );
        }
      }

      gsap.utils.toArray(".proofStat").forEach((card, index) => {
        const number = card.querySelector(".statNumber");
        const value = Number(number.dataset.value);
        const suffix = number.dataset.suffix;

        gsap.fromTo(
          card,
          { opacity: 0, y: 46, skewY: -3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            delay: index * 0.1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: ".proofSection", start: "top 72%" },
          }
        );

        gsap.fromTo(
          number,
          { innerText: 0 },
          {
            innerText: value,
            snap: { innerText: 1 },
            duration: 1.2,
            delay: index * 0.12,
            onUpdate() {
              number.textContent = `${Math.round(Number(number.innerText))}${suffix}`;
            },
            scrollTrigger: { trigger: ".proofSection", start: "top 72%" },
          }
        );
      });

      mm.add("(min-width: 1200px)", () => {
        const stepCards = gsap.utils.toArray(".ecosystemStep");
        const detailCards = gsap.utils.toArray(".ecosystemDetail");

        gsap.set(stepCards.slice(1), { opacity: 0, y: 44, scale: 0.94 });
        gsap.set(detailCards, { opacity: 0, y: 26 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".ecosystemSection",
            start: "top top",
            end: "+=2400",
            scrub: true,
            pin: true,
          },
        });

        timeline.to(".ecosystemProgress span", { scaleY: 1, ease: "none" }, 0);

        stepCards.forEach((card, index) => {
          if (index > 0) {
            timeline.to(stepCards[index - 1], { opacity: 0, y: -44, scale: 1.06, duration: 0.38 }, index);
            timeline.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.45 }, index + 0.08);
          }

          timeline.to(
            detailCards.slice(index * 4, index * 4 + 4),
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.35 },
            index + 0.18
          );
        });
      });

      gsap.utils.toArray(".ringCard").forEach((card) => {
        const ring = card.querySelector(".ringProgress");
        const number = card.querySelector(".ringNumber");
        const value = Number(number.dataset.value);
        const circumference = 2 * Math.PI * 54;

        gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference });
        gsap.fromTo(
          number,
          { innerText: 0 },
          {
            innerText: value,
            snap: { innerText: 1 },
            duration: 1.35,
            onUpdate() {
              number.textContent = `${Math.round(Number(number.innerText))}%`;
            },
            scrollTrigger: { trigger: ".futureSection", start: "top 70%" },
          }
        );
        gsap.to(ring, {
          strokeDashoffset: circumference - (value / 100) * circumference,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: { trigger: ".futureSection", start: "top 70%" },
        });
      });

      gsap.fromTo(
        ".pillarChip",
        { opacity: 0, x: (index) => [-180, 0, 180][index], y: (index) => [30, -50, 30][index] },
        {
          opacity: 1,
          x: 0,
          y: 0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".finalStrategy",
            start: "top top",
            end: "+=1000",
            scrub: 1,
            pin: true,
          },
        }
      );

      gsap.to(".finalGlow", {
        opacity: 1,
        scale: 1.18,
        scrollTrigger: {
          trigger: ".finalStrategy",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };
    }, pageRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <Box ref={pageRef} className="searchEvolutionPage">
      <div className="seCursor" aria-hidden="true" />
      <motion.section
        className="cinematicHero"
        variants={heroScene}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="heroCarousel" variants={heroBackdrop} aria-hidden="true">
          <EmblaCarousel
            slides={heroSlides}
            options={heroSliderOptions}
            sliderImage={heroSliderImages}
            autoPlay
            autoPlayDelay={4800}
          />
        </motion.div>
        <Container>
          <motion.div className="heroGrid" variants={heroScene}>
            <motion.div className="heroCopy" variants={heroScene}>
              <motion.div className="heroOverline" variants={heroReveal}>
                <span>01 / Modern search</span>
                <span className="heroOverline__status">
                  <i />
                  System active
                </span>
              </motion.div>
              <motion.span className="sectionKicker" variants={heroReveal}>
                <AutoAwesomeIcon />
                The AI visibility system
              </motion.span>
              <motion.h1 variants={heroReveal} aria-label="Own search. Shape answers. Earn trust.">
                {headlineGroups.map((group, index) => (
                  <span className="headlineMask" key={group}>
                    <motion.span custom={index} initial="hidden" animate="visible" variants={heroWord}>
                      {group}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
              <motion.div className="heroSummary" variants={heroReveal}>
                <i aria-hidden="true" />
                <p>
                  One connected strategy for Google rankings, AI-generated answers, and trusted
                  recommendations—built to make your brand visible wherever decisions begin.
                </p>
              </motion.div>
              <motion.div className="heroActions" variants={heroReveal}>
                <div className="magneticCta" ref={magneticRef}>
                  <CustomButton link="/contact-us">Build My Visibility Strategy</CustomButton>
                </div>
                <a href="#ecosystem">Watch the strategy unfold</a>
              </motion.div>
              <motion.div
                className="heroFormula"
                variants={heroScene}
                aria-label="SEO, AEO and GEO outcomes"
              >
                <motion.div
                  className="heroFormula__item heroFormula__item--seo"
                  variants={heroReveal}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <span>01</span>
                  <div>
                    <strong>SEO</strong>
                    <small>Get found</small>
                  </div>
                </motion.div>
                <motion.div
                  className="heroFormula__item heroFormula__item--aeo"
                  variants={heroReveal}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <span>02</span>
                  <div>
                    <strong>AEO</strong>
                    <small>Get cited</small>
                  </div>
                </motion.div>
                <motion.div
                  className="heroFormula__item heroFormula__item--geo"
                  variants={heroReveal}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  <span>03</span>
                  <div>
                    <strong>GEO</strong>
                    <small>Get chosen</small>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="answerPreview"
              variants={heroConsole}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
            >
              <div className="heroScanner" aria-hidden="true" />
              <div className="scannerSweep" aria-hidden="true" />
              <div className="scannerReticle" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className="scannerParticles" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, particleIndex) => (
                  <i key={particleIndex} />
                ))}
              </div>
              <div className="scannerCorners" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <motion.div className="previewChrome" variants={heroDetail}>
                <span>
                  <i />
                  AI visibility intelligence
                </span>
                <small>Live / 03 signals</small>
              </motion.div>
              <div className="answerOrbit answerOrbit--outer" aria-hidden="true" />
              <div className="answerOrbit answerOrbit--inner" aria-hidden="true" />
              <div className="orbitDot orbitDot--outer" aria-hidden="true">
                <i />
              </div>
              <div className="orbitDot orbitDot--inner" aria-hidden="true">
                <i />
              </div>
              <motion.div
                className="signalConnector signalConnector--one"
                variants={heroFade}
                aria-hidden="true"
              />
              <motion.div
                className="signalConnector signalConnector--two"
                variants={heroFade}
                aria-hidden="true"
              />
              <motion.div
                className="signalConnector signalConnector--three"
                variants={heroFade}
                aria-hidden="true"
              />
              <motion.div className="answerIcon answerIcon--one" variants={heroFade}>
                <span>Google</span>
                <small>Found</small>
              </motion.div>
              <motion.div className="answerIcon answerIcon--two" variants={heroFade}>
                <span>AI Answers</span>
                <small>Cited</small>
              </motion.div>
              <motion.div className="answerIcon answerIcon--three" variants={heroFade}>
                <span>Generative Search</span>
                <small>Chosen</small>
              </motion.div>
              <div className="answerPulse">
                <small>Visibility</small>
                <strong>94</strong>
                <span>AI ready</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="logoMarquee" variants={heroReveal}>
            <div className="logoMarquee__track">
              {[...platforms, ...platforms].map((platform, index) => (
                <span key={`${platform}-${index}`}>{platform}</span>
              ))}
            </div>
          </motion.div>
        </Container>
      </motion.section>

        <section className="toolStory" id="visibility-dashboard">
        <Container>
          <div className="sectionIntro seMaskReveal">
            <span className="sectionKicker">Search tool that delivers results</span>
            <h2>SEO Tool That Delivers Real Results</h2>
            <p>
              A complete visibility system that combines rankings, answer extraction, and trust
              signals into one content strategy.
            </p>
          </div>
          <div className="toolGrid">
            {layers.map((layer) => {
              const Icon = layer.icon;

              return (
                <motion.article
                  className={`toolCard toolCard--${layer.accent}`}
                  key={layer.key}
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="toolCard__top">
                    <div className="toolCard__icon">
                      <Icon />
                    </div>
                    <span className="toolCard__number">{layer.number}</span>
                    <span className="toolCard__matrix" aria-hidden="true">
                      {Array.from({ length: 15 }).map((_, dotIndex) => (
                        <i key={dotIndex} />
                      ))}
                    </span>
                  </div>
                  <span className="toolCard__tag">{layer.key}</span>
                  <h3>{layer.title}</h3>
                  <p>{layer.text}</p>
                  <svg
                    className="toolCard__signal"
                    viewBox="0 0 420 110"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      className="cardSignalPath"
                      d="M0 91 C62 89 84 88 118 83 C160 77 173 57 215 54 C264 51 282 63 322 47 C362 31 386 31 420 8"
                    />
                  </svg>
                  <div className="toolCard__outcome">
                    <VerifiedIcon />
                    <span>
                      You get <strong>{layer.outcome}</strong>
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
          <div className="chartPanel">
            <div className="dashboardMain">
              <aside className="dashboardSummary">
                <div className="dashboardTitle">
                  <div className="dashboardTitle__icon">
                    <TrendingUpIcon />
                  </div>
                  <div>
                    <span>AI Visibility Lift</span>
                    <h3>Visibility trajectory</h3>
                  </div>
                </div>
                <p>
                  Stronger signals across SEO, AEO, and GEO compound over time—driving higher
                  visibility in AI results.
                </p>
                <div className="visibilityScore">
                  <div className="visibilityScore__icon">
                    <TrendingUpIcon />
                  </div>
                  <div>
                    <span>Overall Visibility</span>
                    <strong className="visibilityMetric" data-value="247">
                      +0%
                    </strong>
                    <small>vs last 6 months</small>
                  </div>
                </div>
              </aside>

              <div className="chartVisualization">
                <div className="chartLegend">
                  <i />
                  Connected signals
                </div>
                <svg viewBox="0 0 900 330" role="img" aria-label="Monthly AI visibility trajectory">
                  <defs>
                    <linearGradient id="visibilityArea" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#3ee5ad" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#3ee5ad" stopOpacity="0" />
                    </linearGradient>
                    <filter id="pointGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g className="chartGrid" aria-hidden="true">
                    <path d="M66 42H858M66 95H858M66 148H858M66 201H858M66 254H858" />
                    <path className="chartAxis" d="M66 42V254H858" />
                  </g>

                  <g className="chartYAxis" aria-hidden="true">
                    <text x="10" y="47">100%</text>
                    <text x="19" y="100">75%</text>
                    <text x="19" y="153">50%</text>
                    <text x="19" y="206">25%</text>
                    <text x="28" y="259">0%</text>
                  </g>

                  <path
                    className="chartArea"
                    d="M66 235 L138 230 L210 216 L282 191 L354 174 L426 115 L498 126 L570 102 L642 62 L714 64 L786 50 L858 22 L858 254 L66 254 Z"
                  />
                  <path
                    className="chartPath"
                    d="M66 235 L138 230 L210 216 L282 191 L354 174 L426 115 L498 126 L570 102 L642 62 L714 64 L786 50 L858 22"
                  />

                  <g className="chartPoints" filter="url(#pointGlow)" aria-hidden="true">
                    {[
                      [66, 235],
                      [138, 230],
                      [210, 216],
                      [282, 191],
                      [354, 174],
                      [426, 115],
                      [498, 126],
                      [570, 102],
                      [642, 62],
                      [714, 64],
                      [786, 50],
                      [858, 22],
                    ].map(([cx, cy], pointIndex) => (
                      <circle
                        className="chartPoint"
                        cx={cx}
                        cy={cy}
                        r={pointIndex === 11 ? 8 : 5}
                        key={`${cx}-${cy}`}
                      />
                    ))}
                  </g>

                  <g className="chartCallout chartCallout--start" aria-hidden="true">
                    <rect x="45" y="183" width="58" height="36" rx="8" />
                    <text x="74" y="207">18%</text>
                  </g>
                  <g className="chartCallout" aria-hidden="true">
                    <rect x="394" y="61" width="66" height="36" rx="8" />
                    <text x="427" y="85">92%</text>
                  </g>
                  <g className="chartCallout" aria-hidden="true">
                    <rect x="609" y="9" width="68" height="36" rx="8" />
                    <text x="643" y="33">163%</text>
                  </g>
                  <g className="chartCallout chartCallout--final" aria-hidden="true">
                    <rect x="812" y="0" width="76" height="38" rx="8" />
                    <text x="850" y="25">247%</text>
                  </g>

                  <g className="chartXAxis" aria-hidden="true">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                      (month, monthIndex) => (
                        <text x={66 + monthIndex * 72} y="292" key={month}>
                          {month}
                        </text>
                      )
                    )}
                  </g>
                </svg>
              </div>
            </div>
            <div className="dashboardBenefits">
              {dashboardBenefits.map((benefit) => {
                const BenefitIcon = benefit.icon;

                return (
                  <div className="dashboardBenefit" key={benefit.title}>
                    <div className="dashboardBenefit__icon">
                      <BenefitIcon />
                    </div>
                    <div>
                      <strong>{benefit.title}</strong>
                      <span>{benefit.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
        </section>

        <section className="proofSection">
        <Container>
          <div className="proofLayout">
            <div className="proofCopy seMaskReveal">
              <span className="sectionKicker">Proven results</span>
              <h2>Proven Search Results You Can Trust</h2>
              <p>
                The new search strategy is not one tactic. SEO gives your site structure, AEO makes
                the content useful, and GEO builds the reputation layer.
              </p>
            </div>
            <div className="proofStats">
              {stats.map((stat) => (
                <article className="proofStat" key={stat.label}>
                  <strong className="statNumber" data-value={stat.value} data-suffix={stat.suffix}>
                    0{stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </Container>
        </section>

        <section className="ecosystemSection" id="ecosystem">
        <div className="ecosystemIndex" aria-hidden="true">
          <strong>03</strong>
          <span>/</span>
          <span>The ecosystem</span>
        </div>
        <Container>
          <div className="ecosystemLayout">
            <div className="ecosystemLeft">
              <span className="sectionKicker ecosystemKicker">
                <PublicIcon />
                Full visibility ecosystem
              </span>
              <h2>
                Search is now a <em>full visibility</em> ecosystem.
              </h2>
              <p className="ecosystemSummary">
                Every signal matters. Together, these elements make your website discoverable,
                trusted, and recommended by search engines and AI platforms.
              </p>
              <div className="ecosystemProgress">
                <span />
              </div>
              <div className="ecosystemDetails">
                {ecosystemSignals.map((signal) => {
                  const SignalIcon = signal.icon;

                  return (
                    <motion.article
                      className="ecosystemDetail"
                      key={signal.label}
                      whileHover={{ x: 5, borderColor: "rgba(62, 229, 173, 0.62)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <i>
                        <SignalIcon />
                      </i>
                      <span>{signal.label}</span>
                    </motion.article>
                  );
                })}
              </div>
            </div>
            <div className="ecosystemRight">
              {pinnedSteps.map((step) => (
                <article className="ecosystemStep" key={step.number}>
                  <div className="ecosystemOrbit" aria-hidden="true">
                    <i className="ecosystemOrbit__ring ecosystemOrbit__ring--one" />
                    <i className="ecosystemOrbit__ring ecosystemOrbit__ring--two" />
                    <i className="ecosystemOrbit__ring ecosystemOrbit__ring--three" />
                    <i className="ecosystemOrbit__ring ecosystemOrbit__ring--four" />
                    <i className="ecosystemOrbit__core" />
                    <i className="ecosystemOrbit__dot ecosystemOrbit__dot--one" />
                    <i className="ecosystemOrbit__dot ecosystemOrbit__dot--two" />
                    <i className="ecosystemOrbit__dot ecosystemOrbit__dot--three" />
                  </div>
                  <div className="ecosystemStep__copy">
                    <span className="ecosystemStep__number">{step.number}</span>
                    <i className="ecosystemStep__line" aria-hidden="true" />
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                  <div className="ecosystemTraits">
                    {step.traits.map((trait) => {
                      const TraitIcon = trait.icon;

                      return (
                        <div className="ecosystemTrait" key={trait.label}>
                          <i>
                            <TraitIcon />
                          </i>
                          <span>{trait.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
        </section>

        <section className="futureSection">
        <Container>
          <div className="sectionIntro seMaskReveal">
            <span className="sectionKicker">The future of search</span>
            <h2>The Future of Search: Combining SEO, AEO & GEO</h2>
            <p>
              SEO provides the foundation. AEO makes your content useful for AI answers. GEO
              strengthens your reputation so AI systems can trust and recommend your business.
            </p>
          </div>
          <motion.div
            className="ringGrid"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {layers.map((layer) => (
              <motion.article className="ringCard" variants={softCard} key={layer.key}>
                <svg viewBox="0 0 140 140">
                  <circle className="ringTrack" cx="70" cy="70" r="54" />
                  <circle className="ringProgress" cx="70" cy="70" r="54" style={{ stroke: layer.color }} />
                </svg>
                <strong className="ringNumber" data-value={layer.score}>
                  0%
                </strong>
                <span>{layer.key}</span>
                <h3>{layer.label}</h3>
                <p>{layer.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
        </section>

        <section className="answeredSection">
        <Container>
          <div className="answeredLayout">
            <div className="seMaskReveal">
              <span className="sectionKicker">Your questions answered</span>
              <h2>Your Questions Answered</h2>
              <p>AEO and GEO do not replace SEO. They expand it for modern search behavior.</p>
            </div>
            <div className="faqStack">
              {faqs.map((item, index) => {
                const active = openFaq === index;

                return (
                  <article className={active ? "active" : ""} key={item.question}>
                    <button type="button" onClick={() => setOpenFaq(active ? -1 : index)}>
                      {item.question}
                      <motion.span animate={{ rotate: active ? 180 : 0 }}>
                        <ExpandMoreIcon />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {active && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <p>{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
        </section>

        <section className="finalStrategy">
        <div className="finalGlow" />
        <Container>
          <div className="finalPanel">
            <div className="finalOrbit finalOrbit--one" aria-hidden="true" />
            <div className="finalOrbit finalOrbit--two" aria-hidden="true" />
            <span className="sectionKicker">Final summary</span>
            <h2>Your Complete Digital Visibility Strategy</h2>
            <p>
              SEO gets you found. AEO gets you answered. GEO gets you recommended. All three
              complete the modern visibility stack.
            </p>
            <div className="pillarConverge">
              <span className="pillarChip">Search Visibility</span>
              <span className="pillarChip">Brand Authority</span>
              <span className="pillarChip">AI Recommendations</span>
            </div>
            <CustomButton link="/contact-us">Start My SEO + AEO + GEO Plan</CustomButton>
          </div>
        </Container>
        </section>
    </Box>
  );
};

export default SearchEvolution;
