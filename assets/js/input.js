(function($){
	
	
	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function initialize_field( $field ) {
		let $hidden = $field.find('.acf-field-dynamic-text-inputs__input.hidden').eq(0);
		let $clone = $hidden.clone().removeClass('hidden');
		// Removes the disabled attribute on conditional settings
		$clone.find('input').removeAttr('disabled');
		$hidden.remove();

		$field.find('.acf-field-dynamic-text-inputs__button-add').click(function (e) {
			e.preventDefault();
			add_input($field, $clone);
		});

		bind_remove_input($field);
	}

	function add_input(field, clone) {
		let $clone = $(clone);

		$(field).find('.acf-field-dynamic-text-inputs__container').append($clone.clone());
		bind_remove_input(field);
	}

	function remove_input(event) {
		event.preventDefault();
		$(event.target).closest('.acf-field-dynamic-text-inputs__input').remove();
	}

	function bind_remove_input(field) {
		$(field).find('.acf-field-dynamic-text-inputs__button-remove').off('click', remove_input);
		$(field).find('.acf-field-dynamic-text-inputs__button-remove').on('click', remove_input);
	}

	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		acf.add_action('ready_field/type=dynamic_text_inputs', initialize_field);
		acf.add_action('append_field/type=dynamic_text_inputs', initialize_field);
		
		
	} else {
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  These single event is called when a field element is ready for initizliation.
		*
		*  @param	event		an event object. This can be ignored
		*  @param	element		An element which contains the new HTML
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			
			// find all relevant fields
			$(postbox).find('.field[data-field_type="dynamic_text_inputs"]').each(function(){
				
				// initialize
				initialize_field( $(this) );
				
			});
		
		});
	
	}

})(jQuery);
