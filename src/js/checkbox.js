function CheckBox() {
	if (!arguments.length) {
		return;
	}

	// Threat as new API if the argument assigned is DOM element: set control's element
	// For backward compatibility, we'll set control's element when call render()
	var arg = arguments[0];
	if (arg.nodeType && arg.tagName.toLowerCase() === "input" && arg.getAttribute("type") && arg.getAttribute("type").toLowerCase() === "checkbox") { // Check if checkbox element
		var this_ = this;
		this.element_ = arg;
		$(arg).on("click.autoState", function() {
				if (!this.checked && this_.isPartialChecked_()) {
					this_.setPartialCheckedStyle_(false);
				}
			});
	}
	else {
		//FIXME
		var model = arg;
		this.backwardConstructure_(model);
	}
};

CheckBox.prototype.render = function(element, isReplace) { // for backward compatibility
	if (element.nodeType && element.nodeType === 1) {
		if (element.tagName === "input" && element.getAttribute("type") && element.getAttribute("type") === "checkbox") { // Check if checkbox element
			return;
		}
		
		var element_ = $('<input type="checkbox" class="etk-checkbox" />');
		var label_ = $('<label></label>');
		
		if (this.model_ && this.model_.text) {
			label_.text(this.model_.text);
		}
		
		if (isReplace) {
			if (element.id) {
				element_.attr("id", element.id);
				label_.attr("for", element.id);
			}
			$(element).after(label_).replaceWith(element_);
		}
		else {
			if (element.id) {
				var id = "etk-checkbox_" + element.id;
				element_.attr("id", id);
				label_.attr("for", id);
			}
			$(element).append(element_).append(label_);
		}
		
		this.element_ = element_;
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
	return this.element_.checked ? 1 : this.isPartialChecked_();
};

CheckBox.prototype.setCheckState = function (value) {
	this.element_.checked = (value === 1);
	this.setPartialCheckedStyle_(value === 2);
};

///////////////////////////////////////////////////////

CheckBox.prototype.isVisible = function () {
	return $(this.element_).hasClass("invisible");
};

CheckBox.prototype.setVisible = function (value) {
	if (value) {
		$(this.element_).addClass("invisible");
	}
	else {
		$(this.element_).removeClass("invisible");
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
		this.element_.focus();
	}
	else {
		this.element_.blur();
	}
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
};

///////////////////////////////////////////////////////

CheckBox.prototype.backwardConstructure_ = function (model) {
	console.log("@backwardConstructure_");
	console.log(model);
	this.model_ = model;
};

///////////////////////////////////////////////////////

CheckBox.prototype.getElement = function () {
	return this.element_;
};

CheckBox.prototype.setSlaves = function (selector) {
	var this_ = this;
	$(this.element_).on("click.autoCheck", function() {
		$(selector).not("[disabled]").prop("checked", this.checked);
	});
	$(document).delegate(selector, "click.autoCheck", function() {
		var slaves = $(selector);
		var totalChecked = slaves.filter(":checked").length;
		this_.setCheckState(totalChecked ? (totalChecked < slaves.not("[disabled]").length ? 2 : 1) : 0);
	});
};

CheckBox.prototype.isPartialChecked_ = function() { // new method
	return $(this.element_).hasClass("partial-checked");
};

CheckBox.prototype.setPartialCheckedStyle_ = function(value) { // new method
	if (value) {
		$(this.element_).addClass("partial-checked");
	}
	else {
		$(this.element_).removeClass("partial-checked");
	}
};

CheckBox.prototype.setFocusStyle_ = function(value) { // new method
	if (value) {
		$(this.element_).addClass("focused");
	}
	else {
		$(this.element_).removeClass("focused");
	}
};

///////////////////////////////////////////////////////

CheckBox.prototype.element_ = null; // new property
CheckBox.prototype.model_ = null;
CheckBox.prototype.behaviors_ = null;
CheckBox.prototype.changedEvent_ = null;
CheckBox.prototype.textAlignConverter_ = ["left", "right", "center", "justify", "inherit"];