export class Message {
	zh: string;
	default: string;

	constructor(zh: string, defaultStr: string) {
		this.zh = zh;
		this.default = defaultStr;
	}

	get(): string {
		const lang = window.localStorage.getItem("language");
		if (lang === "zh") {
			return this.zh;
		}
		return this.default;
	}
}

export const Messages = {
	/**
	 * setting / criteria-type-option
	 */
	setting_label_rule_criteria_type_tag: new Message("标签", "tag"),
	setting_label_rule_criteria_type_property: new Message("属性", "property"),

	/**
	 * setting / action-type-option
	 */
	setting_label_rule_action_type_move_current_file: new Message(
		"移动当前文件",
		"move current file"
	),
	setting_label_rule_action_type_move_current_folder: new Message(
		"移动当前文件夹",
		"move current folder"
	),
	setting_label_rule_action_type_move_matched_files_in_subfolder: new Message(
		"移动子文件夹中的匹配文件",
		"move matched files in subfolder"
	),
	setting_label_rule_action_type_update_property: new Message(
		"更新属性",
		"update property value"
	),

	setting_label_rule_action_type_insert_content_at_cursor: new Message(
		"在光标处插入内容",
		"insert content at cursor"
	),
	setting_label_rule_action_type_invoke_command: new Message(
		"执行命令",
		"execute command"
	),

	/**
	 * setting / target-folder
	 */
	setting_label_rule_target_folder_path: new Message(
		"目标目录",
		"To Target Folder"
	),
	setting_label_rule_target_folder_path_desc: new Message(
		"您可以使用 ${property.propertyName} 来引用属性值, 例如 archive/${property.title}",
		"you can use ${property.propertyName} to reference property value, e.g. archive/${property.title}"
	),

	/**
	 * setting / setting_name
	 */
	setting_label_rule_name: new Message("规则名称", "Rule Name"),
	setting_label_rule_name_desc: new Message(
		"该名称会展示在右键菜单和命令面板中",
		"this name will be shown in context menu and command palette"
	),

	setting_label_rule_icon: new Message("图标", "Icon"),
	setting_label_rule_icon_desc: new Message(
		"该图标会展示在右键菜单中，请从 https://lucide.dev/icons 获取图标名称",
		"this icon will be shown in context menu, see more at https://lucide.dev/icons"
	),

	setting_label_rule_enable: new Message("启用", "Enable"),
	setting_label_rule_enable_desc: new Message(
		"是否启用该规则",
		"Enable this rule"
	),

	setting_label_rule_if_current_file: new Message(
		"如果当前文件",
		"If current file's"
	),

	setting_label_rule_and: new Message("并且", "And"),
	setting_label_rule_then: new Message("就", "Then"),
	setting_label_rule_remove: new Message("删除规则", "Delete Rule"),
	setting_label_rule_remove_desc: new Message(
		"删除该规则，该操作不可撤销",
		"Delete this rule"
	),
	setting_label_rule_create: new Message("新增规则", "New Rule"),
	setting_label_rule_create_desc: new Message(
		"新增一条文件移动规则",
		"New Rule"
	),

	setting_label_rule_condition_add: new Message("新增条件", "New Condition"),
	setting_label_rule_action_add: new Message("新增动作", "New Action"),

	/**
	 * settings / operator
	 */
	operator_equals: new Message("等于", "equals"),
	operator_not_equals: new Message("不等于", "not equals"),
	operator_greater_than: new Message("大于", "greater than"),
	operator_less_than: new Message("小于", "less than"),
	operator_greater_than_or_equal: new Message(
		"大于等于",
		"greater than or equal"
	),
	operator_less_than_or_equal: new Message("小于等于", "less than or equal"),
	operator_contains: new Message("包含", "contains"),
	operator_not_contains: new Message("不包含", "not contains"),
	operator_regex_match: new Message("正则匹配", "regex match"),
};
