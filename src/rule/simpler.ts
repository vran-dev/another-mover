import { App, TFile, Notice } from "obsidian";
import ActionHandlerFactory from "../action/handler/actionHandlerFactory";
import { ConditionMatchers } from "../condition/conditionMatchers";
import { Rule } from "./rule";

export class RunningContext {
	app: App;
	file: TFile;
	rule: Rule;

	constructor(app: App, file: TFile, rule: Rule) {
		this.app = app;
		this.file = file;
		this.rule = rule;
	}
}

export class Simpler {
	context: RunningContext;

	constructor(app: App, file: TFile, rule: Rule) {
		this.context = new RunningContext(app, file, rule);
	}

	async run() {
		if (
			!ConditionMatchers.match(
				this.context.app,
				this.context.rule,
				this.context.file
			)
		) {
			new Notice("Condition not match, skip this runner");
			return;
		}

		for (const action of this.context.rule.actions) {
			console.log("invoke action ", action, this.context.file.path);
			try {
				const invoker = ActionHandlerFactory.create(
					action.type,
					action,
					this.context
				);
				await invoker.execute();
			} catch (e) {
				new Notice(
					`unknown actionType ${action.type}, maybe you need to update plugin`
				);
				return;
			}
		}
	}
}
