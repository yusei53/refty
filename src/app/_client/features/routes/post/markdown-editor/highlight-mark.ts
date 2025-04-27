import { Mark, mergeAttributes } from "@tiptap/core";

const HighlightMark = Mark.create({
  name: "highlight-mark",

  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark"
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ];
  },

  addCommands() {
    return {
      toggleHighlight:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        }
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleHighlight()
    };
  }
});

export default HighlightMark;
