import React, { useEffect } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { GrEmoji } from "react-icons/gr";
import { MdOutlineAttachFile } from "react-icons/md";
import "./StyleInputMassage.css";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoHelpCircleOutline } from "react-icons/io5";

const InputMassage = ({ contact, refreshMessages, inputRef }) => {
  const [inputMassage, setInputMassage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  // get MASSAGES from localStorage
  // const massageString = localStorage.getItem("massages");
  // const oldMassages = massageString ? JSON.parse(massageString) : [];

  const draftString = localStorage.getItem("draft");
  const drafts = draftString ? JSON.parse(draftString) : [];

  useEffect(() => {
    if (!contact) return;
    const draft = drafts.find((draft) => {
      return draft.id === contact.id;
    });

    if (draft) {
      setInputMassage(draft.text);
    } else {
      setInputMassage("");
    }
  }, [contact]);

  const onChangeInput = (el) => {
    const value = el.target.value;
    setInputMassage(value);

    const draft = drafts.find((draft) => {
      return draft.id === contact.id;
    });
    if (draft) {
      draft.text = value;
    } else {
      drafts.push({
        id: contact.id,
        text: value,
      });
    }

    localStorage.setItem("draft", JSON.stringify(drafts));
  };

  const onSendMassage = () => {
    fetch(`http://localhost:4001/message-save`, {
      method: "post",
      body: JSON.stringify({
        text: inputMassage,
        sender: 1000,
        receiver: contact.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetch("http://localhost:4001/message-list")
      .then((response) => response.json())
      .then((loadMessage) => refreshMessages(loadMessage));
    setInputMassage("");
  }

  const onClickEmoji = (event, emojiObj) => {
    setInputMassage((prevInput) => prevInput + emojiObj.emoji);
    setShowEmoji(true);
  };

  return (
    <div className="input-massage">
      <MdOutlineAttachFile className="input-file" />
      <input
        type="text"
        placeholder="Write a massage..."
        className="input-type-massage"
        value={inputMassage}
        onChange={onChangeInput}
        // onKeyDown={onSendMassageWithKey}
        // ref={inputRef}
      />
      <GrEmoji
        className="input-emoji"
        onClick={() => setShowEmoji((val) => !val)}
      />
      {showEmoji && (
        <EmojiPicker
          pickerStyle={{
            width: "50%",
            height: "41vh",
            position: "absolute",
            top: "-310px",
            right: "0",
          }}
          onEmojiClick={onClickEmoji}
        />
      )}

      <button className=" input-btn" onClick={onSendMassage}>
        <RiSendPlane2Fill />
      </button>
    </div>
  );
};

export default InputMassage;
