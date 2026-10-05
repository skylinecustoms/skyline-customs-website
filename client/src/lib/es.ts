/**
 * Spanish copy for the /es pages: three service pages, the shared UI strings
 * (nav, quote form, common lines) and the October 2026 promo page.
 * Neutral Latin American Spanish, "usted" form. Brand names stay in English.
 * No prices anywhere; the pages send every visitor to the free quote form.
 */

export interface EsServicePage {
  path: string;      // "/es/ppf" | "/es/recubrimiento-ceramico" | "/es/polarizado"
  enPath: string;    // "/services/ppf" | "/services/ceramic-coating" | "/services/window-tinting"
  service: "ppf" | "ceramic" | "tint";
  title: string;         // 50–65 chars, Spanish, with "Chantilly, VA"
  description: string;   // 140–160 chars
  eyebrow: string;
  h1: string;            // UPPERCASE
  intro: string[];       // 2 paragraphs, 60–100 words
  included: { title: string; desc: string }[];  // 4 benefit cards
  packages: { name: string; desc: string }[];   // ppf: the 3 PPF packages; ceramic: Crystal Serum Light (5 años) and Ultra (7 años); tint: ventanas laterales, paquete trasero, carro completo (windows, not paint), parabrisas
  process: { title: string; desc: string }[];   // 4 steps
  faqs: { q: string; a: string }[];             // 6, answers 35–70 words; the tint page includes the Virginia law and that Maryland/DC differ
  cta: { heading: string; text: string };
}
export interface EsUi {   // every string the templates and the quote form show
  nav: { home: string; ppf: string; ceramic: string; tint: string; promo: string; quote: string; english: string };
  form: { title: string; sub: string; firstName: string; lastName: string; phone: string; email: string; year: string; make: string; model: string; message: string; terms: string; termsLink: string; submit: string; sending: string; successTitle: string; successBody: string; error: string; finePrint: string };
  common: { getQuote: string; call: string; reviews: string; shopLine: string; readInEnglish: string; deposit: string; payPlans: string; serves: string };
}
export interface EsPromo {
  path: "/es/promo"; enPath: "/promo";
  title: string; description: string; eyebrow: string; h1: string[]; // two lines
  sub: string; bullets: string[]; // 4 lines: what you get
  giveaway: { heading: string; body: string; rules: string[] }; // rules: Spanish versions of the 8 rules in client/src/lib/promoExtras.ts
  cta: string; formHeading: string; formIntro: string;
  faqs: { q: string; a: string }[]; // 5
}

