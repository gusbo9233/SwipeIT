export interface User {
    id: string
    email: string
    role: UserRole
    name: string
}

export interface RawAccount extends User {
  password?: string; // Included here because it exists in the JSON
}

export type UserRole = "recruiter" | "candidate"