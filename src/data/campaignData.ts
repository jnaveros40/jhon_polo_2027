import {
  ProgrammaticPillar,
  ComunaInfo,
  VolunteerRole,
  TheoreticalFoundation,
  FunctionalCompetence,
  StrategicMatrixRow,
  FinancialMechanism
} from '../types';

export const CAMPAIGN_INFO = {
  candidateName: "John Polo",
  candidateFullName: "John Fredy Polo Campos",
  candidateShort: "JP",
  campaignTitle: "Concejo de Ibagué 2027 – 2030",
  programName: "Ibagué Sostenible, Industrial, Segura y Conectada",
  programSubtitle: "Plataforma de Gestión, Control Político y Desarrollo Territorial • Fundamentos Teóricos (Max-Neef, Sen, Mazzucato), Gobernanza Agrologística, Ingeniería Vial y Acciones desde el Concejo",
  location: "Ibagué, Tolima, Colombia",
  sloganPrimary: "Ibagué merece sonar más fuerte",
  sloganSecondary: "Ibagué tiene con qué. Es hora de creer.",
  sloganTerritorial: "Por una Ibagué que produce, recibe y crece.",
  closingMasterQuote: "¡Con rigor técnico y carácter, devolveremos la dignidad a Ibagué!",
  manifesto: "Una ciudad con voz, oportunidades y futuro.",
  bioSummary: "John Fredy Polo Campos lidera una plataforma técnica y humana para el Concejo de Ibagué 2027–2030 por el Partido Liberal Colombiano: 7 Ejes Estratégicos de Transformación Territorial financiados mediante el Esquema 80-10-10 y liberación de caja interna, sin agravar el endeudamiento municipal.",
  masterDocPdfUrl: "/docs/DOCUMENTO_MAESTRO_JOHN_POLO_2027_2030.pdf",

  // Official Contacts & Socials
  whatsappNumber: "573025091063",
  whatsappDisplay: "+57 (302) 509-1063",
  email: "contacto@johnpolo2027.com",
  socials: {
    instagram: "https://www.instagram.com/johnfredypolocampos",
    tiktok: "https://www.tiktok.com/@john.fredy.polo?lang=es",
    facebook: "https://www.facebook.com/john.f.polo.9",
    twitter: "https://twitter.com/johnpolotolima",
    youtube: "https://youtube.com/@johnpolotolima",
    whatsappChannel: "https://whatsapp.com/channel/johnpolo2027"
  },

  // Media Assets
  images: {
    logo: "/images/logo-jp.png",
    selloAnimado: "/images/sello-caballo-tricolor.gif",
    heroCandidate: "/images/candidato-hero.jpg",
    actionCandidate: "/images/candidato-accion.jpg",
    bannerLandscape: "/images/ibague-banner.jpg",
    altPoster: "/images/ibague-creer.jpg",
    caballoLiberal: "/images/caballo-liberal-animado.gif",
    caballoTricolor: "/images/caballo-tricolor-animado.gif",
    caballoCard: "/images/caballo-liberal-card.gif",
    caballoLiberalJpg: "/images/caballo-liberal.jpg"
  },

  // Partido Político
  party: {
    name: "Partido Liberal Colombiano",
    short: "Partido Liberal",
    slogan: "Por la defensa de los derechos, el empleo digno y las oportunidades para los jóvenes",
    symbolName: "El Jinete y Caballo Liberal Galopando con la Bandera en Movimiento",
    gif: "/images/caballo-liberal-animado.gif",
    gifTricolor: "/images/caballo-tricolor-animado.gif",
    gifSello: "/images/sello-caballo-tricolor.gif",
    gifCard: "/images/caballo-liberal-card.gif",
    svg: "/images/caballo-liberal.svg",
    jpg: "/images/caballo-liberal.jpg"
  },

  // Color Palette Tokens
  palette: {
    red: "#D32F2F",
    redDark: "#B71C1C",
    yellow: "#FBC02D",
    yellowVibrant: "#FFD600",
    green: "#2E7D32",
    greenDark: "#1B5E20"
  }
};

// I. Marco Metodológico y Económico de la Propuesta
export const THEORETICAL_FOUNDATIONS: TheoreticalFoundation[] = [
  {
    id: "max-neef",
    author: "Manfred Max-Neef",
    title: "Desarrollo a Escala Humana",
    description: "Centramos la gestión en las personas y la satisfacción sinérgica de necesidades fundamentales (Subsistencia, Protección, Participación, Identidad), atacando las causas estructurales del delito, la especulación, el aislamiento de las laderas y el colapso de movilidad.",
    pillars: ["Subsistencia", "Protección", "Participación", "Identidad"]
  },
  {
    id: "amartya-sen",
    author: "Amartya Sen",
    title: "El Desarrollo como Libertad y Capacidades",
    description: "El agua continua, las vías transitables, un sistema de transporte digno (SETP y Cable Aéreo), el comercio transparente y la seguridad ciudadana son capacidades básicas para expandir la libertad real de los ibaguereños, removiendo obstáculos institucionales.",
    pillars: ["Agua Continua", "SETP & Cable Aéreo", "Comercio Transparente", "Seguridad Ciudadana"]
  },
  {
    id: "mariana-mazzucato",
    author: "Mariana Mazzucato",
    title: "El Estado Emprendedor y Misiones",
    description: "Posicionamos a INFIBAGUÉ, al IBAL y al Ente Gestor del SETP como agentes públicos audaces que fijan misiones concretas articulando cooperación internacional y tecnología.",
    pillars: ["Cero Desperdicios", "Transición Hídrica", "Bioinsumos & Agrologística", "Movilidad Cero Emisiones"]
  }
];

