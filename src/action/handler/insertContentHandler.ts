import { ActionHandler } from "./actionHandler";
import { App, Editor, MarkdownView, TFile } from "obsidian";
import DefaultVariableHandler, {
	VariableContext,
} from "../../variable/variableHandler";
import { ActionType } from "../action";

export default class InsertContentActionHandler extends ActionHandler {
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

		switch (this.action.args.position) {
			case "atCursor":
				this.insertAtCursort(newContent, editor);
				break;
			case "fileEnd":
				this.insertAtFileEnd(newContent, this.context.file, this.context.app);
				break;
			case "fileStart":
				this.insertAtFileStart(newContent, editor);
				break;
		}
	}

	insertAtCursort(content: string, editor: Editor) {
		editor.replaceSelection(content);
	}

	insertAtFileEnd(content: string, file: TFile, app: App) {

		this.context.app.vault.append(file, `\n${content}`, {
			mtime: new Date().getTime()
		})
	}

	insertAtFileStart(content: string, editor: Editor) {
		const currentfile = this.context.file;
		const metacache =
			this.context.app.metadataCache.getFileCache(currentfile);
		if (metacache) {
			if (metacache.frontmatterPosition) {
				const nextLine = metacache.frontmatterPosition.end.line + 1;
				editor.replaceRange(content, {
					line: nextLine,
					ch: 0,
				});
			} else {
				editor.replaceRange(content, { line: 0, ch: 0 });
			}
		} else {
			editor.replaceRange(content, { line: 0, ch: 0 });
			console.warn(
				"load file meta cache failed, can't determine the frontmatter's position, path is " +
					currentfile.path
			);
		}
	}
}
