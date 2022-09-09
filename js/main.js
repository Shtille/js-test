var editor = null;
var outputText = '';

// hijack JavaScript log functions
(function(){
	var oldLog = console.log;
	console.log = function(msg) {
		for (let i = 0; i < arguments.length; ++i){
			outputText += arguments[i].toString();
		}
		outputText += '\n';
		oldLog.apply(console, arguments);
	};
})();

function updateOutput() {
	document.getElementById('output').innerText = outputText;
}

function initEditor() {
	editor = ace.edit("editor");
	let JavaScriptMode = ace.require("ace/mode/javascript").Mode;
	editor.session.setMode(new JavaScriptMode());
}

function executeCode(text) {
	let code = new Function(text);
	code.apply(null);
}

function onClickRunBtn(event) {
	let text = editor.getValue();
	outputText = '';
	executeCode(text);
	updateOutput();
}

function onLoad() {
	initEditor();
	// Focus to the text area
	document.getElementById('editor').querySelector('textarea').focus();
}
function onDestroy() {
	editor.destroy();
	editor.container.remove();
}
function onError(e) {
	outputText += e.toString();
	updateOutput();
}

window.onload = onLoad;
window.onbeforeunload = onDestroy;
window.onerror = onError;