export const ES_PAGES: EsServicePage[] = [
  {
    path: "/es/ppf",
    enPath: "/services/ppf",
    service: "ppf",
    title: "PPF en Chantilly, VA | Película de Protección de Pintura STEK",
    description: "Película de protección de pintura STEK DYNOshield instalada en Chantilly, VA. Se cura sola, garantía de 12 años y cotización gratis en menos de una hora.",
    eyebrow: "Película de protección de pintura (PPF)",
    h1: "PROTEJA SU PINTURA DE LAS PIEDRAS",
    intro: [
      "Si usted maneja todos los días por la Route 28, la I-66 o la Dulles Toll Road, ya sabe lo que hacen la gravilla y las piedritas con el capó y el bumper. La película de protección de pintura (PPF) es una capa de uretano transparente que recibe esos golpes en lugar de su pintura, y se despega limpiamente si algún día vende el carro.",
      "En Skyline Customs instalamos únicamente STEK DYNOshield, una película con capa superior que se cura sola y garantía del fabricante por 12 años. Los patrones se cortan por computadora para su año y modelo exacto, los bordes van envueltos debajo de los paneles y nunca se corta sobre el vehículo. Todo el trabajo se hace en nuestro taller de Chantilly, Virginia.",
    ],
    included: [
      { title: "Defensa contra piedras e impactos", desc: "El uretano grueso absorbe la gravilla, las piedras y los residuos de la carretera que de otra forma dejarían marcas permanentes en el bumper, el capó y los guardafangos." },
      { title: "Capa que se cura sola", desc: "Los rayones leves y las marcas de lavado desaparecen por sí solos con el calor del sol o con agua caliente. La película se repara; su pintura nunca se toca." },
      { title: "Invisible sobre el carro", desc: "Ópticamente transparente, sin textura de cáscara de naranja ni neblina. Con los bordes envueltos debajo de los paneles, nadie nota que la película está ahí." },
      { title: "Garantía de 12 años", desc: "STEK DYNOshield está garantizada por el fabricante durante 12 años contra amarillamiento, grietas, despegue y delaminación, y nuestra instalación tiene garantía de mano de obra de por vida." },
    ],
    packages: [
      { name: "Frontal parcial", desc: "El bumper delantero completo, las primeras 18 pulgadas del capó, el borde delantero de ambos guardafangos y los espejos. Cubre las zonas que reciben más piedras." },
      { name: "Frontal completo", desc: "Capó completo, bumper, ambos guardafangos completos, espejos, faros y pilares A. Sin línea visible en el capó. Es el paquete que recomendamos a la mayoría de nuestros clientes." },
      { name: "Frontal completo extendido", desc: "Todo lo del frontal completo más los estribos, los bordes de las puertas y las copas de las manijas. Ideal para camionetas, SUV y vehículos que ven grava o muchos pasajeros." },
    ],
    process: [
      { title: "Cotización gratis e inspección", desc: "Usted nos indica el año, la marca, el modelo y cómo maneja. Le recomendamos frontal parcial, completo o extendido y confirmamos todo con el carro enfrente." },
      { title: "Lavado de descontaminación", desc: "Espuma, removedor de partículas de hierro y arcilla para que nada quede entre la película y la pintura. Incluso los carros recién salidos del concesionario pasan por este paso." },
      { title: "Corrección de pintura si hace falta", desc: "La película sella lo que queda debajo. Si hay remolinos o rayones, los pulimos primero para que la pintura protegida quede mejor que la de al lado." },
      { title: "Instalación e inspección bajo luces", desc: "Instaladores certificados trabajan panel por panel en una bahía con control de polvo. Antes de pagar el saldo, usted revisa cada panel con nosotros bajo luces de alta intensidad." },
    ],
    faqs: [
      { q: "¿Cuánto dura la película de protección de pintura?", a: "STEK DYNOshield tiene garantía del fabricante por 12 años contra amarillamiento, grietas, despegue y delaminación. Con lavado a mano y evitando los túneles de lavado con cepillos, la mayoría de las instalaciones se ven como nuevas mucho después de los diez años. Una capa de recubrimiento cerámico encima facilita todavía más la limpieza." },
      { q: "¿Se nota la película sobre el carro?", a: "No. DYNOshield es ópticamente transparente, sin neblina ni textura de cáscara de naranja, así que la única diferencia es un brillo un poco más profundo. Los bordes se envuelven debajo del capó, los guardafangos y el bumper donde el panel lo permite, en lugar de dejar una costura visible en la cara del panel." },
      { q: "¿La película realmente se repara sola?", a: "Sí. La capa superior de poliuretano termoplástico cierra los rayones leves y las marcas de remolino cuando se calienta con el sol o con agua caliente. Los rayones profundos de llaves o impactos fuertes no se reparan solos, pero la película recibe ese daño en lugar de su pintura, y ese panel se puede reemplazar." },
      { q: "¿Cuánto tiempo toma la instalación?", a: "El frontal parcial toma alrededor de medio día, el frontal completo un día y el frontal completo extendido entre uno y dos días. Si agrega recubrimiento cerámico al mismo trabajo, cuente con dos días. Cada instalación comienza con un lavado de descontaminación y termina con una revisión bajo luces de alta intensidad." },
      { q: "¿Hay que dejar un depósito?", a: "Sí. Cuando usted aprueba su cotización, un depósito del 20 por ciento reserva la fecha de instalación y se aplica al total. El saldo se paga al recoger el carro, después de revisar cada panel con nosotros. El depósito es totalmente reembolsable en cualquier momento. También puede pagar a plazos con Klarna, Afterpay o Affirm." },
      { q: "¿La película daña la pintura cuando se quita?", a: "No. Retirada por un profesional, la película deja la pintura de fábrica intacta, por eso es tan popular en carros arrendados y en vehículos que la gente planea vender. De hecho, la pintura que estuvo bajo la película suele estar en mejor estado que los paneles descubiertos que la rodean." },
    ],
    cta: {
      heading: "PIDA SU COTIZACIÓN GRATIS",
      text: "Envíenos el año, la marca y el modelo de su vehículo y el paquete que le interesa. Respondemos normalmente en menos de una hora durante el horario de atención, y confirmamos todo en persona en el taller.",
    },
  },
  {
    path: "/es/recubrimiento-ceramico",
    enPath: "/services/ceramic-coating",
    service: "ceramic",
    title: "Recubrimiento Cerámico Gtechniq en Chantilly, VA | Skyline Customs",
    description: "Recubrimiento cerámico profesional Gtechniq con garantía de 5 o 7 años, aplicado en Chantilly, VA. Brillo profundo, lavado fácil y protección contra el sol.",
    eyebrow: "Recubrimiento cerámico",
    h1: "BRILLO QUE DURA AÑOS, NO SEMANAS",
    intro: [
      "Una cera se va en pocas semanas. Un recubrimiento cerámico profesional se enlaza con el barniz de su pintura y forma una capa dura y repelente al agua que mantiene el carro brillante y fácil de lavar durante años. El lodo, la lluvia ácida, la savia de los árboles y el excremento de pájaros resbalan en lugar de marcar la pintura.",
      "Trabajamos con Gtechniq Crystal Serum Light, con garantía de 5 años, y Crystal Serum Ultra, con garantía de 7 años. El recubrimiento se aplica sobre la película de protección de pintura y sobre el resto de la carrocería, después de una descontaminación completa y la corrección de pintura necesaria, en nuestro taller de Chantilly, Virginia.",
    ],
    included: [
      { title: "Brillo profundo", desc: "El recubrimiento crea una superficie parecida al vidrio que realza la profundidad y el reflejo del color más allá de lo que logra cualquier cera o sellador." },
      { title: "Efecto repelente al agua", desc: "El agua, el lodo y la suciedad del camino forman gotas y se deslizan. El carro se mantiene limpio por más tiempo y se lava en minutos." },
      { title: "Resistencia química", desc: "Protege contra la lluvia ácida, la contaminación industrial, la savia y los productos de limpieza agresivos que grabarían y mancharían el barniz." },
      { title: "Protección contra el sol", desc: "Bloquea la radiación UV que decolora y oxida la pintura, para que el color se mantenga como el día que salió del concesionario." },
    ],
    packages: [
      { name: "Crystal Serum Light (5 años)", desc: "El recubrimiento profesional de Gtechniq con garantía de 5 años. Incluye descontaminación y un pulido de corrección de una etapa antes de aplicarlo." },
      { name: "Crystal Serum Ultra (7 años)", desc: "La fórmula más dura y duradera de Gtechniq, con garantía de 7 años y corrección de pintura de dos etapas. Para quien quiere la máxima protección a largo plazo." },
    ],
    process: [
      { title: "Evaluación de la pintura", desc: "Inspeccionamos el estado de la pintura bajo luces controladas para definir cuánta corrección necesita antes del recubrimiento." },
      { title: "Descontaminación completa", desc: "Arcilla, removedor de partículas de hierro y un lavado a fondo eliminan todo contaminante que afectaría la adherencia." },
      { title: "Corrección de pintura", desc: "Pulimos los remolinos, rayones leves y oxidación. Nunca sellamos imperfecciones: el recubrimiento es tan bueno como la superficie debajo de él." },
      { title: "Aplicación y curado", desc: "Después de limpiar cada panel con alcohol isopropílico, el recubrimiento se aplica por secciones, se nivela y se cura bajo lámparas infrarrojas. Usted lo revisa bajo luces antes de pagar." },
    ],
    faqs: [
      { q: "¿Cuánto dura un recubrimiento cerámico?", a: "Depende del producto y del cuidado. Gtechniq Crystal Serum Light tiene garantía de 5 años y Crystal Serum Ultra de 7 años. Con lavado a mano o sin contacto y un champú de pH neutro, el recubrimiento mantiene su brillo y su efecto repelente durante toda la garantía, sin necesidad de encerar." },
      { q: "¿El recubrimiento cerámico evita rayones y piedras?", a: "Aporta dureza y resistencia química, pero no sustituye a la película de protección de pintura frente a piedras y rayones profundos. Para la protección más completa recomendamos PPF en el frente y recubrimiento cerámico sobre toda la carrocería. El recubrimiento se adhiere muy bien sobre la película DYNOshield." },
      { q: "¿Cómo cuido un carro con recubrimiento cerámico?", a: "Lávelo a mano o en un lavado sin contacto; evite los túneles con cepillos. Use un champú de pH neutro, no aplique cera encima y procure no estacionar bajo árboles por periodos largos. Espere siete días después de la aplicación antes del primer lavado para que el recubrimiento termine de curar." },
      { q: "¿Vale la pena en un carro nuevo?", a: "Sí, y es el mejor momento. Los carros nuevos suelen traer rayones del transporte y remolinos del lavado en el concesionario, que se pulen antes de aplicar el recubrimiento. Así la pintura queda sellada en su mejor estado desde el primer día en lugar de empezar a deteriorarse con el sol de Virginia." },
      { q: "¿Cuál es la diferencia entre el de 5 y el de 7 años?", a: "Crystal Serum Ultra utiliza una fórmula más dura, con capas más gruesas y un efecto repelente más fuerte que Crystal Serum Light, y por eso Gtechniq lo garantiza por 7 años en lugar de 5. También incluye una corrección de pintura de dos etapas. Es la opción para quien piensa quedarse con el carro muchos años." },
      { q: "¿Necesito dejar un depósito para reservar?", a: "Después de aprobar la cotización, se reserva la fecha con un depósito del 20 por ciento que se descuenta del total. Es completamente reembolsable si cambia de planes. El resto se paga al entregar el carro, una vez que haya revisado cada panel bajo las luces. Aceptamos Klarna, Afterpay y Affirm para pagar a plazos." },
    ],
    cta: {
      heading: "SOLICITE SU COTIZACIÓN",
      text: "Cuéntenos qué vehículo tiene y si le interesa el paquete de 5 o de 7 años. Le respondemos con una cotización gratis, por lo general en menos de una hora en horario de atención.",
    },
  },
  {
    path: "/es/polarizado",
    enPath: "/services/window-tinting",
    service: "tint",
    title: "Polarizado Cerámico para Carros en Chantilly, VA | Skyline Customs",
    description: "Polarizado cerámico GeoShield Pro Nano Ceramic en Chantilly, VA. Hasta 83% de rechazo de calor, 99% de protección UV, legal en Virginia y garantía de por vida.",
    eyebrow: "Polarizado cerámico",
    h1: "POLARIZADO CERÁMICO QUE SÍ BLOQUEA EL CALOR",
    intro: [
      "El polarizado barato se pone morado, se llena de burbujas y casi no rechaza el calor. Nosotros instalamos GeoShield Pro Nano Ceramic, una película sin metal que bloquea el 99 por ciento de los rayos UV y hasta el 83 por ciento del calor, sin interferir con el GPS, el celular ni el transpondedor del E-ZPass.",
      "Cada película se corta por computadora según las medidas exactas de sus ventanas, sin recortar sobre el vidrio, y la instalación toma de dos a tres horas en nuestro taller de Chantilly. Solo instalamos tonos permitidos por la ley de Virginia, le explicamos los límites antes de empezar y la película tiene garantía de por vida a nivel nacional.",
    ],
    included: [
      { title: "Rechazo de calor", desc: "Las partículas nanocerámicas bloquean hasta el 83 por ciento del calor, así que el interior se mantiene mucho más fresco y el aire acondicionado trabaja menos." },
      { title: "Protección UV", desc: "Bloquea el 99 por ciento de los rayos UV que dañan la piel, agrietan el tablero y decoloran los asientos con el tiempo." },
      { title: "Menos resplandor y más privacidad", desc: "Reduce el brillo del sol y de los faros para manejar con más comodidad, y dificulta ver lo que hay dentro del vehículo." },
      { title: "Sin interferencia de señal", desc: "La película no contiene metal, por lo que el celular, el GPS, la radio satelital y el peaje electrónico funcionan con normalidad." },
    ],
    packages: [
      { name: "Ventanas laterales", desc: "Las cuatro ventanas laterales en GeoShield Pro Nano Ceramic, en el tono legal para su tipo de vehículo." },
      { name: "Paquete trasero", desc: "Las cuatro ventanas laterales más el vidrio trasero. Es el paquete más solicitado." },
      { name: "Carro completo", desc: "Todas las ventanas laterales, las ventanillas de las esquinas, el vidrio trasero y el techo de cristal si el vehículo lo tiene. Sin incluir el parabrisas." },
      { name: "Parabrisas", desc: "Franja legal sobre la línea AS-1 o película cerámica clara en todo el parabrisas que rechaza calor y UV sin oscurecer su visión al frente." },
    ],
    process: [
      { title: "Consulta y elección del tono", desc: "Hablamos de lo que usted busca, revisamos los límites legales de Virginia y elegimos juntos el porcentaje de luz (VLT) adecuado para su vehículo." },
      { title: "Limpieza del vidrio", desc: "Cada ventana se limpia y descontamina a fondo para que la película se adhiera sin polvo ni burbujas." },
      { title: "Corte por computadora e instalación", desc: "La película se corta a la medida exacta de cada ventana y se aplica con solución y espátula para eliminar burbujas, pliegues y bordes levantados." },
      { title: "Revisión y curado", desc: "Inspeccionamos cada ventana antes de entregarle el carro. La película termina de curar en tres a cinco días; una ligera neblina en ese periodo es normal y desaparece." },
    ],
    faqs: [
      { q: "¿Qué tan oscuro puedo polarizar en Virginia?", a: "En los sedanes, las ventanas delanteras deben dejar pasar al menos el 50 por ciento de la luz y las traseras y el vidrio trasero al menos el 35 por ciento. Las SUV, camionetas y vans pueden ir más oscuras detrás de las puertas delanteras. En el parabrisas solo se permite una franja sobre la línea AS-1. Existen exenciones médicas." },
      { q: "¿Las leyes de Maryland y Washington, DC son iguales?", a: "No, cada jurisdicción tiene sus propios límites. En Maryland los carros de pasajeros pueden llevar 35 por ciento en todas las ventanas. En el Distrito de Columbia, los sedanes deben respetar 70 por ciento adelante y 50 por ciento atrás. Si su vehículo está registrado fuera de Virginia, díganoslo al cotizar y le recomendamos el tono correcto." },
      { q: "¿Qué diferencia hay entre el polarizado cerámico y el común?", a: "El polarizado común usa tinte o metal. El cerámico usa partículas nanocerámicas que rechazan mucho más calor y UV, no se decoloran ni se ponen moradas con los años y no bloquean las señales del celular, el GPS o el transpondedor de peaje. Por eso GeoShield lo respalda con garantía de por vida." },
      { q: "¿Cuánto tarda la instalación del polarizado?", a: "La mayoría de los vehículos se entregan en dos o tres horas. Como la película se corta por computadora según las medidas exactas de cada ventana, no hay que recortar sobre el vidrio, lo que acelera el trabajo y deja los bordes más limpios. Puede esperar en el taller o dejar el carro y recogerlo." },
      { q: "¿Cuándo puedo bajar las ventanas después del polarizado?", a: "Mantenga las ventanas cerradas durante al menos tres días para que la película se adhiera completamente al vidrio. Durante los primeros tres a cinco días puede notar una ligera neblina o pequeñas bolsas de agua; es parte normal del curado y desaparece por sí solo. Después de eso, use las ventanas con normalidad." },
      { q: "¿El polarizado afecta la visibilidad de noche?", a: "Los tonos muy oscuros reducen la visibilidad nocturna, sobre todo en calles con poca iluminación. Por eso le ayudamos a escoger un porcentaje que equilibre privacidad, rechazo de calor y seguridad al manejar de noche. Un tono más claro en cerámico rechaza más calor que un tono oscuro en película común." },
    ],
    cta: {
      heading: "COTICE SU POLARIZADO",
      text: "Díganos el año, la marca y el modelo de su carro y qué ventanas quiere polarizar. Le respondemos con una cotización gratis y las fechas disponibles en nuestro taller de Chantilly.",
    },
  },
];

