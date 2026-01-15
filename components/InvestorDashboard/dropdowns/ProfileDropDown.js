// Library imports
import Link from "next/link";
import Image from "next/image";

// Icons
import { SignOut } from "@phosphor-icons/react/dist/ssr";

const ProfileDropDown = ({ name, signOut }) => {
  return (
    <div className="absolute top-16 z-50 py-5 space-y-3 shadow-lg right-0 bg-backgroundPrimary rounded-md w-[240px]">
      {/* Haeder */}
      <div className="flex items-center gap-2 px-5">
        <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center">
          <Image
            src={`/Images/TestDp.svg`}
            width={30}
            height={30}
            alt="Test Dp"
          />
        </div>

        <div>
          <h2 className="text-sm font-medium truncate capitalize">{name}</h2>
          <p className="text-sm text-grey">Investor</p>
        </div>
      </div>

      <div className="h-[1px] bg-[#F2F4F7]"></div>

      <ul className="px-5 space-y-2">
        <li>
          <Link
            href={`/dashboard/settings`}
            className="text-[#344054] text-sm "
          >
            Edit profile
          </Link>
        </li>
        <li>
          <Link
            href={`/dashboard/settings`}
            className="text-[#344054] text-sm "
          >
            Settings
          </Link>
        </li>
      </ul>

      <div className="h-[1px] bg-[#F2F4F7]"></div>

      <div className="px-5">
        <button
          type="button"
          className="flex items-center gap-2 text-error text-sm"
          onClick={signOut}
        >
          <SignOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropDown;
