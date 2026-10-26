/* Natural Science 4º EP · Unit 1 · Living Organisms — practice test data.
   Original questions written for this project (not copied from any textbook).
   Licence: CC BY-NC 4.0 */

const GAME = 'https://sanhipolito.net/primaria-4/science/unit-1/';

const TOPICS = {
  living:   { title: 'Living organisms and vital functions', es: 'Seres vivos y funciones vitales', book: 'pp. 10–11', sec: 'B',
              game: 'Mission 1 · Life detectives', lessons: 'Homes and organisms · Three vital functions · Food and energy · Food groups · Making food · Responding and reproducing' },
  cell:     { title: 'Cells', es: 'La célula', book: 'p. 12', sec: 'C',
              game: 'Mission 2 · Inside a cell', lessons: 'Tiny living units · One or many · Protective boundary · Inside the boundary · Control centre · From small to large' },
  kingdoms: { title: 'The five kingdoms', es: 'Los cinco reinos', book: 'p. 13', sec: 'D',
              game: 'Mission 3 · Kingdom explorers', lessons: 'Five groups · Animals · Plants · Fungi · Bacteria · Algae and protozoa' },
  plant:    { title: 'Parts of a plant and of a flower', es: 'Partes de la planta y de la flor', book: 'pp. 14–15', sec: 'E',
              game: 'Mission 4 · Plant builders  +  Mission 8 · Plant & flower detectives', lessons: 'Roots and stems · Leaves and their stalks · Male flower parts · Female flower parts · Petals and protection · Types of plants' },
  photo:    { title: 'Nutrition in plants', es: 'La nutrición en las plantas', book: 'pp. 16–17', sec: 'F',
              game: 'Mission 5 · The green kitchen', lessons: 'Making sugar · Catching light · Day and night · Water tubes · Food tubes · Water vapour and gases' },
  repro:    { title: 'Reproduction in plants', es: 'La reproducción en las plantas', book: 'pp. 18–19', sec: 'G',
              game: 'Mission 6 · Seeds on a mission', lessons: 'Moving pollen · Pollinators · Joining cells · Seeds and fruit · A new plant · One parent' },
  interact: { title: 'Interaction in plants', es: 'La interacción en las plantas', book: 'pp. 20–21', sec: 'H',
              game: 'Mission 7 · Plant responses', lessons: 'Following light · Finding water · Touch and defence · Spring changes · Keeping or losing leaves' },
};

const SECTIONS = [
  { id: 'A', title: 'Words',              es: 'Vocabulario (glosario)' },
  { id: 'B', title: 'Living organisms',   es: 'Seres vivos y funciones vitales' },
  { id: 'C', title: 'Cells',              es: 'La célula' },
  { id: 'D', title: 'The five kingdoms',  es: 'Los cinco reinos' },
  { id: 'E', title: 'Plants',             es: 'Las plantas' },
  { id: 'F', title: 'Photosynthesis',     es: 'Fotosíntesis y nutrición' },
  { id: 'G', title: 'Reproduction',       es: 'Reproducción' },
  { id: 'H', title: 'Interaction',        es: 'Interacción' },
  { id: 'I', title: 'Map your ideas',     es: 'Mapa de ideas' },
];

/* ---------- SVG drawings (original) ---------- */
const mk = (L, x, y, tx, ty) =>
  `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="#233f39" stroke-width="2"/>` +
  `<circle cx="${tx}" cy="${ty}" r="4" fill="#233f39"/>` +
  `<circle cx="${x}" cy="${y}" r="14" fill="#fff" stroke="#233f39" stroke-width="2.5"/>` +
  `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="15" font-weight="800" fill="#233f39">${L}</text>`;

