import React from "react";
import { Button, Drawer, Alert } from "rsuite";
import useModalState, { useMediaQuery } from "./../../../misc/custom-hooks";
import EditableInput from "./../../EditableInput";
import { useCurrentRoom } from "../../../context/current-room.context";
import { database } from "../../../misc/firebase";
import { useParams } from "react-router";

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery("(max-width:992px");
  const { chatId } = useParams();

  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success("Successfully updated", 4000);
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = (name) => {
    updateData("name", name);
  };

  const onDescriptionSave = (description) => {
    updateData("description", description);
  };

  return (
    <React.Fragment>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer show={isOpen} onHide={close} full={isMobile}>
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name can not be empty"
            onSave={onNameSave}
          />
          <EditableInput
            initialValue={description}
            label={<h6 className="mb-2 mt-2">Description</h6>}
            componentClass="textarea"
            emptyMsg="Description can not be empty"
            rows={5}
            onSave={onDescriptionSave}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={close} block>
            close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </React.Fragment>
  );
};

export default EditRoomBtnDrawer;
