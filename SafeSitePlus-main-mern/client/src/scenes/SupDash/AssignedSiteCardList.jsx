import React from "react";
import AssignedSiteCard from "./AssignedSiteCard";

const AssignedSiteCardList = ({ assignedSites }) => {
  return (
    <div className="w-full px-4 flex flex-wrap gap-6 justify-center">
      {assignedSites.slice(0, 4).map((site) => (
        <AssignedSiteCard key={site._id} site={site} />
      ))}
    </div>
  );
};

export default AssignedSiteCardList;