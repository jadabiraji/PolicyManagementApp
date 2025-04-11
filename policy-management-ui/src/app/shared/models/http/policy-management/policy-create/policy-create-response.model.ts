import { BaseResponse } from "../../../common/base-response.model";

export interface PolicyCreateResponse extends BaseResponse {
  data: {
    id: number;
  };
}
