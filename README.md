
# level-mirror

Mirror and optionally transform data from one sublevel into another.

[![build status](https://secure.travis-ci.org/juliangruber/level-mirror.png)](http://travis-ci.org/juliangruber/level-mirror)

## Example

Mirror the posts collection to the `home` sublevel and only include `title`
and `slug` there, because the homepage doesn't display a post's content.

```js
var level = require('level-test')();
var sub = require('level-sublevel');
var mirror = require('level-mirror');

var db = sub(level('db', {
  valueEncoding: 'json'
}));

// pass a function
mirror(db.sublevel('posts'), db.sublevel('home'), function(post) {
  return {
    title: post.title,
    slug: post.slug
  };
});

// OR an array of properties
mirror(db.subevel('posts'), db.sublevel('home'), ['title', 'slug']);

var id = '1337';

db.sublevel('posts').put(id, {
  title: 'A post',
  slug: 'a-post',
  text: 'Food truck laborum minim Pinterest tempor, elit Blue Bottle cliche tofu deep v officia. Sartorial consectetur cillum, in nesciunt McSweeney\'s consequat adipisicing +1 fanny pack letterpress PBR elit. Church-key Banksy actually, retro squid bicycle rights pork belly accusamus. Sed irure Schlitz Helvetica freegan vegan, pork belly sriracha pug synth consectetur laboris +1 bespoke. Ut sapiente American Apparel, do eu swag dolore 90\'s PBR seitan scenester umami blog. Fashion axe ut occaecat vinyl sunt. Chillwave proident consequat ugh commodo American Apparel YOLO, PBR Carles adipisicing culpa.'
}, function(err) {
  if (err) throw err;

  db.sublevel('home').get(id, console.log);
  // null { title: 'A post', slug: 'a-post' }
});
```

## API

### mirror(a, b[, transform])

From the point you call `mirror` on, all operations performed on sublevel `a`
will be mirrored onto sublevel `b`.

If you pass in `transform`, the changes' values will be transformed on
the fly by the function. It receives the current value and is expected to
return the potentially modified value. If it returns `undefined`, the change
will be dropped.

`transform` can also be an array, in which case it limits values to the keys
contained in it.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install level-mirror
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
