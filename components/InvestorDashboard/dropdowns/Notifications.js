// Library imports
import Link from "next/link";
import GeneralLoader from "@/components/GenreralLoader";

// Icons
import { X, Bell, Checks } from "@phosphor-icons/react/dist/ssr";

const Notifications = ({ onClose, notifications }) => {
  function calculateTimeAgo(createdAt) {
    if (!createdAt) return "";

    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const delta = Math.floor((now - createdAtDate) / 1000); // Seconds

    if (delta < 60) {
      if (delta === 1) {
        return "1 sec ago";
      }
      return `${delta} sec ago`;
    } else if (delta < 3600) {
      const minutes = Math.floor(delta / 60);
      if (minutes === 1) {
        return "1 min ago";
      }
      return `${minutes} min ago`;
    } else if (delta < 86400) {
      const hours = Math.floor(delta / 3600);
      if (hours === 1) {
        return "1 hour ago";
      }
      return `${hours} hour ago`;
    } else if (delta < 604800) {
      // Less than 7 days
      const days = Math.floor(delta / 86400);
      if (days === 1) {
        return "1 day ago";
      }
      return `${days} days ago`;
    } else if (delta < 2419200) {
      // Less than 4 weeks
      const weeks = Math.floor(delta / 604800);
      if (weeks === 1) {
        return "1 week ago";
      }
      return `${weeks} weeks ago`;
    } else if (delta < 31536000) {
      //Less than 1 year
      const months = Math.floor(delta / 2592000);
      if (months === 1) {
        return "1 month ago";
      }
      return `${months} months ago`;
    } else {
      const years = Math.floor(delta / 31536000);
      if (years === 1) {
        return "1 year ago";
      }
      return `${years} years ago`;
    }
  }

  return (
    <div className="absolute top-20 z-50 space-y-1 shadow-lg bg-greyBg right-3 md:right-14 rounded-md w-[95%] md:w-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 bg-backgroundPrimary rounded-tl-md rounded-tr-md">
        <div className="flex gap-1 items-center">
          <h2 className="font-medium">Notifications</h2>
          <span className="w-5 h-5 rounded-full bg-formPrimary flex items-center justify-center text-white text-xs">
            <span>{notifications.length}</span>
          </span>
        </div>

        <X size={20} onClick={onClose} className="font-medium" />
      </div>

      {/* Content */}

      {notifications?.length === 0 ? (
        <div className="h-[300px] flex flex-col justify-center bg-backgroundPrimary shadow-lg">
          <div className="text-center space-y-3 mx-auto w-4/5 ">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-teal">
              <Bell size={40} className="text-formPrimary" />
            </div>

            <p className="text-xs">
              No new notifications at the moment. We&apos;ll keep you updated on
              your investments, transactions, and milestones as they happen.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[420px] md:h-[500px] overflow-scroll scrollable-box space-y-1 bg-transparent shadow-lg">
          {notifications.map((notification, index) => (
            <div key={index} className="px-5 py-2 space-y-2 bg-backgroundPrimary">
              {/* Notification header */}
              <h1 className="text-xs font-medium">{notification.title}</h1>

              {/* Notification body */}
              <div className="space-y-2">
                <p className="text-xs">{notification.body}</p>

                {notification.cta && (
                  <Link
                    href={notification?.cta}
                    className="text-white bg-formPrimary p-2 rounded-md text-xs inline-block"
                  >
                    {notification?.cta?.text}
                    Check Investments
                  </Link>
                )}
              </div>

              {/* Notification footer */}
              <p className="text-xs text-grey">
                {calculateTimeAgo(notification?.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col items-center px-5 py-3 bg-backgroundPrimary rounded-bl-md rounded-br-md">
        <button className="flex gap-1 items-center justify-center text-xs text-formPrimary">
          <Checks size={15} />
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default Notifications;
