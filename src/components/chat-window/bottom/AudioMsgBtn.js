import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { InputGroup, Icon, Alert } from "rsuite";
import { storage } from "./../../../misc/firebase";
import { useParams } from "react-router";

const AudioMsgBtn = ({ afterUpload }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const { chatId } = useParams();

  const onUpload = async (data) => {
    setIsUpload(true);
    try {
      const snap = await storage
        .ref(`chat/${chatId}`)
        .child(`audio_${Date.now()}.mp3`)
        .put(data.blob, {
          cacheControl: `public max-age=${3600 * 24 * 3}`,
        });

      console.log(snap);

      const file = {
        name: snap.metadata.name,
        contentType: snap.metadata.contentType,
        url: await snap.ref.getDownloadURL(),
      };

      setIsUpload(false);
      afterUpload([file]);
    } catch (error) {
      Alert.error(error.message, 4000);
      setIsUpload(false);
    }
  };

  const onClick = () => {
    setIsRecording((p) => !p);
  };

  return (
    <>
      <InputGroup.Button
        onClick={onClick}
        disabled={isUpload}
        className={isRecording ? "animate-blink" : ""}
      >
        <Icon icon="microphone" />
        <ReactMic
          record={isRecording}
          className="d-none"
          onStop={onUpload}
          mimeType="audio/mp3"
        />
      </InputGroup.Button>
    </>
  );
};

export default AudioMsgBtn;
