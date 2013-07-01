app.directive('chicho',function (){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      switch(attrs.chicho){
        case 'on': 
          alert('On');
          break;
        case 'off':
          alert('Off');
          break;
        default: 
          alert('None');          
      }
    }
  }
});