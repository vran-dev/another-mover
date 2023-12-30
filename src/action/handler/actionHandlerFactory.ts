import InsertContentAtCursorActionHandler from "./insertContentAtCursorHandler";
import MoveCurrentFileActionHandler from "./moveCurrentFileActionHandler";
import UpdatePropertyActionHandler from "./updatePropertyActionHandler";
import { RunningContext } from "src/rule/simpler";
import MoveCurrentFolderActionHandler from "./moveCurrentFolderActionHandler";
import { ActionType, Action } from "../action";
import InvokeCommandActionHandler from "./invokeCommandActionHandler";

export default class ActionHandlerFactory {
	static create(
		actionType: ActionType,
		action: Action,
		context: RunningContext
	) {
		switch (actionType) {
			case "MOVE_CURRENT_FOLDER":
				return new MoveCurrentFolderActionHandler(action, context);
			case "MOVE_CURRENT_FILE":
				return new MoveCurrentFileActionHandler(action, context);
			case "UPDATE_PROPERTY":
				return new UpdatePropertyActionHandler(action, context);
			case "INSERT_CONTENT_AT_CURSOR":
				return new InsertContentAtCursorActionHandler(action, context);
			case "INVOKE_COMMAND":
				return new InvokeCommandActionHandler(action, context);
			default:
				throw new Error("unsupported action type " + actionType);
		}
	}
}
