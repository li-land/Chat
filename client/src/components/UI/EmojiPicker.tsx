import { FC, useState } from "react";
import Picker, { IEmojiData } from "emoji-picker-react";

interface EmojiProps {
  handleEmojiAdd: (emojiObj: IEmojiData) => void;
}
const EmojiPicker: FC<EmojiProps> = ({ handleEmojiAdd }) => {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

  return (
    <Picker
      onEmojiClick={(_, emojiObj: IEmojiData) => {
        setChosenEmoji(emojiObj);
        handleEmojiAdd(emojiObj);
      }}
      pickerStyle={{
        position: "absolute",
        bottom: "75px",
        left: "0",
        zIndex: "10",
      }}
      groupNames={{
        smileys_people: "Смайлы и эмоции",
        animals_nature: "Животные",
        food_drink: "Еда и напитки",
        travel_places: "Путешествия",
        activities: "Активный отдых",
        objects: "Предметы",
        symbols: "Символы",
        flags: "Флаги",
        recently_used: "Недавние",
      }}
      disableSearchBar={true}
    />
  );
};

export default EmojiPicker;