// II. Competencia Funcional del Concejal: El Alcance de la Credencial (Art. 313 C.P. y Ley 136 de 1994)
export const COUNCILOR_COMPETENCES: FunctionalCompetence[] = [
  {
    id: "potestad-normativa",
    title: "1. Potestad Normativa",
    legalBasis: "Art. 313 C.P. y Ley 136 de 1994",
    description: "Acuerdos Municipales estructurales para transformar las entidades descentralizadas y el ordenamiento territorial.",
    actions: [
      "Reorganizar entidades descentralizadas (INFIBAGUÉ 75/25 e IBAL).",
      "Adoptar la Ley 2046 de compras públicas locales para las 144 veredas.",
      "Reglamentar cargas urbanísticas y plusvalías a constructoras.",
      "Estructurar la gobernanza de la Central de Acopio (Calle 19).",
      "Blindar la integración tarifaria del transporte multimodal (SETP + Cable Aéreo) y políticas de seguridad territorial."
    ]
  },
  {
    id: "control-politico",
    title: "2. Control Político Riguroso",
    legalBasis: "Fiscalización Presupuestal y Operativa",
    description: "Vigilancia implacable sobre los recursos públicos, concesiones y operación de servicios.",
    actions: [
      "Citación a gerentes y secretarios con indicadores técnicos verificables.",
      "Desmantelamiento de mafias internas: fin del 'cartel de los valvuleros' en el IBAL.",
      "Freno a especuladores de calle y bloqueos al recaudo único del SETP.",
      "Auditoría y vigilancia estricta de concesiones municipales."
    ]
  },
  {
    id: "planeacion-presupuesto",
    title: "3. Planeación y Presupuesto",
    legalBasis: "Sostenibilidad Fiscal sin Más Endeudamiento",
    description: "Reorientación del Plan de Desarrollo y del Presupuesto Anual hacia inversiones de impacto real.",
    actions: [
      "Frenar el endeudamiento bancario costoso (la deuda consolidada ya ronda $180.000M - $220.000M).",
      "Apalancar inversión mediante el Esquema 80-10-10 (80% cooperación internacional no reembolsable).",
      "Liberar caja interna recuperando pérdidas del IBAL (+$8.000M/año) y eliminando nóminas paralelas."
    ]
  }
];

