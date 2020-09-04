import React, { useState } from "react";
import { Modal, Button } from "rsuite";
import useModalState from "./../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";

const AvatarUploadBtn = () => {
  const [img, setImg] = useState(null);
  const { isOpen, close, open } = useModalState();

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    open();
  };

  return (
    <div className="mt-3 text-center">
      <label htmlFor="avatar">
        Select new avatar
        <input
          id="avatar"
          type="file"
          className="d-none"
          onChange={onFileInputChange}
          accept="images/*"
        />
      </label>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Adjust and upload new avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center h-100">
            {img && (
              <AvatarEditor
                image={img}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                rotate={0}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="ghost">
            Upload new avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvatarUploadBtn;
