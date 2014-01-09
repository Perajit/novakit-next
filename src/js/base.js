function Base() {
};

Base.isFocus = function(element) {
	return $(element).hasClass("etk-focused");
};

Base.setFocusIn = function(element) {
	if (element.disabled || element.style.visibility === "hidden") {
		return;
	}
	
	if (element.focus) {
		element.focus();
	}
	
	Base.resetFocus();
	$(element).addClass("etk-focused");
};

Base.setFocusOut = function(element) {
	if (element.blur) {
		element.blur();
	}
	
	$(element).removeClass("etk-focused");
};

Base.resetFocus = function() {
	Base.setFocusOut(".etk-focused");
};

Base.handleFocusOut = function() {
	$(document)
		.on("click.etkFocusOut", function(event) {
			Base.resetFocus();
		});
};

Base.handleFocusOut();