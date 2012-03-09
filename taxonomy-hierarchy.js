(function($) {
  Drupal.behaviors.taxonomyHierarchy = {
    'attach': function(context) {
      $(".field-widget-taxonomy-hierarchy .form-item-parent-item", context).each(function() {
        
        //setup the classes and DOM structure
        $(this).addClass('closed')
          .prepend('<span class="arrow">▸</span>')
          .append('<div class="children"/ style="display:none;">')
          .children('label').append('<small class="count"></small>');
        
        container = $(this).children(".children");        
        $(this).children('.form-item').appendTo( container );
        
        //add collapsing behaviors
        $(this).children('label').click(function() {
          $(this).parent().toggleClass('closed open')
            .children('.children').slideToggle('fast');
        });
      
        //add highlighting for parents that have active children, both on load and on click
        if ( hasActiveChildren(this) ) {
          $(this).addClass('has-active-children').children('label').click(); //open it
        }
        
        $(this).find('.form-checkbox').click(function() {
          var numSelected = hasActiveChildren( $(this).parents('.form-item-parent-item') );
          if (numSelected ) {
            $(this).parents('.form-item-parent-item').addClass('has-active-children')
              .find('small.count').text('('+numSelected+'/'+$(this).parents('.form-item-parent-item').find('.form-checkbox').length+')');
          } else {
            $(this).parents('.form-item-parent-item').removeClass('has-active-children')
              .find('small.count').text('');
          }
        });
        
        function hasActiveChildren( parent_element ) {
          return $(parent_element).find('.form-checkbox:checked').length;
        }
      
      });
    }
  };
})(jQuery);