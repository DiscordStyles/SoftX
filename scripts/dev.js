// Used to build scss files to the BetterDiscord themes folder.

const chokidar = require('chokidar');
const path = require('path');
const compile = require('./compile');

const dataFolder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME + "/.local/share");
const themesFolder = path.join(dataFolder, 'BetterDiscord', 'themes');

chokidar.watch('src', {persistent: true})
	.on('ready', () => console.log('[SoftX] Watching for changes...'))
	.on('change', () => {
		compile({
			target: ['src', 'SoftX.theme.scss'],
			output: [themesFolder, 'SoftX.theme.css']
		})
	});