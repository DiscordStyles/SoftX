const sass = require('sass');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

/**
 * Compile, autoprefix and save SCSS.
 * @param {string} target The file to be compiled
 * @param {...string} output The destination and name of the file.
 */
module.exports = (target, ...output) => {
	console.log(`[SoftX] Building ${target} file...`);

	sass.render({
		file: target,
		outputStyle: 'expanded',
	}, (error, result) => {
		if (error) {
			console.error(error);
			return false;
		}

		const css = Buffer.from(result.css).toString();

		postcss([autoprefixer])
			.process(css, {
				from: undefined,
				to: undefined
			})
			.then(postcssRes => {
				fs.writeFile(path.join(...output), postcssRes.css, (err) => {
					if (err) console.error(err);
					else console.log(`[SoftX] Successfully built ${target} file. (${(result.stats.duration/60000 * 60).toFixed(2)}s)`);
				})
			})
	})
}