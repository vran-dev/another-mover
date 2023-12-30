import { randomUUID } from "crypto";
import { ActionSetting } from "./actionSetting";
import { Action, ActionType } from "../action";
import { Messages } from "src/i18/i18n";
import { App, Setting } from "obsidian";
import { Rule } from "src/rule/rule";

export class InsertContentAtCursorActionSetting implements ActionSetting {
	id: string;
	type: ActionType;
	args: {
		content: string;
	};

	constructor() {
		this.id = randomUUID();
		this.type = "INSERT_CONTENT_AT_CURSOR";
		this.args = {
			content: "",
		};
	}

	name() {
		return Messages.setting_label_rule_action_type_insert_content_at_cursor.get();
	}

	renderSettings(
		setting: Setting,
		action: Action,
		rule: Rule,
		app: App,
		refresh: () => void,
		onSave: (action: Action, rule: Rule) => void
	): void {
		setting.addTextArea((text) => {
			text.setPlaceholder("content")
				.setValue(action.args.content?.toString() || "")
				.onChange(async (value) => {
					action.args.content = value;
					onSave(action, rule);
				});
		});
	}
}
