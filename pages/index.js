import Head from "next/head"
import NewsList from "../components/NewsList"

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Next News - Stay informed on the latest news and current events | Home</title>
        <meta name="description" content="Stay informed on the latest news and current events with Next News. We bring you relevant and accurate articles from top news sources around the world. From politics to sports and entertainment, we've got you covered." />
      </Head>
      <NewsList newsData={props.news} />
    </>
  )
}


export const getStaticProps = async () => {
  const apiKey = process.env.NEWS_API_KEY
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`)
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