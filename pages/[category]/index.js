import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import NewsList from "../../components/NewsList";

const Category = (props) => {
    const router = useRouter()
    const { category } = router.query
    return (
        <>
            <h1 className="p-5 text-2xl font-bold text-slate-100 uppercase tracking-widest text-center">{category}</h1>
            <NewsList newsData={props.news} category={category} />
        </>
    )
}

export default Category;

export const getStaticPaths = async () => {
    const categories = [
        'entertainment',
        'technology',
        'business',
        'health',
        'science',
        'sports',
    ]
    const paths = categories.map(path => ({ params: { category: path } }))
    return {
        fallback: false,
        paths: paths
    }
}

export const getStaticProps = async (context) => {
    const apiKey = process.env.NEWS_API_KEY
    const { category } = context.params;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`)
    const data = await response.json()
    const news = data.articles.map(article => {
        const age = new Date(article.publishedAt).toLocaleTimeString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        let imageUrl = null
        if (article.urlToImage) {
            if (article.urlToImage.startsWith('//')) {
                imageUrl = 'https:' + article.urlToImage
            } else {
                imageUrl = article.urlToImage
            }
        }
        return {
            imageUrl, age, title: article.title, description: article.description, newsUrl: article.url
        }
    })
    return {
        props: {
            news
        },
        revalidate: 7200 //update every 2 hrs
    }
}