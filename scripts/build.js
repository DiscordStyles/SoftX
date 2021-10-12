// GitHub action used to build scss files to the dist folder.

const sass = require('sass');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

console.log('[SoftX] Building SoftX.css file...');

sass.render({
	file: 'src/_base.scss',
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
			fs.writeFile(path.join('dist', 'SoftX.css'), postcssRes.css.replace('@charset "UTF-8";\n', ""), (err) => {
				if (err) console.error(err);
				else console.log(`[SoftX] Successfully built SoftX.css file. (${(result.stats.duration/60000 * 60).toFixed(2)}s)`);
			})
		})
})