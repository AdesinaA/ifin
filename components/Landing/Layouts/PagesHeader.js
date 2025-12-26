import React from "react";

const PagesHeader = ({ heading, des }) => {
  return (
    <>
      <h2 className="text-3xl md:text-xl font-medium">{heading}</h2>
      <p className="text-faded md:text-sm">{des}</p>
    </>
  );
};

export default PagesHeader;
