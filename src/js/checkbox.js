CheckBox.prototype = new Base();
CheckBox.prototype.constructor = CheckBox;

function CheckBox() {
	if (!arguments.length) {
		return;
	}

	// Threat as new API if the argument assigned is DOM element: set control's element
	// For backward compatibility, we'll set control's element when call render()
	var arg = arguments[0];
	// if (arg.nodeType && arg.tagName.toLowerCase() === "input" && arg.getAttribute("type") && arg.getAttribute("type").toLowerCase() === "checkbox") { // Check if checkbox element
	if (CheckBox.isValidElement_(arg)) { // Check if checkbox element
		arg.className = "etk-checkbox"; // Add class
		this.element_ = arg;
		this.setAutoState_();
		if (!$(arg).next("label")[0]) {
			this.renderLabel_();
		}
	}
	else {
		//FIXME
		var model = arg;
		this.backwardConstructor_(model);
		Base.call(this);
	}
};

CheckBox.prototype.render = function(element, isReplace) { // for backward compatibility
	if (element.nodeType && element.nodeType === 1) {
		if (element.tagName === "input" && element.getAttribute("type") && element.getAttribute("type") === "checkbox") { // Check if checkbox element
			return;
		}
		
		var element_ = $('<input type="checkbox" class="etk-checkbox" />');
		
		if (isReplace) {
			if (element.id) {
				element_.attr("id", element.id);
			}
			$(element).replaceWith(element_);
		}
		else {
			if (element.id) {
				element_.attr("id", "etk-checkbox_" + element.id);
			}
			$(element).append(element_);
		}
		
		this.element_ = element_[0];
		this.renderLabel_();
	}
};

CheckBox.prototype.getModel = function () { // for backward compatibility
	return this.model_;
};

CheckBox.prototype.getTooltip = function () {
	return this.element_.title;
};

CheckBox.prototype.setTooltip = function (value) {
	this.element_.title = value;
};

CheckBox.prototype.getText = function () {
	return $(this.element_).next("label").text();
};

CheckBox.prototype.setText = function (value) {
	$(this.element_).next("label").text(value);
};

CheckBox.prototype.getCheckState = function () {
	return this.element_.checked ? 1 : ( this.isPartialChecked_() ? 2 : 0 );
};

CheckBox.prototype.setCheckState = function (value) {
	this.element_.checked = (value === 1);
	this.setPartialCheckedStyle_(value === 2);
};

///////////////////////////////////////////////////////

CheckBox.prototype.isVisible = function () {
	return !$(this.element_).hasClass("etk-invisible");
};

CheckBox.prototype.setVisible = function (value) {
	if (value) {
		$(this.element_).removeClass("etk-invisible");
	}
	else {
		$(this.element_).addClass("etk-invisible");
	}
};

CheckBox.prototype.isEnabled = function () {
	return !$(this.element_).prop("disabled");
};

CheckBox.prototype.setEnabled = function (value) {
	$(this.element_).prop("disabled", !value);
};

CheckBox.prototype.setFocus = function (value) {
	if (value) {
		CheckBox.setFocusIn(this.element_);
	}
	else {
		CheckBox.setFocusOut(this.element_);
	}
};

CheckBox.prototype.isFocus = function (value) {
	return Base.isFocus(this.element_);
};

///////////////////////////////////////////////////////

CheckBox.prototype.setIsVisible = function (value) {
	this.setVisible(value);
};

CheckBox.prototype.getIsVisible = function () {
	return this.isVisible();
};

CheckBox.prototype.setIsEnabled = function (value) {
	this.setEnabled(value);
};

CheckBox.prototype.getIsEnabled = function () {
	return this.isEnabled();
};

CheckBox.prototype.setHasFocus = function (value) {
	this.setFocus(value);
};

///////////////////////////////////////////////////////

CheckBox.prototype.getChangedEvent = function () { // for backward compatibility
	//FIXME: review changedEvent_ initialization
	return this.changedEvent_;
};

CheckBox.prototype.getTextAlign = function () {
	return $.inArray($(this.element_).next("label").css("text-align"), this.textAlignConverter_);
};

CheckBox.prototype.setTextAlign = function (value) {
	$(this.element_).removeClass("align-right");
	$(this.element_).next("label").css("text-align", this.textAlignConverter_[value]);
};

CheckBox.prototype.getTextOverflow = function () {
};

CheckBox.prototype.setTextOverflow = function (value) {
};

CheckBox.prototype.getBehaviors = function () { // for backward compatibility
	//FIXME: initialize behaviors_
	return this.behaviors_;
};

CheckBox.prototype.getKeyEventTarget = function () {
	return this.getElement(); //FIXME
};

