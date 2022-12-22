import { motion } from "framer-motion";
import Link from "next/link";

import { useRouter } from "next/router";

const NavLink = ({ href, children }) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;
  return <div className="relative w-max self-center">
    <Link href={href}
      className={`px-3 py-1 capitalize  text-lg relative z-10 font-normal 
      ${isActive ? 'text-rose-500 hover:text-rose-500' : 'hover:text-lime-500 text-lime-200'}`}
    >{children}
    </Link>
    {isActive && <motion.div layoutId="underline" className='bg-slate-800 top-0 w-full h-full absolute rounded-md'></motion.div>}
  </div>;
}

export default NavLink;