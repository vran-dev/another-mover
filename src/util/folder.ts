import { App, TFile, TFolder } from "obsidian";

export function loadAllFiles(folder: TFolder, files: TFile[]) {
	for (const file of folder.children) {
		if (file instanceof TFile) {
			files.push(file);
		} else if (file instanceof TFolder) {
			loadAllFiles(file, files);
		}
	}
}

export async function createFolderIfNotExists(
	app: App,
	path: string
): Promise<TFolder> {
	const fileBasedOnPath = app.vault.getAbstractFileByPath(path);
	if (fileBasedOnPath && fileBasedOnPath instanceof TFolder) {
		return fileBasedOnPath;
	} else {
		return await app.vault.createFolder(path);
	}
}

export function getParentPath(path: string) {
	if (path == "" || path == "/") {
		return "";
	}

	const index = path.lastIndexOf("/");
	if (index == -1) {
		return "";
	}
	return path.substring(0, index);
}
