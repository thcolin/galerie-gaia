import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import Icon from 'components/Icon'
import theme from 'theme'

const Contact = ({ id, placeholder = 'Un message à nous adresser ?', success = '', inputs = [], method = 'message', toggle, ...props }) => {
  const [toggled, setToggled] = useState(false)
  const { register, watch, handleSubmit, formState: { isSubmitting, isSubmitSuccessful } } = useForm({ mode: 'onChange' })
  const onSubmit = async data => {
    fetch(`https://submit-form.com/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((res) => res.json().then(obj => console.log(obj)))
    .catch((error) => console.warn(error))
  }

  const values = watch()

  return (
    <Fragment>
      {toggle && (
        <button onClick={() => setToggled(!toggled)} className={`contact-form ${toggled ? 'active' : ''}`}>
          <Icon children={{ buy: 'palette', message: 'informations', newsletter: 'send' }[method]} style={{ margin: '0 0.5rem 0 0' }} />
          {{
            buy: `Acquérir cette oeuvre`,
            message: `Poser une question`,
            newsletter: `S'inscrire à la newsletter`,
          }[method]}
        </button>
      )}
      {(!toggle || toggled) && (
        <form css={Contact.styles.element} onSubmit={handleSubmit(onSubmit)}>
          {inputs.map(({ name, type = 'hidden', ...input }) => (
            <input {...input} ref={register} type={type} name={name} key={name} />
          ))}
          {/* honeypot / spam filtering */}
          <input ref={register()} type='text' name='address' style={{ display: 'none' }} tabIndex='-1' autoComplete='off' />
          {['buy', 'message'].includes(method) ? (
            <Fragment>
              <textarea ref={register()} name='message' maxLength='1000' placeholder={placeholder} />
              <div>
                <input ref={register({ required: true })} name='name' type='text' placeholder='Prénom, Nom' required={true} />
              </div>
              <small>Indiquez votre numéro de téléphone ou votre adresse email afin d'être recontactés :</small>
              <div>
                <input ref={register({ required: !values.phone })} name='email' type='email' placeholder='Email' required={!values.phone} />
                <input ref={register({ required: !values.email })} name='phone' type='tel' placeholder='Téléphone' required={!values.email} />
              </div>
              <button className={`contact-form ${isSubmitSuccessful ? 'active' : ''}`} type='submit' disabled={isSubmitting}>
                <Icon children={isSubmitSuccessful ? 'check' : isSubmitting ? 'loading' : 'send'} style={{ margin: '0 0.5rem 0 0' }} />
                {isSubmitSuccessful ? 'Envoyé !' : isSubmitting ? 'Envoie...' : 'Envoyer'}
              </button>
            </Fragment>
          ) : method === 'newsletter' ? (
            <div>
              <input ref={register({ required: true })} name='email' type='email' placeholder='Email' required={true} />
              <button className={`contact-form ${isSubmitSuccessful ? 'active' : ''}`} type='submit' disabled={isSubmitting} style={{ margin: '0 0 0 1rem' }}>
                <Icon children={isSubmitSuccessful ? 'check' : isSubmitting ? 'loading' : 'send'} style={{ margin: '0 0.5rem 0 0' }} />
                {isSubmitSuccessful ? 'Envoyé !' : isSubmitting ? 'Envoie...' : 'Envoyer'}
              </button>
            </div>
          ) : null}
          {isSubmitSuccessful && success && (
            <em><small>{success}</small></em>
          )}
          <details className="rgpd">
            <summary>RGPD - Protection de vos données</summary>
            Les informations recueillies via le site www.galeriegaia.fr (ci-après désigné « le Site ») ont vocation à être traitées par la Galerie Gaïa, responsable de traitement, aux fins de traitement de votre demande de renseignement. Les informations ci dessus sont obligatoires pour la gestion de vos demandes. Conformément à la réglementation applicable en matière de protection des données à caractère personnel, vous disposez d’un droit d’accès de rectification et de portabilité des informations vous concernant; d'un droit de limitation, d’effacement et d’opposition pour des motifs légitimes au traitement de vos données; de la possibilité de nous transmettre des directives afin d’organiser le sort des données vous concernant (conservation, effacement, communication à un tiers, etc.) en cas de décès; Vous pouvez exercer ces droits en écrivant à l'adresse électronique suivante : galeriegaia@orange.fr. Toutefois, votre opposition peut, en pratique et selon le cas, avoir une incidence sur votre demande d’information. Pour plus d’informations concernant ce traitement contactez-nous à l'adresse galeriegaia@orange.fr.
          </details>
        </form>
      )}
    </Fragment>
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
    '>small': {
      padding: '0.5rem 0.5rem 0',
      fontStyle: 'italic',
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
