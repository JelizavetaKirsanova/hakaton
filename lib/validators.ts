export function validateLead(data: any) {
    const errors = [];
    if (!data.name) errors.push('Name is required');
    if (!data.phone) errors.push('Phone is required');
    return errors;
  }
  