export const ES_UI: EsUi = {
  nav: {
    home: "Inicio",
    ppf: "Película PPF",
    ceramic: "Recubrimiento cerámico",
    tint: "Polarizado",
    promo: "Especial de octubre",
    quote: "Cotización gratis",
    english: "English",
  },
  form: {
    title: "SOLICITE SU COTIZACIÓN GRATIS",
    sub: "Déjenos sus datos y los de su vehículo. Le llamamos o le escribimos, normalmente en menos de una hora durante el horario de atención.",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    email: "Correo electrónico",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    message: "Mensaje o comentarios",
    terms: "He leído y acepto los",
    termsLink: "Términos de servicio y política de garantía de Skyline Customs",
    submit: "¡SÍ, QUIERO PROTEGER MI CARRO!",
    sending: "ENVIANDO...",
    successTitle: "RECIBIMOS SU SOLICITUD",
    successBody: "Espere una llamada o un mensaje de texto del taller, normalmente en menos de una hora en horario de atención, con su cotización exacta y las fechas disponibles para la instalación.",
    error: "Por favor acepte los términos de servicio antes de enviar.",
    finePrint: "No hay que pagar nada ahora. Un depósito del 20 por ciento, totalmente reembolsable, reserva su fecha solo después de que usted apruebe su cotización exacta. Puede pagar a plazos con Klarna, Afterpay o Affirm.",
  },
  common: {
    getQuote: "Pedir cotización gratis",
    call: "Llamar al (703) 775-4383",
    reviews: "Más de 140 reseñas de cinco estrellas en Google",
    shopLine: "4215 Walney Rd Suite 1A & B, Chantilly, VA 20151 · Lunes a viernes de 9 AM a 6 PM",
    readInEnglish: "Leer esta página en inglés",
    deposit: "Depósito del 20 por ciento, totalmente reembolsable, que se aplica al total.",
    payPlans: "Pague a plazos con Klarna, Afterpay o Affirm.",
    serves: "Atendemos el norte de Virginia, Maryland y Washington, DC. Todo el trabajo se realiza en nuestro taller de Chantilly, cerca del aeropuerto Dulles.",
  },
};

