import { TFolder, normalizePath, TFile, Notice } from "obsidian";
import { createFolderIfNotExists } from "src/util/folder";
import { ActionHandler } from "./actionHandler";
import { ActionType } from "../action";
import DefaultVariableHandler from "src/variable/variableHandler";

export default class MoveCurrentFileActionHandler extends ActionHandler {
	supportType(actionType: ActionType): boolean {
		return actionType == "MOVE_CURRENT_FILE";
	}

	async execute() {
		const normalizedTargetFolder = DefaultVariableHandler.handle(
			this.action.args.targetFolder?.toString(),
			this.context.app,
			this.context.file
		);
		const targetFolder = (await createFolderIfNotExists(
			this.context.app,
			normalizedTargetFolder
		)) as TFolder;
		const currentFileName = this.context.file.name;
		const targetFilePath = normalizePath(
			`${targetFolder.path}/${currentFileName}`
		);
		try {
			await this.context.app.fileManager.renameFile(
				this.context.file,
				targetFilePath
			);
			const newFile =
				this.context.app.vault.getAbstractFileByPath(targetFilePath);
			if (!newFile || !(newFile instanceof TFile)) {
				throw new Error(`Failed to get file by path ${targetFilePath}`);
			}
			this.context.file = newFile;
		} catch (e) {
			new Notice("Move file failed, please check console log");
			console.error(e);
		}
	}
}
