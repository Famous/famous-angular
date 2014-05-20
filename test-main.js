require.config({
  // Famo.us scripts are being loaded from bower_components
  baseUrl: '/base/bower_components',

  // Wait until the $famous provider is declared, which will happen once all
  // the required Famo.us modules are loaded
  callback: function() {
    window.addEventListener('$famousDeclared', function(e) {
      window.__karma__.start();
    });
  }
});
