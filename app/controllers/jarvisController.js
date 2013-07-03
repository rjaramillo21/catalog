app.controller('JarvisController', function ($scope){

  var info_messages = {
    info_start: 'Click on the speak button and begin speaking.', 
    info_speak_now: 'Speak now.', 
    info_capturing: 'Getting voice samples...',
    info_captured: 'Voice Command Captured.',
    info_no_speech: 'No speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
    info_no_microphone: 'No microphone was found. Ensure that a microphone is installed and that <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892"> microphone settings</a> are configured correctly.', 
    info_allow: 'Click the "Allow" button above to enable your microphone.', 
    info_denied: 'Permission to use microphone was denied.', 
    info_blocked: 'Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream',
    info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.' 
  }

  $scope.final_transcript = '';
  $scope.recognizing = false;
  $scope.ignore_onend;
  $scope.start_timestamp;
  $scope.info = info_messages.info_start;
  $scope.final_span;
  $scope.interim_span;

  $scope.keyPressed = function (e) {
    var keyCode = e.which;
    if(keyCode == $scope.trigger){
      $scope.show();
    }
  }

  $scope.init = function (modalId, trigger){
    $scope.modalId = modalId;
    $scope.trigger = trigger;

    if (!('webkitSpeechRecognition' in window)) {
      $scope.info = info_messages.info_upgrade;
    } else if($scope.recognition){
      console.log('Hi again sir!');
    } else {
      console.log('Creating JARVIS...');
      $scope.recognition = new webkitSpeechRecognition();
      $scope.recognition.continuous = true;
      $scope.recognition.interimResults = true;

      $scope.recognition.onstart = function() {
        $scope.recognizing = true;
        $('#actionBtn').html('Stop');
        $('#jarvisInfo').html(info_messages.info_speak_now);
        //$scope.info = info_messages.info_speak_now;
        //console.log(info_messages.info_speak_now);
      };

      $scope.recognition.onerror = function (event) {
        if (event.error == 'no-speech') {
          $scope.info = info_messages.info_no_speech;
          $scope.ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
          $scope.info = info_messages.info_no_microphone;
          $scope.ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
          if (event.timeStamp - $scope.start_timestamp < 100) {
            $scope.info = info_messages.info_blocked;
          } else {
            $scope.info = info_messages.info_denied;
          }
          $scope.ignore_onend = true;
        }
      };

      $scope.recognition.onend = function () {
        $scope.recognizing = false;
        if ($scope.ignore_onend) {
          return;
        }
        if (!$scope.final_transcript) {
          $('#jarvisInfo').html(info_messages.info_start);
          //$scope.info = info_messages.info_start;
          //console.log(info_messages.info_start);
          return;
        }
        
        $('#jarvisInfo').html(info_messages.info_captured);
        //$scope.info = info_messages.info_captured;
        //console.log(info_messages.info_captured);

        if (window.getSelection) {
          window.getSelection().removeAllRanges();
          var range = document.createRange();
          range.selectNode(document.getElementById('final_span'));
          window.getSelection().addRange(range);
        }

        $('#actionBtn').html('Speak');

      };

      $scope.recognition.onresult = function(event) {
        
        $('#jarvisInfo').html(info_messages.info_capturing);
        //$scope.info = info_messages.info_capturing;
        //console.log(info_messages.info_capturing);

        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            $scope.final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }

        $scope.final_transcript = capitalize($scope.final_transcript);
        $scope.final_span = linebreak($scope.final_transcript);
        $scope.interim_span = linebreak(interim_transcript);
        
        $('#final_span').html($scope.final_span);
        $('#interim_span').html($scope.interim_span);

        //console.log($scope.final_transcript);
        //console.log($scope.interim_span);
      };

    }
  }

  $scope.show = function (){
    $($scope.modalId).modal();
  }

  $scope.inputVoiceCommand = function (){
    if ($scope.recognizing) {
      $scope.recognition.stop();
      return;
    }

    $scope.final_transcript = '';
    $scope.recognition.lang = 'en-US';
    $scope.recognition.start();
    $scope.ignore_onend = false;
    $scope.final_span = '';
    $scope.interim_span = '';
    $scope.start_timestamp = event.timeStamp;
    $('#jarvisInfo').html(info_messages.info_allow);
    //$scope.info = info_messages.info_allow;
    //console.log(info_messages.info_allow); 

  }

  //helper functions
  function linebreak(s) {
    var two_line = /\n\n/g;
    var one_line = /\n/g;
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }

  function capitalize(s) {
    var first_char = /\S/;
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }
  
});