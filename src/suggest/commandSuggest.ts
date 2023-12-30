import { Command } from "obsidian";
import InputSuggest from "./inputSuggest";

export default class CommandSuggest extends InputSuggest<Command> {
	getSuggestions(inputStr: string): Command[] {
    /**
     * commands is a object, key is command id, value is command
     */
		// @ts-ignore
    const commands = this.app.commands.commands;
		const lowerCaseInputStr = inputStr.toLowerCase();

		const matchedCommands: Command[] = [];
		for (const key in commands) {
			if (key.toLocaleLowerCase().contains(lowerCaseInputStr)) {
				const element = commands[key];
				matchedCommands.push(element);
			}
		}
		return matchedCommands;
	}

	renderSuggestion(command: Command, el: HTMLElement): void {
		el.setText(command.name);
	}

	selectSuggestion(command: Command): void {
		this.inputEl.value = command.name;
		this.inputEl.setAttr("command-id", command.id)
		this.inputEl.trigger("input");
		this.close();
	}
}
