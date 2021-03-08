const getSupportedColor = (colorName) => {
  switch (colorName) {
    case "brown":
      return "orange";
    case "black":
    case "white":
      return "gray";
    default:
      return colorName;
  }
};

export default getSupportedColor;
