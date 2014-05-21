var extractor = require('./extractor')

extractor(['http://news.sky.com/feeds/rss/home.xml','http://feeds.bbci.co.uk/news/rss.xml'],function(results){
                console.log("RESULTADOS:"+JSON.stringify(results))
                })

