// Fail sw.js - Diletakkan di dalam folder fyp-web-app
self.addEventListener('push', function(event) {
	let payload = {
		title: '🚨 AMARAN KECEMASAN!',
		body: 'Butang panik telah ditekan! Bantuan diperlukan segera.',
		url: '/'
	};

	if (event.data) {
		try {
			payload = event.data.json();
		} catch (e) {
			payload.body = event.data.text();
		}
	}

	const options = {
		body: payload.body,
		icon: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
		badge: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
		tag: 'emergency-panic-alert',
		renotify: true,
		requireInteraction: true,
		vibrate: [500, 200, 500, 200, 500, 200, 1000],
		data: {
			url: payload.url || '/'
		}
	};

	event.waitUntil(
		self.registration.showNotification(payload.title, options)
	);
});

self.addEventListener('notificationclick', function(event) {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
			for (let i = 0; i < clientList.length; i++) {
				let client = clientList[i];
				if ('focus' in client) {
					return client.focus();
				}
			}
			if (clients.openWindow) {
				return clients.openWindow(event.notification.data.url || '/');
			}
		})
	);
});
