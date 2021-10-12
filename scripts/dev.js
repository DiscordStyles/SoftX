// Used to build scss files to the BetterDiscord themes folder.

const chokidar = require('chokidar');
const path = require('path');
const compile = require('./compile');

const dataFolder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME + "/.local/share");
const themesFolder = path.join(dataFolder, 'BetterDiscord', 'themes');

const arg = process.argv.filter(el => el.includes('--target'))[0]?.replace('--target=', '');

chokidar.watch('src', {persistent: true})
	.on('ready', () => console.log('[SoftX] Watching for changes...'))
	.on('change', () => {
		if (!arg || arg === 'theme') {
			compile({
				target: ['src', 'SoftX.theme.scss'],
				output: [themesFolder, 'SoftX.theme.css']
			});
		}
		if (!arg || arg === 'radialglow') {
			compile({
				target: ['src', 'RadialGlow.theme.scss'],
				output: [themesFolder, 'RadialGlow.theme.css']
			})
		}
	});