import { useState } from "react";
import NavLink from "./NavLink";

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
        <header tabIndex={-1} onBlur={handleBlur} className="border-b md:  border-lime-900 justify-between gap-2 flex z-10 p-3 md:items-center bg-slate-900 sticky top-0 w-full">
            <h1 className="text-lg font-extrabold tracking-widest w-max text-rose-500 p-2 px-4  border border-rose-500">NEXT NEWS</h1>
            <nav className="flex justify-between" role="navigation">
                <button onClick={handleClick} aria-label="Main menu" className='md:hidden' aria-expanded={showMenu} aria-controls="main-menu">
                    {showMenu ?
                        (<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-rose-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>)
                        : (
                            <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 text-rose-500 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                </button>
            </nav>
            <ul
                id="main-menu"
                className={`${showMenu ? 'flex absolute -ml-3 top-full w-full bg-gradient-to-t from-transparent to-slate-900 backdrop-brightness-50 backdrop-blur-xl  py-2 rounded-b-2xl border-b border-lime-500' : 'hidden md:flex'}  flex-col md:flex-row gap-2`} >
                <NavLink href='/'>Home</NavLink>
                <NavLink href='/business'>Business</NavLink>
                <NavLink href='/entertainment'>Entertainment</NavLink>
                <NavLink href='/health'>Health</NavLink>
                <NavLink href='/science'>Science</NavLink>
                <NavLink href='/sports'>Sports</NavLink>
                <NavLink href='/technology'>Technology</NavLink>
            </ul>
        </header>
    )
}

export default Header;