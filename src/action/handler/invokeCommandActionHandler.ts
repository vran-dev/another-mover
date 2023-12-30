import { ActionType } from "../action";
import { ActionHandler } from "./actionHandler";

export default class InvokeCommandActionHandler extends ActionHandler {
	supportType(actionType: ActionType) {
		return actionType == "INVOKE_COMMAND";
	}
	async execute() {
		const commandId = this.action.args.commandId;
		if (!commandId) {
			return;
		}
    // @ts-ignore
		await this.context.app.commands.executeCommandById(commandId);
	}
}
