import { DateTime } from "luxon";
import { App, TFile } from "obsidian";

export class VariableContext {
	[key: string]: any;

	static fromFile(app: App, file: TFile): VariableContext {
		const context = new VariableContext();
		// for security reason, we don't expose app to variable handler
		// context.app = app;
		context.file = file;
		context.datetime = DateTime;
		// date context
		context.now = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
		context.nowIso = DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm:ss");
		context.today = DateTime.now().toFormat("yyyy-MM-dd");
		context.tomorrow = DateTime.now()
			.plus({ days: 1 })
			.toFormat("yyyy-MM-dd");
		context.yesterday = DateTime.now()
			.minus({ days: 1 })
			.toFormat("yyyy-MM-dd");

		// frontmatter
		const metadata = app.metadataCache.getFileCache(file);
		if (metadata) {
			context.frontmatter = metadata.frontmatter;
		} else {
			context.frontmatter = {};
		}
		return context;
	}
}

export default class DefaultVariableHandler {
	constructor() {}

	static handle(input: string, app: App, file: TFile): string {
		if (input == null || input.trim() == "") return input;

		// eslint-disable-next-line
		const context = VariableContext.fromFile(app, file);
		const placeholderRegex = /\${(.*?)}/g;
		const replacedText = input.replace(
			placeholderRegex,
			(_, placeholder) => {
				const value = eval(`context.${placeholder.trim()}`);
				return value !== undefined ? String(value) : placeholder;
			}
		);
		return replacedText;
	}
}
