export interface PolicyUpdateRequest {
    id: number;
    name: string;
    description?: string;
    creationDate: Date;
    effectiveDate: Date;
    expiryDate: Date;
    policyType: string;
  }  