const SVGS = {
  cell: () => `<svg viewBox="0 0 400 300" role="img" aria-label="Diagram of an animal cell with three parts marked A, B and C">
    <ellipse cx="200" cy="150" rx="170" ry="120" fill="#fbd9b5" stroke="#c2703d" stroke-width="7"/>
    <g fill="#f08a5d" opacity=".75"><ellipse cx="105" cy="170" rx="20" ry="9" transform="rotate(-25 105 170)"/><ellipse cx="130" cy="225" rx="18" ry="8" transform="rotate(15 130 225)"/><ellipse cx="300" cy="215" rx="19" ry="8" transform="rotate(-10 300 215)"/><ellipse cx="85" cy="110" rx="15" ry="7" transform="rotate(30 85 110)"/><ellipse cx="290" cy="95" rx="14" ry="7" transform="rotate(-30 290 95)"/></g>
    <circle cx="205" cy="145" r="52" fill="#b9a5e6" stroke="#6a4fb0" stroke-width="5"/>
    <circle cx="215" cy="140" r="15" fill="#6a4fb0"/>
    ${mk('A', 345, 40, 238, 118)}${mk('B', 55, 45, 120, 130)}${mk('C', 360, 262, 328, 226)}</svg>`,

  flower: () => `<svg viewBox="0 0 400 360" role="img" aria-label="Diagram of a flower with five parts marked A to E">
    <path d="M200 350V232" stroke="#4d9a45" stroke-width="12" fill="none"/>
    <path d="M200 236Q150 252 132 214Q176 212 200 236Z" fill="#5aa84f" stroke="#2f7a3a" stroke-width="2.5"/>
    <path d="M200 236Q250 252 268 214Q224 212 200 236Z" fill="#5aa84f" stroke="#2f7a3a" stroke-width="2.5"/>
    <path d="M200 222Q92 192 78 88Q170 94 200 200Z" fill="#f4b6d5" stroke="#bb7aa8" stroke-width="3"/>
    <path d="M200 222Q308 192 322 88Q230 94 200 200Z" fill="#f4b6d5" stroke="#bb7aa8" stroke-width="3"/>
    <ellipse cx="200" cy="215" rx="26" ry="30" fill="#bfe09a" stroke="#6fa04a" stroke-width="3"/>
    <circle cx="200" cy="218" r="10" fill="#f2c94c" stroke="#c9a021" stroke-width="2"/>
    <rect x="195" y="105" width="10" height="100" rx="5" fill="#bfe09a" stroke="#6fa04a" stroke-width="2"/>
    <ellipse cx="200" cy="100" rx="13" ry="8" fill="#e58aa5" stroke="#b9546f" stroke-width="2"/>
    <path d="M190 210L150 130M210 210L250 130" stroke="#8aa85a" stroke-width="4" fill="none"/>
    <ellipse cx="148" cy="124" rx="12" ry="7" fill="#f2c94c" stroke="#c9a021" stroke-width="2" transform="rotate(-25 148 124)"/>
    <ellipse cx="252" cy="124" rx="12" ry="7" fill="#f2c94c" stroke="#c9a021" stroke-width="2" transform="rotate(25 252 124)"/>
    ${mk('A', 45, 55, 146, 124)}${mk('B', 265, 40, 202, 125)}${mk('C', 360, 120, 305, 125)}${mk('D', 340, 305, 240, 233)}${mk('E', 55, 305, 193, 219)}</svg>`,

  plant: () => `<svg viewBox="0 0 400 420" role="img" aria-label="Diagram of a plant with five parts marked A to E">
    <rect x="0" y="270" width="400" height="150" fill="#d9bb8e"/><path d="M0 270H400" stroke="#a98657" stroke-width="3" stroke-dasharray="6 6"/>
    <path d="M200 270Q195 320 170 395M200 290Q230 325 250 395M200 300Q175 335 135 350M200 312Q245 340 290 340" stroke="#a5742f" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M200 272V80" stroke="#3d8a3d" stroke-width="11" fill="none"/>
    <path d="M200 205L152 178" stroke="#3d8a3d" stroke-width="6" fill="none"/>
    <path d="M200 152L250 126" stroke="#3d8a3d" stroke-width="6" fill="none"/>
    <path d="M152 178Q108 112 56 152Q78 208 152 178Z" fill="#6bb35c" stroke="#2f7a3a" stroke-width="3"/>
    <path d="M250 126Q300 62 346 102Q320 162 250 126Z" fill="#6bb35c" stroke="#2f7a3a" stroke-width="3"/>
    <g transform="translate(200 62)"><g fill="#f6c431" stroke="#c89a14" stroke-width="2"><ellipse rx="9" ry="24" cy="-24"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(45)"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(90)"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(135)"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(180)"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(225)"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(270)"/><ellipse rx="9" ry="24" cy="-24" transform="rotate(315)"/></g><circle r="15" fill="#7a4a21"/></g>
    ${mk('A', 335, 30, 228, 56)}${mk('B', 40, 90, 98, 152)}${mk('C', 70, 235, 176, 191)}${mk('D', 330, 235, 205, 238)}${mk('E', 330, 360, 232, 342)}</svg>`,
};

/* ---------- Questions ----------
   type: mc | sel | tf | gap | short
   s:1 -> included in the short test.  pts = points.   topic = review topic. */
