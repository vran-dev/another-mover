import { Action } from "src/action/action";
import { MoveCurrentFolderActionSetting } from "src/action/setting/MoveCurrentFolderActionSetting";
import { Condition } from "src/condition/condition";

export class Rule {
	id: string;
	icon: string;
	name: string;
	enabled: boolean;
	conditions: Condition[];
	actions: Action[];

	constructor(id: string) {
		this.id = id;
		this.name = "mover";
		this.icon = "move-down-right";
		this.enabled = true;
		this.conditions = [new Condition()];
		this.actions = [new MoveCurrentFolderActionSetting()];
	}
}
