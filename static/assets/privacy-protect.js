// For context, see:
// https://krausefx.com/blog/announcing-inappbrowsercom-see-what-javascript-commands-get-executed-in-an-in-app-browser

var protectDisarm = false;
var protectWarned = false;

function protectWarn() {
	if (protectWarned)
		return;
	var hl = document.getElementById("head-line");
	hl.innerHTML = "<div class='page'><b>Privacy Warning</b><p>The browser you are using <i>may</i> be unsafe - unintended JavaScript modifications have been detected and blocked.</p><p>"
		+ (!window.navigator.userAgent.includes("like Mac OS X") // iOS-like device
			? "It is likely that you are browsing from a mobile social media client, such as Facebook. I recommend that you 'open in an external browser', such as Safari to avoid tracking - not just for this website, but going forward as well.</p><p>Otherwise, you may be on an iOS third-party browser - which <i>should</i> be OK."
			: "You may be running some extensions or userscripts - as long as you are aware, those should be OK. If you are on mobile and on an 'in-app' browser, beware - there may be injected scripts!</p><p>")
		+ " For more context, please see my blog post about iOS web view tracking. Stay safe!</p></div>";
	hl.style.backgroundColor = "#fcffa6";
	hl.style.height = "auto";
	hl.style.padding = "5px";
	protectWarned = true;
}

// Ensure random scripts aren't added.
var origCE = HTMLDocument.prototype.createElement;
HTMLDocument.prototype.createElement = function() {
	if (!protectDisarm && arguments[0] == "script")
		protectWarn();
	else
		return origCE.apply(this, arguments);
};

// TODO: Find a better way.
window._NTProtectDisarm = function() { protectDisarm = true; }

// Ensure random event listeners aren't added.
HTMLDocument.prototype.addEventListener = function(t, cb) {
	// Hugo dev hot-reload
	if (t == "LiveReloadShutDown")
		return;
	// iOS Chrome
	if (t == "submit" || cb.toString().includes("__gCrWeb"))
		return;
	protectWarn();
};