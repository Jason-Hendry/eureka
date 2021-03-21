import React, {CSSProperties, FC} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";

// core components
const useStyles = makeStyles(({breakpoints}: Theme) => createStyles({
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
    alignItems: "center",
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
  [breakpoints.down("md")]: {
    minHeight: "660px"
  }
}));

interface ParallaxProps {
  filter: boolean
  className: string
  style?: CSSProperties
  image : unknown
  small? : boolean
  responsive : boolean
}

const Parallax: FC<ParallaxProps> = ({  children, style, image, small } ) => {
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
    const windowScrollTop = window.pageYOffset / 3;
    setTransform(`translate3d(0,${windowScrollTop}px,0)`);
  };
  const classes = useStyles();

  return (
    <div
      className={[classes.parallax, small && classes.small].filter(Boolean).join(' ')}
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

export default Parallax
