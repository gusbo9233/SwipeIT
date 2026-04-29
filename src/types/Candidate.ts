import type { Education } from "./Education";

export type Candidate = {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
    linkedUrl: string;
    githubUrl: string;
    skills: string[];
    education: Education[];
    competences: string[];
    references: string[];
}