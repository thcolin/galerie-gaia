import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Icon from 'components/Icon'
import theme from 'theme'

const Contact = ({ id, placeholder = 'Un message à nous adresser ?', inputs = [], toggle, ...props }) => {
  const [toggled, setToggled] = useState(false)
  const { register, watch, handleSubmit, formState } = useForm({ mode: 'onChange' })
  const onSubmit = async data => fetch(`https://submit-form.com/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.json().then(obj => console.log(obj)))
  .catch((error) => console.warn(error))

  watch()

  return toggle && !toggled ? (
    <button onClick={() => setToggled(true)}>
      <Icon children="informations" style={{ margin: '0 0.5rem 0 0' }} />
      Plus d'informations
    </button>
  ) : (
    <form css={Contact.styles.element} onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(({ name, type = 'hidden', ...input }) => (
        <input {...input} ref={register} type={type} name={name} key={name} />
      ))}
      {/* honeypot / spam filtering */}
      <input ref={register} type='text' name='address' style={{ display: 'none' }} tabIndex='-1' autoComplete='off' />
      <div>
        <input ref={register({ required: true })} name='name' type='text' placeholder='Prénom, Nom' />
        <input ref={register({ required: true })} name='email' type='email' placeholder='Email' />
      </div>
      <textarea ref={register({ required: true })} name='message' maxLength='1000' placeholder={placeholder} />
      <button type='submit' disabled={!(formState.isValid && !formState.isSubmitting)}>
        <Icon children={formState.isSubmitted ? 'check' : formState.isSubmitting ? 'loading' : 'send'} style={{ margin: '0 0.5rem 0 0' }} />
        {formState.isSubmitted ? 'Envoyé !' : formState.isSubmitting ? 'Envoie...' : 'Envoyer'}
      </button>
    </form>
  )
}

Contact.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    '>*': {
      margin: '0.5rem 0',
    },
    '>div': {
      display: 'flex',
      [theme.medias.small]: {
        flexDirection: 'column',
      },
      '>input': {
        width: '100%',
        margin: '0 1rem',
        [theme.medias.small]: {
          margin: '0.5rem 0',
        },
        ':first-of-type': {
          marginTop: 0,
          marginLeft: 0,
        },
        ':last-of-type': {
          marginBottom: 0,
          marginRight: 0,
        },
      },
    },
    '>textarea': {
      width: '100%',
    },
    '>button': {
      alignSelf: 'flex-end',
    },
  },
}

export default Contact
