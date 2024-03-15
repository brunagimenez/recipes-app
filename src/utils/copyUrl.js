const copyUrl = (setClickButton) => {
  setClickButton(true);
  const url = window.location.href;
  navigator.clipboard.writeText(url);
};

export default copyUrl;
