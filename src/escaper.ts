import * as vscode from 'vscode';

export enum MODE {
    EscapeJsonString,
    UnescapeJsonString,
}

const RX_BACKSPACE = /\\b/g;
const RX_FORM_FEED = /\\f/g;
const RX_NEWLINE = /\\n/g;
const RX_CARRIAGE_RETURN = /\\r/g;
const RX_TAB = /\\t/g;
const RX_DOUBLE_QUOTE = /\\"/g;
const RX_BACKSLASH = /\\\\/g;

interface IProcessor {
    (text: string): string;
}

export class Escaper {

    private _statusBarItem: vscode.StatusBarItem;

    public process = (editor: vscode.TextEditor, mode: MODE) => {
        // Process entire document if user haven't selected a text block manually
        let selection = (() => {
            if (editor.selection.end.isAfter(editor.selection.start)) {
                return editor.selection;
            } else {
                let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                return new vscode.Selection(
                    new vscode.Position(0, 0),
                    new vscode.Position(
                        lastLine.lineNumber,
                        lastLine.text.length
                    )
                );
            }
        })();

        editor.edit((builder) => {
            builder.replace(selection, this.processText(mode, editor.document.getText(selection)));
        });
    }

    public processText(mode: MODE, text: string): string {
        switch (mode) {
            case MODE.EscapeJsonString: return this.escapeJsonString(text);
            case MODE.UnescapeJsonString: return this.unescapeJsonString(text);
        }
    }

    public escapeJsonString(text: string): string {
        text = JSON.stringify(text);
        return text.substring(1, text.length - 1);
    }

    public unescapeJsonString(text: string): string {
        text = text.replace(RX_BACKSPACE, "\b");
        text = text.replace(RX_FORM_FEED, "\f");
        text = text.replace(RX_NEWLINE, "\n");
        text = text.replace(RX_CARRIAGE_RETURN, "\r");
        text = text.replace(RX_TAB, "\t");
        text = text.replace(RX_DOUBLE_QUOTE, "\"");
        text = text.replace(RX_BACKSLASH, "\\");
        return text;
    }

    dispose() { }
}