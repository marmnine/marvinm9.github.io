import { Elm } from './../Main.elm'

var app = Elm.Main.init({
  node: document.querySelector('main'),
  flags: Date.now()
})

/*
window.addEventListener('scroll', function(e) {
  app.ports.scrolling.send(window.scrollY);
});
*/