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

  window.modalCallbacks['confirmation-modal'] = {
    beforeShow: function() {
      var selectedLenders = document.getElementById('selected-lenders').options;
      var selectedLendersNames = [];
      var selectedLendersWithinModal = document.getElementById('list-of-selected-lenders');

      while(selectedLendersWithinModal.lastChild) {
        selectedLendersWithinModal.removeChild(selectedLendersWithinModal.lastChild);
      }

      for(var i = 0; i < selectedLenders.length; i++) {
        selectedLendersNames.push(selectedLenders[i].innerText);
      }

      selectedLendersNames.forEach(function(selectedLenderName) {
        var lenderNameElement = document.createElement('div');
        var lenderNameElementInner = document.createElement('p');
        lenderNameElementInner.innerText = selectedLenderName;
        lenderNameElement.appendChild(lenderNameElementInner);
        selectedLendersWithinModal.appendChild(lenderNameElement);
      });
    }
  };

  window.lenderSelectorCallbacks['selected-lenders'] = {};
  window.lenderSelectorCallbacks['lenders'] = {};
  window.lenderSelectorCallbacks['selected-lenders'].onMoveTo = window.lenderSelectorCallbacks['lenders'].onMoveTo = function() {
    var selectedLenders = document.getElementById('selected-lenders').options;
    var confirmationModalTrigger = document.getElementById('confirmation-modal-trigger');

    if(selectedLenders.length > 0) {
      confirmationModalTrigger.classList.remove('button--disabled');
    } else {
      confirmationModalTrigger.classList.add('button--disabled');
    }
  }
});
