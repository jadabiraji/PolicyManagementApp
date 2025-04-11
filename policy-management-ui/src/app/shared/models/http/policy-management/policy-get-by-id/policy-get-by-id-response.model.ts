import { BaseResponse } from "../../../common/base-response.model";
import { Policy } from "../policy-get/policy-get-response.model";

export interface PolicyGetByIdResponse extends BaseResponse {
  data: Policy;
}
