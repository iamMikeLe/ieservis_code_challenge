import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import toast from "react-hot-toast";
import { setMaxImagesToConvert } from "../../../store/generalSlice";
import { useAppDispatch } from "../../../store/hooks";

function MaxLimit(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    const maxImagesAlowed = Number(inputValue);
    if (!inputValue) {
      toast.dismiss();
      toast.error("Max Images field cannot be empty");
      return;
    }
    if (maxImagesAlowed <= 0) {
      toast.dismiss();
      toast.error("Max Images field cannot be less or equal 0");
      return;
    }

    if (Math.floor(maxImagesAlowed) < maxImagesAlowed) {
      toast.dismiss();
      toast.error("Max Images cannot be decimal");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/max-images-to-convert",
        {
          maxImagesToConvert: maxImagesAlowed,
        }
      );

      dispatch(setMaxImagesToConvert(response.data.maxImagesToConvert));
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <h6>Set max allowed images to be uploaded</h6>
      <MDBInput
        label="Max images"
        id="typeNumber"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
      />
      <MDBBtn style={{ marginTop: "0.5rem" }} onClick={handleSubmit}>
        Submit
      </MDBBtn>
    </>
  );
}

export default MaxLimit;
