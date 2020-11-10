import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Icon from 'components/Icon'
import theme from 'theme'

const Contact = ({ id, placeholder = 'Un message à nous adresser ?', inputs = [], method = 'message', toggle, ...props }) => {
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

  return (
    <>
      <button onClick={() => setToggled(!toggled)} className="contact-form">
        <Icon children={{ buy: 'palette', message: 'informations', phone: 'phone' }[method]} style={{ margin: '0 0.5rem 0 0' }} />
        {{
          buy: `Acquérir cette oeuvre`,
          message: `Poser une question`,
          phone: `Être rappelé`,
        }[method]}
      </button>
      {toggle && toggled && (
        <form css={Contact.styles.element} onSubmit={handleSubmit(onSubmit)}>
          {inputs.map(({ name, type = 'hidden', ...input }) => (
            <input {...input} ref={register} type={type} name={name} key={name} />
          ))}
          {/* honeypot / spam filtering */}
          <input ref={register} type='text' name='address' style={{ display: 'none' }} tabIndex='-1' autoComplete='off' />
          <div>
            <input ref={register({ required: true })} name='name' type='text' placeholder='Prénom, Nom' />
            {['buy', 'message'].includes(method) && (
              <input ref={register({ required: true })} name='email' type='email' placeholder='Email' />
            )}
            {['buy', 'phone'].includes(method) && (
              <input ref={register({ required: method == 'phone' })} name='phone' type='tel' placeholder='Numéro de téléphone' />
            )}
          </div>
          {['buy', 'message'].includes(method) && (
            <textarea ref={register({ required: true })} name='message' maxLength='1000' placeholder={placeholder} />
          )}
          <button className="contact-form" type='submit' disabled={!(formState.isValid && !formState.isSubmitting)}>
            <Icon children={formState.isSubmitted ? 'check' : formState.isSubmitting ? 'loading' : 'send'} style={{ margin: '0 0.5rem 0 0' }} />
            {formState.isSubmitted ? 'Envoyé !' : formState.isSubmitting ? 'Envoie...' : 'Envoyer'}
          </button>
        </form>
      )}
    </>
  )
}

Contact.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
      lineHeight: 1.5,
    },
    '>button': {
      width: '100%',
    },
  },
}

export default Contact
