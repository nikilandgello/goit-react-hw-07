import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

import css from './ContactFormBase.module.css';
import FieldBase from '../FieldBase/FieldBase';

const ContactFormBase = ({
  onSubmit,
  initialValues,
  contentBtn,
  onClick,
  open,
  btn = true,
}) => {
  const FeedbackSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(3, 'Too Short!')
      .max(13, 'Too Long!')
      .required('Required'),
    lastname: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .notRequired(),
    email: Yup.string().email('Invalid email address').notRequired(),
    dateofbith: Yup.string().min(8, 'Invalid data').notRequired(),
    notes: Yup.string().max(150, 'Too Long!'),
  });

  const formatPhoneNumber = value => {
    let digits = value.replace(/\D/g, '').slice(0, 10);

    let formattedNumber = '';
    if (digits.length > 0) formattedNumber += digits.slice(0, 3);
    if (digits.length > 3) formattedNumber += '-' + digits.slice(3, 6);
    if (digits.length > 6) formattedNumber += '-' + digits.slice(6, 10);

    return formattedNumber;
  };

  const formatData = value => {
    let digits = value.replace(/\D/g, '').slice(0, 8);

    let formattedData = '';
    if (digits.length > 0) formattedData += digits.slice(0, 4);
    if (digits.length > 3) formattedData += '-' + digits.slice(4, 6);
    if (digits.length > 6) formattedData += '-' + digits.slice(6, 8);
    if (digits.length > 8) formattedData += '-' + digits.slice(6, 8);

    return formattedData;
  };

  const onChangeFormat = (e, setFieldValue, format, fieldName) => {
    const { value } = e.target;
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      setFieldValue(fieldName, value);
    } else {
      setFieldValue(fieldName, format(value));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ setFieldValue, values }) => (
        <Form className={css.contactForm}>
          <FieldBase
            label="First name"
            name="firstname"
            placeholder="enter first name"
          />
          <FieldBase
            type="tel"
            label="Number"
            name="number"
            placeholder="xxx-xxx-xx-xx"
            value={values.number}
            onChange={e =>
              onChangeFormat(e, setFieldValue, formatPhoneNumber, 'number')
            }
          />
          <motion.div
            initial={{ opacity: 0, height: 0, visibility: 'hidden' }}
            animate={{
              opacity: open ? 1 : 0,
              height: open ? 'auto' : 0,
              visibility: open ? 'visible' : 'hidden',
            }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
            className={css.animatedContainer}
            style={{
              overflow: 'hidden',
              pointerEvents: open ? 'auto' : 'none',
            }}
          >
            <>
              <FieldBase
                label="Last name"
                name="lastname"
                placeholder="enter last name"
              />

              <FieldBase
                type="email"
                label="Email"
                name="email"
                placeholder="enter email"
              />

              <FieldBase
                label="Date of birth"
                name="dateofbith"
                placeholder="xxxx-xx-xx"
                onChange={e =>
                  onChangeFormat(e, setFieldValue, formatData, 'dateofbith')
                }
              />
              <FieldBase
                as="textarea"
                label="Notes"
                name="notes"
                placeholder="Notes..."
                classNames={['inputForm', 'textareaForm']}
              />
            </>
          </motion.div>

          {btn && (
            <button type="button" onClick={onClick} className={css.BtnMore}>
              {open ? 'Less' : 'More'}
            </button>
          )}
          <button type="submit" className={css.buttonForm}>
            {contentBtn}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactFormBase;
