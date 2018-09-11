if (annyang) {

  var isListening = false;

  var serialEven = null;
  var serialVowel = null;
  var batteries = null;
  var isFrk = null;

  var symbols0 = ['tennis racket','alpha tango', 'lambda', 'lightning bolt', 'kitty cat', 'fancy h', 'CDOT'];
  var symbols1 = ['epsilon', 'tennis racket', 'CDOT', 'swirly a', 'hollow star', 'fancy h', 'question mark'];
  var symbols2 = ['copyright', 'beard', 'swirly a', 'double k', 'broken 3', 'lambda', 'star'];
  var symbols3 = ['flat 6', 'paragraph', 'bravo tango', 'kitty cat', 'double k', 'question mark', 'smiley face'];
  var symbols4 = ['trident', 'smiley face', 'bravo tango', 'CDOT', 'paragraph', 'devil 3', 'star'];
  var symbols5 = ['flat 6', 'epsilon', 'unequal sign', 'alpha echo', 'trident', 'capital n', 'omega'];

  var allSymbols = [symbols0, symbols1, symbols2, symbols3, symbols4, symbols5];

  var evalSerial = function(serial){

    say("serial " + serial);

    if (serial.match(/[aeiouAEIOU]/)){
      serialVowel = true;
      console.log("serialVowel");
    }

    var lastNum = serial.charAt(serial.length-1);

    if (lastNum == 0 ||
        lastNum == 2 ||
        lastNum == 4 ||
        lastNum == 6 ||
        lastNum == 8
      ){
      serialEven = true;
      console.log("serialEven");
    }
  }

  // WIRES
  // WIRES
  // WIRES
  // WIRES
  // WIRES

  var doWires = function(wirelist){
    say(wirelist);

    var allWires = wirelist.split(" ");
    console.log(allWires, allWires.length);

    if (allWires.length == 3){

      if (!allWires.includes("red")){
        say("cut second");
      }

      else if (allWires[2] == "white"){
        say("cut last");
      }

      else if (countInArray(allWires,"blue") > 1){
        var cutIndex = lastOccuranceInArray(allWires,"blue");
        var sayIndex = intoCardinal(cutIndex+1);
        say("cut " + sayIndex);
      }
      else{
        say("cut last");
      }
    }

    else if (allWires.length == 4){

      if (countInArray(allWires,"red") > 1 && serialEven == null){
        say("need serial number");
      }
      else if (countInArray(allWires,"red") > 1 && !serialEven){
        var cutIndex = lastOccuranceInArray(allWires,"red");
        var sayIndex = intoCardinal(cutIndex+1);
        say("cut " + sayIndex);
      }

      else if (allWires[3] == "yellow" && countInArray(allWires,"red") == 0){
        say("cut first");
      }

      else if (countInArray(allWires,"blue") == 1){
        say("cut first");
      }

      else if (countInArray(allWires,"yellow") > 1){
        say("cut last");
      }

      else{
        say("cut second");
      }

    }

    else if (allWires.length == 5){

      if (allWires[4] == "black" && serialEven == null){
        say("need serial number");
      }
      else if (allWires[4] == "black" && !serialEven){
        say("cut fourth");
      }

      else if (countInArray(allWires,"red") && countInArray(allWires,"yellow" > 1)){
        say("cut first");
      }

      else if (!allWires.includes("black")){
        say("cut second");
      }

      else{
        say("cut first");
      }

    }

    else if (allWires.length == 6){
      if (!allWires.includes("yellow") && serialEven == null){
        say("need serial number");
      }
      else if (!allWires.includes("yellow") && !serialEven){
        say("cut third");
      }

      else if (countInArray(allWires,"yellow") == 1 && countInArray(allWires,"white") > 1){
        say("cut fourth");
      }

      else if (!allWires.includes("red")){
        say("cut last");
      }

      else{
        say("cut fourth");
      }
    }


  }

  var evalBatteries = function(amount){
    if (amount == 3){
      batteries = 3;
      say("batteries three, many");
    }
    else if (amount == "to"){
      batteries = 2;
      say("batteries two, double");
    }
    else if (amount == 1){
      batteries = 1;
      say("batteries one, single");
    }
    else{
      say("batteries invalid");
    }
  }

  var evalFrk = function(frkyesno){
    if (frkyesno == "negative"){
      isFrk = false;
      say("No FRK");
    }
    else{
      isFrk = true;
      say("Yes lit FRK");
    }
  }

  var doButton = function(color, text){
    say(color + " " + text);
    if (text == "hold" && color == "red"){
      console.log("holdred");
      say("press and release");
    }
    else if (isFrk == null){
      say("need indicator");
    }
    else if (text == "detonate" && batteries == null){
      say("need batteries");
    }
    else if (isFrk && batteries == null){
      say("need batteries");
    }
    else if (text == "detonate" && batteries > 1){
      console.log("detonate");
      say("press and release");
    }
    else if (isFrk && batteries > 2){
      console.log("frk");
      say("press and release");
    }
    else{
      say("hold");
    }
  }

  var checkEval = function(item){
    if (item == "batteries"){
      say("check batteries " + batteries)
    }
    else if (item == "indicator"){
      if (isFrk){
        say("indicator frk is lit");
      }
      else{
        say("indicator frk is not lit");
      }
    }
    else if (item == "serial number even" || item == "serial number odd"){
      if (serialEven){
        say("serial is even");
      }
      else{
        say("serial is odd");
      }
    }
    else if (item == "serial number vowel"){
      if (serialVowel){
        say("serial does have a vowel");
      }
      else{
        say("serial has no vowel");
      }
    }
    else{
      say("check invalid");
    }
  }

  var doKeypad = function(symbols){
    var input = symbols.toLowerCase().split(" next ");
    var column = [];
    var inputIndex = [];
    var actualColumn;
    var actualColumnReal;
    console.log(input);

    // find all columns of first input

    for (n = 0; n < allSymbols.length; n++){
      if (allSymbols[n].includes(input[0])){
        column.push(n);
        console.log("first input",column);
      }
    }

    // for each input, if we haven't already found a single column, remove all columns not including the present input

    for (i = 1; i < input.length; i++){
      if (column.length == 1){
        console.log("done",column);
      }
      else{
        for (n = 0; n < column.length; n++){
          if (!allSymbols[column[n]].includes(input[i])){
            console.log(n,column[n]);
            column.splice(n,1);
            console.log("new input",column);
          }
        }
      }
    }

    console.log("final", column, column.length);

    if (column.length == 1){
      selColumn = allSymbols[column[0]];
      console.log(selColumn);
      for (i = 0; i < input.length; i++){
        inputIndex.push(selColumn.indexOf(input[i]));
      }
      inputIndex.sort(function(a,b){return a - b});
      console.log(inputIndex);
      for (i = 0; i < inputIndex.length; i++){
        say(selColumn[i]);
      }
    }
    else{
      say("invalid");
    }

  }

  var clearBomb = function(){
    serialEven = null;
    serialVowel = null;
    batteries = null;
    isFrk = null;
  }

  var test = function(){say('test');}

  var commands = {
    'wires *wirelist': doWires,
    'batteries :amount': evalBatteries,
    '(push) button :color :text': doButton,
    'serial (number) *serial': evalSerial,
    'indicator :frkyesno': evalFrk,
    'keypad *symbols': doKeypad,
    'new bomb': clearBomb,
    'test': test,
    'are you ready': function(){say("ready for defuse");},
    'good job': function(){say("thank you");},
    'we blew up': function(){say("press f to pay respects");},
    'check *item': checkEval
  }

  // FUNCTIONS
  // FUNCTIONS
  // FUNCTIONS
  // FUNCTIONS
  // FUNCTIONS

  function countInArray(array,item){
    var count = 0;
    for (i = 0; i < array.length; i++){
      if (array[i] == item){
        count++;
      }
    }
    return count;
  }

  function lastOccuranceInArray(array,item){
    var index = 0;
    for (i = 0; i < array.length; i++){
      if (array[i] == item){
        index = i;
      }
    }
    return index;
  }

  function intoCardinal(num){
    if (num == 1){
      return "first";
    }
    if (num == 2){
      return "second";
    }
    if (num == 3){
      return "third";
    }
    if (num == 4){
      return "fourth";
    }
    if (num == 5){
      return "fifth";
    }
    if (num == 6){
      return "sixth";
    }
  }

  function voiceStartCallback() {
    console.log("start");
    annyang.abort();
  }

  function voiceEndCallback() {
    console.log("end");
    annyang.start({autoRestart: true, continuous: false});
  }

  function toggleListening(){
    if (isListening){
      annyang.abort();
      $(".button").html("<span>Not Listening</span>");
    }
    else{
      annyang.start({autoRestart: true, continuous: false});
      $(".button").html("<span>Listening</span>");
    }
    isListening = !isListening;
  }

  function say(message){
    console.log("saying something");
    var parameters = {
      onstart: voiceStartCallback,
      onend: voiceEndCallback
    }
    responsiveVoice.speak(message,"UK English Female",parameters);
  }

  annyang.addCommands(commands);

  toggleListening();

  annyang.addCallback('result', function(phrases) {
    console.log("I think the user said: ", phrases[0]);
    console.log("But then again, it could be any of the following: ", phrases);
  });

}
else{
  $(".button").html("<span>Device Not Supported</span>");
}
