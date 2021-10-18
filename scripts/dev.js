// Used to build scss files to the BetterDiscord themes folder.

const chokidar = require('chokidar');
const path = require('path');
const compile = require('./compile');
const {name, dev} = require('./config.json');

const dataFolder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME + "/.local/share");
const themesFolder = path.join(dataFolder, 'BetterDiscord', 'themes');

chokidar.watch('src', {persistent: true})
	.on('ready', () => console.log(`[${name}] Watching for changes...`))
	.on('change', () => {
		console.clear();

		compile({
			target: dev.target,
			output: [themesFolder, `${name}.theme.css`]
		});
	});