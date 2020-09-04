import React from "react";
import { Drawer, Button, Divider, Alert, Tag, Icon } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "./../EditableInput";
import { database } from "../../misc/firebase";
import AvatarUploadBtn from "./AvatarUploadBtn";

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    const userNicknameRef = database
      .ref(`profiles/${profile.uid}`)
      .child("name");

    try {
      await userNicknameRef.set(newData);
      Alert.success("Nickname has been updated", 4000);
    } catch (error) {
      Alert.error(error.msg);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey,{profile.name}</h3>
        <Tag color="green" closable>
          <Icon icon="google" /> Connected
        </Tag>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
