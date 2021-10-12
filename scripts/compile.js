const sass = require('sass');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

/**
 * Compile, autoprefix and save SCSS.
 * @param {Object} options
 * @param {string[]} options.target The path of the file to be compiled. Uses `path.join()`.
 * @param {string[]} options.output The destination and name of the file. Uses `path.join()`.
 */
module.exports = (options) => {
	console.log(`[SoftX] Building ${options.target.join('/')} file...`);

	sass.render({
		file: path.join(...options.target),
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
				fs.writeFile(path.join(...options.output), postcssRes.css.replace('@charset "UTF-8";\n', ""), (err) => {
					if (err) console.error(err);
					else console.log(`[SoftX] Successfully built ${options.target.join('/')} file. (${(result.stats.duration/60000 * 60).toFixed(2)}s)`);
				})
			})
	})
}