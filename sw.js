self.addEventListener("push", function (event) {
    console.log("Push event received:", event);

    if (!event.data) {
        console.log("No data in push event");
        return;
    }

    try {
        const data = event.data.json();
        console.log("Push data:", data);

        const title = data.title || "새 메시지";
        const options = {
            body: data.body || "내용이 없습니다",
            tag: "skapi-notification",
            requireInteraction: false,
            vibrate: [200, 100, 200],
        };

        console.log("Showing notification:", title, options);
        event.waitUntil(self.registration.showNotification(title, options));
    } catch (error) {
        console.error("Error processing push event:", error);
    }
});

self.addEventListener("notificationclick", function (event) {
    console.log("Notification clicked:", event);
    event.notification.close();

    let url = event.target.location
        ? event.target.location.origin
        : self.location.origin;
    event.waitUntil(clients.openWindow(url));
});

// Service worker activation
self.addEventListener("activate", (event) => {
    console.log("Service worker activated");
    event.waitUntil(clients.claim());
});

// Service worker installation
self.addEventListener("install", (event) => {
    console.log("Service worker installed");
    self.skipWaiting();
});
