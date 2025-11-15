export type Manager = {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    region?: string;
    specialization?: string;
    currentLoad: number;
    active: boolean;
    createdAt: Date;
  };
  