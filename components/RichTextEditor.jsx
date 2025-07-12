"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function RichTextEditor({ 
  value = "", 
  onChange, 
  placeholder = "Write your content here...",
  className = "",
  height = "300px" 
}) {
  const [content, setContent] = useState(value);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange?.(newContent);
    }
  }, [onChange]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
  };

  const insertEmoji = (emoji) => {
    execCommand('insertText', emoji);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        execCommand('insertImage', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertLink = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectedText(selection.toString());
      setShowLinkDialog(true);
    }
  };

  const applyLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setShowLinkDialog(false);
      setLinkUrl("");
      setSelectedText("");
    }
  };

  const toolbarButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'strikeThrough', icon: 'S', title: 'Strikethrough' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
    { command: 'justifyLeft', icon: '⌐', title: 'Align Left' },
    { command: 'justifyCenter', icon: '≡', title: 'Align Center' },
    { command: 'justifyRight', icon: '¬', title: 'Align Right' },
  ];

  const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💡', '✅', '❌', '🎉'];

  return (
    <div className={`border border-border rounded-2xl overflow-hidden bg-card ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-border bg-muted/30 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Formatting buttons */}
          <div className="flex items-center gap-1 border-r border-border pr-2">
            {toolbarButtons.map((btn) => (
              <button
                key={btn.command}
                type="button"
                onClick={() => execCommand(btn.command)}
                className="w-8 h-8 rounded-lg bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center text-sm font-bold"
                title={btn.title}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Link button */}
          <button
            type="button"
            onClick={insertLink}
            className="w-8 h-8 rounded-lg bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center"
            title="Insert Link"
          >
            🔗
          </button>

          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-8 h-8 rounded-lg bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center"
            title="Upload Image"
          >
            🖼️
          </button>

          {/* Emoji dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="w-8 h-8 rounded-lg bg-background border border-border hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center"
              title="Insert Emoji"
            >
              😊
            </button>
            <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-xl p-2 grid grid-cols-4 gap-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="w-8 h-8 rounded hover:bg-muted transition-colors duration-200 flex items-center justify-center"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={handleContentChange}
        className="p-4 outline-none text-card-foreground leading-relaxed"
        style={{ minHeight: height }}
        data-placeholder={placeholder}
      />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Link dialog */}
      {showLinkDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowLinkDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Insert Link</h3>
            {selectedText && (
              <p className="text-sm text-muted-foreground mb-3">
                Selected text: "{selectedText}"
              </p>
            )}
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL (e.g., https://example.com)"
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground mb-4 focus:ring-2 focus:ring-ring focus:border-transparent"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Insert Link
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style jsx>{`
        [contenteditable]:empty::before {
          content: attr(data-placeholder);
          color: var(--muted-foreground);
          cursor: text;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 8px 0;
        }
        
        [contenteditable] a {
          color: var(--primary);
          text-decoration: underline;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          margin: 8px 0;
          padding-left: 24px;
        }
        
        [contenteditable] li {
          margin: 4px 0;
        }
      `}</style>
    </div>
  );
}
