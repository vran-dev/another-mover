import { App, TFile } from "obsidian";
import PropertyConditionMatcher from "./propertyConditionMatcher";
import { ConditionMatcher } from "./conditionMatcher";
import TagConditionMatcher from "./tagConditionMatcher";
import { Rule } from "src/rule/rule";

export class ConditionMatchers {
	static match(app: App, rule: Rule, file: TFile): boolean {
		const matchers: ConditionMatcher[] = [
			new PropertyConditionMatcher(),
			new TagConditionMatcher(),
		];

		for (const condition of rule.conditions) {
			// all condition matched
			let matched = false;
			for (const matcher of matchers) {
				if (matcher.supports(condition)) {
					matched = matcher.match(app, rule, condition, file);
					break;
				}
			}
			if (!matched) {
				return false;
			}
		}

		// conditon is empty or all condition matched
		return true;
	}
}