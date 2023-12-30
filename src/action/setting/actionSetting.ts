import { App, Setting } from "obsidian";
import { Action } from "../action";
import { InsertContentActionSetting } from "./InsertContentActionSetting";
import { InvokeCommandActionSetting } from "./InvokeCommandActionSetting";
import { MoveCurrentFileActionSetting } from "./MoveCurrentFileActionSetting";
import { MoveCurrentFolderActionSetting } from "./MoveCurrentFolderActionSetting";
import { UpdatePropertyActionSetting } from "./UpdatePropertyActionSetting";
import { Rule } from "src/rule/rule";

export interface ActionSetting extends Action {
	name(): string;

	renderSettings(
		setting: Setting,
		action: Action,
		rule: Rule,
    app: App,
		refresh: () => void,
		onSave: (action: Action, rule: Rule) => void
	): void;
}

export const actionSettings: ActionSetting[] = [
	new InsertContentActionSetting(),
	new InvokeCommandActionSetting(),
	new MoveCurrentFileActionSetting(),
	new MoveCurrentFolderActionSetting(),
	new UpdatePropertyActionSetting(),
];
