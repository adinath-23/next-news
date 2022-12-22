import { useState } from "react";
import NavLink from "./NavLink";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-1000%" },
}

const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const handleClick = (e) => {
        e.stopImmediatePropagation
        setShowMenu(previous => !previous)
    }
    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShowMenu(false)
        }
    }


    return (
        <header tabIndex={-1} onBlur={handleBlur} className="border-b md:  border-lime-900 justify-between gap-2 flex flex-col md:flex-row z-10 p-3 md:items-center bg-slate-900 sticky top-0 w-full">

            <nav className="flex justify-between" >
                <h1 className="text-lg font-extrabold tracking-widest w-max text-rose-500 p-2 px-4  border border-rose-500">NEXT NEWS</h1>
                <button onClick={handleClick} className="p-1 md:hidden bg-lime-500">Open</button>
            </nav>
            <nav
                className={`${showMenu ? 'flex absolute -ml-3 top-full w-full bg-gradient-to-t from-transparent to-slate-900 backdrop-brightness-50 backdrop-blur-xl  py-2 rounded-b-2xl border-b border-lime-500' : 'hidden md:flex'}  flex-col md:flex-row gap-2`} >
                <NavLink href='/'>Home</NavLink>
                <NavLink href='/business'>Business</NavLink>
                <NavLink href='/entertainment'>Entertainment</NavLink>
                <NavLink href='/health'>Health</NavLink>
                <NavLink href='/science'>Science</NavLink>
                <NavLink href='/sports'>Sports</NavLink>
                <NavLink href='/technology'>Technology</NavLink>
            </nav>
        </header>
    )
}

export default Header;