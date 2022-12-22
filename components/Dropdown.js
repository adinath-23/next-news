import { motion } from "framer-motion";

const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
}
const Dropdown = ({ showMenu, children }) => {
    return (<motion.nav
        animate={showMenu ? "open" : "closed"}
        variants={variants}
        exit={{ opacity: 0, y: '-100%' }}
        className="absolute top-full z-10 w-full -ml-3"
    >
        {children}
    </motion.nav>);
}

export default Dropdown;