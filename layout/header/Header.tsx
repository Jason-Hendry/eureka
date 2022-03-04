import React, {FC, ReactChild, useState} from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    IconButton,
    Hidden,
    Drawer,
    Theme,
    Container
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EventIcon from "@mui/icons-material/Event";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MapIcon from '@mui/icons-material/Map';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';

import HeaderLink from "./HeaderLink";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {createStyles, makeStyles} from "@mui/styles";

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
        ["/news", <><AnnouncementIcon/> Announcements and Race Reports</>],
        ["/races", <><EventIcon/> Calendar</>],
        ["/results", <><EmojiEventsIcon /> Results</>],
        ["/contact-us", <><MapIcon /> Contact Us</>],
        ["/handbook", <><MenuBookIcon /> Club Handbook & Policies</>],
        ["/committee", <><PeopleIcon /> Committee</>],
        ["/merchandise", <><StoreIcon /> Club Merch</>],
        ["/eureka-covidsafe-plan", <><InsertDriveFileIcon/> Covid Safe</>],
        ["/join", <><PersonAddIcon/> Join</>]
    ];

    return (
        <AppBar classes={appBarClasses} color={color} elevation={color == "default" ? 6 : 0}>
            <Container>
                <Toolbar>
                    {brandComponent}
                    <div style={{flexGrow: 1, textAlign: 'right'}}>
                        {/*<Hidden xlDown>*/}
                        {/*    {links.map(([url, link]) => (*/}
                        {/*        <HeaderLink altColor={color == "default"} key={url} href={url}>{link}</HeaderLink>*/}
                        {/*    ))}*/}
                        {/*</Hidden>*/}

                            <IconButton classes={iconButtonClasses}
                                        color={color == "default" ? "primary" : 'secondary'}
                                        aria-label="open drawer"
                                        onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                <MenuIcon/>&nbsp;&nbsp;Menu
                            </IconButton>
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
