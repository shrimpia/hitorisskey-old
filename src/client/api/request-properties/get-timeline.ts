import { BaseProp } from "./base";

export interface GetTimelineProp extends BaseProp {
	limit?: number;
	untilId?: string;
}
