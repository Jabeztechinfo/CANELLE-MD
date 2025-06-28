const createButtons = (text, footer, buttons, headerType = 1) => {
  return {
    text,
    footer,
    buttons,
    headerType,
  };
};

module.exports = {
  createButtons,
};
