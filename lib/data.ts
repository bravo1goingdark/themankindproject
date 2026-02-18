export type Category =
  | "science"
  | "engineering"
  | "courage"
  | "medicine"
  | "exploration"

export interface Achievement {
  id: string
  title: string
  summary: string
  description: string
  year: number
  era: string
  category: Category
  region: string
  location: string
  keyFigures: string[]
  impact: string
  impactScore: number
  difficultyScore: number
  tags: string[]
  context: string
  theDeed: string
  whyItMatters: string
  brutalTruth: string
  numbers: string[]
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "science", label: "Science" },
  { value: "engineering", label: "Engineering" },
  { value: "courage", label: "Courage" },
  { value: "medicine", label: "Medicine" },
  { value: "exploration", label: "Exploration" },
]

export const ERAS = [
  "Ancient",
  "Medieval",
  "15th Century",
  "17th Century",
  "18th Century",
  "19th Century",
  "20th Century",
  "21st Century",
]

export const achievements: Achievement[] = [
  {
    id: "moon-landing",
    title: "The Moon Landing",
    summary:
      "Humanity's first steps on another world, marking the pinnacle of the Space Race.",
    description:
      "On July 20, 1969, NASA's Apollo 11 mission achieved what had once seemed impossible: landing humans on the Moon. Commander Neil Armstrong and Lunar Module Pilot Buzz Aldrin descended to the surface in the Eagle lander while Michael Collins orbited above in the Command Module. Armstrong's first step onto the lunar surface was broadcast to an estimated 600 million viewers worldwide. The mission represented not just a triumph of engineering and courage, but a defining moment for the entire human species, proving that the boundaries of our world were not the boundaries of our reach.",
    year: 1969,
    era: "20th Century",
    category: "exploration",
    region: "Global",
    location: "Sea of Tranquility, Moon",
    keyFigures: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
    impact:
      "Demonstrated that humanity could reach beyond Earth, inspiring generations of scientists and explorers.",
    impactScore: 98,
    difficultyScore: 99,
    tags: ["space", "NASA", "Apollo 11", "Cold War"],
    context:
      "The Cold War between the United States and the Soviet Union had escalated into a high-stakes Space Race. After the Soviets launched Sputnik in 1957 and sent Yuri Gagarin into orbit in 1961, President Kennedy committed the nation to landing on the Moon before the decade's end. NASA's Apollo program was born from this challenge, building on the Mercury and Gemini missions that proved humans could survive and operate in space.",
    theDeed:
      "On July 20, 1969, the Lunar Module Eagle separated from the Command Module Columbia and began its descent. Armstrong took manual control when the computer-targeted landing zone turned out to be a boulder-strewn crater. With only 25 seconds of fuel remaining, he set the craft down in the Sea of Tranquility. Six hours later, he climbed down the ladder and pressed his boot into the lunar dust. Aldrin followed 19 minutes later. They spent 2 hours and 31 minutes on the surface, collecting samples, planting a flag, and taking photographs that would become some of the most iconic images in history.",
    whyItMatters:
      "The Moon landing proved that humans could solve problems of staggering complexity when sufficiently motivated. It required 400,000 engineers, scientists, and technicians working in concert. The technological spinoffs alone transformed everyday life: water purification, scratch-resistant lenses, memory foam, freeze-dried food. More profoundly, the image of Earth rising over the lunar horizon reshaped humanity's self-understanding.",
    brutalTruth:
      "The Apollo program cost $25.4 billion (over $150 billion in today's dollars). Three astronauts died in the Apollo 1 fire. The entire program was driven primarily by geopolitical competition, not pure scientific curiosity. After Apollo 17 in 1972, no human has returned to the Moon. The technology that took us there was abandoned.",
    numbers: [
      "400,000 people worked on the program",
      "238,855 miles from Earth to Moon",
      "600 million watched the landing live",
      "842 pounds of lunar samples collected across all Apollo missions",
      "25 seconds of fuel remaining at touchdown",
    ],
  },
  {
    id: "discovery-of-penicillin",
    title: "Discovery of Penicillin",
    summary:
      "An accidental observation that launched the age of antibiotics and saved countless lives.",
    description:
      "In 1928, Scottish bacteriologist Alexander Fleming returned from vacation to find that a mold called Penicillium notatum had contaminated one of his Petri dishes, killing the surrounding bacteria. This serendipitous observation led to the development of penicillin, the world's first true antibiotic. Howard Florey and Ernst Boris Chain later refined and mass-produced the drug during World War II, where it saved thousands of soldiers from infection. Penicillin fundamentally transformed medicine, turning previously fatal bacterial infections into treatable conditions and laying the groundwork for the entire field of antibiotic therapy.",
    year: 1928,
    era: "20th Century",
    category: "medicine",
    region: "Europe",
    location: "St Mary's Hospital, London, England",
    keyFigures: ["Alexander Fleming", "Howard Florey", "Ernst Boris Chain"],
    impact:
      "Saved an estimated 200 million lives and revolutionized the treatment of bacterial infections worldwide.",
    impactScore: 99,
    difficultyScore: 72,
    tags: ["antibiotics", "microbiology", "World War II", "Nobel Prize"],
    context:
      "Before antibiotics, even minor wounds could become fatal infections. Surgeons operated in conditions that bred bacteria, and pneumonia, tuberculosis, and sepsis killed millions annually. Scientists had long searched for a 'magic bullet' that could kill bacteria without harming human cells, but none had succeeded at scale.",
    theDeed:
      "Fleming noticed a mold colony had contaminated a Petri dish of Staphylococcus bacteria and was destroying the colonies around it. He identified the mold as Penicillium notatum and called the active substance penicillin. Over a decade later, Florey and Chain at Oxford developed methods to purify and mass-produce the drug. By D-Day in 1944, enough penicillin existed to treat every wounded Allied soldier.",
    whyItMatters:
      "Penicillin didn't just save lives; it restructured medicine entirely. Surgery became far safer. Diseases that had been death sentences became routine treatments. It launched the pharmaceutical industry's golden age and inspired the discovery of dozens of other antibiotics.",
    brutalTruth:
      "Fleming himself warned that misuse would breed resistant bacteria. Today, antibiotic-resistant 'superbugs' kill over 1.2 million people per year. The golden age of antibiotics may be ending because of the very overuse Fleming predicted decades ago.",
    numbers: [
      "200+ million lives saved since discovery",
      "1.2 million annual deaths from antibiotic-resistant infections",
      "By 1945, penicillin production reached 650 billion units per month",
      "Fleming, Florey, and Chain shared the 1945 Nobel Prize",
    ],
  },
  {
    id: "invention-of-the-printing-press",
    title: "Invention of the Printing Press",
    summary:
      "Movable type made knowledge accessible to the masses, igniting the Renaissance and Reformation.",
    description:
      "Around 1440, Johannes Gutenberg of Mainz, Germany, developed a practical system of movable type printing that would transform human civilization. His innovations, including an oil-based ink and a hand-operated wooden press adapted from agricultural screw presses, made it possible to produce books rapidly and affordably for the first time. The Gutenberg Bible, completed around 1455, demonstrated the extraordinary quality achievable with the new technology. Within decades, printing presses had spread across Europe, dramatically increasing literacy rates and enabling the rapid dissemination of scientific, religious, and political ideas that fueled the Renaissance, the Reformation, and the Scientific Revolution.",
    year: 1440,
    era: "15th Century",
    category: "engineering",
    region: "Europe",
    location: "Mainz, Germany",
    keyFigures: ["Johannes Gutenberg"],
    impact:
      "Democratized knowledge and literacy, enabling the Renaissance, Reformation, and the Scientific Revolution.",
    impactScore: 97,
    difficultyScore: 80,
    tags: ["printing", "Renaissance", "literacy", "information"],
    context:
      "In medieval Europe, books were copied by hand, primarily by monks in monasteries. A single Bible could take a scribe over a year to produce. Literacy was confined to the clergy and wealthy elite. Knowledge was hoarded, not shared. The Chinese had developed woodblock printing centuries earlier, but movable type had not yet reached Europe.",
    theDeed:
      "Gutenberg developed a complete system: individual metal letter molds cast from a lead-tin-antimony alloy, an oil-based ink that adhered to metal type, and a wooden screw press adapted from wine and olive presses. Each component was an innovation. His masterpiece, the Gutenberg Bible of 1455, demonstrated print quality that rivaled the finest handwritten manuscripts. Within 50 years, over 20 million volumes had been printed across Europe.",
    whyItMatters:
      "The printing press broke the Church and aristocracy's monopoly on knowledge. Scientific discoveries could be shared across borders within weeks instead of decades. Martin Luther's 95 Theses spread across Germany in two weeks. The Reformation, the Scientific Revolution, and the Enlightenment are all downstream of Gutenberg's press.",
    brutalTruth:
      "Gutenberg himself went bankrupt. His financial backer Johann Fust seized his equipment and completed the Bible project, reaping the profits. Gutenberg died in relative obscurity in 1468. The man who democratized information never benefited from his own revolution.",
    numbers: [
      "180 copies of the Gutenberg Bible were printed",
      "49 surviving copies exist today",
      "By 1500, over 20 million volumes had been printed in Europe",
      "A single Gutenberg Bible page sells for $100,000+",
    ],
  },
  {
    id: "discovery-of-dna-structure",
    title: "Discovery of DNA Structure",
    summary:
      "The double helix model unveiled the molecular blueprint of life itself.",
    description:
      "In 1953, James Watson and Francis Crick at the University of Cambridge proposed the double helix model of DNA, building on critical X-ray diffraction data produced by Rosalind Franklin and Maurice Wilkins at King's College London. Their model elegantly explained how genetic information is stored, copied, and transmitted from one generation to the next. The discovery that the two strands of the helix are complementary, with adenine pairing with thymine and guanine with cytosine, immediately suggested a mechanism for DNA replication. This breakthrough opened the door to molecular biology, genetic engineering, forensic science, and eventually the Human Genome Project.",
    year: 1953,
    era: "20th Century",
    category: "science",
    region: "Europe",
    location: "Cavendish Laboratory, Cambridge, England",
    keyFigures: [
      "James Watson",
      "Francis Crick",
      "Rosalind Franklin",
      "Maurice Wilkins",
    ],
    impact:
      "Founded modern molecular biology and enabled genetic medicine, forensics, and biotechnology.",
    impactScore: 96,
    difficultyScore: 90,
    tags: ["genetics", "molecular biology", "Nobel Prize", "Cambridge"],
    context:
      "By the early 1950s, scientists knew that DNA carried genetic information, but its structure was unknown. Multiple teams raced to solve it: Linus Pauling at Caltech, Watson and Crick at Cambridge, and Wilkins and Franklin at King's College London. The stakes were enormous, as understanding DNA's structure would unlock the mechanism of heredity itself.",
    theDeed:
      "Watson and Crick built physical models based on X-ray crystallography data, chemical bonding rules, and Chargaff's base-pairing ratios. The critical breakthrough came from Franklin's Photo 51, an X-ray diffraction image that revealed DNA's helical structure with stunning clarity. On February 28, 1953, they announced they had 'found the secret of life.' Their model showed two complementary strands wound in a double helix, with base pairs forming the rungs.",
    whyItMatters:
      "The double helix immediately suggested how DNA replicates: the two strands separate, and each serves as a template. This single insight unlocked molecular biology, genetic engineering, gene therapy, forensic science, and the entire biotech industry. Every GMO, every DNA test, every gene therapy traces back to this discovery.",
    brutalTruth:
      "Rosalind Franklin's contribution was systematically downplayed. Watson and Crick accessed her data without her knowledge. She died of ovarian cancer in 1958 at age 37, likely caused by X-ray exposure from her research. She was not included in the 1962 Nobel Prize. History is only now correcting this injustice.",
    numbers: [
      "3 billion base pairs in human DNA",
      "99.9% of DNA is identical between any two humans",
      "Photo 51 took 100 hours of X-ray exposure",
      "The 1953 paper was only 1 page long",
    ],
  },
  {
    id: "eradication-of-smallpox",
    title: "Eradication of Smallpox",
    summary:
      "The only human disease ever deliberately eradicated, saving millions of lives each year.",
    description:
      "Smallpox, caused by the variola virus, had plagued humanity for thousands of years, killing an estimated 300 million people in the 20th century alone. In 1796, Edward Jenner demonstrated that inoculation with cowpox could protect against smallpox, laying the foundation for vaccination. Nearly two centuries later, in 1967, the World Health Organization launched an intensified global eradication campaign led by epidemiologist D.A. Henderson. Through mass vaccination, surveillance, and containment strategies, the campaign systematically eliminated the disease. The last natural case occurred in Somalia in 1977, and in 1980, the WHO officially declared smallpox eradicated, marking one of humanity's greatest collective achievements in public health.",
    year: 1980,
    era: "20th Century",
    category: "medicine",
    region: "Global",
    location: "Merka, Somalia (last natural case)",
    keyFigures: ["Edward Jenner", "D.A. Henderson"],
    impact:
      "Saved an estimated 5 million lives per year and proved that global cooperation could defeat a disease.",
    impactScore: 100,
    difficultyScore: 95,
    tags: ["vaccination", "WHO", "public health", "epidemiology"],
    context:
      "Smallpox was one of the deadliest diseases in human history, killing roughly 30% of those infected. In the 20th century alone it killed an estimated 300 million people. Survivors were often left blind or severely scarred. It had devastated civilizations for millennia, from ancient Egypt to the Aztec Empire.",
    theDeed:
      "Jenner's 1796 experiment, inoculating a boy with cowpox and proving immunity to smallpox, established the principle of vaccination. The WHO's 1967 intensified eradication campaign, led by D.A. Henderson, deployed ring vaccination, aggressive surveillance, and containment. Workers tracked cases village by village across Africa and Asia. The last natural case occurred in Ali Maow Maalin, a hospital cook in Merka, Somalia, on October 26, 1977.",
    whyItMatters:
      "It remains the only human disease ever deliberately eradicated. It proved that international cooperation, even during the Cold War, could achieve what no nation could accomplish alone. The eradication saves an estimated 5 million lives every year that would otherwise be lost.",
    brutalTruth:
      "The campaign often employed coercive tactics. In some areas, vaccination teams physically restrained resisters. The Soviet Union and the United States cooperated on eradication while pointing nuclear weapons at each other. Samples of the virus still exist in two laboratories, an ongoing biosecurity concern.",
    numbers: [
      "300 million killed in the 20th century alone",
      "5 million lives saved per year since eradication",
      "The campaign cost $300 million over 11 years",
      "10 years from campaign launch to last natural case",
    ],
  },
  {
    id: "construction-of-the-great-wall",
    title: "Construction of the Great Wall",
    summary:
      "A monumental feat of ancient engineering stretching over 13,000 miles across northern China.",
    description:
      "The Great Wall of China is not a single wall but a vast network of fortifications built, rebuilt, and maintained over more than two millennia by multiple Chinese dynasties. The earliest sections date to the 7th century BC, but the most well-known portions were constructed during the Ming Dynasty (1368-1644). At its peak, the wall system stretched over 13,000 miles, incorporating walls, watchtowers, garrison stations, and natural barriers. Millions of workers, including soldiers, peasants, and prisoners, labored under often brutal conditions to build and maintain the structure. The Great Wall stands as a testament to human determination and organizational capacity on a scale rarely matched in history.",
    year: -700,
    era: "Ancient",
    category: "engineering",
    region: "Asia",
    location: "Northern China, spanning 15 provinces",
    keyFigures: ["Emperor Qin Shi Huang", "Ming Dynasty builders"],
    impact:
      "Protected Chinese civilization for centuries and stands as an enduring symbol of human ambition and collective effort.",
    impactScore: 85,
    difficultyScore: 98,
    tags: ["architecture", "China", "fortification", "ancient"],
    context:
      "The warring states of ancient China faced constant raids from nomadic peoples of the northern steppes. Individual states built walls along their borders, but these were fragmented and inconsistent. When Qin Shi Huang unified China in 221 BC, he ordered the walls connected and extended into a continuous defensive system.",
    theDeed:
      "Millions of laborers, soldiers, and prisoners were conscripted to build and connect the walls. They used rammed earth, stone, brick, and whatever materials were locally available. The Ming Dynasty (1368-1644) undertook the most extensive construction, building the iconic stone-and-brick sections visible today. Watchtowers were placed at regular intervals for signaling with smoke and fire. The system included barracks, garrison towns, and supply depots.",
    whyItMatters:
      "Beyond its military function, the Wall enabled the Silk Road by providing secure corridors for trade. It defined the boundary between settled agricultural China and the nomadic north. As a feat of logistics and organization, it demonstrated the capacity of centralized states to marshal resources on a continental scale.",
    brutalTruth:
      "An estimated 400,000 workers died during the Qin Dynasty construction phase alone. Bodies were reportedly buried within the wall itself. The wall repeatedly failed at its primary purpose: multiple invaders, including the Mongols and Manchus, breached or bypassed it. It was a monument to both human achievement and human suffering.",
    numbers: [
      "13,171 miles of total wall and branches",
      "Took over 2,000 years to build across dynasties",
      "Up to 400,000 workers may have died during Qin construction",
      "25,000 watchtowers along the Ming-era wall",
    ],
  },
  {
    id: "the-internet",
    title: "Creation of the Internet",
    summary:
      "A decentralized network that connected the world and reshaped every facet of modern life.",
    description:
      "The internet evolved from ARPANET, a US Department of Defense project launched in 1969 to create a resilient communication network. Key innovations included packet switching, developed by Paul Baran and Donald Davies, and the TCP/IP protocol suite created by Vint Cerf and Bob Kahn in the 1970s. Tim Berners-Lee's invention of the World Wide Web in 1989 at CERN made the internet accessible to the general public through hyperlinked documents and web browsers. By the mid-1990s, the internet had begun its explosive growth, eventually connecting billions of people and transforming commerce, communication, education, entertainment, and politics in ways that continue to unfold.",
    year: 1969,
    era: "20th Century",
    category: "engineering",
    region: "Global",
    location: "UCLA / CERN, Geneva, Switzerland",
    keyFigures: [
      "Vint Cerf",
      "Bob Kahn",
      "Tim Berners-Lee",
      "Paul Baran",
    ],
    impact:
      "Connected billions of people and fundamentally transformed how humanity communicates, works, and lives.",
    impactScore: 99,
    difficultyScore: 88,
    tags: ["technology", "ARPANET", "World Wide Web", "communication"],
    context:
      "During the Cold War, the US military needed a communications network that could survive a nuclear strike. Traditional centralized networks had a fatal flaw: destroy the hub, and the entire system collapses. Researchers at RAND, MIT, and the UK's National Physical Laboratory independently developed the concept of distributed, packet-switched networks.",
    theDeed:
      "On October 29, 1969, the first ARPANET message was sent from UCLA to Stanford. The system crashed after transmitting just two letters: 'L' and 'O' of the word 'LOGIN.' Over the next two decades, researchers developed the protocols that would become the internet: TCP/IP (Cerf and Kahn, 1974), DNS (1983), and finally the World Wide Web (Berners-Lee, 1989). Berners-Lee created HTTP, HTML, and the first web browser at CERN, then made the technology freely available to all.",
    whyItMatters:
      "The internet is arguably the most transformative technology since the printing press. It rewired commerce, politics, education, entertainment, and human relationships. It enabled the rise of the information economy and put the sum of human knowledge at everyone's fingertips.",
    brutalTruth:
      "The internet has also enabled mass surveillance, disinformation at scale, cybercrime, and digital addiction. Social media platforms have been linked to rising anxiety and depression, especially among young people. The open, idealistic internet of the early years has given way to one dominated by a handful of corporations.",
    numbers: [
      "5.3 billion internet users worldwide (2024)",
      "First message sent: October 29, 1969",
      "Tim Berners-Lee made the Web free, forgoing billions in potential revenue",
      "Over 1.1 billion websites exist today",
    ],
  },
  {
    id: "theory-of-general-relativity",
    title: "Theory of General Relativity",
    summary:
      "Einstein's revolutionary framework redefined our understanding of gravity, space, and time.",
    description:
      "In 1915, Albert Einstein published his General Theory of Relativity, fundamentally reimagining gravity not as a force but as the curvature of spacetime caused by mass and energy. The theory predicted phenomena that seemed fantastical at the time: the bending of light by gravity, gravitational time dilation, and the existence of black holes. Arthur Eddington's 1919 solar eclipse expedition confirmed the bending of starlight around the Sun, catapulting Einstein to worldwide fame. General relativity remains one of the two pillars of modern physics and is essential for technologies like GPS satellites, which must account for relativistic time dilation to maintain accuracy.",
    year: 1915,
    era: "20th Century",
    category: "science",
    region: "Europe",
    location: "Berlin, Germany / Zurich, Switzerland",
    keyFigures: ["Albert Einstein", "Arthur Eddington"],
    impact:
      "Transformed our understanding of the universe and enabled technologies from GPS to gravitational wave detection.",
    impactScore: 97,
    difficultyScore: 100,
    tags: ["physics", "gravity", "spacetime", "Nobel Prize"],
    context:
      "Newton's law of universal gravitation had reigned for over 200 years, but it couldn't explain certain anomalies, like the precession of Mercury's orbit. Einstein, already famous for special relativity (1905), spent a grueling decade developing a more comprehensive theory that would reconcile gravity with the geometry of space and time.",
    theDeed:
      "Einstein presented his field equations to the Prussian Academy of Sciences in November 1915. The mathematics were extraordinarily complex, replacing Newton's gravitational force with the curvature of four-dimensional spacetime. The theory made bold predictions: light should bend around massive objects, time should slow near gravity wells, and gravitational waves should ripple through space. In 1919, Eddington's observations during a solar eclipse confirmed the light-bending prediction, making Einstein an overnight global celebrity.",
    whyItMatters:
      "General relativity is one of the two pillars of modern physics (alongside quantum mechanics). GPS satellites must correct for relativistic time dilation or they'd drift by 10 kilometers per day. The theory predicted black holes, gravitational lensing, and the expansion of the universe, all later confirmed. LIGO's 2015 detection of gravitational waves opened an entirely new window on the cosmos.",
    brutalTruth:
      "Einstein spent the last 30 years of his life trying to unify general relativity with quantum mechanics and failed. The two theories remain fundamentally incompatible. Despite its elegance, general relativity breaks down at singularities and cannot explain dark energy or dark matter, which make up 95% of the universe.",
    numbers: [
      "10 years of work to develop the theory",
      "GPS would drift 10 km/day without relativistic corrections",
      "Gravitational waves detected in 2015, 100 years after prediction",
      "Mercury's orbital precession: 43 arcseconds per century, exactly as predicted",
    ],
  },
  {
    id: "abolition-of-slavery",
    title: "Abolition of Slavery",
    summary:
      "A centuries-long struggle for human dignity that reshaped societies across the globe.",
    description:
      "The abolition of slavery represents one of humanity's most significant moral achievements, though it was won through centuries of resistance, activism, and conflict. The movement gained institutional momentum in the late 18th century with figures like William Wilberforce in Britain and Frederick Douglass in America. Britain abolished the slave trade in 1807 and slavery itself in 1833. The United States followed with the 13th Amendment in 1865, after a devastating civil war. Brazil became the last Western Hemisphere nation to abolish slavery in 1888. The abolitionist movement established fundamental principles of human rights and dignity that continue to shape international law and moral philosophy.",
    year: 1865,
    era: "19th Century",
    category: "courage",
    region: "Global",
    location: "United States / British Empire / Brazil",
    keyFigures: [
      "Frederick Douglass",
      "William Wilberforce",
      "Harriet Tubman",
      "Abraham Lincoln",
    ],
    impact:
      "Established the principle that no human being can be owned by another, reshaping law and morality worldwide.",
    impactScore: 100,
    difficultyScore: 96,
    tags: ["human rights", "civil rights", "emancipation", "justice"],
    context:
      "For millennia, slavery was considered a natural institution. The transatlantic slave trade, beginning in the 16th century, industrialized human bondage on an unprecedented scale, forcibly transporting an estimated 12.5 million Africans to the Americas. Enslaved people built the economic foundations of the Western world while enduring unimaginable brutality.",
    theDeed:
      "The abolitionist movement combined moral philosophy, political activism, slave rebellions, and legislative campaigns. Wilberforce spent 20 years pushing Britain to abolish the slave trade (1807) and then slavery itself (1833). In America, Frederick Douglass escaped slavery to become the most powerful abolitionist orator of his era. Harriet Tubman made 13 missions on the Underground Railroad. The US Civil War (1861-1865) settled the question by force, with the 13th Amendment permanently abolishing slavery.",
    whyItMatters:
      "Abolition established the foundational human rights principle that no person can own another. It laid the groundwork for the Universal Declaration of Human Rights, the Civil Rights Movement, and modern international humanitarian law. The moral arguments forged during abolition remain the bedrock of human dignity discourse.",
    brutalTruth:
      "Abolition did not end racial oppression. Jim Crow laws, apartheid, redlining, and mass incarceration continued to systematically disadvantage Black populations. Forced labor and human trafficking persist today, with an estimated 50 million people living in modern slavery worldwide. The economic disparities created by centuries of slavery have never been fully addressed.",
    numbers: [
      "12.5 million Africans forcibly transported across the Atlantic",
      "620,000 died in the American Civil War over slavery",
      "Harriet Tubman rescued approximately 70 enslaved people",
      "50 million people estimated in modern slavery today",
    ],
  },
  {
    id: "polio-vaccine",
    title: "Development of the Polio Vaccine",
    summary:
      "A breakthrough that nearly eliminated a terrifying disease that paralyzed thousands of children each year.",
    description:
      "In the early 1950s, poliomyelitis was one of the most feared diseases in the world, causing paralysis and death primarily among children. Jonas Salk developed the first successful inactivated polio vaccine, which was declared safe and effective in 1955 after one of the largest clinical trials in history, involving 1.8 million children. Albert Sabin subsequently developed an oral vaccine that could be administered more easily in mass immunization campaigns. The global effort to eradicate polio, launched by the WHO in 1988, has reduced cases by over 99%. Salk famously refused to patent his vaccine, saying, 'Could you patent the sun?'",
    year: 1955,
    era: "20th Century",
    category: "medicine",
    region: "North America",
    location: "University of Pittsburgh, Pennsylvania",
    keyFigures: ["Jonas Salk", "Albert Sabin"],
    impact:
      "Reduced polio cases by over 99% and demonstrated the power of public health vaccination campaigns.",
    impactScore: 94,
    difficultyScore: 85,
    tags: ["vaccination", "public health", "virology", "children"],
    context:
      "In the early 1950s, polio was America's most feared disease. Summer outbreaks closed swimming pools and movie theaters. Parents kept children indoors. Iron lungs filled hospital wards. President Roosevelt himself had been paralyzed by the disease. The March of Dimes fundraising campaign collected millions from ordinary Americans desperate for a cure.",
    theDeed:
      "Salk developed an inactivated (killed) virus vaccine and tested it in one of the largest clinical trials in history: 1.8 million children participated in 1954. On April 12, 1955, the results were announced, and the vaccine was declared 'safe, effective, and potent.' Church bells rang. People wept in the streets. Salk became an instant national hero. He refused to patent the vaccine, forgoing an estimated $7 billion in personal profit.",
    whyItMatters:
      "The polio vaccine campaign became the model for global public health initiatives. Sabin's subsequent oral vaccine enabled mass immunization in developing countries. The WHO's Global Polio Eradication Initiative, launched in 1988, has reduced cases by over 99.9%. The principle that lifesaving medicine should be accessible to all was powerfully demonstrated.",
    brutalTruth:
      "The Cutter Incident of 1955 saw 200,000 children receive vaccines containing live poliovirus due to a manufacturing defect. 40,000 developed polio, 200 were paralyzed, and 10 died. It was one of the worst pharmaceutical disasters in US history. Despite this, the vaccination campaign continued and ultimately succeeded.",
    numbers: [
      "1.8 million children in the 1954 trial",
      "99.9% reduction in polio cases since 1988",
      "$7 billion in revenue Salk forfeited by not patenting",
      "350,000 annual cases in 1988 reduced to under 100 today",
    ],
  },
  {
    id: "human-genome-project",
    title: "The Human Genome Project",
    summary:
      "A 13-year international effort that mapped every gene in the human body.",
    description:
      "The Human Genome Project, launched in 1990 and completed in 2003, was one of the most ambitious scientific undertakings in history. An international consortium of researchers from 20 institutions across six countries worked to sequence the approximately 3 billion base pairs of human DNA and identify all human genes. The project cost roughly $2.7 billion and produced a reference genome that has since enabled thousands of discoveries in genetics, medicine, and evolutionary biology. It revealed that humans have approximately 20,000-25,000 genes, far fewer than expected, and that humans share 99.9% of their DNA with one another.",
    year: 2003,
    era: "21st Century",
    category: "science",
    region: "Global",
    location: "National Institutes of Health, Bethesda, Maryland",
    keyFigures: ["Francis Collins", "Craig Venter", "James Watson"],
    impact:
      "Created the foundation for personalized medicine, gene therapy, and a deeper understanding of human biology.",
    impactScore: 93,
    difficultyScore: 92,
    tags: ["genomics", "biotechnology", "DNA", "international cooperation"],
    context:
      "By the late 1980s, molecular biology had advanced to the point where sequencing the entire human genome seemed theoretically possible, but the scale was staggering: 3 billion base pairs. Skeptics called it 'big science' that would drain funding from more productive research. Advocates argued it would transform medicine forever.",
    theDeed:
      "The publicly funded project launched in 1990 under James Watson, later led by Francis Collins. Twenty institutions across six countries participated. In 1998, Craig Venter's Celera Genomics announced it would sequence the genome faster using a 'shotgun' approach, sparking a fierce race. Both teams published draft sequences in 2001, and the complete sequence was released in 2003. The project came in under budget ($2.7 billion vs. $3 billion estimated) and ahead of schedule.",
    whyItMatters:
      "The reference genome enabled the identification of over 1,800 disease genes. It launched the era of personalized medicine, pharmacogenomics, and CRISPR gene editing. Cancer treatment has been revolutionized by genomic profiling. Every modern genetic test, from ancestry kits to prenatal screening, relies on the HGP reference.",
    brutalTruth:
      "The promise of rapid medical breakthroughs was overhyped. Two decades later, most common diseases remain poorly understood genetically. Gene therapy has been slower to develop than predicted. The project also raised profound ethical questions about genetic privacy, discrimination, and the commodification of human biological data that remain unresolved.",
    numbers: [
      "3.2 billion base pairs sequenced",
      "20,000-25,000 human genes identified (far fewer than the 100,000 predicted)",
      "$2.7 billion total cost",
      "6 countries contributed to the public effort",
    ],
  },
  {
    id: "voyager-missions",
    title: "The Voyager Missions",
    summary:
      "Two spacecraft launched in 1977 that became humanity's farthest-reaching emissaries to the cosmos.",
    description:
      "Voyager 1 and Voyager 2, launched by NASA in 1977, took advantage of a rare planetary alignment that occurs once every 175 years to conduct a grand tour of the outer solar system. The twin spacecraft returned unprecedented images and data from Jupiter, Saturn, Uranus, and Neptune, transforming our understanding of these distant worlds and their moons. Voyager 1 crossed into interstellar space in 2012, becoming the first human-made object to leave the solar system. Both spacecraft carry a Golden Record containing sounds and images of Earth, intended as a message to any intelligent life that might find them, a hopeful gesture that speaks to humanity's deepest aspirations.",
    year: 1977,
    era: "20th Century",
    category: "exploration",
    region: "Global",
    location: "NASA Jet Propulsion Laboratory, Pasadena, California",
    keyFigures: ["Carl Sagan", "Ed Stone", "NASA JPL Team"],
    impact:
      "Expanded our knowledge of the outer solar system and became the first human objects to reach interstellar space.",
    impactScore: 90,
    difficultyScore: 93,
    tags: ["space", "NASA", "planetary science", "Golden Record"],
    context:
      "In the late 1960s, aerospace engineer Gary Flandro discovered that a rare alignment of the outer planets, occurring once every 175 years, would allow a spacecraft to use gravitational assists to visit Jupiter, Saturn, Uranus, and Neptune in a single mission. The window opened in the late 1970s. NASA seized the opportunity.",
    theDeed:
      "Voyager 2 launched on August 20, 1977, followed by Voyager 1 on September 5. Despite launching second, Voyager 1 reached Jupiter first due to its faster trajectory. The spacecraft returned thousands of images that rewrote textbooks: active volcanoes on Jupiter's moon Io, a subsurface ocean on Europa, complex rings around Saturn, the bizarre tilt of Uranus, and geysers on Neptune's moon Triton. Voyager 1 crossed into interstellar space on August 25, 2012.",
    whyItMatters:
      "The Voyagers revealed the outer solar system as a dynamic, complex place teeming with geological and atmospheric activity. They discovered 23 new moons. The Golden Record, carrying sounds and images of Earth curated by Carl Sagan's team, represents humanity's most ambitious message to the cosmos. Both spacecraft continue transmitting data from beyond the solar system.",
    brutalTruth:
      "The Voyagers' nuclear power sources will die by approximately 2025, silencing them forever. Their Golden Records will almost certainly never be found by anyone. The vast distances of interstellar space mean it will take 40,000 years for Voyager 1 to pass near another star. They are, in all practical terms, messages in a bottle thrown into an infinite ocean.",
    numbers: [
      "15 billion miles from Earth (Voyager 1, as of 2024)",
      "23 new moons discovered",
      "175 years between planetary alignments",
      "40,000 years until Voyager 1 nears another star system",
    ],
  },
  {
    id: "magna-carta",
    title: "The Magna Carta",
    summary:
      "A medieval charter that established the principle that even kings must obey the law.",
    description:
      "In June 1215, a group of rebellious English barons confronted King John at Runnymede and forced him to seal the Magna Carta, a charter of rights that placed limits on royal authority. While the document was primarily concerned with the feudal rights of the nobility, its broader principles, that the king was subject to law, that free men had the right to justice and a fair trial, and that taxation required consent, proved revolutionary. Though annulled within weeks by Pope Innocent III, the Magna Carta was reissued multiple times and became a foundational document for constitutional government. Its influence can be traced directly to the US Constitution and the Universal Declaration of Human Rights.",
    year: 1215,
    era: "Medieval",
    category: "courage",
    region: "Europe",
    location: "Runnymede, Surrey, England",
    keyFigures: ["King John", "Archbishop Stephen Langton", "English Barons"],
    impact:
      "Established the principle of rule of law and influenced every subsequent democratic constitution.",
    impactScore: 95,
    difficultyScore: 75,
    tags: ["law", "democracy", "rights", "constitution"],
    context:
      "King John of England had alienated his barons through heavy taxation, arbitrary imprisonment, and military failures, including the loss of Normandy to France. The barons, supported by Archbishop Stephen Langton, organized a rebellion. By May 1215, they had captured London and forced John to negotiate.",
    theDeed:
      "At Runnymede, a meadow along the Thames, the barons presented John with a charter of demands. On June 15, 1215, John affixed his seal to the Magna Carta. Key provisions included: no taxation without consent, the right to a fair trial by jury, protection from arbitrary imprisonment, and the principle that the king himself was subject to law. Though John repudiated it within weeks and Pope Innocent III annulled it, the charter was reissued in modified form in 1216, 1217, and 1225.",
    whyItMatters:
      "The Magna Carta established the revolutionary principle that power is not absolute. Its clauses were invoked during the English Civil War, the American Revolution, and the French Revolution. The Fifth Amendment of the US Constitution echoes Magna Carta's due process protections. The Universal Declaration of Human Rights draws directly on its principles.",
    brutalTruth:
      "The Magna Carta was not a democratic document. It protected the feudal rights of wealthy barons, not common people. Most of its 63 clauses dealt with arcane feudal property disputes. Its legacy as a symbol of universal liberty was largely constructed centuries later by lawyers and revolutionaries who needed a historical precedent for their own causes.",
    numbers: [
      "63 clauses in the original document",
      "Only 4 original 1215 copies survive",
      "Annulled within 10 weeks of signing",
      "A 1297 copy sold for $21.3 million in 2007",
    ],
  },
  {
    id: "first-heart-transplant",
    title: "First Human Heart Transplant",
    summary:
      "A surgical milestone that proved the human heart could be replaced, opening a new era in medicine.",
    description:
      "On December 3, 1967, South African surgeon Christiaan Barnard performed the world's first human-to-human heart transplant at Groote Schuur Hospital in Cape Town. The recipient, Louis Washkansky, received the heart of Denise Darvall, a young woman who had died in a car accident. While Washkansky survived only 18 days before succumbing to pneumonia (his immune system weakened by anti-rejection drugs), the operation proved that cardiac transplantation was surgically feasible. Barnard's second transplant patient, Philip Blaiberg, survived for over 19 months. The procedure catalyzed decades of advances in transplant surgery, immunosuppression, and ultimately the development of artificial hearts.",
    year: 1967,
    era: "20th Century",
    category: "medicine",
    region: "Africa",
    location: "Groote Schuur Hospital, Cape Town, South Africa",
    keyFigures: ["Christiaan Barnard", "Louis Washkansky"],
    impact:
      "Proved organ transplantation was possible and launched the modern field of transplant medicine.",
    impactScore: 88,
    difficultyScore: 94,
    tags: ["surgery", "transplant", "cardiac", "medical breakthrough"],
    context:
      "By the 1960s, surgeons had mastered most organ operations except replacing the heart, the organ that defines life itself. The technical challenges were immense: the heart had to be stopped, the patient kept alive on a heart-lung machine, the donor heart connected to the recipient's blood vessels, and then restarted. And even if surgery succeeded, the immune system would attack the foreign organ.",
    theDeed:
      "On December 3, 1967, Barnard and a team of 30 operated for nine hours to transplant the heart of Denise Darvall, a 25-year-old killed in a car accident, into Louis Washkansky, a 54-year-old grocer with terminal heart disease. The new heart started beating immediately. Washkansky survived 18 days before pneumonia, exacerbated by immunosuppressive drugs, killed him. Barnard's second patient, Philip Blaiberg, survived 19 months, proving the concept viable.",
    whyItMatters:
      "The operation proved that the heart was not mystically special; it was a pump that could be replaced. It catalyzed the entire field of organ transplantation: kidneys, livers, lungs, and eventually faces and hands. The development of cyclosporine in the 1980s solved the rejection problem, making transplants routine. Over 150,000 organ transplants are performed annually worldwide.",
    brutalTruth:
      "Barnard operated in apartheid South Africa. His surgical team was multiracial, but the country's brutal racial system shaped everything around them. The ethics of the first transplants were questionable by modern standards: informed consent was minimal, and the rush to be 'first' drove decision-making. Barnard became a celebrity while his brother Marius, who assisted, received little credit.",
    numbers: [
      "9 hours for the first transplant operation",
      "18 days Washkansky survived",
      "150,000+ organ transplants performed annually worldwide",
      "Cyclosporine (1983) improved 1-year survival from 40% to 80%",
    ],
  },
  {
    id: "wright-brothers-flight",
    title: "First Powered Flight",
    summary:
      "Twelve seconds that changed the world and made the sky a frontier for all of humanity.",
    description:
      "On December 17, 1903, Orville and Wilbur Wright achieved the first sustained, controlled, powered heavier-than-air flight near Kitty Hawk, North Carolina. Their Wright Flyer, built in their Dayton bicycle shop, flew four times that day, with the longest flight covering 852 feet in 59 seconds. The Wright brothers' success was built on years of meticulous research, including their development of a wind tunnel for testing airfoil designs and their revolutionary three-axis control system. Their achievement was initially met with skepticism, but within a decade, aviation had begun to transform warfare, transportation, and the human imagination. The age of flight had begun.",
    year: 1903,
    era: "20th Century",
    category: "engineering",
    region: "North America",
    location: "Kill Devil Hills, Kitty Hawk, North Carolina",
    keyFigures: ["Orville Wright", "Wilbur Wright"],
    impact:
      "Launched the age of aviation, transforming transportation, warfare, and global connectivity.",
    impactScore: 96,
    difficultyScore: 87,
    tags: ["aviation", "flight", "invention", "Kitty Hawk"],
    context:
      "By the late 19th century, many inventors were attempting to build flying machines. Otto Lilienthal had made over 2,000 glider flights in Germany before dying in a crash in 1896. Samuel Langley, secretary of the Smithsonian, spent $50,000 of government money on his failed Aerodrome. The Wright brothers, bicycle mechanics from Dayton, Ohio, had no formal engineering education and no funding beyond their own savings.",
    theDeed:
      "The Wrights approached flight as a scientific problem. They built a wind tunnel and tested over 200 wing designs. They invented the three-axis control system (pitch, roll, yaw) that remains the basis of all aircraft control. They chose Kitty Hawk for its steady winds and soft sand. On December 17, 1903, Orville made the first flight: 12 seconds, 120 feet. The fourth flight that day covered 852 feet in 59 seconds. Five witnesses and a photograph documented the achievement.",
    whyItMatters:
      "Powered flight compressed the world. Distances that took weeks by ship could be crossed in hours. Aviation transformed warfare (both World Wars were shaped by air power), created the global tourism industry, and made international business possible at modern scale. The airline industry today carries 4 billion passengers annually.",
    brutalTruth:
      "The Wrights spent years in bitter patent wars, suing other aviation pioneers and arguably slowing the development of American aviation. By World War I, American aircraft were so far behind European designs that US forces flew French and British planes. The brothers prioritized legal control over technological advancement.",
    numbers: [
      "12 seconds for the first flight",
      "852 feet covered in the longest flight that day",
      "Over 200 wing shapes tested in their wind tunnel",
      "Total cost of the Wright Flyer: approximately $1,000",
    ],
  },
]

export function getAchievement(id: string): Achievement | undefined {
  return achievements.find((a) => a.id === id)
}

export function getRelatedAchievements(
  current: Achievement,
  count = 3
): Achievement[] {
  return achievements
    .filter(
      (a) =>
        a.id !== current.id &&
        (a.category === current.category ||
          a.tags.some((t) => current.tags.includes(t)))
    )
    .slice(0, count)
}
