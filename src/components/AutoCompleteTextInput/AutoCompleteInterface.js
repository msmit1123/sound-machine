function AutoCompleteInterface(obj) = {
  //set up a new AJAX request
  const req = new XMLHttpRequest();

  //build data into the request
  var data = new FormData();
  for(let key in obj){
    data.append(key,obj[key])
  }
  
  // available options the php api will accept:
  // type: sets the type of request.
  //  -name: will return an array of the name column
  //  -name-all:
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

export default AutoCompleteInterface
