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