// III. Los 7 Ejes Estratégicos de Transformación Territorial (2027 - 2030)
export const PROGRAMMATIC_PILLARS: ProgrammaticPillar[] = [
  {
    id: "eje-1-campo-acopio",
    number: 1,
    shortTitle: "1. Campo, Acopio Calle 19 y Vías",
    title: "Eje 1: Caracterización Agropecuaria, Central de Acopio (Calle 19), Gobernanza con Mayoristas y Vías Terciarias",
    tagline: "17 corregimientos, 144 veredas y 13.000 familias campesinas conectadas sin intermediación especulativa.",
    badge: "Agrologística & Desarrollo Rural",
    color: "green",
    icon: "Store",
    problematicaCentral: "13.000 familias campesinas sin caracterización, vías terciarias dañadas, caos vehicular y logístico en la Carrera 4ª y especulación de precios.",
    solucionNormativa: "Plan rural cuatrienal ($60.000M-$80.000M en esquema 80-10-10) + Compra del antiguo Carrefour de la Calle 19 como Central de Acopio con Mayoristas socios con voz pero sin voto + Asociaciones Campesinas.",
    entidadEjecutora: "INFIBAGUÉ / Ministerio de Agricultura / Juntas de Acción Comunal (JAC)",
    proposals: [
      {
        id: "diagnostico-rural-vias",
        title: "Caracterización de 144 Veredas y 50 km/año de Vías Terciarias",
        summary: "Plan cuatrienal de $60.000M a $80.000M (esquema 80-10-10) para las 12.000 a 13.000 familias campesinas de nuestros 17 corregimientos.",
        description: "Ibagué cuenta con 17 corregimientos y 144 veredas (San Juan de la China, China Alta, Toche, El Cural, Caracolí, Coello Cócora) que producen café, plátano, arracacha, hortalizas y frutales. Caracterizaremos la producción, abriremos canales directos (Ley 2046) y mantendremos 50 km/año de vías terciarias (perfilado de banca, cuneteo y placa-huella en puntos críticos) trabajando directamente con las JAC.",
        tags: ["17 Corregimientos", "144 Veredas", "50 km/año Vías", "Ley 2046"],
        icon: "Compass",
        impactMetrics: "50 km/año de vías terciarias ($60kM-$80kM)"
      },
      {
        id: "central-acopio-calle-19",
        title: "Central de Acopio y Red de Frío en el Antiguo Carrefour (Calle 19)",
        summary: "Adquisición y adecuación del antiguo Carrefour de la Calle 19 (entre 3ª y 4ª) mediante crédito inteligente de INFIBAGUÉ.",
        description: "Convertiremos el antiguo Carrefour de la Calle 19 en la gran Central de Acopio, Red de Frío y Gerencia Unificada de las 5 plazas de mercado de Ibagué, descongestionando definitivamente la Carrera 4ª y trasladando allí el descargue pesado.",
        tags: ["Calle 19", "Red de Frío", "INFIBAGUÉ", "5 Plazas Unificadas"],
        icon: "Building2",
        impactMetrics: "Central de Acopio Calle 19 + Descongestión Cra. 4ª"
      },
      {
        id: "gobernanza-mayoristas",
        title: "Gobernanza de Mayoristas: 'Socios con Voz, sin Voto'",
        summary: "Sociedad de Economía Mixta liderada por INFIBAGUÉ (mínimo 51%) y Asociaciones Campesinas formalizadas.",
        description: "Los mayoristas ingresan como socios logísticos con voz técnica en el Comité Comercial, pero sin derecho a voto en la Junta Directiva. Para ocupar bodegas y cuartos fríos deberán suscribir contratos de compra directa con las 144 veredas, someterse a básculas electrónicas certificadas y tablero público de precios, y cofinanciar asistencia técnica asociativa.",
        tags: ["Economía Mixta 51%", "Básculas Certificadas", "Precios Justos", "Compra Directa"],
        icon: "Users2",
        impactMetrics: "INFIBAGUÉ mín. 51% + Mayoristas con voz sin voto"
      }
    ]
  },
  {
    id: "eje-2-agua-ibal",
    number: 2,
    shortTitle: "2. Agua, IBAL y Fin de Valvuleros",
    title: "Eje 2: Eficiencia Hidrosanitaria, Meta 30 km/año y Fin del 'Cartel de los Valvuleros'",
    tagline: "Recuperación de pérdidas multimillonarias de agua, renovación real de redes y telemetría contra las mafias del agua.",
    badge: "Agua sin Mafias & Telemetría",
    color: "red",
    icon: "ShieldCheck",
    problematicaCentral: "El IBAL pierde cerca de 1 millón de m³ mensuales (~$32.000 millones anuales) por redes obsoletas (+70% de ~800 km) que socavan el subsuelo, sumado al 'cartel de los valvuleros'.",
    solucionNormativa: "Meta obligatoria de renovación de 30 km/año de red hidrosanitaria (120 km en el cuatrienio) + Automatización y telemetría digital en válvulas matrices.",
    entidadEjecutora: "IBAL E.S.P. / Ministerio de Vivienda, Ciudad y Territorio",
    proposals: [
      {
        id: "meta-30km-redes",
        title: "Meta Real: Renovar 30 km/año de Red Hidrosanitaria (120 km en el Cuatrienio)",
        summary: "Frenar la pérdida de 1 millón de m³ mensuales (~$32.000M/año) por tuberías obsoletas que socavan y destruyen las calles.",
        description: "Más del 70% de los ~800 km de red hidrosanitaria de Ibagué es obsoleta, provocando hundimientos viales y pérdidas de $32.000 millones al año. Fijaremos desde el Concejo la meta vinculante de renovar 30 km anuales (120 km en 4 años) para recuperar el 25% de las pérdidas.",
        tags: ["30 km/año", "120 km Cuatrienio", "Redes IBAL", "Cero Socavación"],
        icon: "Droplets",
        impactMetrics: "+$8.000 millones/año recuperados en agua"
      },
      {
        id: "fin-cartel-valvuleros",
        title: "Desmantelamiento del 'Cartel de los Valvuleros' con Telemetría Digital",
        summary: "Automatización y telemetría en tiempo real en las válvulas matrices para erradicar el desvío político del agua.",
        description: "Acabaremos con la mafia interna del 'cartel de los valvuleros' que cierra y desvía el suministro de agua en las comunas por favores políticos o presiones particulares. Exigiremos válvulas matrices automatizadas con telemetría pública auditable en línea.",
        tags: ["Fin Cartel Valvuleros", "Telemetría Digital", "Válvulas Matrices", "Control Político"],
        icon: "ShieldCheck",
        impactMetrics: "100% válvulas matrices con telemetría digital"
      }
    ]
  },
  {
    id: "eje-3-planeacion-urbana",
    number: 3,
    shortTitle: "3. Orden Urbano y Cargas Viales",
    title: "Eje 3: Planificación Territorial Pública vs. Especulación Inmobiliaria",
    tagline: "Que las constructoras entreguen las vías y redes de sus proyectos y se respete la suficiencia hídrica.",
    badge: "Justicia Urbana & Ambiental",
    color: "yellow",
    icon: "TrendingUp",
    problematicaCentral: "Especulación inmobiliaria descontrolada, proyectos sin vías de acceso ni agua real y desprotección de la cuenca del Combeima y Toche.",
    solucionNormativa: "Acuerdo Municipal de exigencia rigurosa de Cargas Urbanísticas y Plusvalías + Prohibición de licencias sin suficiencia hídrica certificada.",
    entidadEjecutora: "Secretaría de Planeación Municipal / Curadurías Urbanas / CORTOLIMA",
    proposals: [
      {
        id: "cargas-urbanisticas-plusvalia",
        title: "Cobro Estricto de Cargas Urbanísticas y Plusvalías a Constructoras",
        summary: "Obligación efectiva para que los desarrolladores inmobiliarios entreguen vías arterias, parques y redes funcionales.",
        description: "No más urbanizaciones que colapsan la movilidad de los barrios vecinos sin aportar infraestructura. Reglamentaremos y fiscalizaremos el cobro estricto de Cargas Urbanísticas y Plusvalías para financiar malla vial y espacio público real.",
        tags: ["Cargas Urbanísticas", "Plusvalía", "Constructoras", "Vías Arterias"],
        icon: "Building2",
        impactMetrics: "Cero proyectos sin entrega de vías y redes"
      },
      {
        id: "blindaje-ecologico-hidrico",
        title: "Blindaje de la Cuenca del Combeima y Toche y Suficiencia Hídrica",
        summary: "Prohibición estricta de licencias urbanísticas que no cuenten con disponibilidad y suficiencia hídrica real.",
        description: "Protegeremos la Estructura Ecológica Principal de Ibagué (Cuencas del Combeima y Toche) y ejerceremos control sobre las curadurías y Planeación para impedir que se otorguen licencias de construcción a costa de dejar sin agua a las comunas existentes.",
        tags: ["Cuenca Combeima", "Toche", "Suficiencia Hídrica", "Estructura Ecológica"],
        icon: "ShieldCheck",
        impactMetrics: "Protección integral Combeima y Toche"
      }
    ]
  },
  {
    id: "eje-4-infibague-empleo",
    number: 4,
    shortTitle: "4. INFIBAGUÉ 75/25 y Empleo Joven",
    title: "Eje 4: Reindustrialización, Reingeniería de INFIBAGUÉ (75/25) y Empleo Juvenil",
    tagline: "Menos burocracia por OPS y conversión de INFIBAGUÉ en Banca de Desarrollo de Segundo Piso para jóvenes y mujeres.",
    badge: "Reindustrialización & Juventud",
    color: "red",
    icon: "TrendingUp",
    problematicaCentral: "Burocracia excesiva por nómina paralela (OPS) en INFIBAGUÉ y alto desempleo juvenil y femenino en Ibagué.",
    solucionNormativa: "Reingeniería de INFIBAGUÉ al modelo 75/25 (con su recaudo de $55.000M-$60.000M de Alumbrado Público) + Habilitación como Banca de Desarrollo de Segundo Piso.",
    entidadEjecutora: "INFIBAGUÉ / SENA / Gremios y Universidades",
    proposals: [
      {
        id: "reingenieria-infibague-75-25",
        title: "Reingeniería de INFIBAGUÉ al Modelo 75/25 ($60.000M IAP)",
        summary: "75% personal operativo en calle iluminando y manteniendo parques, y solo 25% administrativo, recortando nómina paralela por OPS.",
        description: "Con un recaudo anual de $55.000M a $60.000M por Impuesto de Alumbrado Público (IAP), INFIBAGUÉ no puede ser una agencia de empleo burocrático. Impondremos la regla 75/25: 75% de fuerza operativa real en los barrios y recorte drástico de contratos OPS innecesarios.",
        tags: ["Modelo 75/25", "INFIBAGUÉ", "$60.000M IAP", "Cero Burocracia OPS"],
        icon: "Lightbulb",
        impactMetrics: "75% personal operativo en calle / 25% admin"
      },
      {
        id: "banca-desarrollo-segundo-piso",
        title: "INFIBAGUÉ como Banca de Desarrollo para Agroindustria Juvenil y Femenina",
        summary: "Capital semilla y crédito blando articulado con el SENA para emprendimientos industriales, tecnológicos y agroindustriales.",
        description: "Con los recursos liberados de la burocracia, habilitaremos a INFIBAGUÉ como Banca de Desarrollo de Segundo Piso destinada a financiar proyectos productivos de agroindustria juvenil y femenina, articulando formación técnica del SENA y compras locales.",
        tags: ["Banca de Desarrollo", "Empleo Juvenil", "Mujeres", "Agroindustria SENA"],
        icon: "Briefcase",
        impactMetrics: "Banca pública local para jóvenes y mujeres"
      }
    ]
  },
  {
    id: "eje-5-gastronomia-biofabrica",
    number: 5,
    shortTitle: "5. Plaza 28 Concordia y Biofábrica",
    title: "Eje 5: Capital Gastronómica (Modelo Concordia), Turismo MICE y Biofábrica Municipal",
    tagline: "La Plaza de la 28 como Distrito Gastronómico y Cultural y transformación de 15-20 ton/día de residuos en biofertilizantes.",
    badge: "Turismo, Plazas & Economía Circular",
    color: "yellow",
    icon: "Music",
    problematicaCentral: "Cocinas tradicionales en infraestructura obsoleta, desperdicio de 15-20 toneladas diarias de residuos orgánicos y subutilización turística.",
    solucionNormativa: "Modernización de la Plaza de la 28 (Modelo Plaza de la Concordia) + Montaje de la Biofábrica Pública de Fertilizantes Orgánicos en el Vivero Municipal.",
    entidadEjecutora: "INFIBAGUÉ / FONTUR / Cooperación Internacional (China CIDCA y Fondos Verdes)",
    proposals: [
      {
        id: "plaza-28-modelo-concordia",
        title: "Plaza de la 28 bajo el Modelo de la Plaza de la Concordia (Bogotá)",
        summary: "Reconstrucción integral como Distrito Gastronómico y Cultural con reconversión higiénica de las cocinas campesinas del 2º piso.",
        description: "Transformaremos la Plaza de la 28 en el gran Distrito Gastronómico y Cultural de Ibagué bajo el exitoso modelo de la Plaza de la Concordia. Incluirá la reconversión higiénica, estética y protocolaria de las cocinas campesinas ('corrientazos') del segundo piso para atraer tanto a compradores habituales como a turistas nacionales e internacionales (Turismo MICE).",
        tags: ["Plaza de la 28", "Modelo Concordia", "Cocinas Campesinas", "Turismo MICE"],
        icon: "Utensils",
        impactMetrics: "Distrito Gastronómico y Cultural Plaza 28"
      },
      {
        id: "biofabrica-vivero-municipal",
        title: "Biofábrica Pública de Fertilizantes Orgánicos en el Vivero Municipal",
        summary: "Procesamiento de 15 a 20 toneladas diarias de residuos orgánicos de plazas y podas de parques con cooperación internacional (China CIDCA).",
        description: "Montaremos la Biofábrica Pública en el Vivero Municipal para producir fertilizantes orgánicos (sólidos, biol líquido y peletizados) procesando entre 15 y 20 toneladas diarias de desechos orgánicos de las plazas de mercado y podas de parques, apalancada con cooperación internacional (China CIDCA y fondos climáticos verdes) para entregar insumos baratos a nuestras 144 veredas.",
        tags: ["Biofábrica Municipal", "15-20 Ton/día", "China CIDCA", "Bioinsumos"],
        icon: "Sparkles",
        impactMetrics: "15-20 ton/día convertidas en biofertilizantes"
      }
    ]
  },
  {
    id: "eje-6-movilidad-setp-cable",
    number: 6,
    shortTitle: "6. Vías, Viaducto Mirolindo, SETP y Cable",
    title: "Eje 6: Desembotellamiento Vial (310.000+ Vehículos), SETP y Cable Aéreo Integrado",
    tagline: "Plan maestro multimodal para destrabar una ciudad con más de 310.000 vehículos sobre una malla vial de hace 40 años.",
    badge: "Movilidad Multimodal & Cable Aéreo",
    color: "green",
    icon: "TrendingUp",
    problematicaCentral: "Sobresaturación con +310.000 vehículos (250.000 locales y ~60.000 foráneos), SETP paralizado, laderas aisladas y embudo crítico en la Glorieta de Mirolindo.",
    solucionNormativa: "3 Arterias Perimetrales/Transversales + Viaducto elevado en Mirolindo + Caja única y carriles Solo Bus del SETP + 2 Líneas de Cable Aéreo con tarifa integrada (80-10-10).",
    entidadEjecutora: "Ente Gestor SETP (TransMusical) / Ministerio de Transporte / ANI / Gobernación",
    proposals: [
      {
        id: "tres-arterias-y-viaducto-mirolindo",
        title: "3 Grandes Arterias Viales + Viaducto a Desnivel en Glorieta de Mirolindo",
        summary: "Av. Carrera 13 (Calambeo a Cll 103), Transversal Calle 103 a Variantes, Doble Calzada U. Cooperativa–San Bernardo e Intercambiador Mirolindo.",
        description: "1) Av. Carrera 13 desde Calambeo hasta la Calle 103 en la Av. Ambalá. 2) Corredor Transversal Calle 103 desde Ambalá conectando doble vía al Salado hasta empatar con las Variantes Nacionales Ibagué-Armenia e Ibagué-Bogotá. 3) Doble Calzada U. Cooperativa (Veterinaria) hasta San Bernardo (Comuna 7). 4) Viaducto elevado / intercambiador vial en la Glorieta de Mirolindo con salida directa a Variante Boquerón (alianza Municipio-Gobernación-ANI).",
        tags: ["Av. Carrera 13", "Transversal Cll 103", "Viaducto Mirolindo", "Doble Calzada San Bernardo"],
        icon: "Compass",
        impactMetrics: "3 Nuevas Arterias + Intercambiador Mirolindo"
      },
      {
        id: "desbloqueo-setp-foraneos",
        title: "Desbloqueo Operativo del SETP (TransMusical) y Matrícula de 60.000 Foráneos",
        summary: "Caja única de recaudo centralizado, carriles 'Solo Bus' con onda verde semafórica, Park & Ride, ZER e incentivos a vehículos foráneos.",
        description: "Control político firme para activar la caja única del SETP, carriles preferenciales 'Solo Bus' con onda verde semafórica, parqueaderos disuasorios (Park & Ride), Zonas de Estacionamiento Regulado (ZER) e incentivos tributarios para radicar en Ibagué las matrículas de los ~60.000 vehículos foráneos que hoy ruedan aquí pero pagan impuestos afuera.",
        tags: ["Caja Única SETP", "Solo Bus Onda Verde", "60.000 Foráneos", "Park & Ride"],
        icon: "Building2",
        impactMetrics: "Caja única SETP + Impuestos de 60k vehículos"
      },
      {
        id: "cables-aereos-integrados",
        title: "Sistema de 2 Líneas de Cable Aéreo con Tarifa Integrada al SETP",
        summary: "Financiación verde (80-10-10) para la Troncal Sur-Occidente (Boquerón–Centro) y la Troncal Comuna 2 (Centro–La Aurora).",
        description: "Estructuración de estudios Fase II y III y financiación climática 80-10-10 para dos líneas prioritarias integradas con un solo pasaje al SETP: 1) Troncal Sur-Occidente: Boquerón – Miramar – Jazmín – Ricaurte – Centro. 2) Troncal Comuna 2: Centro – Clarita Botero – Ancón Tesorito – La Paz – La Aurora.",
        tags: ["Cable Aéreo Sur", "Cable Aéreo Comuna 2", "Tarifa Integrada", "Esquema 80-10-10"],
        icon: "Sparkles",
        impactMetrics: "2 Líneas de Cable Aéreo integradas al SETP"
      }
    ]
  },
  {
    id: "eje-7-seguridad-espacio-publico",
    number: 7,
    shortTitle: "7. Seguridad, Plaza 21 y Microtráfico",
    title: "Eje 7: Seguridad Cívica, Recuperación del Espacio Público y Choque al Microtráfico",
    tagline: "Intervención integral de la Plaza de la 21 y 'Calle del Bronx', y Plan de Choque en Comunas 7, 8 y el Sur.",
    badge: "Seguridad Territorial & Orden",
    color: "red",
    icon: "ShieldCheck",
    problematicaCentral: "Cosquilleo en corredores comerciales, foco de inseguridad en la 'Calle del Bronx' (Plaza de la 21) y ollas de microtráfico en Comunas 7, 8 y el Sur.",
    solucionNormativa: "Política Integral de Seguridad Territorial: Recuperación urbanística y tecnológica de la Plaza 21 + Plan de Choque interinstitucional en barrios críticos.",
    entidadEjecutora: "Secretaría de Gobierno / Policía Metropolitana / INFIBAGUÉ",
    proposals: [
      {
        id: "intervencion-plaza-21-bronx",
        title: "Intervención Integral de la Plaza de la 21 y 'Calle del Bronx'",
        summary: "Iluminación LED al 100%, cámaras con analítica facial conectadas a la Policía, reubicación ordenada y traslado de carga pesada a la Calle 19.",
        description: "Recuperaremos el corazón comercial de la Plaza de la 21 y erradicaremos el deterioro de la denominada 'Calle del Bronx' mediante renovación urbanística, iluminación LED al 100%, cámaras de reconocimiento y analítica facial enlazadas al C4 de la Policía, organización digna de ventas informales y traslado del descargue de camiones pesados hacia la nueva Central de Acopio de la Calle 19.",
        tags: ["Plaza de la 21", "Calle del Bronx", "Analítica Facial", "Iluminación LED 100%"],
        icon: "ShieldCheck",
        impactMetrics: "Recuperación total Plaza 21 + Analítica Facial"
      },
      {
        id: "plan-choque-comunas-sur",
        title: "Plan de Choque en Comunas 7, 8 y el Sur + Control al Cosquilleo",
        summary: "Intervención permanente en Matallana, San José, Yuldaima, La Cartagena y El Refugio, y gestores contra el cosquilleo en Cra. 3ª y Centro.",
        description: "Presencia policial focalizada combinada con recuperación de parques y polideportivos por INFIBAGUÉ, centros de atención juvenil, deporte y oferta laboral/agroindustrial en sectores críticos (Matallana, San José, Yuldaima, La Cartagena, El Refugio). Además, desplegaremos gestores de convivencia y frentes de seguridad comercial en la Carrera 3ª, Centro y plazas para frenar el cosquilleo.",
        tags: ["Comunas 7, 8 y Sur", "Entornos Seguros", "Frentes Comerciales", "Deporte y Empleo"],
        icon: "Users2",
        impactMetrics: "Entornos seguros en barrios críticos y Cra. 3ª"
      }
    ]
  }
];

