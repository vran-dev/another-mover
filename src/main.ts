import { EventRef, Plugin } from "obsidian";
import { Simpler } from "./rule/simpler";
import { AnotherMoverSettingTab } from "./setting/settingTab";
import { Rule } from "./rule/rule";
import { RunnerSetting, DEFAULT_SETTINGS } from "./setting/settingTypes";

export default class AnotherMoverPlugin extends Plugin {
	settings: RunnerSetting;

	editorMenuEventRefMap: Map<string, EventRef> = new Map();

	async onload() {
		await this.loadSettings();
		this.registerSettingTag();
		this.registerRulesAsContextMenus();
		this.registerRulesAsCommand();
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	registerRulesAsCommand() {
		this.settings.rules
			.filter((r) => r.enabled)
			.forEach((rule) => {
				this.registerRuleAsCommand(rule);
			});
	}

	registerRulesAsContextMenus() {
		this.settings.rules
			.filter((r) => r.enabled)
			.forEach((rule) => {
				this.registerRuleAsContextMenu(rule);
			});
	}

	registerRuleAsContextMenu(rule: Rule) {
		const eventRef = this.app.workspace.on(
			"editor-menu",
			(menu, editor, info) => {
				menu.addItem((item) => {
					item.setTitle(rule.name);
					item.setIcon(rule.icon);
					item.onClick(() => {
						if (info.file) {
							const mover = new Simpler(this.app, info.file, rule);
							mover.run();
						}
					});
				});
			}
		);
		this.editorMenuEventRefMap.set(rule.id, eventRef);
		this.registerEvent(eventRef);
	}

	removeContextMenu(rule: Rule) {
		const eventRef = this.editorMenuEventRefMap.get(rule.id);
		if (eventRef) {
			this.editorMenuEventRefMap.delete(rule.id);
			this.app.workspace.offref(eventRef);
		}
	}

	registerSettingTag() {
		this.addSettingTab(new AnotherMoverSettingTab(this.app, this));
	}

	registerRuleAsCommand(rule: Rule) {
		if (rule.enabled) {
			this.addCommand({
				id: rule.id,
				name: rule.name,
				editorCallback: (editor, view) => {
					if (view.file) {
						const mover = new Simpler(this.app, view.file, rule);
						mover.run();
					}
				},
			});
		}
	}

	removeCommand(ruleId: string) {
		// @ts-ignore
		this.app.commands.removeCommand(`${this.manifest.id}:${ruleId}`);
	}
}
