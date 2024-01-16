import { jsPDF } from "jspdf";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box" as const,
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Convertor(): JSX.Element {
  const [images, setImages] = useState<Array<{ src: string; file: File }>>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImages((prevImages) => [
          ...prevImages,
          { src: reader.result as string, file },
        ]);
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
        img.src = image.src;
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

          pdf.addImage(image.src, "JPEG", 0, 0, pdfWidth, pdfHeight);
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
        setImages([]);
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

  const thumbs = images.map((image) => (
    <div style={thumb} key={image.file.name}>
      <div style={thumbInner}>
        <img
          src={image.src}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(image.src);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.src));
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  return (
    <MDBCard>
      <MDBCardBody>
        <div {...getRootProps({ className: "dropzone" })}>
          <input
            {...getInputProps()}
            style={{
              border: "2px dashed #888",
              padding: "20px",
              cursor: "pointer",
            }}
          />
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <button onClick={generatePdf}>Generate PDF</button>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Convertor;
