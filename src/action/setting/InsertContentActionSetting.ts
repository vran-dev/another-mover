import { randomUUID } from "crypto";
import { ActionSetting } from "./actionSetting";
import { Action, ActionType } from "../action";
import { Messages } from "src/i18/i18n";
import { App, Setting } from "obsidian";
import { Rule } from "src/rule/rule";

export class InsertContentActionSetting implements ActionSetting {
	id: string;
	type: ActionType;
	args: {
		content: string;
		position?: "atCursor" | "fileEnd" | "fileStart";
	};

	constructor() {
		this.id = randomUUID();
		this.type = "INSERT_CONTENT";
		this.args = {
			content: "",
			position: "atCursor",
		};
	}

	name() {
		return Messages.setting_label_rule_action_type_insert_content.get();
	}

	renderSettings(
		setting: Setting,
		action: Action,
		rule: Rule,
		app: App,
		refresh: () => void,
		onSave: (action: Action, rule: Rule) => void
	): void {
		setting.addDropdown((dropdown) => {
			action.args.position = action.args.position || "atCursor";
			dropdown
				.addOption(
					"atCursor",
					Messages.setting_label_rule_action_type_insert_content_at_cursor.get()
				)
				.addOption(
					"fileEnd",
					Messages.setting_label_rule_action_type_insert_content_at_file_end.get()
				)
				.addOption(
					"fileStart",
					Messages.setting_label_rule_action_type_insert_content_at_file_start.get()
				)
				.setValue(action.args.position?.toString() || "atCursor")
				.onChange(async (value) => {
					action.args.position = value;
					onSave(action, rule);
				});
		});

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
