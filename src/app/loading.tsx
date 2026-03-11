
import PageBackground from "@/components/ui/PageBackground";
import React from "react";

const loading = () => {
  return (
    <PageBackground>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    </PageBackground>
  );
};

export default loading;

