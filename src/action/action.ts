import { MoveCurrentFolderActionSetting } from "./setting/MoveCurrentFolderActionSetting";
import { MoveCurrentFileActionSetting } from "./setting/MoveCurrentFileActionSetting";
import { UpdatePropertyActionSetting } from "./setting/UpdatePropertyActionSetting";
import { InsertContentActionSetting } from "./setting/InsertContentActionSetting";
import { InvokeCommandActionSetting } from "./setting/InvokeCommandActionSetting";

export interface Action {
	id: string;

	type: ActionType;

	args: {
		[key: string]: string | number | boolean;
	};

}

export type ActionType =
	| "MOVE_CURRENT_FOLDER"
	| "MOVE_CURRENT_FILE"
	| "UPDATE_PROPERTY"
	| "INSERT_CONTENT"
	| "INVOKE_COMMAND";

export const actionSettings = [
	new MoveCurrentFolderActionSetting(),
	new MoveCurrentFileActionSetting(),
	new UpdatePropertyActionSetting(),
	new InsertContentActionSetting(),
	new InvokeCommandActionSetting(),
];
