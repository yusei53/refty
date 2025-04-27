import "./input.css";

type CustomInputProps = {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: (e: React.KeyboardEvent) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: () => void;
  style?: React.CSSProperties;
};

export const CustomInput: React.FC<CustomInputProps> = ({
  id,
  placeholder,
  value,
  onChange,
  onEnter,
  onCompositionStart,
  onCompositionEnd,
  style
}) => {
  return (
    // MEMO: MUIのTextFieldを使うとEditor用の入力ボックスがデザイン的に実現できないため、inputタグを使用し、CSSファイルでスタイルを設定
    <input
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          onEnter(e);
        }
      }}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      className="custom-input"
      style={style}
    />
  );
};
