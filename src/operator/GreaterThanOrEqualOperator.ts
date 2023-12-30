import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class GreaterThanOrEqualOperator implements Operator {
	id(): string {
		return "greater_than_or_equal";
	}
	name(): string {
		return Messages.operator_greater_than_or_equal.get();
	}

	scopes(): string[] {
		return ["property"];
	}

	invoke(left: any, right: any): boolean {
		const rightNumber = parseInt(right);
		if (isNaN(rightNumber)) {
			return false;
		}
		const leftNumber = parseInt(left);
		if (isNaN(leftNumber)) {
			return false;
		}
		return leftNumber >= rightNumber;
	}
}
