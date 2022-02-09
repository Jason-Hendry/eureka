import React, {CSSProperties, FC} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {createStyles, Theme} from "@material-ui/core";
import {EmbeddedImage} from "../../models/base";

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
  image : string|EmbeddedImage[]
  small? : boolean
  responsive : boolean
  blur?: boolean
}

const Parallax: FC<ParallaxProps> = ({  children, style, image, small, blur } ) => {
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

  const img = Array.isArray(image) ?
      <>
        {image.map((i) => <div key={i.image} style={{backgroundImage: `url(${i.image})`, filter: blur && 'blur(10px)' || undefined, height: '100%', width: '100%', position: "absolute", backgroundSize: "cover"}} >
          <span style={{position :"absolute", bottom: 10, right: 10, color: '#fff', textShadow: '0 0 3px #000'}}>{i.caption}</span>
        </div>)}
      </>:
      <div style={{backgroundImage: `url(${image})`, filter: blur && 'blur(10px)' || undefined, height: '100%', width: '100%', position: "absolute", backgroundSize: "cover"}} />

  return (
    <div
      className={[classes.parallax, small && classes.small].filter(Boolean).join(' ')}
      style={{
        ...style,
        transform: transform
      }}
    >
      {img}
      {children}
    </div>
  );
}

export default Parallax
