document.addEventListener('DOMContentLoaded', function(event) {
  var sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
  var sidebarTrigger = document.getElementById('sidebar-trigger');

  function collapseSidebar() {
    var classList = document.body.classList;
    classList.add('sidebar--collapsed');
    classList.remove('sidebar--expanded');
    localStorage.setItem('sidebarCollapsed', 'true');
  }

  function expandSidebar() {
    var classList = document.body.classList;
    classList.add('sidebar--expanded');
    classList.remove('sidebar--collapsed');
    localStorage.setItem('sidebarCollapsed', 'false');
  }

  function addSidebarAnimation() {
    document.body.classList.add('sidebar--animated');
  }

  sidebarTrigger.addEventListener('click', function collapseExpandSidebar() {
    var classList = document.body.classList;
    if(classList.contains('sidebar--collapsed')) {
      expandSidebar();
    } else {
      collapseSidebar();
    }
  });

  if(sidebarCollapsed === 'true') {
    collapseSidebar();
  } else {
    expandSidebar();
  }

  addSidebarAnimation();
});
