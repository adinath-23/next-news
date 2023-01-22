import { useRouter } from "next/router";
import NewsList from "../../components/NewsList";
import Head from "next/head";

const Category = (props) => {
    const router = useRouter()
    const { category } = router.query
    let description;
    let title;
    if (category === 'technology') {
        title = 'Technology - Stay informed on the latest technology news and trends | Next News'
        description = "Stay informed on the latest technology news and trends with Next News. Our comprehensive coverage includes relevant and accurate articles from top tech sources around the world. From product releases and company updates to emerging technologies, we've got you covered all in one place"
    } else if (category === 'entertainment') {
        title = 'Entertainment - Stay informed on the latest entertainment news and trends | Next News'
        description = "Stay informed on the latest entertainment news and trends with Next News. Our comprehensive coverage includes relevant and accurate articles from top sources around the world. From movie and TV releases to celebrity gossip and pop culture, we've got you covered all in one place."
    } else if (category === 'business') {
        title = 'Business - Stay informed on the latest business news and trends | Next News'
        description = "Stay informed on the latest business news and trends with Next News. Our comprehensive coverage includes relevant and accurate articles from top sources around the world. From finance and economics to market updates and company news, we've got you covered all in one place."
    } else if (category === 'health') {
        title = 'Health - Stay informed on the latest health news and trends | Next News'
        description = "Stay informed on the latest health news and trends with Next News. Our comprehensive coverage includes relevant and accurate articles from top sources around the world. From medical research and wellness tips to disease prevention and treatment options, we've got you covered all in one place."
    } else if (category === 'sports') {
        title = 'Sports - Stay informed on the latest sports news and events | Next News'
        description = "Stay informed on the latest sports news and events with Next News. Our comprehensive coverage includes relevant and accurate articles from top sources around the world. From game updates and player news to analysis and commentary, we've got you covered all in one place."
    } else if (category === 'science') {
        title = 'Science - Stay informed on the latest science news and discoveries | Next News'
        description = "Stay informed on the latest science news and discoveries with Next News. Our comprehensive coverage includes relevant and accurate articles from top sources around the world. From groundbreaking research to technological innovations, we've got you covered all in one place."
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} key="desc" />

            </Head>
            <h1 className="p-5 text-2xl font-bold text-slate-100 uppercase tracking-widest text-center">{category}</h1>
            <NewsList newsData={props.news} />
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
            imageUrl,
            age,
            title: article.title,
            description: article.description,
            newsUrl: article.url,
            source: article.source.name,
            author: article.author
        }
    })
    return {
        props: {
            news
        },
        revalidate: 36000 //update every 10 hrs
    }
}