/**
 * thanks to https://github.com/SilentVoid13/Templater
 * https://github.com/SilentVoid13/Templater/blob/master/src/settings/suggesters/FolderSuggester.ts
 */
import { TAbstractFile, TFolder } from "obsidian";
import InputSuggest from "./inputSuggest";

export default class FolderSuggest extends InputSuggest<TFolder> {
	getSuggestions(inputStr: string): TFolder[] {
		const abstractFiles = this.app.vault.getAllLoadedFiles();
		const folders: TFolder[] = [];
		const lowerCaseInputStr = inputStr.toLowerCase();

		abstractFiles.forEach((folder: TAbstractFile) => {
			if (
				folder instanceof TFolder &&
				folder.path.toLowerCase().contains(lowerCaseInputStr)
			) {
				folders.push(folder);
			}
		});

		return folders;
	}

	renderSuggestion(file: TFolder, el: HTMLElement): void {
		el.setText(file.path);
	}

	selectSuggestion(file: TFolder): void {
		this.inputEl.value = file.path;
		this.inputEl.trigger("input");
		this.close();
	}
}
