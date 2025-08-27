
import React, { useEffect, useState } from 'react';


export default function Form({
  initialValue = '',
  placeholder = 'ingresa tu nombre',
  btnLabel = '¡Comenzar!',
  onSubmit,
  onReset,
  disabled = false,
}) {
  const [value, setValue] = useState(initialValue); 
  const [error, setError] = useState('');           
  const [submitting, setSubmitting] = useState(false); 


  useEffect(() => {
    setValue(initialValue ?? '');
  }, [initialValue]);


  function validate(v) {
    const t = String(v ?? '').trim();
    if (!t) return 'El nombre no puede estar vacío.';
    if (t.length > 30) return 'El nombre no puede exceder 30 caracteres.';
    return '';
  }


  const handleChange = (e) => {
    setValue(e.target.value);
    if (error) setError('');
  };

  
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (disabled || submitting) return;

    const err = validate(value);
    if (err) {
      setError(err);
      return;
    }

    setSubmitting(true);
    try {

      await onSubmit?.(value.trim());
    } catch (err) {
    
      console.error('FormUsuario onSubmit error:', err);
      setError('No se pudo procesar. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setValue('');
    setError('');
    onReset?.();
  };

  return (
    <form
      className="form-user"
      onSubmit={handleSubmit}
      aria-label="Formulario para ingresar nombre de usuario"
    >
      
      <label htmlFor="user-name" className="visually-hidden">Nombre de usuario</label>

      <input
        id="user-name"
        className="form-input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="nombre de usuario"
        aria-required="true"
        aria-invalid={!!error}
        disabled={disabled || submitting}
      />

      <button
        type="submit"
        className="btn"
        disabled={disabled || submitting}
        aria-disabled={disabled || submitting}
      >
        {submitting ? 'Cargando...' : btnLabel}
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleReset}
        disabled={disabled || submitting}
        aria-disabled={disabled || submitting}
      >
        Limpiar
      </button>

    
      <div className="form-messages" aria-live="polite">
        {error ? (
          <p className="form-error" role="alert">{error}</p>
        ) : null}
      </div>
    </form>
  );
}
