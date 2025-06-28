const styles = [
  "『 %text 』",
  "⫸ %text ⫷",
  "》 %text 《",
  "『『 %text 』』",
  "[[ %text ]]",
  "<<< %text >>>",
  "❲❲ %text ❳❳",
  "⟦ %text ⟧"
];

const styleText = (text) => {
  const style = styles[Math.floor(Math.random() * styles.length)];
  return style.replace('%text', text);
};

module.exports = {
  styleText
};
