define(['jquery'], function($) {

	handleRadioButtonSave = function(event, key) {
		var form = getForm(event);
		var radio = form.find("input:radio:checked");
		var data = {
			field_name : form.attr('id'),
			field_value : radio.attr('value')
		};
		saveDataToLocalStorage(key, data);
	};

	handleRadioButtonLoad = function(event, key) {
		var form = getForm(event);
		var formData = loadDataFromLocalStorage(key);
		if (formData != null) {
			form.find('input[value="' + formData.field_value + '"]').prop('checked', true).checkboxradio("refresh");
		} else {
			form.find("input:radio:first").prop('checked', true).checkboxradio("refresh");
		}
	};

	handleRangeSliderSave = function(event, key) {
		var form = getForm(event);
		var rangeData = getRangeData(form);
		var data = {
			field_name : form.attr('id'),
			field_value : [rangeData[0], rangeData[1]]
		};
		saveDataToLocalStorage(key, data);
	};

	handleRangeSliderLoad = function(event, key) {
		var formData = loadDataFromLocalStorage(key);
		if (formData != null) {
			setRangeData(getForm(event), formData.field_value);
		}
	};

	handleRangeSliderWithButtonSave = function(event, key) {
		var form = getForm(event);
		var selectOption = form.find('select').val();
		if (selectOption == 'yes') {
			var rangeData = getRangeData(form);
		}
		
		var data = {
			field_name : form.attr('id'),
			field_value : [selectOption, rangeData]
		};
		saveDataToLocalStorage(key, data);
	};

	handleRangeSliderWithButtonLoad = function(event, key) {
		var formData = loadDataFromLocalStorage(key);
		if (formData != null) {
			var form = getForm(event);
			form.find('select').prop('value', formData.field_value[0]).change();
			if (formData.field_value[0] == 'yes') {
				setRangeData(getForm(event), formData.field_value[1]);
			}
		}
	};

	handleCheckboxSave = function(event, key) {
		var form = getForm(event);
		var values = getCheckboxName(form.find("input:checkbox:checked"));
		var data = {
			field_name : form.attr('id'),
			field_value : values
		};
		saveDataToLocalStorage(key, data);
	};

	handleCheckboxLoad = function(event, key) {
		var form = getForm(event);
		var formData = loadDataFromLocalStorage(key);
		if (formData != null) {
			setCheckbox(form, formData.field_value);
		} else {
			form.find('input:checkbox:first').prop('checked', true).checkboxradio('refresh');
		}
	};

	setCheckbox = function(element, data) {
		for (var i = 0; i < data.length; i++) {
			element.find('input:checkbox[name="' + data[i] + '"]').prop('checked', true).checkboxradio('refresh');
		}
	};

	getCheckboxName = function(checkboxes) {
		var values = new Array();
		for (var i = 0; i < checkboxes.length; i++) {
			values[i] = checkboxes[i].name;
		}
		return values;
	};

	getRangeData = function(element) {
		var values = new Array();
		values[0] = element.find('input[data-type="range"][name="min"]').val();
		values[1] = element.find('input[data-type="range"][name="max"]').val();
		return values;
	};
	
	setRangeData = function(element, values) {
		element.find('input[data-type="range"][name="min"]').prop('value', values[0]).slider("refresh");
		element.find('input[data-type="range"][name="max"]').prop('value', values[1]).slider("refresh");
	};

	getForm = function(event) {
		return $(event.target).find('form');
	};

	saveDataToLocalStorage = function(key, data) {
		var dataString = JSON.stringify(data);
		// console.log('save: ' + dataString);
		window.localStorage.setItem(key, dataString);
	};
	
	loadDataFromLocalStorage = function(key) {
		var data = window.localStorage.getItem(key);
		// console.log('load: ' + data);
		return JSON.parse(data);
	};

	disableCurrentLink = function(element, key) {
		var link = $(element).find('a[href="#' + key + '"]');
		link.addClass("ui-disabled");
		link.parent().attr('data-icon', 'false');
	};
});
