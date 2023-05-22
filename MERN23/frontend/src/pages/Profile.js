import { useEffect } from "react"
import { usePostsContext } from "../hooks/usePostsContext"
import { useAuthContext } from "../hooks/useAuthContext"

//component
import UserPostDetails from '../components/UserPostDetails'

const Home = () => {

    const { posts, dispatch } = usePostsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts/profile', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json })
            }
        }

        //loading posts if user logged in 
        if (user) {
            fetchPosts()
        }



    }, [dispatch, user])

    return (
        <div className="home">
            <div className="posts">
                {posts && posts.map((post) => (
                    <UserPostDetails post={post} key={post._id} />
                ))}
            </div>
        </div>
    )
}

export default Home