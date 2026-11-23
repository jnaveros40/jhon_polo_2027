import { ProgrammaticPillar, ComunaInfo, VolunteerRole } from '../types';

export const CAMPAIGN_INFO = {
  candidateName: "John Polo",
  candidateShort: "JP",
  campaignTitle: "Concejo de Ibagué 2027",
  location: "Ibagué, Tolima, Colombia",
  sloganPrimary: "Ibagué merece sonar más fuerte",
  sloganSecondary: "Ibagué tiene con qué. Es hora de creer.",
  sloganTerritorial: "Por una Ibagué que produce, recibe y crece.",
  manifesto: "Una ciudad con voz, oportunidades y futuro.",
  bioSummary: "Ibaguereño apasionado por su tierra, comprometido con la reactivación económica, la dignificación de nuestros artistas y el control estricto a los servicios públicos de la ciudad. Desde el Concejo de Ibagué, haremos que la voz de los barrios y las comunas resuene con contundencia.",

  // Official Contacts & Socials
  whatsappNumber: "573025091063", // Reemplazar con el número real de campaña
  whatsappDisplay: "+57 (302) 509-1063",
  email: "[EMAIL_ADDRESS]",
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
    heroCandidate: "/images/candidato-hero.jpg",
    actionCandidate: "/images/candidato-accion.jpg",
    bannerLandscape: "/images/ibague-banner.jpg",
    altPoster: "/images/ibague-creer.jpg",
    caballoLiberal: "/images/caballo-liberal.svg",
    caballoLiberalJpg: "/images/caballo-liberal.jpg"
  },

  // Partido Político
  party: {
    name: "Partido Liberal Colombiano",
    short: "Partido Liberal",
    slogan: "Por la defensa de los derechos, el empleo digno y las oportunidades para los jóvenes",
    symbolName: "El Jinete y Caballo Liberal con la Bandera Roja",
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

export const PROGRAMMATIC_PILLARS: ProgrammaticPillar[] = [
  {
    id: "economia-empleo",
    number: 1,
    title: "Economía y Empleo Juvenil",
    tagline: "El turismo y la industria como motores reales de trabajo digno para nuestros jóvenes.",
    badge: "Oportunidades & Futuro",
    color: "red",
    icon: "TrendingUp",
    proposals: [
      {
        id: "primer-empleo",
        title: "Primer Empleo Juvenil Sin Barreras",
        summary: "Incentivos tributarios municipales a empresas locales que contraten a jóvenes recién graduados y técnicos del SENA.",
        description: "Crearemos la estampilla de estímulo a la contratación juvenil en Ibagué y articularemos mesas permanentes con la Universidad del Tolima, el SENA y gremios económicos. Eliminaremos las trabas de experiencia previa en convocatorias públicas y privadas del municipio.",
        tags: ["Juventud", "Empresa", "SENA", "Incentivos"],
        icon: "Briefcase",
        impactMetrics: "+3,500 primeros empleos proyectados"
      },
      {
        id: "mas-industria",
        title: "Más Industria, Más Inversión Local",
        summary: "Atracción de empresas al corredor logístico de Ibagué y blindaje tributario a los microempresarios de barrio.",
        description: "Ibagué no puede seguir siendo solo una ciudad de paso. Impulsaremos la modernización de la Zona Franca, simplificaremos la ventanilla única para abrir negocios en menos de 48 horas y defenderemos tarifas preferenciales en ICA para emprendedores locales durante sus primeros 2 años.",
        tags: ["Inversión", "Zona Franca", "Industria", "Emprendimiento"],
        icon: "Building2",
        impactMetrics: "Reducción de trámites a 48h hábiles"
      },
      {
        id: "bilinguismo-turismo",
        title: "Bilingüismo y Formación Turística de Clase Mundial",
        summary: "Preparar a miles de jóvenes para liderar la industria de la hospitalidad y la tecnología global.",
        description: "Cada turista que llega a Ibagué merece encontrar un joven ibaguereño que lo reciba, lo guíe y le cuente nuestra historia con fluidez en inglés y habilidades de servicio. Llevaremos academias públicas de idiomas y marketing digital a las comunas populares.",
        tags: ["Educación", "Bilingüismo", "Guías", "Tecnología"],
        icon: "GraduationCap",
        impactMetrics: "100% becas formativas en comunas"
      }
    ]
  },
  {
    id: "cultura-turismo",
    number: 2,
    title: "Cultura, Turismo y Gastronomía Productiva",
    tagline: "Ibagué: Destino Mundo, Capital Musical y cuna del sabor gastronómico de Colombia.",
    badge: "Identidad & Tradición",
    color: "yellow",
    icon: "Music",
    proposals: [
      {
        id: "destino-mundo",
        title: "Destino Mundo y Sabor Local",
        summary: "Posicionar nuestras rutas gastronómicas (lechona, tamal, achiras) y ecoturismo hacia el Cañón del Combeima y Nevado.",
        description: "Promoción turística agresiva a nivel nacional e internacional. Certificación de calidad de la auténtica lechona y el tamal tolimense, señalización turística de vanguardia, senderismo seguro y formalización de operadores turísticos en la cuenca del Combeima.",
        tags: ["Gastronomía", "Ecoturismo", "Combeima", "Nevado"],
        icon: "Utensils",
        impactMetrics: "Ruta oficial certificada Combeima-Nevado"
      },
      {
        id: "cultura-produce",
        title: "Cultura Que Produce Todo el Año",
        summary: "Circulación económica y apoyo real a músicos, lutieres y bailarines más allá de los días del Festival Folclórico.",
        description: "Ibagué es la Capital Musical de Colombia, pero sus artistas viven en la incertidumbre. Crearemos el Fondo Municipal de Circulación Artística para que nuestras orquestas, agrupaciones de rajaleñas y danzas tengan contratos dignos y presentaciones pagadas durante todo el calendario.",
        tags: ["Capital Musical", "Artistas", "Folclor", "Patrimonio"],
        icon: "Sparkles",
        impactMetrics: "Circuito artístico activo 12 meses"
      },
      {
        id: "plazas-vivas",
        title: "Plazas Vivas y Seguridad Alimentaria",
        summary: "Modernización, salubridad y seguridad de las Plazas de Mercado de La 21, La 28, El Salado y La 14.",
        description: "Nuestras plazas de mercado son el corazón campesino y gastronómico de Ibagué. Gestionaremos recursos para techos dignos, cuartos fríos, parqueaderos seguros y campañas para que las familias y turistas compren directamente al campesino sin intermediarios usureros.",
        tags: ["Campesinado", "Plazas de Mercado", "La 21", "La 28"],
        icon: "Store",
        impactMetrics: "Modernización de 4 plazas icónicas"
      }
    ]
  },
  {
    id: "control-servicios",
    number: 3,
    title: "Control Político y Servicios Públicos",
    tagline: "Vigilancia sin tregua al agua potable, alcantarillado y tarifas justas en todos los barrios.",
    badge: "Transparencia & Firmeza",
    color: "green",
    icon: "ShieldCheck",
    proposals: [
      {
        id: "control-agua",
        title: "Control Férreo al Agua y al IBAL",
        summary: "Exigencia técnica y jurídica para que no haya un solo hogar en Ibagué que sufra por racionamientos injustificados.",
        description: "Es inaceptable que en la ciudad con los ríos más ricos del Tolima las familias pasen días sin una gota de agua. Lideraremos comisiones de control especial al IBAL para fiscalizar cada obra de acueducto complementario y sancionar la ineficiencia.",
        tags: ["Agua 24/7", "IBAL", "Tarifas Justas", "Obras"],
        icon: "Droplets",
        impactMetrics: "Veeduría ciudadana permanente al IBAL"
      },
      {
        id: "concejo-puertas-abiertas",
        title: "Concejo de Puertas Abiertas en los Barrios",
        summary: "Sesiones descentralizadas en las comunas y rendición de cuentas pública en tiempo real.",
        description: "El concejal debe estar donde están los problemas, no encerrado en un recinto con aire acondicionado. Implementaremos 'El Concejal en tu Barrio': visitas semanales a los polideportivos y salones comunales para escuchar a las Juntas de Acción Comunal.",
        tags: ["Participación", "Transparencia", "Barrios", "JAC"],
        icon: "Users2",
        impactMetrics: "13 comunas visitadas periódicamente"
      },
      {
        id: "alumbrado-malla-vial",
        title: "Malla Vial y Alumbrado Público Seguro",
        summary: "Priorización de vías barriales deterioradas e iluminación LED en puntos oscuros e inseguros.",
        description: "Exigiremos que el recaudo de alumbrado público y la sobretasa a la gasolina se reflejen en calles pavimentadas sin huecos y parques iluminados donde las familias puedan caminar tranquilas a cualquier hora de la noche.",
        tags: ["Vías", "Seguridad", "Alumbrado LED", "Parques"],
        icon: "Lightbulb",
        impactMetrics: "Cero tolerancia a 'calles trampa'"
      }
    ]
  }
];

export const COMUNAS_IBAGUE: ComunaInfo[] = [
  {
    number: 1,
    name: "Comuna 1 - Centro Histórico & La Pola",
    barriosPrincipales: ["La Pola", "Centro", "Belén", "Interlaken", "Pueblo Nuevo"],
    urgenciaPrincipal: "Patrimonio cultural, seguridad y apoyo al comercio formal."
  },
  {
    number: 2,
    name: "Comuna 2 - Calambeo & Ancón",
    barriosPrincipales: ["Calambeo", "Ancón", "Santa Bárbara", "7 de Agosto", "La Paz"],
    urgenciaPrincipal: "Protección ambiental de cuencas y movilidad en vías empinadas."
  },
  {
    number: 3,
    name: "Comuna 3 - San Simón & Viveros",
    barriosPrincipales: ["San Simón", "Viveros", "Antonio Nariño", "El Carmen", "Fenalco"],
    urgenciaPrincipal: "Espacio público, alcantarillado y señalización vial escolar."
  },
  {
    number: 4,
    name: "Comuna 4 - Gaitán & Piedra Pintada",
    barriosPrincipales: ["Gaitán", "Piedra Pintada", "Cádiz", "Restrepo", "Calarcá"],
    urgenciaPrincipal: "Presión en redes de acueducto y mantenimiento de parques."
  },
  {
    number: 5,
    name: "Comuna 5 - Jordán 1ª a 3ª Etapa",
    barriosPrincipales: ["Jordán 1ª, 2ª y 3ª Etapa", "Arkacentro", "Prados del Norte", "La Campiña"],
    urgenciaPrincipal: "Seguridad ciudadana y reactivación de zonas comerciales barriales."
  },
  {
    number: 6,
    name: "Comuna 6 - Vergel & Ambalá",
    barriosPrincipales: ["El Vergel", "Ambalá", "Pedregal", "Entre Ríos", "Cañaveral"],
    urgenciaPrincipal: "Malla vial en la Avenida Ambalá y continuidad en el servicio de agua."
  },
  {
    number: 7,
    name: "Comuna 7 - Salado & Especial",
    barriosPrincipales: ["El Salado", "Modelia", "Almanza", "Ceiba", "Chicó"],
    urgenciaPrincipal: "Impulso a la Plaza del Salado y ampliación de cobertura de agua potable."
  },
  {
    number: 8,
    name: "Comuna 8 - Jardín & Topacio",
    barriosPrincipales: ["El Topacio", "Jardín Santander", "Nueva Castilla", "Atolsure", "Ciudadela Simón Bolívar"],
    urgenciaPrincipal: "Oportunidades de empleo para jóvenes y escenarios deportivos dignos."
  },
  {
    number: 9,
    name: "Comuna 9 - Picaleña & Mirolindo",
    barriosPrincipales: ["Picaleña", "Mirolindo", "Arboleda Campestre", "Aparco", "Las Américas"],
    urgenciaPrincipal: "Zona industrial, transporte público digno y agua para macroproyectos."
  },
  {
    number: 10,
    name: "Comuna 10 - Departamental & Estadio",
    barriosPrincipales: ["Departamental", "La Francia", "América", "Claret", "Hipódromo"],
    urgenciaPrincipal: "Ordenamiento del sector Estadio y repavimentación de vías secundarias."
  },
  {
    number: 11,
    name: "Comuna 11 - Ferias & Refugio",
    barriosPrincipales: ["Las Ferias", "El Refugio", "Rodríguez Andrade", "Popular", "Metaima"],
    urgenciaPrincipal: "Plaza de Ferias, microempresas manufactureras y seguridad comunitaria."
  },
  {
    number: 12,
    name: "Comuna 12 - Ricaurte & Kennedy",
    barriosPrincipales: ["Ricaurte", "Kennedy", "Venecia", "Yuldaima", "Galarza"],
    urgenciaPrincipal: "Presión del agua en el sur, centros de salud y programas juveniles."
  },
  {
    number: 13,
    name: "Comuna 13 - Boquerón & Miramar",
    barriosPrincipales: ["Boquerón", "Miramar", "La Florida", "Cerro Gordo", "Colinas del Sur"],
    urgenciaPrincipal: "Entrada sur a la ciudad, acueductos comunitarios y mitigación de riesgos."
  },
  {
    number: "Rural",
    name: "Corregimientos & Sector Rural",
    barriosPrincipales: ["Cañón del Combeima (Juntas, Villa Restrepo)", "El Totumo", "San Bernardo", "Toche", "Tapias"],
    urgenciaPrincipal: "Vías terciarias para sacar cosechas, ecoturismo sostenible y agua potable rural."
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: "redes",
    title: "Voz Digital en Redes Sociales",
    description: "Ayúdanos a viralizar propuestas en TikTok, Instagram y WhatsApp desde tu celular.",
    icon: "Share2"
  },
  {
    id: "barrio",
    title: "Líder Comunitario de Barrio",
    description: "Organiza encuentros cercanos con vecinos, familia y amigos en tu cuadra.",
    icon: "MapPin"
  },
  {
    id: "logistica",
    title: "Equipo de Logística & Eventos",
    description: "Acompaña las caravanas, volanteo y jornadas de escucha en las comunas.",
    icon: "Calendar"
  },
  {
    id: "multiplicador",
    title: "Multiplicador de Esperanza",
    description: "Lleva el mensaje puerta a puerta y defiende cada voto por el futuro de Ibagué.",
    icon: "Flame"
  }
];

export const IBAGUE_HIGHLIGHTS = [
  {
    title: "Cañón del Combeima",
    subtitle: "Naturaleza & Ecoturismo",
    desc: "Puerta de entrada al majestuoso Nevado del Tolima. Nuestra meta: turismo sostenible que deje empleo digno a las familias locales.",
    badge: "Eco-Tolima"
  },
  {
    title: "Festival Folclórico Colombiano",
    subtitle: "Capital Musical de América",
    desc: "Nuestros músicos, artesanos y bailarines merecen respaldo institucional y contratos durante los 12 meses del año.",
    badge: "Folclor Vivo"
  },
  {
    title: "Gastronomía con Orgullo",
    subtitle: "Lechona, Tamal & Achiras",
    desc: "Potenciaremos rutas gastronómicas formales para que los visitantes vivan la mejor experiencia de Colombia.",
    badge: "Sabor Típico"
  },
  {
    title: "Nuestras Plazas de Mercado",
    subtitle: "Corazón de la 21, 28, Salado y 14",
    desc: "Recuperación integral, salubridad e impulso a los campesinos y vivanderos que alimentan a Ibagué.",
    badge: "Soberanía Alimentaria"
  }
];

// WhatsApp URL generator helper
export const buildWhatsAppUrl = (text: string, phone: string = CAMPAIGN_INFO.whatsappNumber): string => {
  const encoded = encodeURIComponent(text.trim());
  return `https://wa.me/${phone}?text=${encoded}`;
};

