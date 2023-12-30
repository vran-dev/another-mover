import { TAbstractFile, TFile, getAllTags } from "obsidian";
import InputSuggest from "./inputSuggest";

export default class TagSuggest extends InputSuggest<string> {
	getSuggestions(inputStr: string): string[] {
		const abstractFiles = this.app.vault.getAllLoadedFiles();
		const tags: string[] = [];
		const lowerCaseInputStr = inputStr.toLowerCase();
		abstractFiles.forEach((file: TAbstractFile) => {
			if (file instanceof TFile) {
				const cache = this.app.metadataCache.getCache(file.path);
				if (cache) {
					const fileTags = getAllTags(cache);
					fileTags?.forEach((tag) => {
						if (
							tag.toLowerCase().contains(lowerCaseInputStr) &&
							!tags.includes(tag)
						) {
							tags.push(tag);
						}
					});
				}
			}
		});
		return tags;
	}

	renderSuggestion(tag: string, el: HTMLElement): void {
		el.setText(tag);
	}

	selectSuggestion(tag: string): void {
		this.inputEl.value = tag.substring(1);
		this.inputEl.trigger("input");
		this.close();
	}
}
