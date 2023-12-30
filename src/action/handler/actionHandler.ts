import { RunningContext } from "src/rule/simpler";
import { Action, ActionType } from "../action";

export abstract class ActionHandler {
	constructor(
		public action: Action,
		public context: RunningContext
	) {}

	abstract execute(): Promise<void>;

	abstract supportType(actionType: ActionType): boolean;
}
