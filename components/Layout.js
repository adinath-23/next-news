import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    const router = useRouter()
    const { category } = router.query
    return (
        <>
            <Header />
            <div className=" overflow-hidden min-h-screen relative bg-slate-800 text-indigo-500 ">
                <AnimatePresence>
                    <motion.main
                        key={category}
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 2 }}
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>
            <Footer />
        </>
    );
}

export default Layout;