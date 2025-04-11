export interface PolicyCreateRequest {
    name: string;
    description?: string;
    creationDate: Date;
    effectiveDate: Date;
    expiryDate: Date;
    policyType: string;
  }
  