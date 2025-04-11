import { BaseResponse } from "../../../common/base-response.model";

export interface Policy {
  id: number;
  name: string;
  description?: string;
  creationDate: Date;
  effectiveDate: Date;
  expiryDate: Date;
  policyType: string;
  tenantId?: string;  // Optional tenantId, if necessary to pass when creating or updating a policy
}

export interface PolicyGetResponse extends BaseResponse {
  data: Policy[];
  totalCount: number;  // Total number of policies in the database
  totalPages: number;  // Total number of pages based on pagination
  currentPage: number; // Current page number
}
