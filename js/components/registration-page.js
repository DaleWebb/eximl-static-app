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
