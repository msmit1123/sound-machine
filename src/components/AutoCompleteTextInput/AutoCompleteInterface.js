const autoCompleteInterface = {
  fetchData: (urlToAPI, requestDataObj) => {
    //build data into the request
    const data = new FormData();
    for (let key in requestDataObj) {
      data.append(key, requestDataObj[key]);
    }
    /**
     * API NOTES for:
     * 'http://mikiesmit.com/fun/das-sound-machine/test2/read-DB.php'
     * available options the api will accept:
     */

    let promise = new Promise((resolve, reject) => {
      //set up a new AJAX request
      const req = new XMLHttpRequest();
      req.open('POST', urlToAPI);

      //define a function of what to do when a response is received error or complete
      req.onerror = () =>
        reject(console.log(`Error ${req.status}: ${req.statusText}`)); // on error, log

      req.onload = () => resolve(JSON.parse(req.response)); // on success parse and return the response

      req.send(data);
    });

    return promise;
  },

  handleRequest: async (
    urlToAPI, // url to API
    requestDataObj, // Data to be sent to server
    requestOptions // options handled client side
  ) => {
    // create a client side options object to either populate with specified request options or defaults
    let options = requestOptions ? requestOptions : {};
    options.minChars = options.minChars ? options.minChars : 1; //set the minimum number of characters required to trigger a call
    options.delay = options.delay ? options.delay : 500; //set the delay between calls so it doesn't spam the server
    options.timerLoc = options.timerLoc ? options.timerLoc : window; //set a location to attach the timer to. Ideally the input being autofilled is passed in. as a fallback, attach to the window.

    //if a timer was already running, clear it
    if (options.timerLoc.timer !== null) {
      clearTimeout(options.timerLoc.timer);
    }

    // create a promise and link it to the timer
    let promise = new Promise((resolve, reject) => {
      //start a new client side timer in case user is typing, server doesn't get spammed with requests until user stops typing, at which point it only sends the final request
      try {
        options.timerLoc.timer = setTimeout(() => {
          resolve(autoCompleteInterface.fetchData(urlToAPI, requestDataObj));
        }, options.delay);
      } catch (error) {
        console.log(error);
      }
    });
    return promise;
  }
};

function onSelectionCallback() {}

export { autoCompleteInterface, onSelectionCallback };
