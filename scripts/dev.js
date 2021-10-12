// Used to build scss files to the BetterDiscord themes folder.

const chokidar = require('chokidar');
const sass = require('sass');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const dataFolder = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME + "/.local/share");
const themesFolder = path.join(dataFolder, 'BetterDiscord', 'themes');

chokidar.watch('src', {persistent: true})
	.on('ready', () => console.log('[SoftX] Watching for changes...'))
	.on('change', () => {
		sass.render({
			file: 'src/SoftX.theme.scss',
			outputStyle: 'expanded'
		}, (err, result) => {
			if (err) {
				console.error(err);
				return false;
			}

			const newRes = Buffer.from(result.css).toString();
		
			postcss([autoprefixer])
				.process(newRes, {
					from: undefined,
					to: undefined
				})
				.then(postcssRes => {
					fs.writeFile(path.join(themesFolder, 'SoftX.theme.css'), postcssRes.css.replace('@charset "UTF-8";\n', ""), (err) => {
						if (err) console.error(err);
						else console.log(`[SoftX] Built css file. (${(result.stats.duration/60000 * 60).toFixed(2)}s)`);
					})
				})
		})
	})