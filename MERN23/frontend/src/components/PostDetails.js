import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PostDetails = ({ post }) => {

    return (
        <div className="post-details">
            <h3>{post.title}</h3>
            <h3>{post.summary}</h3>
            <p>{post.text.replace('<p>', '').replace('</p>', '')}</p>
            {post.image && (<img alt="uploadedImage" width={100} height={100} src={post.image} />)}
            <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
        </div>
    )
}

export default PostDetails