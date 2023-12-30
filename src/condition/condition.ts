import { randomUUID } from "crypto";

export class Condition {
	id: string;
	type: ConditionType;
	value: string;
	operator?: string;
	property?: string;

	constructor() {
		this.id = randomUUID();
		this.type = "TAG";
		this.value = "";
		this.operator = "contains";
		this.property = "";
	}
}

export class AndCondition {
	id: string;
	conditions: Condition[];

	constructor() {
		this.id = randomUUID();
		this.conditions = [];
	}

}

export class OrCondition {
	id: string;
	conditions: Condition[];

	constructor() {
		this.id = randomUUID();
		this.conditions = [];
	}
}

export type ConditionType = "TAG" | "PROPERTY" | "FILE_PATH";