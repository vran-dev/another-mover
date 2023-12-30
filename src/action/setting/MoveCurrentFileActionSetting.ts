import { randomUUID } from "crypto";
import { ActionSetting } from "./actionSetting";
import { Action, ActionType } from "../action";
import { Messages } from "src/i18/i18n";
import { Setting, App } from "obsidian";
import { Rule } from "src/rule/rule";
import FolderSuggest from "src/suggest/folderSuggest";

export class MoveCurrentFileActionSetting implements ActionSetting {
	id: string;
	type: ActionType;
	args: {
		targetFolder: string;
	};

	constructor() {
		this.id = randomUUID();
		this.type = "MOVE_CURRENT_FILE";
		this.args = {
			targetFolder: "",
		};
	}

	name() {
		return Messages.setting_label_rule_action_type_move_current_file.get();
	}

	renderSettings(
		setting: Setting,
		action: Action,
		rule: Rule,
		app: App,
		refresh: () => void,
		onSave: (action: Action, rule: Rule) => void
	): void {
		setting.addSearch((search) => {
			new FolderSuggest(app, search.inputEl);
			search
				.setPlaceholder("target folder")
				.setValue(action.args.targetFolder?.toString() || "");
			search.onChange(async (value) => {
				action.args.targetFolder = value;
				onSave(action, rule);
			});
		});
	}
}
