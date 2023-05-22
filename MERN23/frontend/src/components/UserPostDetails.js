import { usePostsContext } from "../hooks/usePostsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"


const UserPostDetails = ({ post }) => {

    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {

        if (!user) return

        const response = await fetch('/api/posts/profile/' + post._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_POST', payload: json })
        }
    }

    return (
        <div className="post-details">
            <h3>{post.title}</h3>
            <h3>{post.summary}</h3>
            <p>{post.text.replace('<p>', '').replace('</p>', '')}</p>
            {post.image && (<img alt="uploadedImage" width={100} height={100} src={post.image} />)}
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
            <span onClick={handleClick}>delete</span>

        </div>
    )
}

export default UserPostDetails