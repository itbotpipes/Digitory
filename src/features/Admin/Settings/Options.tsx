"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

interface OptionsProps {
  className?: string;
}

const Options: React.FC<OptionsProps> = ({ className }) => {
  const [loggingOut, setLoggingOut] = useState(false);

  const logOutHandler = async () => {
    setLoggingOut(true);
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div className={clsx("", className)}>
      <Button
        disabled={loggingOut}
        variant={"destructive"}
        onClick={logOutHandler}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Options;
