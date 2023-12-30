import { ActionHandler } from "./actionHandler";
import { MarkdownView } from "obsidian";
import DefaultVariableHandler, {
	VariableContext,
} from "../../variable/variableHandler";
import { ActionType } from "../action";

export default class InsertContentAtCursorActionHandler extends ActionHandler {
	supportType(actionType: ActionType): boolean {
		return actionType == "MOVE_CURRENT_FILE";
	}

	async execute(): Promise<void> {
		const markdownView =
			this.context.app.workspace.getActiveViewOfType(MarkdownView);
		if (!markdownView) {
			return;
		}
		const editor = markdownView.editor;
		const content = this.action.args.content;
		if (!content) {
			return;
		}
		const newContent = DefaultVariableHandler.handle(
			content?.toString(),
			this.context.app,
			this.context.file
		);
		content.toString(),
			VariableContext.fromFile(this.context.app, this.context.file);
		editor.replaceSelection(newContent);
	}
}
