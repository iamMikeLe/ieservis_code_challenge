import { jsPDF } from "jspdf";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

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
  position: "relative",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Convertor(): JSX.Element {
  const [images, setImages] = useState<Array<{ src: string; file: File }>>([]);
  const MAX_IMAGES = 5; // maximum number of allowed images
  const [maxImagesReached, setMaxImagesReached] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Calculate how many files we can take
      const availableSlots = MAX_IMAGES - images.length;

      // If the user tries to upload more images than allowed, alert them and return early
      if (acceptedFiles.length > availableSlots) {
        toast.error(`You can only upload ${availableSlots} more image(s).`);
        return;
      }

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

      // If we've reached the maximum number of images, set the flag
      if (images.length + acceptedFiles.length >= MAX_IMAGES) {
        setMaxImagesReached(true);
      }
    },
    [images]
  );

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
  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    if (newImages.length < MAX_IMAGES) {
      setMaxImagesReached(false);
    }
  };

  const thumbs = images.map((image, i) => (
    <div style={thumb} key={i}>
      <div style={thumbInner}>
        <img src={image.src} style={img} />
        <button
          onClick={() => handleRemove(i)}
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          x
        </button>
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

  console.log("images", images.length);
  return (
    <MDBCard>
      <MDBCardBody>
        <div
          {...(maxImagesReached ? {} : getRootProps({ className: "dropzone" }))}
          style={{
            border: "2px dashed #888",
            padding: "20px",
            cursor: maxImagesReached ? "default" : "pointer",
          }}
        >
          <input
            {...getInputProps({ disabled: maxImagesReached })}
            style={{ display: "none" }}
          />
          {maxImagesReached ? (
            <p>You have reached the maximum number of images ({MAX_IMAGES}).</p>
          ) : (
            <p>
              Drag 'n' drop, or click to select at least one file to convert.
            </p>
          )}
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <button onClick={generatePdf} disabled={images.length === 0}>
          Generate PDF
        </button>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Convertor;
