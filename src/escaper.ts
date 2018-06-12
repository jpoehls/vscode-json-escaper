import * as vscode from 'vscode';

export enum MODE {
    EscapeJsonString,
    UnescapeJsonString,
}

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

        // NOTE: We don't use JSON.parse('"' + text + '"") or similar
        //       because we want to support input that may not be valid JSON.
    
        // Holds the unescaped string as we build it.
        let plain = '';
    
        // Use a string iterator over code points for proper unicode support.
        const iter = text[Symbol.iterator]();
    
        let cur: IteratorResult<string>;
        while (!(cur = iter.next()).done) {
            if (cur.value === '\\') {
                cur = iter.next();
                if (cur.done) {
                    plain += '\\';
                    break;
                }
                else if (cur.value === '"') {
                    plain += '"';
                }
                else if (cur.value === '\\') {
                    plain += '\\';
                }
                else if (cur.value === '/') {
                    plain += '/';
                }
                else if (cur.value === 'b') {
                    plain += '\b';
                }
                else if (cur.value === 'f') {
                    plain += '\f';
                }
                else if (cur.value === 'n') {
                    plain += '\n';
                }
                else if (cur.value === 'r') {
                    plain += '\r';
                }
                else if (cur.value === 't') {
                    plain += '\t';
                }
                else if (cur.value === 'u') {
                    const one = iter.next();
                    if (one.done) {
                        plain += '\\u';
                    }
                    else if (!this.isHexDigit(one.value)) {
                        plain += '\\u' + one.value;
                    }
                    else {
                        const two = iter.next();
                        if (two.done) {
                            plain += '\\u' + one.value;
                        }
                        else if (!this.isHexDigit(two.value)) {
                            plain += '\\u' + one.value + two.value;
                        }
                        else {
                            const three = iter.next();
                            if (three.done) {
                                plain += '\\u' + one.value + two.value;
                            }
                            else if (!this.isHexDigit(three.value)) {
                                plain += '\\u' + one.value + two.value + three.value;
                            }
                            else {
                                const four = iter.next();
                                if (four.done) {
                                    plain += '\\u' + one.value + two.value + three.value;
                                }
                                else if (!this.isHexDigit(four.value)) {
                                    plain += '\\u' + one.value + two.value + three.value + four.value;
                                }
                                else {
                                    try {
                                        plain += JSON.parse('"\\u' + one.value + two.value + three.value + four.value + '"');
                                    }
                                    catch {
                                        // Something went wrong even though it looked like a valid hex value.
                                        plain += '\\u' + one.value + two.value + three.value + four.value;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    plain += cur.value;
                }
            }
            else {
                plain += cur.value;
            }
        }
    
        return plain;
    }

    private isHexDigit(char: string): boolean {
        return char === '0' ||
               char === '1' ||
               char === '2' ||
               char === '3' ||
               char === '4' ||
               char === '5' ||
               char === '6' ||
               char === '7' ||
               char === '8' ||
               char === '9' ||
               char === 'A' ||
               char === 'B' ||
               char === 'C' ||
               char === 'D' ||
               char === 'E' ||
               char === 'F' ||
               char === 'a' ||
               char === 'b' ||
               char === 'c' ||
               char === 'd' ||
               char === 'e' ||
               char === 'f';
    }

    dispose() { }
}