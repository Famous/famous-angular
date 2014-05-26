console.log('Delay Karma until $famousModulesLoaded');

window.addEventListener('$famousModulesLoaded', function() {
  __karma__.start();
});
