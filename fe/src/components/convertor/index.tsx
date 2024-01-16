import { jsPDF } from "jspdf";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Convertor(): JSX.Element {
  const [images, setImages] = useState<Array<string>>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result as string]);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const generatePdf = () => {
    const pdf = new jsPDF();
    const WIDTH = 210; // width of A4 in mm
    const HEIGHT = 297; // height of A4 in mm

    const loadImages = images.map((image, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = function () {
          const width = img.width;
          const height = img.height;
          const aspectRatio = width / height;

          let pdfWidth = WIDTH;
          let pdfHeight = WIDTH / aspectRatio;

          if (pdfHeight > HEIGHT) {
            pdfHeight = HEIGHT;
            pdfWidth = HEIGHT * aspectRatio;
          }

          pdf.addImage(image, "JPEG", 0, 0, pdfWidth, pdfHeight);
          if (index < images.length - 1) {
            pdf.addPage();
          }
          resolve(null);
        };
        img.onerror = reject;
      });
    });

    Promise.all(loadImages)
      .then(() => {
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <button onClick={generatePdf} disabled={images.length === 0}>
        Generate PDF
      </button>
    </div>
  );
}

export default Convertor;
