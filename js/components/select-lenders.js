window.lenderSelectorCallbacks = {};

document.addEventListener('DOMContentLoaded', function(event) {

  var lenderSelectors = document.getElementsByClassName('lender-selector');

  for(var i = 0; i < lenderSelectors.length; i++) {

    lenderSelectors[i].addEventListener('click', function() {

      var moveFrom = this.getAttribute('data-move-from');
      var moveTo = this.getAttribute('data-move-to');
      var fromSelector = document.getElementById(moveFrom);
      var toSelector = document.getElementById(moveTo);
      var options = fromSelector.options;
      var selectedOptions = [];

      for(var j = 0; j < options.length; j++) {
        var option = options[j];

        if(option.selected) {
          selectedOptions.push(option);
        }
      }

      selectedOptions.forEach(function(selectedOption) {
        for(var j = 0; j < options.length; j++) {
          if(options[j].value === selectedOption.value) {
            options.remove(j);
          }
        }
        toSelector.options.add(selectedOption);
        if(window.lenderSelectorCallbacks[moveTo]) {
          window.lenderSelectorCallbacks[moveTo].onMoveTo && window.lenderSelectorCallbacks[moveTo].onMoveTo();
        }
      });
    });
  }
});
