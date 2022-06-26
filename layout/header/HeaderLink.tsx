import {FC} from "react";
import {Theme} from "@mui/material";
import {makeStyles, createStyles} from "@mui/styles";
import Link, {LinkProps} from "next/link";


interface HeaderLinkProps extends LinkProps {
    altColor?: boolean
}

const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) => createStyles({
    a: {
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: "16px",
        textTransform: "uppercase",
        textDecoration: "none",
        padding: 10,
        color: "#fff",
        backgroundColor: "#0054A5",

    },
    altColor: {
        color: "#0054A5",
        fontSize: "18px",
        backgroundColor: "#fff",
    }
}))

const HeaderLink: FC<HeaderLinkProps> = ({altColor = false, children, ...linkProps}) => {
    const classes = useStyles()

    return (
        <Link {...linkProps}>
            <a className={`${classes.a}${altColor ? ` ${classes.altColor}` : ''}`}>{children}</a>
        </Link>
    )
}
export default HeaderLink;
