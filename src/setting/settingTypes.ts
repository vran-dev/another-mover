import {} from "src/action/handler/actionHandler";
import { Rule } from "src/rule/rule";

export const DEFAULT_SETTINGS: RunnerSetting = {
	rules: [],
};

export interface RunnerSetting {
	rules: Rule[];
}
