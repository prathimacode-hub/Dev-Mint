
const okBtn = document.getElementById('ok');

const getWord = () => {
  const word = document.getElementById('search-box').value;
  if (word === "") {
    alert("Harami,Please Enter a word");
    document.getElementById('search-box').value = '';
    return;
  }
  const outputBox = document.getElementById('hidden');
  const done = document.getElementById('done');
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    
    .then(response => response.json())
    
    .then((res) => {
      meaning.innerHTML =`<p> <span style="text-decoration:underline ">Meaning </span>:  ${res[0].meanings[0].definitions[0].definition} </p>`;
      const dum1 = res[0].meanings[0].synonyms[0];
      const dum2 = res[0].meanings[0].partOfSpeech;
      if (dum1 !== undefined) {
        meaning.innerHTML += `<p> <span style="text-decoration:underline ">Synonym </span>:  ${dum1}</p>`;
      }
      if (dum2 !== undefined) {
        meaning.innerHTML +=`<p> <span style="text-decoration:underline ">Part of Speech </span>:  ${dum2} </p>`;
      }
      outputBox.classList.remove('hide');
      console.log(res[0].meanings[0].synonyms[0]);

      document.getElementById('done').addEventListener('click', () => {
        document.getElementById('search-box').value = '';
        outputBox.classList.add('hide');
      });
    }
    )
    .catch((error) => {
      meaning.innerText = "Sorry this word cannot be found 😢!";
      outputBox.classList.remove('hide');
      document.getElementById('done').addEventListener('click', () => {
        document.getElementById('search-box').value = '';
        outputBox.classList.add('hide');
      });
    });
}

okBtn.addEventListener('click',getWord)