export interface Proposal {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  icon: string;
  impactMetrics?: string;
}

export interface ProgrammaticPillar {
  id: string;
  number: number;
  shortTitle: string;
  title: string;
  tagline: string;
  badge: string;
  color: 'red' | 'yellow' | 'green';
  icon: string;
  problematicaCentral: string;
  solucionNormativa: string;
  entidadEjecutora: string;
  proposals: Proposal[];
}

export interface TheoreticalFoundation {
  id: string;
  author: string;
  title: string;
  description: string;
  pillars: string[];
}

export interface FunctionalCompetence {
  id: string;
  title: string;
  legalBasis: string;
  description: string;
  actions: string[];
}

export interface StrategicMatrixRow {
  ejeNumber: number;
  ejeTematico: string;
  problematicaCentral: string;
  solucionPropuesta: string;
  entidadAliado: string;
}

export interface FinancialMechanism {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface ComunaInfo {
  number: number | string;
  name: string;
  barriosPrincipales: string[];
  urgenciaPrincipal: string;
  proyectoEstrategico2027: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CitizenReport {
  nombre: string;
  telefono: string;
  comuna: string;
  tema: string;
  mensaje: string;
  fecha?: string;
}
