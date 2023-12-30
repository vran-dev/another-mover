import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class ContainsOperator implements Operator {
	id(): string {
		return "contains";
	}
	name(): string {
		return Messages.operator_contains.get();
	}

	scopes(): string[] {
		return ["property", "tag"];
	}

	invoke(left: any, right: any): boolean {
		if (left == null || right == null) {
			return false;
		}
		if (typeof left == "string" && typeof right == "string") {
			return left.includes(right);
		}

		if (Array.isArray(left) && Array.isArray(right)) {
			return right.every((item) => left.contains(item));
		}

		if (Array.isArray(left)) {
			return left.contains(right);
		}
		return false;
	}
}
