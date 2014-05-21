var express = require('express');
var router = express.Router();
var extractor = require('../extractor')

var news
news_sources = ['http://news.sky.com/feeds/rss/home.xml','http://feeds.bbci.co.uk/news/rss.xml']
extractor(news_sources,function(results){news = results})

/* GET home page. */
router.get('/', function(req, res) {
  
  res.render('index', { title: "Latest news from BBC and SKY", c: news, sources: news_sources});

});

module.exports = router;
