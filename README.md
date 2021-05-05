# JSON Escaper - an extension for Visual Studio Code

This is an extension for [Visual Studio Code] that adds commands for escaping and unescaping JSON strings.

Marketplace: [https://marketplace.visualstudio.com/items?itemName=joshuapoehls.json-escaper](https://marketplace.visualstudio.com/items?itemName=joshuapoehls.json-escaper)

## Change Log

All notable changes to this extension are documented below.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

### 1.1.1
- Added icon.
- Updated devDependencies and minimum VS Code version to 1.34.0.

### 1.1.0
- Added support for hexadecimal unicode sequences. E.g., `\u0022`.
- Fixed bugs that would cause incorrect output when unescaping strings that contained escaped backslashes. E.g., `\\t`.

### 1.0.0
- Initial release

## MIT License

Copyright 2017-2018 Joshua Poehls

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Thanks

The initial implementation was basically a fork of [https://github.com/drphrozen/vscode-escaping-characters](https://github.com/drphrozen/vscode-escaping-characters). Many thanks to that project for making my job easier.

[Visual Studio Code]: https://code.visualstudio.com