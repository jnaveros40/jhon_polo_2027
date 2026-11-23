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
  title: string;
  tagline: string;
  badge: string;
  color: 'red' | 'yellow' | 'green';
  icon: string;
  proposals: Proposal[];
}

export interface ComunaInfo {
  number: number | string;
  name: string;
  barriosPrincipales: string[];
  urgenciaPrincipal: string;
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

