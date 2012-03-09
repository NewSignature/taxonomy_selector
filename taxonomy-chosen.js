(function($) {
  Drupal.behaviors.taxonomyChosen = {
    'attach': function(context) {
      $(".taxonomy-chosen", context).chosen();
    }
  };
})(jQuery);