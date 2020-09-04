import React from "react";
import DashboardToggle from "./dashboard/DashboardToggle";
import CreateRoomBtnModal from "./CreateRoomBtnModal";

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <DashboardToggle />
      <CreateRoomBtnModal />
    </div>
  );
};

export default Sidebar;
