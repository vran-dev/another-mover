import { randomUUID } from "crypto";
import { ActionSetting } from "./actionSetting";
import { Action, ActionType } from "../action";
import { Messages } from "src/i18/i18n";
import { App, Setting } from "obsidian";
import { Rule } from "src/rule/rule";
import { predicateTypeAndConvert } from "src/util/typePredicate";

export class UpdatePropertyActionSetting implements ActionSetting {
	id: string;
	type: ActionType;
	args: {
		property: string;
		value: string | boolean | number;
	};

	constructor() {
		this.id = randomUUID();
		this.type = "UPDATE_PROPERTY";
		this.args = {
			property: "",
			value: "",
		};
	}

	name() {
		return Messages.setting_label_rule_action_type_update_property.get();
	}

	renderSettings(
		setting: Setting,
		action: Action,
		rule: Rule,
		app: App,
		refresh: () => void,
		onSave: (action: Action, rule: Rule) => void
	): void {
		setting
			.addText((text) => {
				text.setPlaceholder("property name")
					.setValue(action.args.property?.toString() || "")
					.onChange(async (value) => {
						action.args.property = value;
						onSave(action, rule);
					});
			})
			.addText((text) => {
				text.setPlaceholder("property value")
					.setValue(action.args.value?.toString() || "")
					.onChange(async (value) => {
						action.args.value = predicateTypeAndConvert(value);
						onSave(action, rule);
					});
			});
	}
}
