import React, { useState, useRef } from "react";
import { Modal, Button, Alert } from "rsuite";
import useModalState from "./../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";
import { storage, database } from "./../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "./../ProfileAvatar";

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};

const AvatarUploadBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const { profile } = useProfile();
  const { isOpen, close, open } = useModalState();
  const avatarEditorRef = useRef();

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    open();
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadUrl);

      setIsLoading(false);
      Alert.success("Avatar Uploaded", 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar src={profile.avatar} name={profile.name} />
      <div>
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
                  ref={avatarEditorRef}
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
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