// IV. Matriz de Síntesis Estratégica por Ejes (Tabla Oficial del Documento Maestro)
export const STRATEGIC_MATRIX: StrategicMatrixRow[] = [
  {
    ejeNumber: 1,
    ejeTematico: "1. Campo, Acopio Calle 19 y Mayoristas",
    problematicaCentral: "13.000 familias sin caracterización, vías dañadas, caos Cra. 4ª y especulación.",
    solucionPropuesta: "Plan rural ($60k-80kM 80-10-10) + Compra antiguo Carrefour Calle 19 (Mayoristas con voz sin voto + Asoc. Campesinas).",
    entidadAliado: "INFIBAGUÉ / MinAgricultura / JAC"
  },
  {
    ejeNumber: 2,
    ejeTematico: "2. Agua e IBAL",
    problematicaCentral: "Pérdida de 1M m³/mes ($32kM/año), calles socavadas y cartel valvuleros.",
    solucionPropuesta: "Meta 30 km/año renovación red + Automatización y telemetría de válvulas matrices.",
    entidadAliado: "IBAL E.S.P. / MinVivienda"
  },
  {
    ejeNumber: 3,
    ejeTematico: "3. Planeación Urbana",
    problematicaCentral: "Especulación inmobiliaria y falta de cargas viales.",
    solucionPropuesta: "Exigencia rigurosa de Cargas Urbanísticas y Plusvalías. Protección cuenca Combeima.",
    entidadAliado: "Sec. Planeación / Curadurías"
  },
  {
    ejeNumber: 4,
    ejeTematico: "4. Reindustrialización INFIBAGUÉ",
    problematicaCentral: "Burocracia excesiva y desempleo juvenil.",
    solucionPropuesta: "Reingeniería 75/25 ($60kM IAP) + INFIBAGUÉ como Banca de Desarrollo.",
    entidadAliado: "INFIBAGUÉ / SENA"
  },
  {
    ejeNumber: 5,
    ejeTematico: "5. Turismo, Plazas y Biofábrica",
    problematicaCentral: "Cocinas obsoletas, desperdicios orgánicos y subutilización turística.",
    solucionPropuesta: "Plaza 28 (Modelo Concordia) + Cocinas campesinas modernas + Biofábrica Vivero Municipal (Coop. China).",
    entidadAliado: "INFIBAGUÉ / Fontur / CIDCA"
  },
  {
    ejeNumber: 6,
    ejeTematico: "6. Desembotellamiento Vial, SETP y Cable Aéreo",
    problematicaCentral: "+310.000 vehículos, SETP paralizado, laderas aisladas y embudo Mirolindo.",
    solucionPropuesta: "Av. Cra. 13 + Calle 103 a Variantes + Doble Calzada U. Coop-San Bernardo + Puente Mirolindo a Variante Boquerón + SETP y Cable Aéreo.",
    entidadAliado: "Ente Gestor SETP / MinTransporte / ANI"
  },
  {
    ejeNumber: 7,
    ejeTematico: "7. Seguridad Cívica y Microtráfico",
    problematicaCentral: "Cosquilleo, 'Bronx' en la 21 y ollas en Comunas 7, 8 y Sur (Yuldaima, San José, Refugio).",
    solucionPropuesta: "Recuperación Plaza 21/Bronx + Plan Choque entornos seguros, LED, cámaras y empleo juvenil.",
    entidadAliado: "Sec. Gobierno / Policía / INFIBAGUÉ"
  }
];

