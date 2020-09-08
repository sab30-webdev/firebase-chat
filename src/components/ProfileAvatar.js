import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "./../misc/helpers";

const ProfileAvatar = ({ src, name, ...props }) => {
  return (
    <Avatar src={src} circle {...props}>
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
