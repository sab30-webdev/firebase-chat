import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "./../misc/helpers";

const ProfileAvatar = ({ src, name }) => {
  return (
    <Avatar
      className="width-200 height-200 img-fullsize font-huge"
      src={src}
      circle
    >
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
