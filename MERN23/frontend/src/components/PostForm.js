import { useState } from "react"
import { usePostsContext } from "../hooks/usePostsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

//modules and formats for react quill
const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link',],
        ['clean']
    ]
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
]

const PostForm = () => {
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmtyFields] = useState([])

 
    function handleOnChange(e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function () {
            setImage(reader.result)
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!user) {

            setError('You must be logged in')

            return

        }

        const postData = { title, summary, text, image }

        const response = await fetch('/api/posts/profile', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmtyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setText('')
            setSummary('')
            setImage('')
            setError(null)
            setEmtyFields([])
            console.log('new post added', json)
            dispatch({ type: 'CREATE_POST', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit} >
            <h3>Add new Post</h3>

            <label>Title: </label>

            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Summary: </label>

            <input
                type="text"
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
                className={emptyFields.includes('title') ? 'error' : ''}
            />




            <ReactQuill

                theme="snow"
                onChange={setText}
                value={text}
                modules={modules}
                formats={formats}
                className={emptyFields.includes('text') ? 'error' : ''}

            />

            <input
                type='file'
                onChange={handleOnChange}


            />
            <div>
                {image === "" || image === null ? "" : <img width={100} height={100} src={image} alt="preview" />}
            </div>

            <button >Add new Post</button>
            {error && <div className="error">{error}</div>}

        </form>
    )

}

export default PostForm 