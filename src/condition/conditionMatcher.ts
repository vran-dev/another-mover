import { App, TFile } from "obsidian";
import { Rule } from "src/rule/rule";
import { Condition } from "./condition";

export interface ConditionMatcher {
	supports(condition: Condition): boolean;

	match(app: App, rule: Rule, condition: Condition, file: TFile): boolean;
}
