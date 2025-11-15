export type Lead = {
    id: string;
    name: string;
    email?: string;
    phone: string;
    region?: string;
    product?: string;
    status: 'new' | 'assigned' | 'in_progress' | 'completed';
    managerId?: string;
    createdAt: Date;
  };
  