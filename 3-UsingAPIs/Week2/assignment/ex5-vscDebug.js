/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-5-using-the-vscode-debugger

Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName.en}`);
  if (birth) {
    console.log(
      `Birth: ${birth?.date || 'Unknown'}, ${birth?.place?.locationString || 'Unknown'}`
    );
  } else {
    console.log(`Birth: Unknown`);
  }
  if (death) {
    console.log(
      `Death: ${death?.date || 'Unknown'}, ${death?.place?.locationString || 'Unknown'}`
    );
  } else {
    console.log(`Death: still alive`);
  }
}

function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );

    if (Array.isArray(data.laureates)) {
      renderLaureates(data.laureates);
    } else {
      console.error('No laureates found.');
    }
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}

fetchAndRender();
