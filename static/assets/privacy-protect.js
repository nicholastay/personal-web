// For context, see:
// https://krausefx.com/blog/announcing-inappbrowsercom-see-what-javascript-commands-get-executed-in-an-in-app-browser

var protectDisarm = false;
var protectWarned = false;

function protectWarn() {
	if (protectWarned)
		return;
	var hl = document.getElementById("head-line");
	hl.innerHTML = "<div class='page'><b>Privacy Warning</b><p>The browser you are using may be unsafe - unintended JavaScript modifications have been detected and blocked.</p><p>It is likely that you are browsing from a mobile social media client, such as Facebook. I recommend that you 'open in an external browser', such as Safari to avoid tracking.</p><p>For more context, please see my blog post about iOS web view tracking. Stay safe!</p></div>";
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
}

// TODO: Find a better way.
window._NTProtectDisarm = function() { protectDisarm = true; }

// Ensure random event listeners aren't added.
// (complete block since we don't use)
HTMLDocument.prototype.addEventListener = protectWarn;