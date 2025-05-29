import { useState, useRef, useEffect } from "react";

interface EditableRemarksProps {
  initialValue: string;
  onSave: (value: string) => Promise<void>;
  className?: string;
}

const EditableRemarks = ({
  initialValue,
  onSave,
  className = "",
}: EditableRemarksProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = async () => {
    if (value !== initialValue) {
      try {
        await onSave(value);
      } catch (error) {
        console.error("Failed to save remarks:", error);
        setValue(initialValue); // Reset on error
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setValue(initialValue);
    }
  };

  if (isEditing) {
    return (
      <textarea
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full p-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        rows={2}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-50 p-1 rounded w-full ${className}`}
    >
      <p className="truncate" title={value || "Add remarks..."}>
        {value || "Add remarks..."}
      </p>
    </div>
  );
};

export default EditableRemarks;
