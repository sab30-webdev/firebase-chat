import React from "react";
import { Tooltip, Whisper, Badge } from "rsuite";
import { usePresence } from "./../misc/custom-hooks";

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);

  const getText = (presence) => {
    if (!presence) {
      return "Unknown state";
    }

    return presence.state === "online"
      ? "Online"
      : `Last online ${new Date(presence.last_changed).toLocaleDateString()} `;
  };

  const getColor = (presence) => {
    if (!presence) {
      return "gray";
    }

    return presence.state === "online" ? "green" : "red";
  };

  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ background: getColor(presence) }}
      />
    </Whisper>
  );
};

export default PresenceDot;
