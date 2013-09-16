var level = require('level-test')();
var sub = require('level-sublevel');
var mirror = require('./');

var db = sub(level('db', {
  valueEncoding: 'json'
}));

mirror(db.sublevel('posts'), db.sublevel('home'), function(post) {
  return {
    title: post.title,
    slug: post.slug
  };
});

var id = '1337';

db.sublevel('posts').put(id, {
  title: 'A post',
  slug: 'a-post',
  text: 'Food truck laborum minim Pinterest tempor, elit Blue Bottle cliche tofu deep v officia. Sartorial consectetur cillum, in nesciunt McSweeney\'s consequat adipisicing +1 fanny pack letterpress PBR elit. Church-key Banksy actually, retro squid bicycle rights pork belly accusamus. Sed irure Schlitz Helvetica freegan vegan, pork belly sriracha pug synth consectetur laboris +1 bespoke. Ut sapiente American Apparel, do eu swag dolore 90\'s PBR seitan scenester umami blog. Fashion axe ut occaecat vinyl sunt. Chillwave proident consequat ugh commodo American Apparel YOLO, PBR Carles adipisicing culpa.'
}, function(err) {
  if (err) throw err;

  db.sublevel('home').get(id, console.log);
});
