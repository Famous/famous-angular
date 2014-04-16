



  ngFameApp.config(function(famousProvider){
    for(var i = 0; i < requirements.length; i++)
      famousProvider.registerModule(requirements[i], required[i]);
    console.log('registered modules', famousProvider.$get());
  });

  if(window.famousAngularBootstrap){
    window.famousAngularBootstrap();
  }else{
    throw "window.famousAngularBootstrap callback not defined.  In order to work with famous-angular, you must define that callback function and bootstrap your app inside."
  }
  
})