import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class NotEqualOperator implements Operator {
	id(): string {
		return "not_equals";
	}
	name(): string {
		return Messages.operator_not_equals.get();
	}

	scopes(): string[] {
		return ["property"];
	}

	invoke(left: any, right: any): boolean {
		return left != right;
	}
}
