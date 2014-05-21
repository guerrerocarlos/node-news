var FeedParser = require('feedparser')
  , request = require('request');

async = require('async')

module.exports = function(urls,finalize){
var results = {}
var ended = 0

async.eachSeries(urls,function(url,callback){

console.log("### getting: "+url)

results[url] = []

var req = request(url)
  , feedparser = new FeedParser();

req.on('error', function (error) {
  // handle any request errors
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});
count = 0;
                
var articles_callback = function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;
  count++;
  while (item = stream.read()) {
    if(count<=10){
      console.log(item.title);
      thisitem= {}
      thisitem['title'] = item.title
      thisitem['description'] = item.description
      thisitem['link'] = item.link
      results[url].push(thisitem)
    }
  }
}

feedparser.on('readable', articles_callback) 

feedparser.on('end', function(){ callback(null) 

  ended++;
  if(ended>=urls.length){
     finalize(results)
  }

})

},
function(err){
  if(err)
    console.log(err)
  return results
}
)}

