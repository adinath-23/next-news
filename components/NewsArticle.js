import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NewsArticle = ({ newsArticle }) => {
    const { imageUrl, age, title, description, newsUrl } = newsArticle
    return (
        <motion.li
            initial={{ opacity: 0, x: '-50%' }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true }}
            className="flex w-full  shadow-2xl flex-col md:flex-row md:rounded-2xl rounded-xl overflow-clip">
            {imageUrl && <div className="basis-1/2 md:basis-2/6  bg-slate-800 p-2 relative aspect-video">
                <Image src={imageUrl} alt="photo" fill={true}
                    className='object-cover'
                />
            </div>}
            <div className="basis-1/2 flex-1 md:basis-4/6 p-3 bg-gradient-to-r justify-between from-gray-900 to-gray-700 flex flex-col">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-100  md:text-3xl tracking-wide mb-2">{title}</h2>
                    <p className=" text-slate-400 ">{description}</p>
                    <Link
                        className="text-rose-500 w-max"
                        href={newsUrl}
                        target='_blank'
                    >Read more</Link>
                </div>
                <p className="text-slate-500">Publised on <time>{age}</time></p>
            </div>
        </motion.li>
    )
}

export default NewsArticle;