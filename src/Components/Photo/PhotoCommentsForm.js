import React from 'react';
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../../api";
import Error from "../Helper/Error";
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState('')
  const { error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('token')
    const { url, options } = COMMENT_POST(id, { comment }, token)
    const { response, json } = await request(url, options)
    if (response.ok) {
      setComment('')
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea id="comment"
                name="comment"
                value={comment}
                className={styles.textarea}
                placeholder="Comente..."
                onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
