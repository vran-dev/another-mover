import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class GreaterThanOperator implements Operator {
	id(): string {
		return "greater_than";
	}

	name(): string {
		return Messages.operator_greater_than.get();
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
		return leftNumber > rightNumber;
	}
}
