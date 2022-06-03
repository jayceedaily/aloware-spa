/**
 * 
 * @param {*} username 
 * @returns 
 */
export default function(username) {
	return [
		{
			label: 'Edit Thread',
			icon: {
				name: 'PencilAltIcon',
				type: 'outline'
			},
			event: 'edit',
		},
		{
			label: 'Turn On Notification',
			icon: {
				name: 'BellIcon',
				type: 'outline'
			},
			event: 'notify',
		},
		{
			label: `Unfollow @${username}`,
			icon: {
				name: 'UserRemoveIcon',
				type: 'outline'
			},
			event: 'unfollow',
		},
		{
			label: `Mute @${username}`,
			icon: {
				name: 'VolumeOffIcon',
				type: 'outline'
			},
			event: 'mute',
		},
		{
			label: `Embed Thread`,
			icon: {
				name: 'CodeIcon',
				type: 'outline'
			},
			event: 'mute',
		},
		{
			label: `Report Thread`,
			icon: {
				name: 'FlagIcon',
				type: 'outline'
			},
			event: 'report',
		},
	];
}