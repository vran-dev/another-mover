import { EqualOperator } from "./EqualOperator";
import { NotEqualOperator } from "./NotEqualOperator";
import { GreaterThanOperator } from "./GreaterThanOperator";
import { GreaterThanOrEqualOperator } from "./GreaterThanOrEqualOperator";
import { LessThanOperator } from "./LessThanOperator";
import { LessThanOrEqualOperator } from "./LessThanOrEqualOperator";
import { ContainsOperator } from "./ContainsOperator";
import { NotContainsOperator } from "./NotContainsOperator";
import { RegexMatch } from "./RegexMatch";

export interface Operator {
	id(): string;

	name(): string;

	scopes(): string[];

	invoke(left: any, right: any): boolean;
}

export const operators: Operator[] = [
	new EqualOperator(),
	new NotEqualOperator(),
	new GreaterThanOperator(),
	new GreaterThanOrEqualOperator(),
	new LessThanOperator(),
	new LessThanOrEqualOperator(),
	new ContainsOperator(),
	new NotContainsOperator(),
	new RegexMatch(),
];
