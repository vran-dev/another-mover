import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class EqualOperator implements Operator {
	id(): string {
		return "equals";
	}

	scopes(): string[] {
		return ["property"];
	}

	name(): string {
		return Messages.operator_equals.get();
	}

	invoke(left: any, right: any): boolean {
		return left == right;
	}
}
