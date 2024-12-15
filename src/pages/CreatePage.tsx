import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateForm } from '../redux/slice/create';
import styles from '../style/CreatePage.module.css';

const CreatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form);
  const {firstName, lastName, email, about} = useSelector((state: RootState) => state.form);
	const [hideProfile, setHideProfile] = useState(false);

  const [form, setForm] = useState(formData);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    about: '',
  });

  const validate = () => {
    let valid = true;
    const newErrors = { firstName: '', lastName: '', email: '', about: '' };

    if (!form.firstName) {
      newErrors.firstName = 'Имя обязательно';
      valid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = 'Фамилия обязательно';
      valid = false;
    }
    if (!form.email) {
      newErrors.email = 'Email обязательно';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email неверный';
      valid = false;
    }
    if (!form.about) {
      newErrors.about = 'Раздел о себе обязательно';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
	
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateForm(form));
      alert('Спасибо! Ваши данные под защитой!');
			setHideProfile(true);
    }
  };

  return (
		<div className={styles.createPage}>
			<form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formInput}>
        <label htmlFor="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div className={styles.formInput}>
        <label htmlFor="about">О себе:</label>
        <textarea
          id="about"
          name="about"
          value={form.about}
          onChange={handleChange}
        />
        {errors.about && <p className={styles.error}>{errors.about}</p>}
      </div>
      <button className={styles.sendButton} type="submit">Отправить</button>
    	</form>
			<div className={styles.profile}>
				{hideProfile?<>
				<h4>Профиль пользователя</h4>
				<ul>
					<li><strong>Ваше Имя</strong>: {firstName}</li>
					<li><strong>Ваше Фамилия</strong>: {lastName}</li>
					<li><strong>Ваше Email</strong>: {email}</li>
					<li><strong>О себе</strong>: {about}</li>
				</ul></>: <h3>Заполните профиль</h3>
				}
			</div>
		</div>
    
  );
};

export default CreatePage;
