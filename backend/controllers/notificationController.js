const Notification = require("../models/Notification");

// ✅ Get all notifications for the logged-in user
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};

// ✅ Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, recipient: req.user.id },
            { isRead: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Error updating notification", error: error.message });
    }
};

// ✅ Mark all notifications as read for the user
exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany({ recipient: req.user.id, isRead: false }, { isRead: true });
        res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Error updating notifications", error: error.message });
    }
};

// ✅ Create a notification (Internal usage or Admin)
exports.createNotification = async (recipientId, title, message, type, link) => {
    try {
        // Handle if recipientId is a populated user object
        const targetId = recipientId._id || recipientId;

        const newNotification = new Notification({
            recipient: targetId,
            title,
            message,
            type,
            link,
        });
        await newNotification.save();
        return newNotification;
    } catch (error) {
        console.error("Error creating notification:", error.message);
    }
};

// ✅ Delete a specific notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            recipient: req.user.id,
        });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification", error: error.message });
    }
};
