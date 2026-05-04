export interface Education {
  institution: string;
  degree: string;
  year: number;
}

// 1. The Full Object (Renamed from DetailedCandidate)
export interface Candidate {
  id: string | number;
  name: string;
  imageUrl: string;
  skills: string[];
  email: string;
  address: string;
  phoneNumber: string;
  linkedInUrl?: string;
  githubUrl?: string;
  education: Education[];
  competences: string[];
  references: string[];
}

// 2. The UI-Specific Type (Renamed from Candidate)
// We use 'Pick' to ensure it stays in sync with the Master Candidate type
export type CandidatePreview = Pick<Candidate, 'id' | 'name' | 'imageUrl' | 'skills'>;