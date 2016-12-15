chrome.app.runtime.onLaunched.addListener(function() {
 chrome.app.window.create('dist/index.html', {
   'id': 'app_window',
   state: 'fullscreen'
 });
});
