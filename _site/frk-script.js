if (annyang) {

  var isListening = false;

  var serialEven = false;
  var serialVowel = false;
  var batteries = 0;
  var isFrk = false;

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

      if (countInArray(allWires,"red") > 1 && !serialEven){
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

      if (allWires[4] == "black" && !serialEven){
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
      if (!allWires.includes("yellow") && !serialEven){
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
    else{
      batteries = amount;
      say("batteries " + amount);
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
    else if (text = "detonate" && batteries >= 1){
      console.log("detonate");
      say("press and release");
    }
    else if (isFrk && batteries >= 2){
      console.log("frk");
      say("press and release");
    }
    else{
      say("hold");
    }
  }

  var test = function(){say('test');}

  var commands = {
    'wires *wirelist': doWires,
    'batteries :amount': evalBatteries,
    'push button :color :text': doButton,
    'serial number *serial': evalSerial,
    'indicator :frkyesno': evalFrk,
    'test': test
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
