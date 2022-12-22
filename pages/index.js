import NewsList from "../components/NewsList"

export default function Home(props) {
  return (
    <NewsList newsData={props.news} category='home' />
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
  }
}