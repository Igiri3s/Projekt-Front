import React, { useState, useEffect } from 'react';
import '../csski/about.css';

function About() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=London&appid=cf749dfb283fa25ae44102fe86f820c9&units=metric`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setWeather(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWeatherData();

        // JavaScript to add multiple falling bananas
        const createBanana = () => {
            const banana = document.createElement('div');
            banana.className = 'crescent';
            banana.style.left = `${Math.random() * 100}%`;
            banana.style.animationDuration = `${Math.random() * 5 + 5}s`;
            document.querySelector('.falling-crescents').appendChild(banana);

        };

        const bananaInterval = setInterval(createBanana, 1000);
        return () => clearInterval(bananaInterval);
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
                        Ze względów bezpieczeństwa w grę zalecia sie grać tylko jeżeli w Lodnynie temperatura jest wyższa od 15 stopni
                    </p>
                    {loading && <p>Loading weather data...</p>}
                    {error && <p>Error fetching weather data: {error}</p>}
                    {weather && (
                        <p className="weather-info">
                            Aktualna temperatura w Londynie: {weather.main.temp} °C
                            {weather.main.temp > 15 ? (
                                <span> - W Londynie super pogoda, można grać bezpiecnzie.</span>
                            ) : (
                                <span> - Pogoda nie jest idealna do gry, lepiej poczekać na cieplejsze dni.</span>
                            )}
                        </p>
                    )}
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
