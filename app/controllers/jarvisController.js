app.controller('JarvisController', function ($scope){
  
  $scope.keyCode = "";

  $scope.info = {
    info_start: 'Click on the microphone icon and begin speaking.', 
    info_speak_now: 'Speak now.', 
    info_no_speech: 'No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
    info_no_microphone: 'No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892"> microphone settings</a> are configured correctly.', 
    info_allow: 'Click the "Allow" button above to enable your microphone.', 
    info_denied: 'Permission to use microphone was denied.', 
    info_blocked: 'Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream',
    info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.' 
  }

  $scope.keyPressed = function(e) {
    $scope.keyCode = e.which;
    if($scope.keyCode == '106'){
      $('#jarvisModal').modal();
    }
  };

  
});