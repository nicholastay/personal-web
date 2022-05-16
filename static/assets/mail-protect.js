var mailData = '85807482219172963994808575738392847621857691';

var mailMatch = mailData.match(/.{1,2}/g);
var mailD = '';
for (var i = 0; i < mailMatch.length; ++i) {
	mailD += String.fromCharCode(Number(mailMatch[i])+25);
}
document.getElementById('mail').onclick = null;
document.getElementById('mail-protect').innerText = mailD;
document.getElementById('mail').href = 'mailto:' + mailD;