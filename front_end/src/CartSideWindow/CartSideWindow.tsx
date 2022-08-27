import { useState } from "react";
import "./CartSideWindow.css";
import Backdrop from "./Components/Backdrop";
import { SlideDrawer } from "./Components/SlideDrawer";

export function CartSideWindow(props: {
  drawerOpen: boolean;
  setDrawerOpen: Function;
  userDetail: any;
}) {
  const { drawerOpen, setDrawerOpen, userDetail } = { ...props };

  function handleBackdropClick() {
    setDrawerOpen(false);
  }

  return (
    <div>
      <SlideDrawer show={drawerOpen} userDetails={userDetail} />
      {drawerOpen && <Backdrop closeDrawer={handleBackdropClick} />}
    </div>
  );
}
