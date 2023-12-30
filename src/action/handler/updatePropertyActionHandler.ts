import { Notice } from "obsidian";
import { ActionHandler } from "./actionHandler";
import { ActionType } from "../action";
import DefaultVariableHandler, { VariableContext } from "../../variable/variableHandler";

export default class UpdatePropertyActionHandler extends ActionHandler {
	supportType(actionType: ActionType): boolean {
		return actionType == "UPDATE_PROPERTY";
	}

	async execute() {
		const property = this.action.args.property?.toString();
		const value = this.action.args.value?.toString();
		const fileCache = this.context.app.metadataCache.getFileCache(
			this.context.file
		);
		if (!fileCache) {
			new Notice("Failed to update property, file cache not found");
			return;
		}
		if (!fileCache.frontmatter) {
			new Notice("Failed to update property, frontmatter not found");
			return;
		}

		// normalize property
		let normalizedValue = value;
		if (typeof property == "string") {
			normalizedValue = DefaultVariableHandler.handle(value, this.context.app, this.context.file);
		}

		// update property
		fileCache.frontmatter[property] = normalizedValue;
		await this.context.app.fileManager.processFrontMatter(
			this.context.file,
			(frontmatter) => {
				frontmatter[property] = normalizedValue;
			}
		);
	}
}
