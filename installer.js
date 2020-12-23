const electronInstaller = require('electron-winstaller');


// NB: Use this syntax within an async function, Node does not have support for
//     top-level await as of Node 12.
async function compiler() {
	try {
	  await electronInstaller.createWindowsInstaller({
	    appDirectory: '/var/www/nicoldesktop/release-builds/Insurance-win32-ia32',
	    outputDirectory: '/var/www/nicoldesktop/release-builds/Insurance-win32-ia32/installer',
	    authors: 'NICOL Devs',
	    exe: 'Insurance.exe',
	    iconUrl: '/var/www/nicoldesktop/assets/icons/win/icon.ico', 
	    setupIcon: '/var/www/nicoldesktop/assets/icons/win/icon.ico',
	    setupExe: 'NICOL.exe',
	    setupMsi: 'NICOL.exe'
	  });
	  console.log('It worked!');
	} catch (e) {
	  console.log(`No dice: ${e.message}`);
	}
}

compiler()
