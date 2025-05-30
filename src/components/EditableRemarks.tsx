import { useState, useEffect } from "react";

interface EditableRemarksProps {
  initialValue: string;
  onSave: (value: string) => Promise<void>;
  className?: string;
  isEditing?: boolean;
}

const EditableRemarks = ({
  initialValue,
  onSave,
  className = "",
  isEditing = false,
}: EditableRemarksProps) => {
  const [value, setValue] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  // Update isEditable when isEditing prop changes
  useEffect(() => {
    setIsEditable(isEditing);
  }, [isEditing]);

  const handleBlur = async () => {
    if (value !== initialValue) {
      await onSave(value);
    }
    setIsEditable(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleBlur();
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditable(false);
    }
  };

  if (isEditable) {
    return (
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`min-h-[60px] p-2 ${className}`}
        autoFocus
      />
    );
  }

  return (
    <div
      className={`cursor-text ${className}`}
      onClick={() => setIsEditable(true)}
    >
      {value || "Add remarks..."}
    </div>
  );
};

export default EditableRemarks;
