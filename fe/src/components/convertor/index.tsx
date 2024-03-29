import { jsPDF } from "jspdf";
import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

import { selectMaxImagesAllowed } from "../../store/generalSlice";
import { useAppSelector } from "../../store/hooks";
import "./Convertor.css";
import Thumbnail from "./thumbnail";

export type PreConvertImage = {
  file: File;
  src: string;
};

function Convertor(): JSX.Element {
  const [images, setImages] = useState<PreConvertImage[]>([]);
  const maxImages = useAppSelector<number>(selectMaxImagesAllowed);
  const [maxImagesReached, setMaxImagesReached] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Calculate how many files we can take
      const availableSlots = maxImages - images.length;

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
      if (images.length + acceptedFiles.length >= maxImages) {
        setMaxImagesReached(true);
      }
    },
    [images, maxImages]
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
        console.error(error);
        toast.error("Error generating PDF", error);
      });
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (newImages.length < maxImages) {
      setMaxImagesReached(false);
    }
  };

  useEffect(() => {
    return () => images.forEach((image) => URL.revokeObjectURL(image.src));
  }, [images]);

  const { getRootProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  return (
    <MDBCard className="dropzone-wrapper">
      <MDBCardBody>
        <div
          {...(maxImagesReached ? {} : getRootProps({ className: "dropzone" }))}
          className="custom-dropzone"
        >
          {maxImagesReached ? (
            <p>You have reached the maximum number of images ({maxImages}).</p>
          ) : (
            <p>
              Drag 'n' drop, or click to select up to{" "}
              {maxImages - images.length} {maxImages === 1 ? "image" : "images"}{" "}
              to convert.
            </p>
          )}
        </div>
        <aside className="custom-thumbsContainer">
          {images.map((image, i) => (
            <Thumbnail key={i} image={image} onRemove={() => handleRemove(i)} />
          ))}
        </aside>
        <MDBBtn outline onClick={generatePdf} disabled={images.length === 0}>
          Generate PDF
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}

export default Convertor;
