const createButtons = (text, footer = '', buttons = [], headerType = 1) => {
  return {
    text,
    footer,
    buttons,
    headerType
  };
};

// Example preset
const quickReplyButtons = (text) => createButtons(
  text,
  'Choose an option:',
  [
    { buttonId: '.help', buttonText: { displayText: '📜 Help' }, type: 1 },
    { buttonId: '.menu', buttonText: { displayText: '🧩 Menu' }, type: 1 }
  ]
);

module.exports = {
  createButtons,
  quickReplyButtons
};
