import React, { useEffect, useState } from 'react';

const DocumentationPage = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Realizar la carga del archivo documentacion.html
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('/documentacion.html'); // Ruta correcta donde se sirve documentacion.html
        const html = await response.text();
        setHtmlContent(html);
      } catch (error) {
        console.error('Error al cargar documentacion.html:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default DocumentationPage;