// V. Ingeniería Financiera: Sostenibilidad sin Más Endeudamiento
export const FINANCIAL_ENGINEERING = {
  currentDebtAlert: "$180.000M – $220.000M",
  summary: "Con una deuda pública consolidada que ronda los $180.000M - $220.000M, Ibagué no resiste más créditos bancarios costosos. Nuestro plan se financia mediante dos mecanismos técnicos:",
  mechanisms: [
    {
      id: "esquema-80-10-10",
      title: "Esquema 80 - 10 - 10",
      subtitle: "Apalancamiento Internacional y Nacional",
      description: "Estructuración técnica de proyectos para traer recursos no reembolsables y cofinanciación nacional sin hipotecar las finanzas del municipio:",
      highlights: [
        "80% Cooperación Internacional No Reembolsable: Fondos climáticos verdes, BID, Unión Europea y China CIDCA (para la Biofábrica Municipal, vías rurales y movilidad limpia / Cable Aéreo).",
        "10% Cofinanciación Nacional: Ministerios, Ley de Metros y SETP, y Agencia Nacional de Infraestructura (ANI).",
        "10% Contrapartida Local Eficiente: Recursos propios optimizados con cero sobrecostos."
      ]
    },
    {
      id: "liberacion-caja-interna",
      title: "Liberación de Caja Interna y Nuevos Ingresos sin Impuestos",
      subtitle: "Eficiencia Presupuestal y Justicia Tributaria",
      description: "Generación de flujo de caja anual propio atacando las pérdidas, la burocracia y la evasión vehicular/urbanística:",
      highlights: [
        "+$8.000 Millones/año recuperados al reducir el 25% de pérdidas de agua del IBAL con los 30 km/año de red renovada y telemetría.",
        "Reingeniería 75/25 en INFIBAGUÉ sobre el recaudo de $55.000M - $60.000M anuales de Alumbrado Público (IAP), recortando nómina paralela por OPS.",
        "Recaudo por radicación en Ibagué de las matrículas de los ~60.000 vehículos foráneos que usan nuestra malla vial.",
        "Cobro efectivo de Cargas Urbanísticas y Plusvalías a grandes constructores."
      ]
    }
  ] as FinancialMechanism[]
};

