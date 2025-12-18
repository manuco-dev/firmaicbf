import  { useState } from 'react';

const UploadAndCompressPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [compressedFileUrl, setCompressedFileUrl] = useState("");

  // Maneja la selección del archivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileUrl("");
    setCompressedFileUrl("");
  };

  // Subir archivo a Cloudinary
  const handleUpload = async () => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "archivos");

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dacqimkdr/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setFileUrl(data.secure_url);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    } finally {
      setUploading(false);
    }
  };

  // Comprimir el archivo usando la API de api.pdf.co
  const handleCompress = async () => {
    if (!fileUrl) return;
    setCompressing(true);

    try {
      const pdfCoResponse = await fetch("https://api.pdf.co/v1/pdf/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "comanuel7@gmail.com_xxNTTCdRFqwbbr8MPWw8rJ1EremzCUpAlVRb3RrZtFaPDnpTKxZKykszkc8vIi6Z" // Reemplaza con tu API Key de api.pdf.co
        },
        body: JSON.stringify({
          url: fileUrl,
        })
      });
      const pdfData = await pdfCoResponse.json();
      setCompressedFileUrl(pdfData.url);
    } catch (error) {
      console.error("Error al comprimir archivo:", error);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px",  textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ margin: "20px 0", padding: "10px", fontSize: "16px" }}
      />
      <div>
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            backgroundColor: uploading ? "#ccc" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Subiendo..." : "Subir a Cloudinary"}
        </button>

        <button
          onClick={handleCompress}
          disabled={!fileUrl || compressing}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            backgroundColor: compressing ? "#ccc" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: compressing ? "not-allowed" : "pointer",
          }}
        >
          {compressing ? "Comprimiendo..." : "Comprimir PDF"}
        </button>
      </div>

      {fileUrl && (
        <p style={{ margin: "15px 0" }}>
          Archivo subido a Cloudinary:{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff" }}>
            Ver archivo
          </a>
        </p>
      )}

      {compressedFileUrl && (
        <p style={{ margin: "15px 0" }}>
          Archivo comprimido:{" "}
          <a href={compressedFileUrl} download="archivo_comprimido.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#28a745" }}>
            Descargar archivo comprimido
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadAndCompressPDF;
