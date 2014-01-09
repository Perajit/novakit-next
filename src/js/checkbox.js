CheckBox.prototype = new Base();
CheckBox.prototype.constructor = CheckBox;

function CheckBox() {
	if (!arguments.length) {
		return;
	}

	// Threat as new API if the argument assigned is DOM element: set control's element
	// For backward compatibility, we'll set control's element when call render()
	var arg = arguments[0];
	if (arg.nodeType && arg.tagName.toLowerCase() === "input" && arg.getAttribute("type") && arg.getAttribute("type").toLowerCase() === "checkbox") { // Check if checkbox element
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

CheckBox.prototype.getElement = function () {
	return this.element_;
};

CheckBox.prototype.setSlaves = function (selector) {
	this.setAutoChecked_(selector);
};

CheckBox.prototype.setAutoState_ = function() { // new method
	var this_ = this;
	$(this.element_).on("click.autoState", function(event) {
			if (!this.checked && this_.isPartialChecked_()) {
				this_.setPartialCheckedStyle_(false);
			}
		});
};

CheckBox.prototype.setAutoChecked_ = function(selector) { // new method
	var this_ = this;
	$(this.element_)
		.on("click.etkCheckboxAutoChecked", function() {
			$(selector).not("[disabled]").prop("checked", this.checked);
		});
	$(document)
		.delegate(selector, "click.etkCheckboxAutoChecked", function() {
			var slaves = $(selector);
			var totalChecked = slaves.filter(":checked").length;
			if (!totalChecked) {
				this_.setCheckState(0);
			}
			else if (totalChecked < slaves.not("[disabled]").length) {
				this_.setCheckState(2);
			}
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

CheckBox.setFocusIn = function(element) {
	Base.setFocusIn(element);
};

CheckBox.setFocusOut = function(element) {
	Base.setFocusOut(element);
};

CheckBox.handleFocus = function() {
	$(document)
		.delegate(".etk-checkbox, .etk-checkbox + label", "click.etkCheckboxFocus", function(event) {
			if (this.tagName.toLowerCase() !== "label") {
				CheckBox.setFocusIn(this);
			}
			event.stopPropagation();
		});
};

CheckBox.handleFocus();

///////////////////////////////////////////////////////

CheckBox.prototype.element_ = null; // new property
CheckBox.prototype.model_ = null;
CheckBox.prototype.behaviors_ = null;
CheckBox.prototype.changedEvent_ = null;
CheckBox.prototype.textAlignConverter_ = ["left", "right", "center", "justify", "inherit"];