export const COMUNAS_IBAGUE: ComunaInfo[] = [
  {
    number: 1,
    name: "Comuna 1 - Centro Histórico, La Pola & Calle 19",
    barriosPrincipales: ["La Pola", "Centro", "Calle 19", "Belén", "Interlaken", "Pueblo Nuevo"],
    urgenciaPrincipal: "Descongestión de la Carrera 4ª, seguridad contra el cosquilleo en la Carrera 3ª y modernización de redes.",
    proyectoEstrategico2027: "Adquisición del antiguo Carrefour de la Calle 19 (entre 3ª y 4ª) como Central de Acopio y Red de Frío + Gestores de seguridad comercial en Cra. 3ª."
  },
  {
    number: 2,
    name: "Comuna 2 - Calambeo, Ancón & La Aurora",
    barriosPrincipales: ["Calambeo", "Clarita Botero", "Ancón Tesorito", "La Paz", "La Aurora", "Santa Bárbara"],
    urgenciaPrincipal: "Aislamiento vial de las laderas, movilidad pendiente y protección ambiental.",
    proyectoEstrategico2027: "Línea 2 de Cable Aéreo Integrado al SETP (Centro – Clarita Botero – Ancón Tesorito – La Paz – La Aurora) + Inicio de la Av. Carrera 13 desde Calambeo."
  },
  {
    number: 3,
    name: "Comuna 3 - San Simón, Viveros & Plaza de la 21",
    barriosPrincipales: ["San Simón", "Viveros", "Entorno Plaza de la 21", "Antonio Nariño", "Fenalco"],
    urgenciaPrincipal: "Inseguridad en la 'Calle del Bronx', invasión de descargue pesado y deterioro hidrosanitario.",
    proyectoEstrategico2027: "Intervención Integral de la Plaza de la 21 y 'Calle del Bronx' (LED 100%, cámaras con analítica facial, traslado de carga pesada a la Calle 19) + Biofábrica en el Vivero Municipal."
  },
  {
    number: 4,
    name: "Comuna 4 - Gaitán, Piedra Pintada & Plaza de la 28",
    barriosPrincipales: ["Gaitán", "Piedra Pintada", "Entorno Plaza de la 28", "Cádiz", "Restrepo", "Calarcá"],
    urgenciaPrincipal: "Modernización de la Plaza de la 28, socavación por redes obsoletas del IBAL y movilidad.",
    proyectoEstrategico2027: "Reconstrucción de la Plaza de la 28 bajo el Modelo Plaza de la Concordia (Distrito Gastronómico y Cultural con cocinas campesinas modernas en el 2º piso)."
  },
  {
    number: 5,
    name: "Comuna 5 - Jordán 1ª a 3ª Etapa & Arkacentro",
    barriosPrincipales: ["Jordán 1ª, 2ª y 3ª Etapa", "Arkacentro", "Prados del Norte", "La Campiña"],
    urgenciaPrincipal: "Renovación de redes hidrosanitarias antiguas, seguridad comercial y corredores del SETP.",
    proyectoEstrategico2027: "Renovación de red hidrosanitaria (meta 30 km/año), carriles 'Solo Bus' con onda verde semafórica y frentes de seguridad comercial."
  },
  {
    number: 6,
    name: "Comuna 6 - El Vergel, Ambalá & Cañaveral",
    barriosPrincipales: ["El Vergel", "Ambalá", "Pedregal", "Entre Ríos", "Cañaveral", "La Gaviota"],
    urgenciaPrincipal: "Cargas urbanísticas por expansión inmobiliaria, continuidad hídrica y desembotellamiento de la Av. Ambalá.",
    proyectoEstrategico2027: "Av. Carrera 13 empatando hasta la Calle 103 en la Av. Ambalá + Cobro estricto de Cargas Urbanísticas y prohibición de licencias sin suficiencia hídrica."
  },
  {
    number: 7,
    name: "Comuna 7 - El Salado, Modelia & Cantabria",
    barriosPrincipales: ["El Salado", "Modelia", "Cantabria", "Almanza", "Ceiba", "Vía San Bernardo"],
    urgenciaPrincipal: "Embotellamiento vial hacia El Salado, microtráfico y falta de infraestructura deportiva y laboral juvenil.",
    proyectoEstrategico2027: "Corredor Transversal Calle 103 (Ambalá – doble vía El Salado – Variantes) + Doble Calzada U. Cooperativa (Veterinaria) a San Bernardo + Plan de Choque de Seguridad y Banca Juvenil INFIBAGUÉ."
  },
  {
    number: 8,
    name: "Comuna 8 - Topacio, Ciudadela Simón Bolívar & Jardín",
    barriosPrincipales: ["El Topacio", "Ciudadela Simón Bolívar", "Jardín Santander", "Nueva Castilla", "Atolsure"],
    urgenciaPrincipal: "Cortes de agua por 'valvuleros', microtráfico y desempleo juvenil y femenino.",
    proyectoEstrategico2027: "Plan de Choque y Entornos Seguros (polideportivos INFIBAGUÉ LED, centros de atención juvenil y Banca de Segundo Piso) + Telemetría digital en válvulas matrices del IBAL."
  },
  {
    number: 9,
    name: "Comuna 9 - Mirolindo, Picaleña & Arboleda Campestre",
    barriosPrincipales: ["Mirolindo", "Picaleña", "Arboleda Campestre", "Las Américas", "Aparco"],
    urgenciaPrincipal: "Colapso vehicular en la Glorieta de Mirolindo y suficiencia de agua potable para nuevos desarrollos.",
    proyectoEstrategico2027: "Construcción de Viaducto Elevado / Intercambiador Vial en la Glorieta de Mirolindo con conexión directa a la Variante Boquerón y corredores Armenia/Bogotá."
  },
  {
    number: 10,
    name: "Comuna 10 - Departamental, Estadio & La Francia",
    barriosPrincipales: ["Departamental", "La Francia", "América", "Claret", "Hipódromo", "Macarena"],
    urgenciaPrincipal: "Hundimiento de vías por tuberías de más de 40 años, parqueo regulado y entorno comercial de la 28.",
    proyectoEstrategico2027: "Priorización en la meta de 30 km/año de renovación hidrosanitaria del IBAL + Zonas de Estacionamiento Regulado (ZER) y articulación con el Distrito Gastronómico de la 28."
  },
  {
    number: 11,
    name: "Comuna 11 - Las Ferias, El Refugio & Popular",
    barriosPrincipales: ["El Refugio", "Las Ferias", "Rodríguez Andrade", "Popular", "Metaima"],
    urgenciaPrincipal: "Focos de microtráfico, inseguridad barrial y falta de oportunidades para jóvenes.",
    proyectoEstrategico2027: "Plan de Choque Integral de Seguridad en El Refugio y Las Ferias: iluminación LED 100%, recuperación de escenarios deportivos y créditos de agroindustria juvenil."
  },
  {
    number: 12,
    name: "Comuna 12 - Ricaurte, Yuldaima, San José & Matallana",
    barriosPrincipales: ["Ricaurte", "Yuldaima", "San José", "Matallana", "Kennedy", "Galarza"],
    urgenciaPrincipal: "Ollas de microtráfico, aislamiento en transporte público y bajas presiones de agua en el Sur.",
    proyectoEstrategico2027: "Estaciones del Cable Aéreo Troncal Sur-Occidente (Jazmín – Ricaurte – Centro) + Plan de Choque de Seguridad y Entornos Seguros en Matallana, San José y Yuldaima."
  },
  {
    number: 13,
    name: "Comuna 13 - Boquerón, Miramar & La Cartagena",
    barriosPrincipales: ["Boquerón", "Miramar", "La Cartagena", "La Florida", "Cerro Gordo", "Colinas del Sur"],
    urgenciaPrincipal: "Conexión de transporte digno con el Centro, agua potable continua y choque al microtráfico.",
    proyectoEstrategico2027: "Cabecera del Cable Aéreo Troncal Sur-Occidente (Boquerón – Miramar – Jazmín – Ricaurte – Centro) con tarifa integrada al SETP + Plan de Choque en La Cartagena."
  },
  {
    number: "Rural",
    name: "17 Corregimientos y 144 Veredas (Sector Rural)",
    barriosPrincipales: ["San Juan de la China", "China Alta", "Toche", "El Cural", "Caracolí", "Coello Cócora", "Juntas / Combeima", "San Bernardo", "El Totumo", "Tapias"],
    urgenciaPrincipal: "12.000 a 13.000 familias campesinas afectadas por mal estado de vías terciarias e intermediación especulativa.",
    proyectoEstrategico2027: "Mantenimiento de 50 km/año de vías terciarias con las JAC ($60kM-$80kM en esquema 80-10-10) + Contratos de compra directa (Ley 2046) en la Central de Acopio Calle 19 + Bioinsumos de la Biofábrica Municipal."
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: "redes",
    title: "Voz Digital en Redes Sociales",
    description: "Comparte los 7 Ejes Estratégicos y videos en TikTok, Instagram, Facebook y WhatsApp.",
    icon: "Share2"
  },
  {
    id: "barrio",
    title: "Líder Comunitario / Veedor Barrial",
    description: "Organiza encuentros con las JAC y vigila las redes del IBAL y el alumbrado de INFIBAGUÉ en tu comuna.",
    icon: "MapPin"
  },
  {
    id: "logistica",
    title: "Equipo Técnico, Territorial & Eventos",
    description: "Acompaña la caracterización en las 144 veredas y las jornadas de escucha en las 13 comunas.",
    icon: "Calendar"
  },
  {
    id: "multiplicador",
    title: "Multiplicador del Cambio 2027–2030",
    description: "Lleva el Documento Maestro puerta a puerta y defiende con rigor técnico el voto por Ibagué.",
    icon: "Flame"
  }
];

