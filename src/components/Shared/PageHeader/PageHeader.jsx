import React from "react";

const PageHeader = ({heading}) => {
  return (
    <header className="relative h-[300px] overflow-hidden bg-gray-950">
      <div className="flex h-full items-center justify-center">
        <div className="px-6 text-center text-white md:px-12">
          <h1 className="font-display text-6xl">{heading}</h1>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
