import { randomUUID } from "crypto";
import { ActionSetting } from "./actionSetting";
import { Action, ActionType } from "../action";
import { Messages } from "src/i18/i18n";
import { Setting, App } from "obsidian";
import { Rule } from "src/rule/rule";
import CommandSuggest from "src/suggest/commandSuggest";

export class InvokeCommandActionSetting implements ActionSetting {
	id: string;
	type: ActionType;
	args: {
		commandName: string;
		commandId: string;
	};

	constructor() {
		this.id = randomUUID();
		this.type = "INVOKE_COMMAND";
		this.args = {
			commandName: "",
			commandId: "",
		};
	}

	name() {
		return Messages.setting_label_rule_action_type_invoke_command.get();
	}

	renderSettings(
		setting: Setting,
		action: Action,
		rule: Rule,
		app: App,
		refresh: () => void,
		onSave: (action: Action, rule: Rule) => void
	): void {
		setting.addText((text) => {
			new CommandSuggest(app, text.inputEl);
			text.setPlaceholder("obsidian command")
				.setValue(action.args.commandName?.toString() || "")
				.onChange(async (value) => {
					const commandId = text.inputEl.getAttr("command-id");
					if (commandId) {
						action.args.commandId = commandId;
						action.args.commandName = value;
						onSave(action, rule);
					}
				});
		});
	}
}
