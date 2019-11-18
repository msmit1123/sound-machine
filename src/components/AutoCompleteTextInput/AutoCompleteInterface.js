function autoCompleteInterface(urlToAPI, requestDataObj) {
  //set up a new AJAX request
  const req = new XMLHttpRequest();

  //build data into the request
  const data = new FormData();
  for (let key in requestDataObj) {
    data.append(key, requestDataObj[key]);
  }

  // available options the php api will accept:
  // type: sets the type
  //  -name: will return an array of the name column
  //  -name-all: will return an object of each row as an object

  // term: sets search term

  // input: document.getElementById(opt.target),
  // wrap: document.getElementById('acWrap' + id),
  // box: document.getElementById('acBox' + id),

  // delay: opt.delay ? opt.delay : 500,
  // url: opt.url,
  // min: opt.min ? opt.min : 2,
  // data: opt.data ? opt.data : null,
  // fetch: opt.fetch ? opt.fetch : null,
  // select: opt.select ? opt.select : null,
  // timer: null
  // data.append('term', suggest.instance[id].input.value);
  // if (suggest.instance[id].data) {
  //   for (let key in suggest.instance[id].data) {
  //     data.append(key, suggest.instance[id].data[key]);
  //   }
  // }

  req.open('POST', urlToAPI);
  req.send(data);

  //define a function of what to do when a response is received
  req.onload = () => {
    if (req.status !== 200) {
      // if there is an error response
      console.log(`Error ${req.status}: ${req.statusText}`);
    } else {
      // show the result
      let APIResponse = JSON.parse(req.response);
      return APIResponse;
    }
  };
}

function selectionCallback() {}

export { autoCompleteInterface, selectionCallback };

//
//
//
//
//
//
//
//
//
/*
if (this.props.APIList) {
  //suggestionsList = this.props.APIList;
  const req = new XMLHttpRequest();

  //build a data request
  var data = new FormData();
  data.append('type', 'name'); //name returns an array of the names or name-all to get the whole row
  data.append('term', userInput); //search term
  // set up these options for the API request
  // input: document.getElementById(opt.target),
  // wrap: document.getElementById('acWrap' + id),
  // box: document.getElementById('acBox' + id),
  // delay: opt.delay ? opt.delay : 500,
  // url: opt.url,
  // min: opt.min ? opt.min : 2,
  // data: opt.data ? opt.data : null,
  // fetch: opt.fetch ? opt.fetch : null,
  // select: opt.select ? opt.select : null,
  // timer: null
  // data.append('term', suggest.instance[id].input.value);
  // if (suggest.instance[id].data) {
  //   for (let key in suggest.instance[id].data) {
  //     data.append(key, suggest.instance[id].data[key]);
  //   }
  // }

  req.open(
    'POST',
    'http://mikiesmit.com/fun/das-sound-machine/test2/read-DB.php'
  );
  req.send(data);

  //what to do when a response is received
  req.onload = () => {
    if (req.status !== 200) {
      // if there is an error response
      console.log(`Error ${req.status}: ${req.statusText}`);
    } else {
      // show the result
      let suggestionsList;
      suggestionsList = JSON.parse(req.response);
      if (Array.isArray(suggestionsList)) {
        this.filterSuggestions(suggestionsList, userInput);
      }
    }
  };
}
*/
