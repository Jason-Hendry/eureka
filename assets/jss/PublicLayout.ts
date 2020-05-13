import { container, title } from "./nextjs-material-kit";
import {Styles} from "@material-ui/styles";
import {Theme} from "@material-ui/core";

const landingPageStyle: Styles<Theme, any> = {
  container: {
    zIndex: 12,
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: 3
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  description: {
    color: "#999"
  },
  races: {
    // TODO: use theme spacing
    marginBottom: 8,
    textAlign: "left"
  },
  news: {
    // TODO: use theme spacing
    marginBottom: 8,
    textAlign: "left"
  },
  brandImage: {
    cursor: "pointer"
  }
};


export default landingPageStyle;
