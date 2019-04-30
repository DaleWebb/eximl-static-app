window.modalCallbacks = [];

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