export const ES_PROMO: EsPromo = {
  path: "/es/promo",
  enPath: "/promo",
  title: "Especial de Otoño: PPF Frontal Completo + Cerámico Gratis | Chantilly, VA",
  description: "Del 1 al 31 de octubre de 2026: PPF frontal completo STEK DYNOshield con recubrimiento cerámico gratis en todo el carro y una entrada al sorteo de otoño. Cupos limitados.",
  eyebrow: "Especial de otoño · 1 al 31 de octubre de 2026",
  h1: ["PPF FRONTAL COMPLETO", "+ CERÁMICO GRATIS EN TODO EL CARRO"],
  sub: "Reserve la película de protección frontal completa STEK DYNOshield durante octubre y aplicamos un recubrimiento cerámico en toda la carrocería sin costo adicional. Además, cada trabajo terminado entra en nuestro sorteo de otoño. Los cupos son limitados.",
  bullets: [
    "PPF frontal completo STEK DYNOshield: capó, bumper, guardafangos, espejos, faros y pilares A, con garantía de 12 años.",
    "Recubrimiento cerámico gratis en cada panel pintado del carro, no solo en el frente.",
    "Lavado de descontaminación completo e inspección panel por panel bajo luces antes de pagar el saldo.",
    "Una entrada al sorteo de otoño por cada trabajo del especial terminado y pagado en octubre.",
  ],
  giveaway: {
    heading: "SORTEO DE OTOÑO",
    body: "Reserve el Especial de Otoño, termine su instalación y ya está participando. El premio es una instalación de PPF de carrocería completa en STEK DYNOshield para el carro del ganador, sin costo. El ganador se anuncia el 1 de noviembre de 2026.",
    rules: [
      "Cada trabajo del Especial de Otoño terminado y pagado en su totalidad entre el 1 y el 31 de octubre de 2026 recibe una entrada.",
      "Se elige un ganador el 1 de noviembre de 2026, se anuncia en nuestro Instagram y se le contacta por teléfono y correo electrónico.",
      "El premio es una instalación de PPF de carrocería completa en STEK DYNOshield en el vehículo del ganador. Valor aproximado al público: $8,500, según el tamaño del vehículo y el número de paneles. No tiene valor en efectivo y no se puede transferir ni cambiar.",
      "No es necesario comprar. Para participar sin reservar, escriba a info@skylinecustomshop.com con el asunto \"Fall Giveaway\" e incluya su nombre, teléfono y vehículo antes del 31 de octubre de 2026. Una entrada gratuita por persona.",
      "Abierto a residentes legales de Virginia, Maryland y el Distrito de Columbia mayores de 18 años. Nulo donde esté prohibido.",
      "Patrocinador: Skyline Customs, 4215 Walney Rd Suite 1A & B, Chantilly, VA 20151. Las probabilidades de ganar dependen del número de entradas recibidas. El ganador debe responder dentro de los 7 días siguientes a la notificación o se elegirá otro ganador.",
      "Esta promoción no está patrocinada, respaldada ni administrada por Meta, Facebook o Instagram, ni tiene relación con ellos.",
    ],
  },
  cta: "RESERVE SU CUPO DE OCTUBRE",
  formHeading: "APARTE SU CUPO",
  formIntro: "Complete el formulario y le enviamos su cotización exacta con las fechas disponibles de octubre. Sin compromiso: el depósito reembolsable se paga solo cuando usted apruebe la cotización.",
  faqs: [
    { q: "¿Qué incluye exactamente el Especial de Otoño?", a: "Usted paga la película STEK DYNOshield frontal completa: capó completo, bumper delantero, ambos guardafangos, espejos, faros y pilares A. Sin costo adicional, aplicamos un recubrimiento cerámico en toda la carrocería. Cada carro recibe también el lavado de descontaminación y la inspección panel por panel bajo luces antes de pagar el saldo." },
    { q: "¿Cuánto tiempo tardan en entregar el carro?", a: "La película frontal completa normalmente toma un día. Como el especial incluye el recubrimiento cerámico en todo el carro, cuente con dos días en el taller. Por eso tomamos un número limitado de carros en octubre: cada vehículo recibe el mismo nivel de atención y nadie sale apurado." },
    { q: "¿Puedo agregar más cobertura que el frontal completo?", a: "Sí. El especial cubre el paquete frontal completo. Si quiere agregar los estribos, los bordes de las puertas y las copas de las manijas, que forman nuestro paquete frontal completo extendido, lo cotizamos por separado al reservar. Muchos clientes agregan al menos los estribos." },
    { q: "¿Hay depósito y puedo pagar a plazos?", a: "Después de aprobar su cotización, un depósito del 20 por ciento reserva su fecha de octubre y se descuenta del total. Es totalmente reembolsable en cualquier momento. El saldo se paga al recoger el carro, después de la inspección bajo luces. Aceptamos Klarna, Afterpay y Affirm para dividir el pago; la aprobación depende del proveedor." },
    { q: "¿Tengo que reservar para participar en el sorteo?", a: "No. Cada trabajo del especial terminado en octubre recibe una entrada, pero también puede participar gratis sin reservar: envíe un correo a info@skylinecustomshop.com con el asunto \"Fall Giveaway\", su nombre, teléfono y vehículo antes del 31 de octubre de 2026. Una entrada gratuita por persona. Las reglas completas están en esta página." },
  ],
};
