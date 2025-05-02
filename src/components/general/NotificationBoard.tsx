function NotificationBoard() {
    return (
        <div className="w-[400px] h-[300px] overflow-y-auto bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-bold text-purple-600">Notification Board</h2>
            {/* Notification items */}
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </div>
    );
}
export default NotificationBoard;

function Notification() {
    return (
        <div className="border-b border-gray-200 py-2">
            <h3 className="text-lg font-medium">TitleHaha</h3>
            <h4 className="text-sm text-gray-600">Banh Mi ram ram ram ram ram ram ram rarmBanh Mi ram ram ram ram ram ram ram rarmBanh Mi ram ram ram ram ram ram ram rarm</h4>
            <p className="text-xs text-gray-400 mt-2">30/4/1975</p>
        </div>
    );
}