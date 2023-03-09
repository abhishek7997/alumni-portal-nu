const theme = {
  palette: {
    primary: {
      main: "#D83616",
      light: "#D83716",
    },
    secondary: {
      main: "#F0401F",
      light: "#F0411F",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: "#F0401F",
      },
    },
    MuiOutlinedInput: {
      root: {
        color: "#F0401F",
      },
    },
    MuiCircularProgress: { circle: { color: "#D83616" } },
  },
  fontFamily: "Roboto",
}

export default theme
