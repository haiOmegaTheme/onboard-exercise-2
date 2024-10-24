type EmojiSources = {
  inactive: string;
  active: string;
};

type Props = {
  onVote: () => void;
  emojiSources: EmojiSources;
  hasVoted?: boolean;
};

export const EmojiRating = ({ hasVoted, emojiSources, onVote }: Props) => {
  return (
    <div
      role="none"
      className="cursor-pointer size-[60px] transition-opacity duration-200"
      onClick={onVote}
    >
      <img
        src={hasVoted ? emojiSources?.active : emojiSources?.inactive}
        alt="icon"
        className={`size-auto transition-opacity duration-200 ${
          hasVoted ? "opacity-100" : "opacity-50"
        }`}
      />
    </div>
  );
};
