
window.modalCallbacks = {};

document.addEventListener('DOMContentLoaded', function(event) {

  var modalTriggers = document.getElementsByClassName('modal-trigger');

  for(var i = 0; i < modalTriggers.length; i++) {

    var modalId = modalTriggers[i].getAttribute('data-modal');
    var modalElement = document.getElementById(modalId);

    modalTriggers[i].addEventListener('click', function showModal() {
      if(modalCallbacks[modalId]) {
        modalCallbacks[modalId].beforeShow && modalCallbacks[modalId].beforeShow();
      }
      modalElement.classList.add('modal-overlay--show');
      if(modalCallbacks[modalId]) {
        modalCallbacks[modalId].afterShow && modalCallbacks[modalId].afterShow();
      }
    });

    var closeModalTriggers = modalElement.getElementsByClassName('close-modal-trigger');

    for(var j = 0; j < closeModalTriggers.length; j++) {

      closeModalTriggers[j].addEventListener('click', function hideModal() {
        if(modalCallbacks[modalId]) {
          modalCallbacks[modalId].beforeHide && modalCallbacks[modalId].beforeHide();
        }
        modalElement.classList.remove('modal-overlay--show');
        if(modalCallbacks[modalId]) {
          modalCallbacks[modalId].afterHide && modalCallbacks[modalId].afterHide();
        }
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function(event) {
  var companyDetailsSection = document.getElementById('company-details');
  var lookupButton = document.getElementById('lookup-button');

  function showCompanyDetailsSection() {
    companyDetailsSection.style.display = 'block';
  }

  if(lookupButton) {
    lookupButton.addEventListener('click', showCompanyDetailsSection);
  }
});

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

document.addEventListener('DOMContentLoaded', function(event) {
  var sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
  var sidebarTrigger = document.getElementById('sidebar-trigger');
  var bodyClassList = document.body.classList;

  function collapseSidebar() {
    bodyClassList.add('sidebar--collapsed');
    bodyClassList.remove('sidebar--expanded');
    localStorage.setItem('sidebarCollapsed', 'true');
  }

  function expandSidebar() {
    bodyClassList.add('sidebar--expanded');
    bodyClassList.remove('sidebar--collapsed');
    localStorage.setItem('sidebarCollapsed', 'false');
  }

  function addSidebarAnimation() {
    bodyClassList.add('sidebar--animated');
  }

  if(sidebarTrigger) {
    sidebarTrigger.addEventListener('click', function collapseExpandSidebar() {
      if(bodyClassList.contains('sidebar--collapsed')) {
        expandSidebar();
      } else {
        collapseSidebar();
      }
    });
  }

  if(sidebarCollapsed === 'true') {
    collapseSidebar();
  } else {
    expandSidebar();
  }

  addSidebarAnimation();
});
