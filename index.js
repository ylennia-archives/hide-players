// OPCODE REQUIRED :
// - C_SET_VISIBLE_RANGE
// - S_SPAWN_USER

module.exports = function HidePlayers(dispatch) {

	let enable = true,
		visibleRange = 0

	// command
	try {
		const Command = require('command')
		const command = Command(dispatch)
		command.add('hide', () => {
			enable = !enable
			refreshNearbyPlayers()
			send(`Hide players ${enable ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'}<font>.</font>`)
		})
		function send(msg) {
			command.message(`[hide-players] : ` + msg)
		}
	} catch (e) {
		console.log(`[ERROR] -- hide-players module --`)
	}

	// code
	dispatch.hook('C_SET_VISIBLE_RANGE', (event) => { visibleRange = event.range })
	
	dispatch.hook('S_SPAWN_USER', () => { if (enable) return false })

	function refreshNearbyPlayers() {
		dispatch.toServer('C_SET_VISIBLE_RANGE', { range: 1 })
		setTimeout(() => {
			dispatch.toServer('C_SET_VISIBLE_RANGE', { range: visibleRange })
		}, 1000)
	}
	
}