CheckBox.prototype.setError = function (value) {
	var jelement = $(this.element_);
};

///////////////////////////////////////////////////////

CheckBox.prototype.backwardConstructor_ = function (model) {
	//FIXME
	this.model_ = model;
};

///////////////////////////////////////////////////////

CheckBox.prototype.getElement = function () { // new method
	return this.element_;
};

CheckBox.prototype.setSlaves = function (selector) { // new method
	this.setAutoChecked_(selector);
};

CheckBox.prototype.setAutoState_ = function() { // new method
	var this_ = this;
	$(this.element_).on("change.etkCheckboxAutoState", function() {
			if (!this.checked && this_.isPartialChecked_()) {
				this_.setPartialCheckedStyle_(false);
			}
		});
};

CheckBox.prototype.setAutoChecked_ = function(selector) { // new method
	var this_ = this;
	$(this.element_)
		.on("change.etkCheckboxAutoChecked", function() {
			var slaves = $(selector).not(this_.element_);
			slaves.not("[disabled]").prop("checked", this.checked);
		});
	$(document)
		.delegate(selector, "change.etkCheckboxAutoChecked", function() {
			if (this === this_.element_) {
				return;
			}
			
			var slaves = $(selector).not(this_.element_);
			var totalChecked = slaves.filter(":checked").length;
			
			this_.setCheckState( totalChecked ? ( totalChecked < slaves.not("[disabled]").length ? 2 : 1 ) : 0 );
			// if (!totalChecked) {
				// this_.setCheckState(0);
			// }
			// else if (totalChecked < slaves.not("[disabled]").length) {
				// this_.setCheckState(2);
			// }
		});
};

CheckBox.prototype.isPartialChecked_ = function() { // new method
	return $(this.element_).hasClass("etk-checkbox-partial");
};

CheckBox.prototype.setPartialCheckedStyle_ = function(value) { // new method
	if (value) {
		$(this.element_).addClass("etk-checkbox-partial");
	}
	else {
		$(this.element_).removeClass("etk-checkbox-partial");
	}
};

CheckBox.prototype.renderLabel_ = function(value) { // new method
	var label_ = $('<label></label>');
	
	if (this.element_.id) {
		label_.attr("for", this.element_.id);
	}
	if (this.model_ && this.model_.text) {
		label_.text(this.model_.text);
	}
	
	$(this.element_).after(label_);
};

CheckBox.isValidElement_ = function(element, isAccessible) { // new method
	if (element.nodeType && element.tagName.toLowerCase() === "input" && element.getAttribute("type") && element.getAttribute("type").toLowerCase() === "checkbox") {
		return !isAccessible || Base.isAccessible(element);
	}
	
	return false;
};

CheckBox.setFocusIn = function(element) { // new method
	Base.setFocusIn(element);
};

CheckBox.setFocusOut = function(element) { // new method
	Base.setFocusOut(element);
};

CheckBox.handleFocus = function() { // new method
	// Note in some browsers, etk-checkbox is displayed as CSS UI (if support CSS), but in some browsers, it is displayed as real HTML control (at least IE8)
	// We have to handle both cases
	$(document)
		.on("keyup.etkCheckboxFocus", function(event) { // Toggle checked state when keyup on focused checkbox
			// Find focused element and pressed key
			var focusedElement = Base.getFocusedElement();
			var keyCode = window.event ? window.event.keyCode : event.which;
			if ($(focusedElement).hasClass("etk-checkbox") && keyCode === 32) {
				focusedElement.checked = !focusedElement.checked;
			}
		})
		.delegate(".etk-checkbox", "change.etkCheckboxFocus", function(event) { // Prevent change when toggle checked state for real HTML checkbox
			// If checkbox is focused, stop default change event so that the checked state that is already set from keyup event will not be changed back
			if (Base.isFocus(this)) {
				if (event.preventDefault) event.preventDefault();
				else event.returnValue = false;
			}
		})
		.delegate(".etk-checkbox, .etk-checkbox + label", "click.etkCheckboxFocus", function(event) { // Handel focus style for CSS UI
			// Set focus to clicked element only if it's checkbox.
			if (CheckBox.isValidElement_(this)) {
				CheckBox.setFocusIn(this);
				if (!Base.isAccessible(this)) {
					event.stopPropagation();
				}
			}
		});
};

CheckBox.handleFocus();

///////////////////////////////////////////////////////

CheckBox.prototype.element_ = null; // new property
CheckBox.prototype.model_ = null;
CheckBox.prototype.behaviors_ = null;
CheckBox.prototype.changedEvent_ = null;
CheckBox.prototype.textAlignConverter_ = ["left", "right", "center", "justify", "inherit"];