/** @type {import('bd-scss/lib/config').Config} */
export default {
	meta: {
		name: 'SoftX',
		author: 'Gibbu',
		version: '2.0.0',
		description: 'A soft and comfy feel for Discord.',
		source: 'https://github.com/DiscordStyles/SoftX',
		invite: 'ZHthyCw'
	},
	github: 'DiscordStyles',
	imports: [{ url: 'https://discordstyles.github.io/Addons/windows-titlebar.css' }],
	addons: [
		{ target: 'src/addons/_radialglow.scss', name: 'RadialGlow', dist: true },
		{ target: 'src/addons/_serverrings.scss', name: 'ServerRings', dist: true, dev: true }
	]
};
