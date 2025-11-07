'use client';

import { useFormStatus } from 'react-dom';
import styles from './photo-comments.module.css';
import EnviarIcon from '@/icons/enviar-icon';
import { Comment } from '@/actions/photo-get';
import commentPost from '@/actions/comment-post';
import React from 'react';
import ErrorMessage from '@/components/helper/error-message';

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  );
}

export default function PhotoCommentsForm({
  single,
  id,
  setComments,
}: {
  single: boolean;
  id: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [state, action] = React.useActionState(commentPost, {
    ok: false,
    data: null,
    error: '',
  });
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data]);
      setComment('');
    }
  }, [state, setComments]);

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ''}`}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
