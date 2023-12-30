import { App, TFile } from "obsidian";
import { operators } from "../operator/operator";
import { ConditionMatcher as ConditionMatcher } from "./conditionMatcher";
import { Rule } from "src/rule/rule";
import { Condition } from "./condition";

export default class PropertyConditionMatcher implements ConditionMatcher {
	supports(condition: Condition): boolean {
		return condition.type == "PROPERTY";
	}

	match(app: App, rule: Rule, condition: Condition, file: TFile): boolean {
		const fileCache = app.metadataCache.getFileCache(file);
		if (!fileCache) {
			return false;
		}
		if (!fileCache.frontmatter || !condition.property) {
			return false;
		}
		const acualValue = fileCache.frontmatter[condition.property];
		if (!acualValue) {
			return false;
		}
		const operator = operators.find((op) => op.id() == condition.operator);
		if (!operator) {
			return false;
		}
		return operator.invoke(acualValue, condition.value);
	}
}
