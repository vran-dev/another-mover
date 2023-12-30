import { Notice, TFile, TFolder, normalizePath } from "obsidian";
import {
	loadAllFiles,
	createFolderIfNotExists,
	getParentPath,
} from "src/util/folder";
import { ActionHandler } from "./actionHandler";
import { ActionType } from "../action";
import DefaultVariableHandler from "src/variable/variableHandler";

export default class MoveCurrentFolderActionHandler extends ActionHandler {
	supportType(actionType: ActionType): boolean {
		return actionType == "MOVE_CURRENT_FOLDER";
	}

	async execute() {
		// get all files at current folder
		const currentFileFolder = this.getCurrentFolder(this.context.file);
		if (currentFileFolder == null) {
			new Notice("Move Failed, Can't get current file's parent folder");
			return;
		}
		const allFilesAtCurrentFolder: TFile[] = [];
		loadAllFiles(currentFileFolder, allFilesAtCurrentFolder);

		// create target folder if not exists
		const normalizedTargetFolder = DefaultVariableHandler.handle(
			this.action.args.targetFolder?.toString(),
			this.context.app,
			this.context.file
		);
		if (this.context.file.path.startsWith(normalizedTargetFolder)) {
			new Notice("ignored, file already in target folder");
			return;
		}
		const targetFolder = (await createFolderIfNotExists(
			this.context.app,
			normalizedTargetFolder
		)) as TFolder;

		// move all files to target folder
		const originalFolderName = currentFileFolder.name;
		const originalFolderPath = currentFileFolder.path;
		for (const file of allFilesAtCurrentFolder) {
			// move file from ${file.path} to ${newNormalizedPath}
			const relativePath = file.path.substring(
				originalFolderPath.length - originalFolderName.length
			);
			const newPath = `${targetFolder.path}/${relativePath}`;
			const newNormalizedPath = normalizePath(newPath);
			try {
				await createFolderIfNotExists(
					this.context.app,
					getParentPath(newNormalizedPath)
				);
				await this.context.app.fileManager.renameFile(
					file,
					newNormalizedPath
				);
				if (file.path == this.context.file.path) {
					const newFile =
						this.context.app.vault.getAbstractFileByPath(
							newNormalizedPath
						);
					if (!newFile || !(newFile instanceof TFile)) {
						throw new Error(
							`Failed to get file by path ${newNormalizedPath}`
						);
					}
					this.context.file = newFile;
				}
			} catch (e) {
				new Notice("Move file failed, please check console log");
				console.error(e);
				return;
			}
		}

		// after all files are moved, delete the original folder
		const folderFiles: TFile[] = [];
		loadAllFiles(currentFileFolder, folderFiles);
		if (folderFiles.length == 0) {
			await this.context.app.vault.adapter.rmdir(
				normalizePath(currentFileFolder.path),
				true
			);
		} else {
			new Notice("Can't remove original folder because it's not empty");
			console.error(
				"folder is not empty, cannot remove, check file",
				folderFiles
			);
		}
	}

	getCurrentFolder(file: TFile) {
		const parent = file.parent;
		if (parent) {
			return parent;
		} else {
			return null;
		}
	}
}
