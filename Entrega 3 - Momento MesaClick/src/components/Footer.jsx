import React from 'react';

export default function Footer() {
  const developerName = "Sergio Andres Galeano"; 
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <p>&copy; {currentYear} {developerName}. Todos los derechos reservados.</p>
    </footer>
  );
}