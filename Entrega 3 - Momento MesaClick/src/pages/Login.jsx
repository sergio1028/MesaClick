import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function enviar(e) {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
        'No se pudo iniciar sesión. Verifica tus datos.'
      );
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={enviar}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '55px' }}>🍔</div>
          <h1>MesaClick</h1>
          <p>Tu comida favorita, a un clic de distancia.</p>
        </div>

        <h2>¡Bienvenido de nuevo!</h2>
        <p>Ingresa a tu cuenta para descubrir nuestro menú.</p>

        <label>
          Correo electrónico
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </label>

        {error && <p role="alert">{error}</p>}

        <button type="submit">Iniciar sesión</button>

        <p style={{ textAlign: 'center' }}>
          ¿Todavía no tienes cuenta?{' '}
          <Link to="/registro">Regístrate aquí</Link>
        </p>
      </form>
    </section>
  );
}