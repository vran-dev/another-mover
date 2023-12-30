import { App, PluginSettingTab, Setting } from "obsidian";
import AnotherMoverPlugin from "../main";
import { operators } from "../operator/operator";
import { randomUUID } from "crypto";
import { Messages } from "src/i18/i18n";
import { Action, ActionType } from "src/action/action";
import { MoveCurrentFileActionSetting } from "src/action/setting/MoveCurrentFileActionSetting";
import { Condition, ConditionType } from "src/condition/condition";
import { Rule } from "src/rule/rule";
import TagSuggest from "src/suggest/tagSuggest";
import { actionSettings } from "src/action/setting/actionSetting";

export class AnotherMoverSettingTab extends PluginSettingTab {
	plugin: AnotherMoverPlugin;

	constructor(app: App, plugin: AnotherMoverPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.plugin.settings.rules.forEach((rule, index) => {
			this.addRuleSetting(rule, index + 1);
		});
		this.addNewRuleButtonSetting();
	}

	addRuleSetting(rule: Rule, index: number) {
		this.addBaseSetting(rule, index);
		this.addConditionsSetting(rule);
		this.addActionsSetting(rule);
		this.addRemoveRuleButtonSetting(rule);
	}

	addBaseSetting(rule: Rule, index: number) {
		const { containerEl } = this;
		const ruleNameHeaderEl = containerEl.createEl("h2", {
			text: rule.name || `Rule ${index}`,
		});
		const ruleNameSetting = new Setting(containerEl);

		ruleNameSetting
			.setName(Messages.setting_label_rule_name.get())
			.setDesc(Messages.setting_label_rule_name_desc.get())
			.addText((text) => {
				text.setPlaceholder("rule name")
					.setValue(rule.name)
					.onChange(async (value) => {
						rule.name = value;
						ruleNameHeaderEl.setText(value);
						this.refreshRegister(rule);
						await this.plugin.saveSettings();
					});
			});

		const ruleDescSetting = new Setting(containerEl);
		ruleDescSetting
			.setName(Messages.setting_label_rule_icon.get())
			.setDesc(Messages.setting_label_rule_icon_desc.get())
			.addText((text) => {
				text.setPlaceholder("Lucide Icon Name")
					.setValue(rule.icon)
					.onChange(async (value) => {
						rule.icon = value;
						this.refreshRegister(rule);
						await this.plugin.saveSettings();
					});
			});

		const ruleEnableSetting = new Setting(containerEl);

		ruleEnableSetting
			.setName(Messages.setting_label_rule_enable.get())
			.setDesc(Messages.setting_label_rule_enable_desc.get())
			.addToggle((toggle) =>
				toggle.setValue(rule.enabled).onChange(async (value) => {
					rule.enabled = value;
					this.refreshRegister(rule);
					await this.plugin.saveSettings();
				})
			);
	}

	addConditionsSetting(rule: Rule) {
		rule.conditions.forEach((condition, index) => {
			this.addConditionSetting(rule, condition, index);
		});
		this.addNewConditionButtonSetting(rule);
	}

	addConditionSetting(rule: Rule, condition: Condition, index: number) {
		const { containerEl } = this;

		const conditionSetting = new Setting(containerEl);
		if (index == 0) {
			conditionSetting.setName(
				Messages.setting_label_rule_if_current_file.get()
			);
		} else {
			conditionSetting.setName(Messages.setting_label_rule_and.get());
		}
		conditionSetting.addDropdown((dropdown) => {
			dropdown.addOption(
				"TAG",
				Messages.setting_label_rule_criteria_type_tag.get()
			);
			dropdown.addOption(
				"PROPERTY",
				Messages.setting_label_rule_criteria_type_property.get()
			);
			dropdown.setValue(condition.type || "TAG");
			dropdown.onChange(async (value) => {
				condition.type = value as ConditionType;
				this.refreshRegister(rule);
				await this.plugin.saveSettings();
				this.display();
			});
		});

		if (condition.type == "PROPERTY") {
			conditionSetting.addText((text) => {
				text.setPlaceholder("property name")
					.setValue(condition.property || "")
					.onChange(async (value) => {
						condition.property = value;
						this.refreshRegister(rule);
						await this.plugin.saveSettings();
					});
			});
		}
		conditionSetting.addDropdown((dropdown) => {
			operators
				.filter((op) =>
					op.scopes().contains(condition.type.toLowerCase())
				)
				.forEach((op) => {
					dropdown.addOption(op.id(), op.name());
				});

			dropdown.setValue(condition.operator || "");
			dropdown.onChange(async (value) => {
				condition.operator = value;
				this.refreshRegister(rule);
				await this.plugin.saveSettings();
			});
		});
		conditionSetting.addText((text) => {
			if (condition.type == "TAG") {
				new TagSuggest(this.app, text.inputEl);
			}
			text.setPlaceholder("value")
				.setValue(condition.value || "")
				.onChange(async (value) => {
					condition.value = value;
					this.refreshRegister(rule);
					await this.plugin.saveSettings();
				});
		});
		conditionSetting.addButton((button) => {
			button.setIcon("minus").onClick(async () => {
				rule.conditions = rule.conditions.filter(
					(c) => c.id != condition.id
				);
				this.refreshRegister(rule);
				await this.plugin.saveSettings();
				this.display();
			});
		});
	}

