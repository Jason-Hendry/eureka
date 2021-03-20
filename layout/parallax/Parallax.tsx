import React, {CSSProperties, FC} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {Theme, withTheme} from "@material-ui/core";

// core components
const useStyles = ({breakpoints}: Theme) => makeStyles(({
  parallax: {
    height: "90vh",
    maxHeight: "1000px",
    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center top",
    backgroundSize: "cover",
    margin: "0",
    padding: "0",
    border: "0",
    display: "flex",
    alignItems: "center"
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  small: {
    height: "380px"
  },
  parallaxResponsive: {
    [breakpoints.down("md")]: {
      minHeight: "660px"
    }
  }
}));

interface ParallaxProps {
  filter: boolean
  className: string
  style?: CSSProperties
  image : unknown
  small? : boolean
  responsive : boolean
  theme: Theme
}

const Parallax: FC<ParallaxProps> = (props) => {
  const [transform, setTransform] = React.useState("translate3d(0,0px,0)");
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform(`translate3d(0,${windowScrollTop}px,0)`);
  };
  const { filter=true, className, children, style, image, small, responsive, theme } = props;
  const classes = useStyles(theme)();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [classes.parallaxResponsive]: responsive,
    [className]: className !== undefined
  });
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: `url(${image})`,
        transform: transform
      }}
    >
      {children}
    </div>
  );
}

export default withTheme(Parallax)
