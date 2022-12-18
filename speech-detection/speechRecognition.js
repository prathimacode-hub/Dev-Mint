
if ("webkitSpeechRecognition" in window) {
    // Initialize webkitSpeechRecognition
    let speechRecognition = new webkitSpeechRecognition();
  
    // String for the Final Transcript
    let final_transcript = "";
  
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
  
    // Callback Function for the onStart Event
    speechRecognition.onstart = () => {
      // Show the Status Element
      document.querySelector("#status").style.display = "block";
    };
    speechRecognition.onerror = () => {
      // Hide the Status Element
      document.querySelector("#status").style.display = "none";
    };
    speechRecognition.onend = () => {
      // Hide the Status Element
      document.querySelector("#status").style.display = "none";
    };
  
    speechRecognition.onresult = (event) => {
      // Create the interim transcript string locally because we don't want it to persist like final transcript
      let interim_transcript = "";
  
      // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
  
      // Set the Final transcript and Interim transcript.
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
    };
  
    // Set the onClick property of the start button
    document.querySelector("#start").onclick = () => {
      // Start the Speech Recognition
      speechRecognition.start();
    };
    // Set the onClick property of the stop button
    document.querySelector("#stop").onclick = () => {
      // Stop the Speech Recognition
      speechRecognition.stop();
    };
  } else {
    console.log("Speech Recognition Not Available");
  }