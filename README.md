# unwsl README

When using VSCode with a remote WSL connection, certain variables, like ${workspaceFolder}, that are used within
configuration files are formatted for use within WSL contexts -- "C:/foo" becomes "/mnt/c/foo", for example.

However, these paths aren't necessarily always used within WSL; launching Chrome as part of a debug task, for example,
by default will launch it as a Windows process, and therefore it can't open file URLs formatted for WSL.

This extension is a shorthand for undoing such WSL-centric paths back to a Windows-friendly format.

## Features

Provides a command hook for configuration files that respect ${command:*} variable substitutions for...
- workspaceFolder

All contributions simply check for "/mnt/(drive)/*" and remap such variables as "(DRIVE):/*" if vscode
is running with a WSL context.

HOWEVER, if WSL is not used, then the variable in question is untouched; UNWSL behaves as an identity function.

## Release Notes

### 1.0.0

Initial release of UNWSL