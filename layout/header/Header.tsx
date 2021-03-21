import React, {FC, ReactChild, ReactNode, useState} from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    IconButton,
    Hidden,
    Drawer,
    Theme,
    makeStyles,
    Container, createStyles
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AnnouncementIcon from "@material-ui/icons/Announcement";
import EventIcon from "@material-ui/icons/Event";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HeaderLink from "./HeaderLink";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const useAppBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        colorDefault: {
            backgroundColor: "#fff",
        }
    }))

const useIconButtonStyles = makeStyles(({palette}: Theme) =>
    createStyles({
        colorSecondary: {
            color: "#fff",
        },
        colorPrimary: {
            color: palette.primary.main,
        }
    }))


interface HeaderProps {
    color: 'transparent',
    brand?: ReactChild,
    changeColorOnScroll: {
        color: 'white'
        height: number
        scrollBrand: ReactChild
    },
}

export const Header: FC<HeaderProps> = ({
                                            brand,
                                            changeColorOnScroll,
                                        }) => {
    const [theBrand, setBrand] = useState(brand);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [color, setColor] = React.useState<'default' | 'transparent'>('transparent');

    const appBarClasses = useAppBarStyles();
    const iconButtonClasses = useIconButtonStyles();


    React.useEffect(() => {
        if (changeColorOnScroll) {
            window.addEventListener("scroll", headerColorChange);
        }
        return function cleanup() {
            if (changeColorOnScroll) {
                window.removeEventListener("scroll", headerColorChange);
            }
        };
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const headerColorChange = () => {
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            setBrand(changeColorOnScroll.scrollBrand)
            setColor("default")
        } else {
            setBrand(brand)
            setColor("transparent")
        }
    };

    const brandComponent = (
        <Link href="/" as="/">
            <a>
                {theBrand}
            </a>
        </Link>
    );


    const links: Array<[string, ReactChild]> = [
        ["/news", <><AnnouncementIcon/> News</>],
        ["/races", <><EventIcon/> Calendar</>],
        ["/eureka-covidsafe-plan", <><InsertDriveFileIcon/> Covid Safe</>],
        ["/join", <><PersonAddIcon/> Join</>]
    ];

    return (
        <AppBar classes={appBarClasses} color={color} elevation={color == "default" ? 6 : 0}>
            <Container>
                <Toolbar>
                    {brandComponent}
                    <div style={{flexGrow: 1, textAlign: 'right'}}>
                        <Hidden smDown>
                            {links.map(([url, link]) => (
                                <HeaderLink altColor={color == "default"} key={url} href={url}>{link}</HeaderLink>
                            ))}
                        </Hidden>
                        <Hidden mdUp>
                            <IconButton classes={iconButtonClasses}
                                        color={color == "default" ? "primary" : 'secondary'}
                                        aria-label="open drawer"
                                        onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Hidden>
                    </div>
                </Toolbar>
            </Container>
            <Drawer
                variant="temporary"
                anchor={"right"}
                open={mobileOpen}
                classes={{}}
                onClose={handleDrawerToggle}
            >
                {links.map(([url, link]) => (
                    <HeaderLink altColor={true} key={url} href={url}>{link}</HeaderLink>
                ))}
            </Drawer>
        </AppBar>
    );
}
export default Header
