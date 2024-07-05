import React, { useState, useEffect } from 'react';
import '../csski/about.css'; // Poprawna ścieżka do pliku CSS

function About() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formState.name) newErrors.name = 'Name is required';
        if (!formState.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formState.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            alert('Form submitted successfully!');
            setFormState({
                name: '',
                email: '',
                message: '',
            });
            setErrors({});
        }
    };

    useEffect(() => {
        const createCrescents = () => {
            const container = document.querySelector('.falling-crescents');
            for (let i = 0; i < 10; i++) {
                const crescent = document.createElement('div');
                crescent.className = 'crescent';
                container.appendChild(crescent);
            }
        };
        createCrescents();
    }, []);

    return (
        <div className="about-container">
            <div className="falling-crescents"></div>
            <div className="content-wrapper">
                <div className="animated-description">
                    <p className="description">
                        Ten projekt zaliczeniowy został stworzony w ramach kursu tworzenia nowoczesnych aplikacji front-endowych.
                        Gra "Kliknij Banana" to innowacyjne podejście do prostych gier, które uczą cierpliwości, refleksji i filozoficznego podejścia do życia.
                        Klikając banany, uczymy się doceniać małe rzeczy i cieszyć się chwilą.
                        W świecie pełnym pośpiechu, ta gra przypomina nam o znaczeniu obecności i uważności.
                    </p>
                </div>
                <h2 className="contact-title">Formularz kontaktowy</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Imię:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Wiadomość:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            className={errors.message ? 'error' : ''}
                        />
                        {errors.message && <span className="error-message">{errors.message}</span>}
                    </div>
                    <button type="submit" className="submit-button">Wyślij</button>
                </form>
            </div>
        </div>
    );
}

export default About;