const Q = [
  /* ===== A · Words ===== */
  { id: 'q1', sec: 'A', type: 'sel', s: 1, pts: 5, topic: 'living',
    p: 'Find the words. Match each definition with the correct word.',
    o: ['aquatic organisms', 'cell membrane', 'cells', 'herbivores', 'interaction', 'land organisms', 'nucleus', 'nutrition', 'organ', 'photosynthesis', 'pollination', 'reproduction'],
    items: [
      { t: 'Organisms that live in water, like oceans, seas, rivers and ponds.', a: 'aquatic organisms', topic: 'living' },
      { t: 'Organisms that live on dry land.', a: 'land organisms', topic: 'living' },
      { t: 'This vital function gives living organisms materials and energy.', a: 'nutrition', topic: 'living' },
      { t: 'Animals that feed only on plants.', a: 'herbivores', topic: 'living' },
      { t: 'The vital function that produces offspring.', a: 'reproduction', topic: 'living' },
      { t: 'The microscopic units that perform the three vital functions.', a: 'cells', topic: 'cell' },
      { t: 'It protects the cytoplasm and everything inside the cell.', a: 'cell membrane', topic: 'cell' },
      { t: 'It is made of tissues and it is part of a body system.', a: 'organ', topic: 'cell' },
      { t: 'Pollen travels from the stamens of one flower to the pistil of another.', a: 'pollination', topic: 'repro' },
      { t: 'The process plants use to make their own food.', a: 'photosynthesis', topic: 'photo' },
    ],
    exp: 'Repasa el vocabulario del tema: *aquatic* = acuático (vive en el agua), *land* = terrestre, *nutrition* = nutrición, *herbivores* = herbívoros, *cell membrane* = membrana celular, *organ* = órgano, *pollination* = polinización, *photosynthesis* = fotosíntesis.' },

  /* ===== B · Living organisms ===== */
  { id: 'q2', sec: 'B', type: 'mc', pts: 1, topic: 'living',
    p: 'What do all living organisms have in common?',
    o: ['They perform the three vital functions.', 'They live in water.', 'They can move from place to place.', 'They make their own food.'],
    a: 'They perform the three vital functions.',
    exp: 'Todos los seres vivos realizan las tres funciones vitales: nutrición, interacción y reproducción. No todos se mueven (las plantas no), no todos viven en el agua y no todos fabrican su alimento (los animales no).' },

  { id: 'q3', sec: 'B', type: 'sel', s: 1, pts: 2, topic: 'living',
    p: 'Which vital function are they talking about?',
    o: ['nutrition', 'interaction', 'reproduction'],
    items: [
      { t: '“I’m hungry!”', a: 'nutrition' },
      { t: '“I’m a dad!”', a: 'reproduction' },
      { t: '“I’m hot!”', a: 'interaction' },
      { t: 'A cat sees a mouse and runs after it.', a: 'interaction' },
    ],
    exp: '**Nutrition** = obtener alimento, agua y aire y expulsar los desechos. **Interaction** = sentir y reaccionar a lo que nos rodea (calor, ruido, un ratón…). **Reproduction** = tener descendientes (*offspring*).' },

  { id: 'q4', sec: 'B', type: 'sel', pts: 2, topic: 'living',
    p: 'How do they feed? Choose: herbivore, carnivore, omnivore or autotrophic.',
    o: ['herbivore', 'carnivore', 'omnivore', 'autotrophic'],
    items: [
      { t: 'A rabbit eats grass and carrots.', a: 'herbivore' },
      { t: 'A lion eats other animals.', a: 'carnivore' },
      { t: 'A bear eats berries and fish.', a: 'omnivore' },
      { t: 'A pine tree makes its own food.', a: 'autotrophic' },
    ],
    exp: 'Nutrición **heterótrofa** (se alimentan de otros seres vivos): *herbivores* comen plantas, *carnivores* comen otros animales, *omnivores* comen plantas y animales. Nutrición **autótrofa**: el ser vivo fabrica su propio alimento (las plantas).' },

  { id: 'q5', sec: 'B', type: 'tf', s: 1, pts: 4, topic: 'living',
    p: 'True or false? If it is false, write the correct word for the underlined word.',
    items: [
      { t: 'Aquatic organisms live on <u>land</u>.', a: false, fix: ['water', 'in water'] },
      { t: 'Asexual reproduction needs only one parent.', a: true },
      { t: '<u>Heterotrophic</u> organisms make their own food.', a: false, fix: ['autotrophic'] },
      { t: 'Living organisms excrete waste products.', a: true },
    ],
    exp: 'Los organismos **acuáticos** viven en el agua. En la reproducción **asexual** interviene un solo progenitor. Los organismos **autótrofos** fabrican su alimento; los **heterótrofos** se alimentan de otros seres vivos. Al nutrirse, los seres vivos expulsan desechos.' },

  /* ===== C · Cells ===== */
  { id: 'q6', sec: 'C', type: 'sel', s: 1, pts: 3, topic: 'cell', svg: 'cell',
    p: 'Look at the cell. Label the parts A, B and C.',
    o: ['cell membrane', 'cytoplasm', 'nucleus', 'organelles'],
    items: [{ t: 'A', a: 'nucleus' }, { t: 'B', a: 'cytoplasm' }, { t: 'C', a: 'cell membrane' }],
    exp: 'El **núcleo** (*nucleus*) controla la célula. El **citoplasma** (*cytoplasm*) contiene los orgánulos (*organelles*), que son como pequeños órganos. La **membrana celular** (*cell membrane*) protege el citoplasma y lo que hay dentro.' },

  { id: 'q7', sec: 'C', type: 'mc', pts: 1, topic: 'cell',
    p: 'Which of these is a unicellular organism?',
    o: ['A bacterium', 'A human', 'A pine tree', 'An eagle'],
    a: 'A bacterium',
    exp: '*Unicellular* = tiene una sola célula (por ejemplo, las bacterias). Los humanos, los pinos y las águilas son *multicellular*: tienen muchas células.' },

  { id: 'q8', sec: 'C', type: 'sel', s: 1, pts: 2, topic: 'cell',
    p: 'Put them in order from the smallest (1) to the biggest (4).',
    o: ['1', '2', '3', '4'],
    items: [
      { t: 'Organ', a: '3' }, { t: 'Cell', a: '1' }, { t: 'Body system', a: '4' }, { t: 'Tissue', a: '2' },
    ],
    exp: 'Las células se unen y forman **tejidos**; los tejidos forman **órganos**; los órganos trabajan juntos en un **aparato o sistema**. Orden: cell → tissue → organ → body system.' },

  { id: 'q9', sec: 'C', type: 'short', pts: 2, topic: 'cell',
    p: 'How are bacteria and humans different? Write a sentence.',
    groups: [
      { l: 'bacteria have one cell', alt: ['one cell', 'single cell', '1 cell', 'unicellular', 'only one'] },
      { l: 'humans have many cells', alt: ['more than one', 'many cells', 'lots of cells', 'multicellular', 'several cells', 'millions'] },
    ],
    model: 'Bacteria are unicellular: they have got only one cell. Humans are multicellular: our body has got many cells.',
    exp: 'Las bacterias son **unicelulares** (una célula) y las personas somos **pluricelulares** (muchas células). Usa las dos palabras: *unicellular* y *multicellular*.' },

  /* ===== D · Five kingdoms ===== */
  { id: 'q10', sec: 'D', type: 'sel', s: 1, pts: 3.5, topic: 'kingdoms',
    p: 'Which kingdom do these living organisms belong to?',
    o: ['Animalia', 'Plantae', 'Fungi', 'Monera', 'Protista'],
    items: [
      { t: 'A platypus', a: 'Animalia' }, { t: 'A rose bush', a: 'Plantae' }, { t: 'A mushroom', a: 'Fungi' },
      { t: 'A bacterium', a: 'Monera' }, { t: 'A protozoan', a: 'Protista' }, { t: 'Seaweed (algae)', a: 'Protista' }, { t: 'Moss', a: 'Plantae' },
    ],
    exp: 'Cinco reinos: **Animalia** (animales), **Plantae** (plantas, también musgos y helechos), **Fungi** (hongos, setas), **Monera** (bacterias) y **Protista** (protozoos y algas).' },

  { id: 'q11', sec: 'D', type: 'sel', pts: 2.5, topic: 'kingdoms',
    p: 'Which kingdom is described?',
    o: ['Animalia', 'Plantae', 'Fungi', 'Monera', 'Protista'],
    items: [
      { t: 'Multicellular, autotrophic, they can’t move.', a: 'Plantae' },
      { t: 'Multicellular, heterotrophic, they can move.', a: 'Animalia' },
      { t: 'Unicellular. Some are beneficial and some are harmful.', a: 'Monera' },
      { t: 'Heterotrophic, they can’t move. Some are unicellular and some are multicellular.', a: 'Fungi' },
      { t: 'Unicellular or multicellular. Some are autotrophic and some are heterotrophic (for example, protozoa and algae).', a: 'Protista' },
    ],
    exp: 'Usa la tabla de los reinos: **Plantae** = pluricelular, autótrofo, no se mueve. **Animalia** = pluricelular, heterótrofo, se mueve. **Monera** = unicelular (algunas bacterias son beneficiosas y otras dañinas). **Fungi** = heterótrofo, no se mueve. **Protista** = unicelular o pluricelular, autótrofo o heterótrofo.' },

  { id: 'q12', sec: 'D', type: 'sel', pts: 2, topic: 'kingdoms',
    p: 'Complete the sentences with the right word.',
    o: ['autotrophic', 'heterotrophic', 'multicellular', 'unicellular'],
    items: [
      { t: 'A bacterium has got one cell: it is ___.', a: 'unicellular' },
      { t: 'A dog has got many cells: it is ___.', a: 'multicellular' },
      { t: 'A rose makes its own food: it is ___.', a: 'autotrophic' },
      { t: 'A mushroom feeds on other living organisms: it is ___.', a: 'heterotrophic' },
    ],
    exp: '*Unicellular* = una célula; *multicellular* = más de una célula; *autotrophic* = fabrica su propio alimento; *heterotrophic* = se alimenta de otros seres vivos.' },

  /* ===== E · Plants ===== */
  { id: 'q13', sec: 'E', type: 'sel', s: 1, pts: 2.5, topic: 'plant', svg: 'flower',
    p: 'Look at the flower. Label the parts A to E.',
    o: ['ovule', 'petal', 'pistil', 'sepal', 'stamen'],
    items: [{ t: 'A', a: 'stamen' }, { t: 'B', a: 'pistil' }, { t: 'C', a: 'petal' }, { t: 'D', a: 'sepal' }, { t: 'E', a: 'ovule' }],
    exp: 'El **estambre** (*stamen*) es la parte masculina y produce polen. El **pistilo** (*pistil*) es la parte femenina y contiene los óvulos (*ovules*). Los **pétalos** forman la corola; los **sépalos** forman el cáliz y protegen la flor.' },

  { id: 'q14', sec: 'E', type: 'sel', s: 1, pts: 2.5, topic: 'plant', svg: 'plant',
    p: 'Look at the plant. Label the parts A to E.',
    o: ['flower', 'leaf', 'petiole', 'roots', 'stem'],
    items: [{ t: 'A', a: 'flower' }, { t: 'B', a: 'leaf' }, { t: 'C', a: 'petiole' }, { t: 'D', a: 'stem' }, { t: 'E', a: 'roots' }],
    exp: 'Las **raíces** (*roots*) fijan la planta al suelo y absorben agua y minerales. El **tallo** (*stem*) sostiene la planta y por dentro circula el alimento. El **peciolo** (*petiole*) une la hoja al tallo.' },

  { id: 'q15', sec: 'E', type: 'sel', pts: 3, topic: 'plant',
    p: 'What is each part of the plant for? Match.',
    o: ['calyx', 'corolla', 'petiole', 'pistil', 'roots', 'stamen', 'stem'],
    items: [
      { t: 'It is the male part of the flower and it produces pollen.', a: 'stamen' },
      { t: 'It is the female part of the flower and it contains the ovules.', a: 'pistil' },
      { t: 'They fix the plant in the soil and absorb water and minerals.', a: 'roots' },
      { t: 'It holds the plant up and the food circulates inside it.', a: 'stem' },
      { t: 'It attaches the leaf to the stem.', a: 'petiole' },
      { t: 'All the petals together form this.', a: 'corolla' },
    ],
    exp: '**Stamen** = masculino, produce polen. **Pistil** = femenino, contiene óvulos. **Roots** = fijan y absorben. **Stem** = sostiene. **Petiole** = une la hoja al tallo. **Corolla** = conjunto de pétalos; **calyx** (cáliz) = conjunto de sépalos.' },

  { id: 'q16', sec: 'E', type: 'sel', pts: 2.5, topic: 'plant',
    p: 'What type of plant is it?',
    o: ['tree', 'bush', 'grass', 'plant without seeds and flowers'],
    items: [
      { t: 'A pine', a: 'tree' }, { t: 'Rosemary', a: 'bush' }, { t: 'A poppy', a: 'grass' },
      { t: 'Moss', a: 'plant without seeds and flowers' },
      { t: 'It has got a hard, thick stem called a trunk.', a: 'tree' },
    ],
    exp: '**Trees** (pino, roble): tronco duro y grueso. **Bushes** (romero, rosal): varios tallos duros y delgados que salen de la raíz. **Grasses** (amapola, trigo): tallos finos, verdes y flexibles. Algunas plantas no tienen semillas ni flores: tienen esporas (helechos y musgos).' },

  /* ===== F · Photosynthesis ===== */
  { id: 'q17', sec: 'F', type: 'sel', s: 1, pts: 3, topic: 'photo',
    p: 'Choose the correct word for each sentence.',
    items: [
      { t: 'Plants use sunlight, water and carbon dioxide to make sugar. This process is called ___.', a: 'photosynthesis', o: ['photosynthesis', 'respiration', 'transpiration'] },
      { t: '___ in the leaves helps to absorb energy from sunlight.', a: 'Chlorophyll', o: ['Chlorophyll', 'Roots', 'Petals'] },
      { t: 'During the day, plants release ___ through photosynthesis.', a: 'oxygen', o: ['oxygen', 'carbon dioxide'] },
      { t: 'At night, plants carry out cellular ___.', a: 'respiration', o: ['respiration', 'photosynthesis'] },
      { t: '___ sap carries water and minerals from the roots to the leaves.', a: 'Xylem', o: ['Xylem', 'Phloem'] },
      { t: '___ sap transports nutrients from the leaves to the rest of the plant.', a: 'Phloem', o: ['Phloem', 'Xylem'] },
    ],
    exp: 'De día: **fotosíntesis** (luz + agua + CO₂ → azúcar + oxígeno) gracias a la **clorofila**. De noche: **respiración celular** (usa los azúcares almacenados; toma oxígeno y expulsa CO₂). **Xilema** = agua y minerales de la raíz a las hojas. **Floema** = azúcares de las hojas al resto de la planta.' },

  { id: 'q18', sec: 'F', type: 'mc', pts: 1, topic: 'photo',
    p: 'A plant is covered with a plastic bag. After some hours there are drops of water inside the bag. Which process is the experiment looking for evidence of?',
    o: ['Photosynthesis', 'Respiration', 'Transpiration', 'Germination'],
    a: 'Transpiration',
    exp: 'Las plantas pierden el exceso de agua en forma de vapor por las hojas: es la **transpiración** (*transpiration*). En la bolsa de plástico ese vapor se convierte en gotas.' },

  { id: 'q19', sec: 'F', type: 'tf', s: 1, pts: 4, topic: 'photo',
    p: 'True or false? If it is false, write the correct word for the underlined word (if there is no underlined word, just choose false).',
    items: [
      { t: 'Plants make their own food, so they are autotrophic.', a: true },
      { t: 'During photosynthesis, plants release <u>carbon dioxide</u>.', a: false, fix: ['oxygen'] },
      { t: 'Plants don’t do anything at night.', a: false },
      { t: 'Plants collect carbon dioxide and release oxygen.', a: true },
    ],
    exp: 'Las plantas son **autótrofas**. En la fotosíntesis **toman CO₂ y liberan oxígeno** (al revés que las personas al respirar). De noche **sí están activas**: hacen la respiración celular y usan sus azúcares para crecer.' },

  { id: 'q20', sec: 'F', type: 'short', s: 1, pts: 2, topic: 'photo',
    p: 'Are plants active at night? Explain your answer.',
    groups: [
      { l: 'yes, they are active', alt: ['yes', 'active', 'they are'] },
      { l: 'cellular respiration / oxygen and carbon dioxide', alt: ['respir', 'breath', 'oxygen', 'carbon dioxide', 'co2'] },
      { l: 'they use sugars / energy to grow', alt: ['sugar', 'energy', 'stored', 'grow', 'food'] },
    ],
    model: 'Yes, they are. At night plants carry out cellular respiration: they use the sugars they have stored to get energy for growth and basic functions. They take in oxygen and release carbon dioxide.',
    exp: 'Sí: de noche las plantas hacen la **respiración celular**. Usan los azúcares almacenados para obtener energía (crecer y funciones básicas), toman oxígeno y expulsan dióxido de carbono.' },

  /* ===== G · Reproduction ===== */
  { id: 'q21', sec: 'G', type: 'sel', s: 1, pts: 2, topic: 'repro',
    p: 'Put the steps of plant reproduction in order (1–4).',
    o: ['1', '2', '3', '4'],
    items: [
      { t: 'The seed opens and the embryo develops a root and a stem.', a: '4' },
      { t: 'Pollen reaches the pistil.', a: '1' },
      { t: 'The fertilised ovule becomes a seed and the pistil becomes a fruit.', a: '3' },
      { t: 'The pollen grain goes down into the ovule and fertilises it.', a: '2' },
    ],
    exp: 'Orden: 1 **polinización** (el polen llega al pistilo) → 2 **fecundación** (el polen se une al óvulo) → 3 **formación de semilla y fruto** → 4 **germinación** (la semilla se abre y nace una planta nueva).' },

  { id: 'q22', sec: 'G', type: 'sel', pts: 2, topic: 'repro',
    p: 'Match each stage of plant reproduction with its description.',
    o: ['fertilisation', 'germination', 'pollination', 'seed and fruit formation'],
    items: [
      { t: 'The pollen grain joins the ovule.', a: 'fertilisation' },
      { t: 'A new plant starts to grow from the seed.', a: 'germination' },
      { t: 'Pollen goes from the stamens of one flower to the pistil of another flower.', a: 'pollination' },
      { t: 'The ovule becomes a seed and the pistil becomes a fruit.', a: 'seed and fruit formation' },
    ],
    exp: '**Pollination** = el polen viaja de los estambres al pistilo de otra flor. **Fertilisation** = el polen se une al óvulo. **Seed and fruit formation** = el óvulo se convierte en semilla y el pistilo en fruto. **Germination** = la semilla empieza a crecer.' },

  { id: 'q23', sec: 'G', type: 'gap', s: 1, pts: 3.5, topic: 'repro',
    p: 'Complete the summary with the words in the box.',
    box: ['embryo', 'flower', 'fruit', 'nectar', 'pistil', 'pollination', 'pollinators', 'seed'],
    tpl: 'Bees and butterflies are called {1} because they help in the process of {2}. They feed on the {3} that the {4} produces. The pollen sticks to their bodies and they take it to the {5} of another flower. After fertilisation, the ovule becomes a {6} and the pistil becomes a {7}.',
    items: ['pollinators', 'pollination', 'nectar', 'flower', 'pistil', 'seed', 'fruit'],
    exp: 'Los animales que llevan el polen se llaman **pollinators** (polinizadores). Se alimentan del **nectar** (néctar) de la flor. El polen llega al **pistil**; después el óvulo fecundado se convierte en **seed** (semilla) y el pistilo en **fruit** (fruto).' },

  { id: 'q24', sec: 'G', type: 'sel', pts: 2, topic: 'repro',
    p: 'How is the pollen transported?',
    o: ['wind', 'water', 'animals'],
    items: [
      { t: 'Wheat', a: 'wind' }, { t: 'Pondweed', a: 'water' }, { t: 'Coneflower', a: 'animals' },
      { t: 'A flower with colourful petals and sweet nectar', a: 'animals' },
    ],
    exp: 'El trigo se poliniza por el **viento**; las plantas acuáticas como *pondweed*, por el **agua**; las flores de colores y con néctar (como *coneflower*) se polinizan por **animales** (insectos y aves).' },

  { id: 'q25', sec: 'G', type: 'short', s: 1, pts: 2, topic: 'repro',
    p: 'Why don’t plants that are pollinated by the wind have colourful flowers or a sweet scent?',
    groups: [
      { l: 'the wind carries the pollen', alt: ['wind'] },
      { l: 'they don’t need to attract insects / birds / animals', alt: ['dont need', 'do not need', 'no need', 'attract', 'insect', 'bird', 'animal', 'bee'] },
    ],
    model: 'Because they don’t need to attract insects or birds. The wind carries their pollen, so they produce a lot of very light pollen.',
    exp: 'Las flores de colores y con olor atraen a los animales polinizadores. Si el polen lo lleva el **viento**, la planta no necesita atraer animales: produce mucho polen muy ligero.' },

  { id: 'q26', sec: 'G', type: 'mc', pts: 1, topic: 'plant',
    p: 'Which plants have got spores instead of seeds and flowers?',
    o: ['Ferns and mosses', 'Pine trees', 'Roses', 'Wheat'],
    a: 'Ferns and mosses',
    exp: 'Las plantas sin semillas ni flores, como los **helechos y los musgos** (*ferns and mosses*), tienen esporas. Los pinos, los rosales y el trigo producen semillas.' },

  /* ===== H · Interaction ===== */
  { id: 'q27', sec: 'H', type: 'sel', s: 1, pts: 2.5, topic: 'interact',
    p: 'How does the plant react to the environment: to light, to water or to contact?',
    o: ['light', 'water', 'contact'],
    items: [
      { t: 'Sunflowers follow the Sun.', a: 'light' },
      { t: 'Roots grow down and sideways to find water in the soil.', a: 'water' },
      { t: 'A climbing plant wraps around a tree.', a: 'contact' },
      { t: 'A venus flytrap closes when a fly touches it.', a: 'contact' },
      { t: 'A green stem grows towards a window.', a: 'light' },
    ],
    exp: 'Las plantas reaccionan a la **luz** (los tallos y flores se orientan al Sol), al **agua** (las raíces la buscan) y al **contacto** (las trepadoras se enrollan; la atrapamoscas se cierra).' },

  { id: 'q28', sec: 'H', type: 'sel', pts: 2, topic: 'interact',
    p: 'Deciduous or evergreen?',
    o: ['deciduous', 'evergreen'],
    items: [
      { t: 'A maple tree', a: 'deciduous' }, { t: 'A pine tree', a: 'evergreen' },
      { t: 'A tree that loses its leaves in autumn', a: 'deciduous' },
      { t: 'A tree that keeps its leaves all year', a: 'evergreen' },
    ],
    exp: 'Los árboles de **hoja caduca** (*deciduous*, como el arce) pierden las hojas en otoño. Los de **hoja perenne** (*evergreen*, como el pino) las conservan todo el año.' },

  { id: 'q29', sec: 'H', type: 'short', s: 1, pts: 2, topic: 'plant',
    p: 'What happens if plants have got light, water, air and soil? And what happens if they have only got air and soil?',
    groups: [
      { l: 'with light, water, air and soil they grow', alt: ['grow', 'live', 'survive', 'healthy', 'alive'] },
      { l: 'with only air and soil they can’t grow / die', alt: ['cant', 'cannot', 'do not grow', 'dont grow', 'not grow', 'die', 'wont', 'doesnt', 'does not', 'unable', 'no food', 'stop'] },
    ],
    model: 'If plants have got light, water, air and soil, they grow. If plants have only got air and soil, they can’t grow (they can’t make their food).',
    exp: 'Sentencia *zero conditional*: **If plants have got light, water, air and soil, they grow.** Sin luz y agua no pueden hacer la fotosíntesis, así que **no crecen**.' },

  { id: 'q30', sec: 'H', type: 'short', pts: 2, topic: 'interact',
    p: 'Why do many plants lose their leaves or flowers in autumn?',
    groups: [
      { l: 'it gets colder / less daylight', alt: ['cold', 'winter', 'less light', 'less daylight', 'fewer hours', 'temperature'] },
      { l: 'to prevent / avoid damage', alt: ['prevent', 'protect', 'avoid', 'damage', 'save', 'survive'] },
    ],
    model: 'Plants lose their leaves to prevent damage from the cold. In autumn there are fewer hours of daylight and it gets colder.',
    exp: 'En otoño hay menos horas de luz y hace más frío. Las plantas pierden hojas o flores **para evitar daños por el frío** (*to prevent damage from the cold*).' },

  { id: 'q31', sec: 'H', type: 'mc', pts: 1, topic: 'interact',
    p: 'Why do many plants change the direction they face?',
    o: ['To follow the light of the Sun', 'To find water', 'To catch insects', 'To attract bees'],
    a: 'To follow the light of the Sun',
    exp: 'Las hojas y flores de muchas plantas cambian de dirección para **seguir la luz del Sol** (*phototropism*: *photo-* = luz).' },

  /* ===== I · Map your ideas ===== */
  { id: 'q32', sec: 'I', type: 'sel', s: 1, pts: 3.5, topic: 'living', map: true,
    p: 'Complete the map. Choose a word for each number.',
    o: ['Animalia', 'asexual', 'interaction', 'Monera', 'photosynthesis', 'Plantae', 'Protista', 'reproduction'],
    items: [
      { t: '1', a: ['interaction', 'reproduction'], g: 'vf', topic: 'living' },
      { t: '2', a: ['interaction', 'reproduction'], g: 'vf', topic: 'living' },
      { t: '3', a: ['Plantae', 'Monera', 'Protista'], g: 'kg', topic: 'kingdoms' },
      { t: '4', a: ['Plantae', 'Monera', 'Protista'], g: 'kg', topic: 'kingdoms' },
      { t: '5', a: ['Plantae', 'Monera', 'Protista'], g: 'kg', topic: 'kingdoms' },
      { t: '6', a: ['photosynthesis'], topic: 'photo' },
      { t: '7', a: ['asexual'], topic: 'repro' },
    ],
    exp: 'Los seres vivos están formados por **células** que realizan las **tres funciones vitales**: nutrición, interacción y reproducción. Los **cinco reinos** son Animalia, Plantae, Fungi, Monera y Protista. La nutrición de las plantas es la **fotosíntesis**. La reproducción de las plantas puede ser sexual o **asexual**.' },
];

