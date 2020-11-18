import * as vscode from 'vscode';

const COMMANDS: {[key: string]: () => string | undefined} = {
	"unwsl.workspaceFolder": transformWorkspaceFolder
};

export function transformWorkspaceFolder(): string | undefined {
	let folders = vscode.workspace.workspaceFolders;
	if (folders !== undefined) {
		let workspace = folders[0].uri.fsPath;
		if (isWSL()) {
			return transformWSLPath(workspace);
		}
		return workspace;
	}
	return undefined;
}

export function transformWSLPath(wslPath: string): string | undefined {
	let wslMountSearch = wslPath.match(/^\/mnt\/([a-z])(\/.*)?$/);
	if (wslMountSearch !== null) {
		let drive = wslMountSearch[1];
		let path = wslMountSearch[2] ?? "";
		return (drive.toUpperCase() + ":" + path).replace(/\//g, "\\");
	}
	return wslPath;
}

export function isWSL(): boolean {
	let remoteName = vscode.env.remoteName;
	return remoteName !== undefined && remoteName.toLowerCase() === "wsl";
}

export function activate(context: vscode.ExtensionContext) {
	for (const command in COMMANDS) {
		let disposable = vscode.commands.registerCommand(command, COMMANDS[command]);
		context.subscriptions.push(disposable);
	}
}