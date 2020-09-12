import React, { useState } from "react";
import { InputGroup, Icon, Modal, Button, Uploader, Alert } from "rsuite";
import useModalState from "./../../../misc/custom-hooks";
import { storage } from "./../../../misc/firebase";
import { useParams } from "react-router";

const MAX_FILE_SIZE = 1000 * 1024 * 3;

const AttachmentBtnModal = ({ afterUpload }) => {
  const [fileList, setFileList] = useState();
  const [isLoading, setIsLoading] = useState();
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();

  const onChange = (fileArr) => {
    const filtered = fileArr
      .filter((el) => el.blobFile.size <= MAX_FILE_SIZE)
      .slice(0, 5);
    setFileList(filtered);
  };

  const onUplaod = async () => {
    setIsLoading(true);
    try {
      const uploadPromises = fileList.map((f) => {
        return storage
          .ref(`chat/${chatId}`)
          .child(Date.now() + f.name)
          .put(f.blobFile, {
            cacheControl: `public max-age=${3600 * 24 * 3}`,
          });
      });

      const uploadSnapshots = await Promise.all(uploadPromises);

      const shapePromises = uploadSnapshots.map(async (snap) => {
        return {
          name: snap.metadata.name,
          contentType: snap.metadata.contentType,
          url: await snap.ref.getDownloadURL(),
        };
      });

      const files = await Promise.all(shapePromises);

      await afterUpload(files);

      setIsLoading(false);
      close();
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.msg, 4000);
    }
  };

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Uploader
            autoUpload={false}
            action=""
            onChange={onChange}
            multiple
            listType="picture-text"
            fileList={fileList}
            className="w-100"
            disabled={isLoading}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={onUplaod} disabled={isLoading}>
            Send to chat
          </Button>
          <div className="text-right mt-2">
            <small>* only files less than 5 mb are allowed</small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AttachmentBtnModal;
