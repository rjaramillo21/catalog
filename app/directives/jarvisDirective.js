app.directive('jarvis', function(){
  return {
    restrict: 'E',
    templateUrl: 'app/partials/jarvis/jarvis.html',
    link: function (scope, element, attrs){
      jQuery(document).on('keypress',function(e){
        scope.$apply(scope.keyPressed(e))
      });
    }
  }
  
})