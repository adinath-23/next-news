import NewsArticle from "./NewsArticle";
import { AnimatePresence, motion } from "framer-motion";


const NewsList = ({ newsData }) => {
    const newsList = newsData.map((news, index) => <NewsArticle key={index} newsArticle={news} />)
    return (
        <ul className="p-2 flex container justify-center gap-5 mx-auto flex-wrap ">
            {newsList}
        </ul>

    );
}

export default NewsList;