export const IBAGUE_HIGHLIGHTS = [
  {
    title: "17 Corregimientos y 144 Veredas",
    subtitle: "13.000 Familias Campesinas + Acopio Calle 19",
    desc: "50 km/año de vías terciarias con las JAC y compra del antiguo Carrefour de la 19 como Central de Acopio con mayoristas socios con voz pero sin voto.",
    badge: "Eje 1 • Agrologística"
  },
  {
    title: "Plaza de la 28 (Modelo Concordia) & Biofábrica",
    subtitle: "Distrito Gastronómico y Economía Circular",
    desc: "Reconversión de las cocinas campesinas del 2º piso en la Plaza 28 y Biofábrica en el Vivero Municipal procesando 15-20 ton/día de residuos orgánicos.",
    badge: "Eje 5 • Turismo & Bioinsumos"
  },
  {
    title: "Desembotellamiento Vial, SETP y 2 Cables Aéreos",
    subtitle: "Av. Cra. 13, Calle 103 y Viaducto Mirolindo",
    desc: "Soluciones reales para +310.000 vehículos, caja única del SETP y dos líneas de Cable Aéreo (Sur-Occidente Boquerón y Comuna 2 La Aurora).",
    badge: "Eje 6 • Movilidad Multimodal"
  },
  {
    title: "Plaza de la 21, Seguridad y Fin de 'Valvuleros'",
    subtitle: "30 km/año de Redes IBAL y Entornos Seguros",
    desc: "Telemetría digital contra el cartel de los valvuleros (+$8.000M/año recuperados), intervención del 'Bronx' en la 21 y choque al microtráfico.",
    badge: "Ejes 2 y 7 • Orden y Agua"
  }
];

// WhatsApp URL generator helper
export const buildWhatsAppUrl = (text: string, phone: string = CAMPAIGN_INFO.whatsappNumber): string => {
  const encoded = encodeURIComponent(text.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
};
