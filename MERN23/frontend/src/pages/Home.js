import { useEffect } from "react"
import { usePostsContext } from "../hooks/usePostsContext"

//component
import PostDetails from '../components/PostDetails'

const Home = () => {

  const { posts, dispatch } = usePostsContext()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_POSTS', payload: json })
      }
    }

    //loading posts if user logged in  
    fetchPosts()

  }, [dispatch])

  return (
    <div className="home">
      <div className="posts">
        {posts && posts.map((post) => (
          <PostDetails post={post} key={post._id} />
        ))}
      </div>
    </div>
  )
}

export default Home