	addActionsSetting(rule: Rule) {
		rule.actions.forEach((action, index) => {
			this.addActionSetting(rule, action, index + 1);
		});
		this.addNewActionButtonSetting(rule);
	}

	addActionSetting(rule: Rule, action: Action, index: number) {
		const { containerEl } = this;
		const actionSetting = new Setting(containerEl);

		actionSetting
			.setName(Messages.setting_label_rule_then.get())
			.addDropdown((dropdown) => {
				actionSettings.forEach((action) => {
					dropdown.addOption(action.type, action.name());
				});

				dropdown.setValue(action.type || "MOVE_CURRENT_FILE");
				dropdown.onChange(async (value) => {
					action.type = value as ActionType;
					action.args = {
						...actionSettings.find((s) => s.type == action.type)?.args,
						...action.args
					}
					this.refreshRegister(rule);
					await this.plugin.saveSettings();
					this.display();
				});
			});

		actionSettings
			.find((s) => s.type == action.type)
			?.renderSettings(
				actionSetting,
				action,
				rule,
				this.app,
				() => {},
				async () => {
					this.refreshRegister(rule);
					await this.plugin.saveSettings();
				}
			);

		actionSetting.addButton((button) => {
			// remove button
			button.setIcon("minus").onClick(async () => {
				rule.actions = rule.actions.filter((a) => a.id != action.id);
				this.refreshRegister(rule);
				await this.plugin.saveSettings();
				this.display();
			});
		});
	}

	addNewConditionButtonSetting(rule: Rule) {
		const { containerEl } = this;
		const addConditionSetting = new Setting(containerEl);
		addConditionSetting.addButton((button) => {
			button
				.setIcon("plus")
				.setButtonText(Messages.setting_label_rule_condition_add.get())
				.onClick(async () => {
					const condition = new Condition();
					rule.conditions.push(condition);
					this.refreshRegister(rule);
					await this.plugin.saveSettings();
					this.display();
				});
		});
	}

	addNewActionButtonSetting(rule: Rule) {
		const { containerEl } = this;
		const addActionSetting = new Setting(containerEl);
		addActionSetting.addButton((button) => {
			button
				.setIcon("plus")
				.setButtonText(Messages.setting_label_rule_action_add.get())
				.onClick(async () => {
					const action = new MoveCurrentFileActionSetting();
					rule.actions.push(action);
					this.refreshRegister(rule);
					await this.plugin.saveSettings();
					this.display();
				});
		});
	}

	addRemoveRuleButtonSetting(rule: Rule) {
		const { containerEl } = this;
		const removeRuleSetting = new Setting(containerEl);
		removeRuleSetting.addButton((button) => {
			button
				.setButtonText("Remove")
				.setIcon("trash")
				.setTooltip(Messages.setting_label_rule_remove_desc.get())
				.onClick(async () => {
					this.plugin.settings.rules =
						this.plugin.settings.rules.filter((r) => r != rule);
					this.unregisterRule(rule);
					await this.plugin.saveSettings();
					this.display();
				});
		});
	}

	addNewRuleButtonSetting() {
		const { containerEl } = this;
		containerEl.createEl("h2", { text: "Create New Rule" });

		const setting = new Setting(containerEl);
		setting.setName(Messages.setting_label_rule_create.get());
		setting.setDesc(Messages.setting_label_rule_create_desc.get());
		setting.addButton((button) => {
			button
				.setButtonText("New")
				.setIcon("plus")
				.onClick(async () => {
					const rule = new Rule(randomUUID());
					this.plugin.settings.rules.push(rule);

					this.refreshRegister(rule);
					await this.plugin.saveSettings();
					this.display();
				});
		});
	}

	refreshRegister(rule: Rule) {
		this.unregisterRule(rule);
		if (rule.enabled) {
			this.plugin.registerRuleAsCommand(rule);
			this.plugin.registerRuleAsContextMenu(rule);
		}
	}

	unregisterRule(rule: Rule) {
		this.plugin.removeCommand(rule.id);
		this.plugin.removeContextMenu(rule);
	}
}
