import { App, TFile } from "obsidian";
import { operators } from "../operator/operator";
import { ConditionMatcher } from "./conditionMatcher";
import { Rule } from "src/rule/rule";
import { Condition } from "./condition";

export default class TagConditionMatcher implements ConditionMatcher {
	supports(condition: Condition): boolean {
		return condition.type == "TAG";
	}

	match(app: App, rule: Rule, condition: Condition, file: TFile): boolean {
		const fileCache = app.metadataCache.getFileCache(file);
		if (!fileCache) {
			return false;
		}

		const mergedTags: string[] = [];
		// merge tags from content
		const tags = fileCache.tags;
		if (tags) {
			// obsidian tag starts with #, so we need to remove it
			const formattedTags = tags.map((tag) => tag.tag.substring(1));
			mergedTags.push(...formattedTags);
		}

		// merge tags from frontmatter
		if (fileCache.frontmatter) {
			const tags = fileCache.frontmatter["tags"];
			if (tags) {
				mergedTags.push(...tags);
			}
		}

		const operator = operators.find((op) => op.id() == condition.operator);
		if (!operator) {
			return false;
		}
		return operator.invoke(mergedTags, condition.value);
	}
}
