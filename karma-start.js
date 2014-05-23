console.log('Delay starting of Karma until $famous is declared');

// Check every 1 second whehter $famous is declared and now injectable
var check$FamousLoaded = setInterval(function() {
  console.log('Wait for $famous to load!');

  angular.module('famous.angular')
    .controller('test', function($famous) {
      console.log("contructing with ", $famous);
      if ($famous) {
        __karma__.start();
      }
    })
  ;

  var $injector = angular.injector(['famous.angular']);
  var controller = $injector.get('$controller')('test')
  console.log("controller", controller)

  //var $injector = angular.injector(['famous.angular']);
  //console.log($injector.has('$famous'));

  //__karma__.start();
}, 100);
