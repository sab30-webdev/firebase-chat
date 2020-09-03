import React, { useState, useCallback } from "react";
import { Input, InputGroup, Icon, Alert } from "rsuite";

const EditableInput = ({
  initialValue,
  label = null,
  onSave,
  emptyMsg = "Input is empty",
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onChange = useCallback((value) => setValue(value), []);

  const onEditClick = () => {
    setIsEditable((prevValue) => !prevValue);
  };

  const onClickSave = async () => {
    const trimmed = value.trim();

    if (trimmed === "") {
      Alert.info(emptyMsg, 4000);
      setIsEditable(true);
    } else {
      await onSave(trimmed);
      setIsEditable(false);
    }
  };

  return (
    <div>
      {label}
      <InputGroup>
        <Input disabled={!isEditable} value={value} onChange={onChange} />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? "close" : "edit2"} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onClickSave}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
