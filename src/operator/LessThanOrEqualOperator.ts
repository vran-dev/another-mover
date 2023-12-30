import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class LessThanOrEqualOperator implements Operator {
	id(): string {
		return "less_than_or_equal";
	}

	scopes(): string[] {
		return ["property"];
	}

	name(): string {
		return Messages.operator_less_than_or_equal.get();
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
		return leftNumber <= rightNumber;
	}
}
