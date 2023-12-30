import { Messages } from "src/i18/i18n";
import { Operator } from "./operator";


export class RegexMatch implements Operator {
	id(): string {
		return "regex_match";
	}

	name(): string {
		return Messages.operator_regex_match.get();
	}

	scopes(): string[] {
		return ["property"];
	}

	invoke(left: any, right: any): boolean {
		if (left == null || right == null) {
			return false;
		}
		if (typeof left == "string" && typeof right == "string") {
			return new RegExp(right).test(left);
		}
		return false;
	}
}
