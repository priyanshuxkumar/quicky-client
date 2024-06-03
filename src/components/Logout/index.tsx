"use client";

const Logout = ({handleLogout , handleLogoutPageOpenState}) => {
  return (
    <div className="w-1/4 rounded-2xl py-8 px-8 bg-white dark:bg-black/80 z-50">
      <div className="my-4">
        <p className="font-semibold text-2xl  text-black dark:text-white">
          Logout of Quicky?
        </p>
        <p className="font-medium text-sm mt-2  text-black dark:text-white">Are you sure want to Logout ?</p>
      </div>
      <div onClick={handleLogout} className="mt-5   cursor-pointer rounded-full border bg-white border-black px-3 py-3 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        <p className="text-center">Logout</p>
      </div>
      <div onClick={handleLogoutPageOpenState} className="my-3  cursor-pointer rounded-full border border-black dark:border-white px-3 py-3 text-sm font-semibold text-black dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
        <p className="text-center">Cancel</p>
      </div>
    </div>
  );
};

export default Logout;
