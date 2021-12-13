import { BaseProp } from "./base";

export interface ReadTimelineProp extends BaseProp {
	limit?: number;
	untilId?: string;
}