/* ---------- Study notes ---------- */
const NOTES = {
  living: {
    en: [
      'Living organisms: plants, animals, and algae, fungi, bacteria and other microbes.',
      'Aquatic organisms live in water (oceans, seas, rivers, ponds). Land organisms live on land.',
      'All living organisms perform three vital functions: nutrition, interaction and reproduction.',
      'Nutrition: they need food, water and air to live, grow and get energy. They excrete waste products.',
      'Heterotrophic nutrition: they feed on other living organisms. Herbivores eat plants, carnivores eat animals, omnivores eat both.',
      'Autotrophic nutrition: they make their own food (plants).',
      'Interaction: they feel and react to the world around them.',
      'Reproduction: they produce offspring. Sexual = male and female of the same species. Asexual = a single parent.',
    ],
    words: [['living organism', 'ser vivo'], ['aquatic', 'acuático'], ['land', 'terrestre'], ['vital functions', 'funciones vitales'], ['nutrition', 'nutrición'], ['interaction', 'interacción'], ['reproduction', 'reproducción'], ['offspring', 'descendientes, crías'], ['herbivore', 'herbívoro'], ['carnivore', 'carnívoro'], ['omnivore', 'omnívoro'], ['autotrophic', 'autótrofo'], ['heterotrophic', 'heterótrofo']],
  },
  cell: {
    en: [
      'Cells are microscopic units that perform the three vital functions. They have different shapes and sizes.',
      'Unicellular organisms have one cell (bacteria). Multicellular organisms have more than one cell (humans).',
      'Cell membrane: protects the cytoplasm and the other elements inside the cell.',
      'Cytoplasm: contains organelles (small organs) that each perform a specific function.',
      'Nucleus: controls the cell.',
      'Cells join together to form tissues. Organs are made of tissue and are part of a body system. In a body system, the organs perform a specific function together.',
    ],
    words: [['cell', 'célula'], ['unicellular', 'unicelular'], ['multicellular', 'pluricelular'], ['cell membrane', 'membrana celular'], ['cytoplasm', 'citoplasma'], ['organelles', 'orgánulos'], ['nucleus', 'núcleo'], ['tissue', 'tejido'], ['organ', 'órgano'], ['body system', 'aparato / sistema']],
  },
  kingdoms: {
    en: [
      'Living organisms are classified into five groups called kingdoms. Organisms in each kingdom share the same characteristics.',
      'Animalia: multicellular, heterotrophic, can move on their own.',
      'Plantae: multicellular, autotrophic, can’t move on their own.',
      'Fungi: unicellular or multicellular, heterotrophic, can’t move on their own (mushrooms).',
      'Monera: unicellular, autotrophic or heterotrophic. Some are beneficial and some are harmful (bacteria).',
      'Protista: unicellular or multicellular, heterotrophic or autotrophic (protozoa, algae).',
    ],
    words: [['kingdom', 'reino'], ['Animalia', 'animales'], ['Plantae', 'plantas'], ['Fungi', 'hongos'], ['Monera', 'bacterias'], ['Protista', 'protozoos y algas'], ['mushroom', 'seta'], ['bacteria', 'bacterias'], ['algae', 'algas']],
  },
  plant: {
    en: [
      'Flower: the stamen is the male part and produces pollen. The pistil is the female part and contains the ovules. Petals form the corolla (a group of petals). Sepals form the calyx and protect the flower.',
      'Plant: the roots fix the plant in the soil and absorb water and minerals. The stem holds the plant up and the food circulates inside. The petiole attaches the leaf to the stem. The leaf makes food.',
      'Trees (pine, oak): a hard, thick stem called a trunk. Branches grow high above the ground. They produce seeds and flowers.',
      'Bushes (rosemary, rose): one or many hard, thin stems that grow from the roots. They produce seeds and flowers.',
      'Grasses (poppies, wheat): thin, green, flexible stems. They produce seeds and flowers.',
      'Plants without seeds and flowers: some have got spores (ferns and mosses).',
    ],
    words: [['stamen', 'estambre'], ['pistil', 'pistilo'], ['ovule', 'óvulo'], ['pollen', 'polen'], ['petal', 'pétalo'], ['corolla', 'corola'], ['sepal', 'sépalo'], ['calyx', 'cáliz'], ['roots', 'raíces'], ['stem', 'tallo'], ['petiole', 'peciolo'], ['leaf', 'hoja'], ['trunk', 'tronco'], ['spores', 'esporas']],
  },
  photo: {
    en: [
      'Plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar. This process is called photosynthesis.',
      'Chlorophyll in the leaves helps to absorb energy from sunlight.',
      'Xylem sap carries water and minerals from the roots to the leaves. Phloem sap transports nutrients from the leaves to the rest of the plant.',
      'Day: photosynthesis (plants take in carbon dioxide and release oxygen). Night: cellular respiration (plants use the sugars they stored for growth and basic functions).',
      'Waste products: oxygen through photosynthesis, carbon dioxide through respiration, excess water (vapour) through transpiration.',
    ],
    words: [['photosynthesis', 'fotosíntesis'], ['chlorophyll', 'clorofila'], ['xylem', 'xilema'], ['phloem', 'floema'], ['sap', 'savia'], ['respiration', 'respiración'], ['transpiration', 'transpiración'], ['oxygen', 'oxígeno'], ['carbon dioxide', 'dióxido de carbono'], ['sugar', 'azúcar']],
  },
  repro: {
    en: [
      'Plants reproduce through four processes: pollination → fertilisation → seed and fruit formation → germination.',
      'Pollination: pollen from the stamens of one flower reaches the pistil of another flower of the same type. It can be carried by the wind, by water or by animals (pollinators: bees, butterflies, birds).',
      'Plants pollinated by animals produce colourful flowers and nectar (a sweet, sugary liquid). Plants pollinated by the wind produce a lot of very light pollen.',
      'Fertilisation: the ovule (egg) joins with the pollen inside the pistil.',
      'Seed and fruit formation: the embryo develops inside the seed; the pistil becomes the fruit that protects the seeds.',
      'Germination: the seed opens, the embryo develops a root and a stem and becomes a new plant.',
    ],
    words: [['pollination', 'polinización'], ['fertilisation', 'fecundación'], ['seed', 'semilla'], ['fruit', 'fruto'], ['germination', 'germinación'], ['embryo', 'embrión'], ['pollinators', 'polinizadores'], ['nectar', 'néctar'], ['wind', 'viento']],
  },
  interact: {
    en: [
      'Light: green stems grow towards the light; sunflowers follow the Sun; many plants open or close their flowers and lose their leaves depending on daily sunlight.',
      'Water: roots find water. The main root grows down and other, smaller roots explore the soil.',
      'Contact: climbing plants grow around objects they touch. Some plants produce toxic substances or trap insects (venus flytrap).',
      'Seasons: in spring there are more hours of daylight and it is warmer: plants produce leaves, buds and flowers. In autumn there are fewer hours of daylight and it gets colder: plants lose their leaves or flowers to prevent damage from the cold.',
      'Deciduous trees lose their leaves (maple). Evergreen trees keep their leaves (pine).',
      'Language bank: If plants have got light, water, air and soil, they grow. · Plants lose their flowers to prevent damage from the cold.',
    ],
    words: [['light', 'luz'], ['water', 'agua'], ['contact', 'contacto'], ['season', 'estación'], ['deciduous', 'de hoja caduca'], ['evergreen', 'de hoja perenne'], ['to grow towards', 'crecer hacia'], ['to trap', 'atrapar']],
  },
};
