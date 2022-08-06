import React from "react";
import { useEffect } from "react";
import "./StyleMassageFields.css";

export const MassageFields = ({ contact, newMassages }) => {

  
  return (
    <div className="massage-fields">
      {newMassages
        .filter(
          ({ sender, receiver }) =>
            (sender === 1000 && receiver === contact.id) ||
            (sender === contact.id && receiver === 1000)
        )
        .map((massage) => (
          <div
            key={massage.id}
            className="chat-massage"
            style={
              massage.receiver === contact.id
                ? { justifyContent: "flex-end" }
                : { justifyContent: "flex-start" }
            }
          >
            <div className="massage">{massage.text}</div>
          </div>
        ))}
    </div>
  );
};
