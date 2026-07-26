// app/science/articles.ts
// Central data store for all science articles.
// To publish a new article, add a new object to the ARTICLES array.
//
// Article body format: an array of "blocks".
//   { type: "heading", text: "..." }   -> a section heading
//   { type: "paragraph", text: "..." } -> a prose paragraph
//   { type: "quote", text: "..." }     -> a highlighted pull-quote
//   { type: "image", src: "/science/x.png", caption: "..." } -> a figure
//     (put the image file in your project's public/science/ folder)

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; caption?: string; text?: never };

export interface Article {
  slug: string; // URL: /science/[slug]
  title: string;
  topic: string; // short tag shown on the card
  date: string;
  excerpt: string;
  coverGradient: string;
  coverEmblem: string;
  blocks: ArticleBlock[];
}

export const ARTICLES: Article[] = [
  // ================================================================
  // 1. SUPERPOSITION
  // ================================================================
  {
    slug: "superposition",
    title: "Everything Quantum I: Superposition",
    topic: "Quantum Mechanics",
    date: "First published on Medium",
    excerpt:
      "A whole universe sits right in front of your eyes, and yet it is invisible to you. Welcome to the crazy, confusing, amazing world of the quantum.",
    coverGradient:
      "radial-gradient(circle at 35% 35%, #2b1f4e 0%, #171233 55%, #050810 100%)",
    coverEmblem: "◐",
    blocks: [
      {
        type: "paragraph",
        text: "What is Quantum Mechanics? So many of us have heard of it but never dared to take a peek into it. Well, today we are all going to take a short glimpse into one of the most basic principles of quantum mechanics — superposition — and hope that this clears some of the misconceptions any of you have about it. In quantum mechanics, nothing is direct, nothing is simple, and it is so natural to get lost in this humongous mess that even our own renowned Mr. Richard Feynman quoted:",
      },
      {
        type: "quote",
        text: "\u201cIf you think you understand quantum mechanics, you don't understand quantum mechanics.\u201d",
      },
      {
        type: "paragraph",
        text: "Take a look around yourself or outside your window. What do you see? Your car, the tree outside, your hairbrush. What do you think about them? Probably nothing — but think about what those cars are made of. Metals, plastics. And what are those made of? Atoms. And what's that made of? \u201cWe know — electrons, protons, blah blah.\u201d Tell me, what are those made of? You stuck? That is where quantum mechanics comes in: the study of atoms and subatomic particles and things so minute that there is a whole universe right in front of your eyes, and yet it is invisible to you.",
      },
      {
        type: "paragraph",
        text: "As of this moment — as I am writing this and you are reading this — billions of neutrinos are literally, I mean literally, travelling through your body, and you don't even feel them. So quantum mechanics is this: the study of the behaviour and interactions of objects at the scale of atoms. It's a crazy, confusing, amazing world, which we are going to travel together.",
      },
      {
        type: "heading",
        text: "A Brief History of Quantum Mechanics",
      },
      {
        type: "paragraph",
        text: "Before I go into the principles of it all, it felt right to discuss where this whole idea was born from. In October 1900, Planck was trying to understand the concept of black body radiation, which concluded with his hypothesis that on a subatomic level, the emission of electromagnetic radiation from hot objects occurs in packets of energy, which he termed \u201cquanta.\u201d",
      },
      {
        type: "paragraph",
        text: "Then, in 1905, came Einstein and the photoelectric effect. In the photoelectric effect, light of sufficiently short wavelength, when shone on a metal, ejected electrons from the surface of the metal. When scientists tried to examine this effect, classical mechanics was of no help to them. So Einstein used Planck's theory to treat light as being made of discrete quanta of energy, which were fancily named \u201cphotons\u201d in the case of light.",
      },
      {
        type: "heading",
        text: "Bits and Qubits",
      },
      {
        type: "paragraph",
        text: "Now that we are through with the history of it all, let's talk about the basic terminology of quantum mechanics. Bits are the language of classical computers: a bit is the most basic unit of information, and it can only be 0 or 1. Classical bits are pulses of electricity.",
      },
      {
        type: "paragraph",
        text: "A qubit — a quantum bit — is the most fundamental unit of information used in quantum computing. In quantum computing, there exist two basic states, written |0\u27e9 and |1\u27e9, but there also exist superpositions of the 0 and 1 states, all of which can be represented on the Bloch sphere — a sort of 3D map of these states, where every possible qubit can be represented with the help of a vector.",
      },
      {
        type: "paragraph",
        text: "Quantum computing is computation carried out in a quantum computer that harnesses the laws of quantum mechanics to solve complex problems much faster than a classical computer. It manipulates the quantum states of qubits in a controlled way to perform algorithms. But to truly understand superposition, you first need to understand the wave-particle duality of nature.",
      },
      {
        type: "heading",
        text: "Wave-Particle Duality",
      },
      {
        type: "paragraph",
        text: "Wave-particle duality states that any quantum entity or object can be described as a particle or as a wave. Waves can exhibit particle-like properties, and particles can exhibit wave-like properties — which directly contradicts Newtonian mechanics.",
      },
      {
        type: "paragraph",
        text: "In our everyday life, we see particle as well as wave nature. Roll a ball on the ground and it follows a fixed path; throw a ball and it follows a fixed parabolic trajectory. As for wave nature — when you drive a boat through water, the waves travel outward along the surface. But when we go to smaller scales, such as electrons or protons or any subatomic particle, what applies and what doesn't? Let us take a look.",
      },
      {
        type: "heading",
        text: "The Double Slit Experiment",
      },
      {
        type: "paragraph",
        text: "In this experiment, we get to confirm the wave-particle duality of quantum objects such as electrons and photons. For the longest time, around the 1800s, most scientists stood by the idea that light was made up of particles. But then came the great Thomas Young, who conducted this experiment to contradict that idea and prove that light was constituted of waves.",
      },
      {
        type: "image",
        src: "/science/sp-double-slit.png",
        caption:
          "The double slit experiment: quantum objects sent through two slits produce an interference pattern \u2014 as if each one travelled as a wave.",
      },
      {
        type: "paragraph",
        text: "He took a metal sheet and made two slits in it, then placed a light source directly in front of it. The basic idea: if light were made of particles, some would bounce off the sheet, and those that made their way through the slits would create the image of the slits on the screen behind — think of it as spray painting over a stencil. But if light were made of waves, it would exhibit interference: any two waves either undergo constructive interference and create a brighter spot on the screen, or destructive interference and leave a dark spot, resulting in an interference pattern.",
      },
      {
        type: "paragraph",
        text: "And the result of the experiment was just that — an interference pattern.",
      },
      {
        type: "paragraph",
        text: "But come the 1900s, when Planck had introduced the quantisation of light and Einstein had suggested that light was made of particles called photons — that light was both a wave and a particle — scientists wanted to test those notions. So we tried the double slit experiment again, but this time, instead of taking light as a whole, we sent quanta of light — photons — one by one through the slits. And this resulted in something nobody really expected.",
      },
      {
        type: "paragraph",
        text: "It resulted in the interference pattern again — not the spray-paint stencil pattern. It was as if each photon knew what to do and where to go once it travelled through the slit, as if it were already a wave. All the possible paths of these particles can interfere with each other, even though only one of the possible paths actually happens.",
      },
      {
        type: "quote",
        text: "All these realities exist at once — a concept known as superposition — until the final result occurs.",
      },
      {
        type: "paragraph",
        text: "Here is what is trippy: once we put detectors on the slits to see which slit the photon was travelling through, the interference pattern was gone. It was as if, as soon as we tried to measure the result, it collapsed those many realities into one — a phenomenon known as measurement in quantum mechanics. This experiment opened the doors for quantum mechanics and proved that quantum particles exist both as wave and particle. We also have a wave nature in us — it's just that a human being, or even a ball, has such a small wavelength that our wave-like nature is practically negligible.",
      },
      {
        type: "heading",
        text: "Superposition",
      },
      {
        type: "quote",
        text: "Superposition: the ability of a quantum system to be in multiple states at the same time — until it is measured.",
      },
      {
        type: "paragraph",
        text: "Let's go through this step by step. Qubits — and actually any quantum mechanical system — can exist in multiple states at once. We may be more likely to find the object in one state or another, but all states are possible at the same time. Don't worry if this sounds trippy; the more you get into it, the clearer it becomes.",
      },
      {
        type: "paragraph",
        text: "A simple picture: dip two fingers into a pond at two different points simultaneously. Waves travel outward from each point and eventually overlap to form a complex pattern — the superposition of waves. Or take a mathematical approach: the equation x\u00b2 = 9 leads to the solutions x = +3 and x = \u22123. Here, x exists in two different solutions — two states — at the same time.",
      },
      {
        type: "heading",
        text: "Schr\u00f6dinger's Cat",
      },
      {
        type: "image",
        src: "/science/sp-schrodingers-cat.png",
        caption:
          "Schr\u00f6dinger's cat: until the box is opened, the cat exists in a superposition of alive and dead.",
      },
      {
        type: "paragraph",
        text: "This iconic thought experiment, devised by Erwin Schr\u00f6dinger, explains the quantum principle of superposition. Imagine a locked box with a cat in it. The box has a radioactive substance directly linked to a vial of poison. As the radioactive substance decays, it triggers a Geiger counter, which releases the poison from the vial — killing the cat. Don't get confused by the \u201cGeiger counter\u201d or \u201cradioactive substance\u201d; just know that there is poison that could maybe kill the cat.",
      },
      {
        type: "paragraph",
        text: "But here's the paradox: the cat is locked in the box. You, as an observer from the outside, can't witness whether the radioactive substance has decayed, whether it has released the poison, or whether that has killed the cat. At this point, the cat — in your mind — can be alive or dead. Mathematically speaking, there is a 50% probability the cat is alive and a 50% probability the cat is dead; while the box is locked, the cat is \u201chalf alive and half dead.\u201d Only when you unlock the box does that superposition of alive-and-dead collapse into one reality: alive, or dead.",
      },
      {
        type: "paragraph",
        text: "That is what superposition is. The cat, as a quantum entity, existed in a superposition of two states until the result was observed — which collapsed the superposition into a single reality. This collapse is known as measurement, but we will get into that in the next article.",
      },
      {
        type: "paragraph",
        text: "One more thing: this principle of superposition applies to human beings too — it's just that our wave-like property is so negligible that the effect of superposition is not visible on us. That is why you don't exist in Australia and Canada at the same time, and why the cat, in reality, is not alive and dead at once. Do not worry if you got confused; it is totally natural. The more you read about this, the clearer it will become. I hope you enjoyed reading this as much as I enjoyed writing it. See you in the next one!",
      },
    ],
  },

  // ================================================================
  // 2. COSMIC MICROWAVE BACKGROUND
  // ================================================================
  {
    slug: "cosmic-microwave-background",
    title: "The Hidden Background of the Cosmos",
    topic: "Cosmology",
    date: "First published on Medium",
    excerpt:
      "There exists a static noise throughout outer space, just like the radio static from your television. Its origin is tied to the origin of the Universe itself.",
    coverGradient:
      "radial-gradient(circle at 65% 40%, #4e3a1f 0%, #2b2012 55%, #050810 100%)",
    coverEmblem: "∿",
    blocks: [
      {
        type: "paragraph",
        text: "There exists a static noise throughout outer space, just like the radio static noise from your television. The origin of this noise is related not only to our origin but also to that of the Universe itself!",
      },
      {
        type: "paragraph",
        text: "Discovered as an \u201caccidental discovery,\u201d this noise is what is known as Cosmic Microwave Background Radiation. What is it, and why is it such a big deal?",
      },
      {
        type: "image",
        src: "/science/cmb-horn-antenna.jpg",
        caption:
          "The Holmdel horn antenna at Bell Labs, where Penzias and Wilson stumbled upon the CMB in 1964.",
      },
      {
        type: "heading",
        text: "A Review of Radiation",
      },
      {
        type: "paragraph",
        text: "Radiation consists of electric and magnetic fields oscillating perpendicular to each other, as well as perpendicular to the direction of propagation of the radiation. An ideal body that, when heated, emits radiation of all wavelengths is called a black body.",
      },
      {
        type: "image",
        src: "/science/cmb-em-wave.gif",
        caption:
          "Electromagnetic radiation: electric and magnetic fields oscillating perpendicular to each other.",
      },
      {
        type: "paragraph",
        text: "The electromagnetic radiation being emitted has different intensities at different wavelengths, tracing out a graph known as the black body curve, or thermal spectrum. It is called a thermal spectrum because of the random motion of the particles inside a system, which in turn depends on its temperature. So everything that has a temperature also emits electromagnetic radiation that can be traced out in a thermal spectrum.",
      },
      {
        type: "image",
        src: "/science/cmb-blackbody-curve.png",
        caption:
          "The black body curve: intensity of emitted radiation across wavelengths, shifting with temperature.",
      },
      {
        type: "quote",
        text: "Things start getting interesting at a temperature of 2.7 K \u2014 where the thermal spectrum traces out an exact copy of the Cosmic Microwave Background.",
      },
      {
        type: "heading",
        text: "So, What Is the Cosmic Microwave Background?",
      },
      {
        type: "paragraph",
        text: "The Cosmic Microwave Background is electromagnetic radiation which, in layman's terms, is the residual heat left over from the Big Bang. To explain how the CMB is related to the Big Bang, we have to travel to the beginning of, well, everything. Let's travel back to when the universe was nothing bigger than a quantum particle — the \u201csingularity\u201d of \u201cinfinite\u201d density. This universe (its space-time, to be exact) then began to expand — and it is still expanding, and that expansion is accelerating.",
      },
      {
        type: "paragraph",
        text: "For the next 380,000 years, the universe was a bowl of blazing hot soup mixed with elementary particles: electrons, protons, and photons. At such high temperatures, electrons and protons were restricted from combining into atoms. The universe was hence present in the form of plasma and emitted electromagnetic radiation like a black body. However, due to the high density, this radiation could not travel large distances before colliding with another free electron and being deviated from its path — it was as if the whole universe were a strong beam of orangish light being snuffed out by a fog.",
      },
      {
        type: "image",
        src: "/science/cmb-plasma-fog.png",
        caption:
          "For 380,000 years the universe was an opaque plasma fog \u2014 light could not travel far before scattering.",
      },
      {
        type: "paragraph",
        text: "It was after these 380,000 \u201cdark years\u201d that the formation of the Cosmic Microwave Background took place. At 3000 K, the universe slowly began to cool down; matter started condensing to form planets and galaxies, and electrons and protons could finally combine to form atoms. Now, due to the lack of free electrons throughout the universe, electromagnetic radiation could travel long distances before being deflected. This radiation now persists throughout outer space and is known as the Cosmic Microwave Background.",
      },
      {
        type: "image",
        src: "/science/cmb-planck-map.png",
        caption:
          "The all-sky map of the CMB \u2014 the oldest light in the universe, imaged by WMAP. (NASA)",
      },
      {
        type: "heading",
        text: "Why Is Space Black Instead of Orange?",
      },
      {
        type: "paragraph",
        text: "This is because of the expansion of spacetime. Outer space is under accelerated expansion, so light travelling through it is also expanding — remember, Hubble expansion is the expansion of space-time itself, so everything inside it expands with it. In reality, this means the wavelength of light is being \u201cstretched\u201d to longer wavelengths, a process known as cosmological redshift. The earlier orange-red glow of space is now black because the wavelength of that orange radiation has been stretched to lengths beyond the visible range.",
      },
      {
        type: "image",
        src: "/science/cmb-redshift.png",
        caption:
          "Cosmological redshift: as space expands, light waves stretch to longer, redder wavelengths.",
      },
      {
        type: "heading",
        text: "Why Does It Matter?",
      },
      {
        type: "paragraph",
        text: "The CMB helps us predict the origin of the universe by approximately calculating how long a radiation signature has been travelling before reaching Earth. Studying it is essential for tracing the history of the origin of our universe — a history that eventually roots back to our own origins.",
      },
    ],
  },

  // ================================================================
  // 3. STRING THEORY
  // ================================================================
  {
    slug: "string-theory",
    title: "String Theory: The Theory of Everything",
    topic: "Theoretical Physics",
    date: "First published on Medium",
    excerpt:
      "What if the most fundamental things in the universe aren't particles at all, but tiny vibrating strings — each note a different kind of matter?",
    coverGradient:
      "radial-gradient(circle at 40% 60%, #1f3a4e 0%, #12222e 55%, #050810 100%)",
    coverEmblem: "≋",
    blocks: [
      {
        type: "paragraph",
        text: "Before we get into the founding principles of this often misinterpreted theory, I would like to acknowledge that this theory is still not proven, and many theoretical physicists in the modern era are still trying to work out the science behind it.",
      },
      {
        type: "paragraph",
        text: "As we all know, our entire universe is composed of constituent particles known as atoms. These atoms were made to collide with each other to give rise to a new set of particles — protons, electrons, and so on — known as the elementary particles. The basic idea of string theory is that these elementary particles are composed of strings, present in a single dimension, similar to the strings of a guitar that vibrate to produce different notes. These strings, however, vibrate at different frequencies to produce different elementary particles, each different from one another in their physical properties.",
      },
      {
        type: "heading",
        text: "Einstein and the Curvature of Space-Time",
      },
      {
        type: "paragraph",
        text: "To search deeper, let us go to the very beginning: 1907, the time Einstein was working out his general theory of relativity to explain the force known as gravity. Although Newton provided some of the most important equations relating to gravitational force, he could not explain why that force existed in the first place. Einstein took on this task and explained it as follows: space in itself is a flat \u201csheet\u201d as long as no matter is present in it, but as soon as a mass — let's take the Sun — is dropped onto it, that sheet will inevitably bend, creating a curvature. That curvature is gravity itself, and it allows other masses, such as the Earth, to move around it while bending the fabric of space-time themselves.",
      },
      {
        type: "paragraph",
        text: "Consider it like this: you have a very fine sheet of rubber. If you drop a plastic ball on it, it will naturally bend — and if you now throw marbles around the centre, they will orbit the ball, as if attracted to it. Thus gravity came to be known as the curvature of space-time itself.",
      },
      {
        type: "image",
        src: "/science/st-spacetime.png",
        caption:
          "Mass bends the fabric of space-time \u2014 and that curvature is what we experience as gravity.",
      },
      {
        type: "heading",
        text: "The Standard Model and Its Missing Piece",
      },
      {
        type: "paragraph",
        text: "Currently, our universe is composed of four fundamental physical forces: the gravitational force, the electromagnetic force, and the strong and weak forces. At the quantum level, these forces are mediated by elementary particles — the electromagnetic force, for instance, is mediated by photons, the particles of light. All of these elementary particles constitute what we call the Standard Model of physics, categorised into two families: fermions and bosons.",
      },
      {
        type: "paragraph",
        text: "To this day, the Standard Model is the best mathematical description of our universe — but it leaves one grand force out: gravity. At the quantum level, gravity was said to be mediated by the quantum of space-time curvature, the graviton. But when we incorporated the graviton into the Standard Model, the mathematics of it broke down. That result shook the world of physics.",
      },
      {
        type: "heading",
        text: "Enter the Strings",
      },
      {
        type: "paragraph",
        text: "But then entered their messiah: string theory, which promised to unify all the fundamental forces of our universe into one master equation — one final depiction of this universe, the theory of everything. When scientists looked for a solution to the crisis in the Standard Model, they started from the beginning, from only one dimension: a string, the only thing more complex than a point-like elementary particle. According to string theory, strings are the most fundamental, indivisible entities.",
      },
      {
        type: "quote",
        text: "Strings are little threads of energy whose different frequencies, instead of producing different musical notes, produce different particles.",
      },
      {
        type: "paragraph",
        text: "This principle accounted for the different physical properties of different elementary particles. But the mathematics of string theory presented a problem: it only worked in a universe of ten dimensions of space and one dimension of time. Physicists like Kaluza and Klein had already discussed extra dimensions in the early 1900s, arguing that some smaller dimensions might be curled up into each other, making them invisible to the human eye. An organism like an ant, however, would see more dimensions than the three we see: a rod with some thickness might look to us like a simple line from far away, but for an ant crawling on it, there is a whole extra dimension to move through, curving up and around its surface.",
      },
      {
        type: "paragraph",
        text: "String theory uses the same principle: the extra dimensions curl up into each other, making them invisible at our physical scale. And why do strings vibrate in different patterns? Because the vibration of a string depends upon the geometry in which the strings intertwine with each other — similar to how different notes are produced based on the position of air holes on the body of an instrument. All of this allowed the graviton to exist naturally within the theory.",
      },
      {
        type: "image",
        src: "/science/st-calabi-yau.png",
        caption:
          "A Calabi-Yau manifold \u2014 one candidate geometry for the six extra dimensions, curled up too small to see.",
      },
      {
        type: "paragraph",
        text: "Some scientists still think the presence of extra dimensions is not possible in our universe — but the mathematics of string theory still works. So, it does not matter whether it turns out to be correct or wrong: it remains one of the greatest experiments carried out in the world of physics in the 21st century.",
      },
    ],
  },
];

// Helper: estimate reading time (~200 words per minute for prose)
export function readingTime(article: Article): number {
  const words = article.blocks
    .map((b) => ("text" in b && b.text ? b.text : ""))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
