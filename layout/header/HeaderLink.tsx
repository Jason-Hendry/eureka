import {FC} from "react";
import {createStyles, Theme, withTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Link, {LinkProps} from "next/link";


interface HeaderLinkProps extends LinkProps{
    altColor: boolean
}

const useStyles = makeStyles(({spacing, palette, breakpoints}: Theme) => createStyles({

    a: {
        color:'#FFFFFF',
        paddingTop: spacing(1),
        paddingLeft: spacing(4),
        verticalAlign: "text-top",
        textDecoration: "none",
        fontSize: '1.5em',
        lineHeight: '20px',
        position: 'relative',
        '&:hover' : {
            color: palette.primary.main,
            textShadow: '0px 0px 15px #fff'
        },
        "&>svg": {
            position: 'relative',
            top: 6
        },
        [breakpoints.down('sm')]: {
            width: 300,
            maxWidth: '80%'
        }
    },
    altColor: {
        color: palette.primary.main,
        '&:hover' : {
            color: palette.primary.main,
            textShadow: '0px 0px 15px #fff'
        }
    }
}))

const HeaderLink: FC<HeaderLinkProps> = ({ altColor, children, ...linkProps}) => {
    const classes = useStyles()

    return (
        <Link {...linkProps}>
            <a className={`${classes.a}${altColor ? ` ${classes.altColor}` : ''}`}>{children}</a>
        </Link>
    )
}
export default HeaderLink;
