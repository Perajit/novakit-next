function Base() {
};

Base.isFocus = function(element) {
	return $(element).hasClass("etk-focused");
};

Base.setFocusIn = function(element) {
	Base.resetFocus();
	$(element).addClass("etk-focused");
};

Base.setFocusInOut = function(element) {
	$(element).removeClass("etk-focused");
};

Base.resetFocus = function() {
	Base.setFocusInOut(".etk-focused");
};

Base.handleFocusOut = function() {
	$(document)
		.on("click.etkFocusOut", function(event) {
			Base.resetFocus();
		});
};

Base.handleFocusOut();

/*Base.autoFocusState = function(selector) {
	var focusout = function() {
		$(".etk-focused").removeClass("etk-focused");
	};
	
	$(document)
		.on("click.focusout", function(event) {
			focusout();
		})
		.delegate(selector, "click.focus", function(event) {
			if (this.tagName.toLowerCase() !== "label") {
				focusout();
				$(this).addClass("etk-focused");
			}
			event.stopPropagation();
		});
};

Base.autoFocusState(".etk-checkbox, .etk-checkbox + label");*/