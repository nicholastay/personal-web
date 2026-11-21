// For context, see:
// https://krausefx.com/blog/announcing-inappbrowsercom-see-what-javascript-commands-get-executed-in-an-in-app-browser

var protectDisarm = false;
var protectWarned = false;

function protectWarn() {
	if (protectWarned)
		return;
	var hl = document.getElementById("head-line");
	hl.innerHTML = "<div class='page'><b>Privacy Warning</b>: unintended JavaScript modifications have been detected and blocked. <a href=\"/2022/09/13/ios-webview-privacy/\">Learn more</a></div>"
	hl.classList.add("privacy");
	protectWarned = true;
}

// Ensure random scripts aren't added.
var origCE = HTMLDocument.prototype.createElement;
HTMLDocument.prototype.createElement = function() {
	console.log("[privacy-protect] createElement", arguments);
	if (!protectDisarm && arguments[0] == "script")
		protectWarn();
	else
		return origCE.apply(this, arguments);
};

// TODO: Find a better way.
window._NTProtectDisarm = function() { protectDisarm = true; }

// Ensure random event listeners aren't added.
HTMLDocument.prototype.addEventListener = function(t, cb) {
	console.log("[privacy-protect] addEventListener", arguments);
	// Hugo dev hot-reload
	if (t == "LiveReloadShutDown")
		return;
	// iOS Chrome
	if (t == "submit" || cb.toString().includes("__gCrWeb"))
		return;
	protectWarn();
};