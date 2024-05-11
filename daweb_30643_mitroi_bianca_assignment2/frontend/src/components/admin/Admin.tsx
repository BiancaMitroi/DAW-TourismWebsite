import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styled, { css } from "styled-components";
import { SectionContent } from "../../interfaces/ISectionContent";
import * as requests from "./requests";

const StyledElement = css`
  width: 14vw;
  height: 8vh;
`;

const StyledInput = {
  width: "14vw",
  height: "6.8vh",
  backgroundColor: "transparent",
  margin: "7px",
};

const StyledButton = styled(Button)`
  ${StyledElement};
`;

const ButtonStyle = {
  backgroundColor: "#aa96da",
  margin: "7px",
};

const StyledTextField = styled(TextField)`
  ${StyledElement};
`;

const TextFieldStyle = {
  margin: "7px",
};

const Admin = () => {
  const [location, setLocation] = useState<SectionContent>({
    index: 0,
    type: "",
    title: "",
    description: "",
    image: undefined,
    location: "",
    pricePerNight: 0,
    capacity: 0,
    offer: 0,
    link: "",
    rating: 0,
    user: "",
  });
  return (
    <div
      style={{
        zIndex: "10",
        background: "rgba(255, 255, 210, 0.9)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StyledTextField
          placeholder="title"
          style={TextFieldStyle}
          onChange={(e) => setLocation({ ...location, title: e.target.value })}
        />
        <StyledTextField
          placeholder="description"
          style={TextFieldStyle}
          onChange={(e) =>
            setLocation({ ...location, description: e.target.value })
          }
        />
        <StyledTextField
          placeholder="location"
          style={TextFieldStyle}
          onChange={(e) =>
            setLocation({ ...location, location: e.target.value })
          }
        />
        <StyledTextField
          placeholder="price"
          style={TextFieldStyle}
          type="number"
          onChange={(e) =>
            setLocation({ ...location, pricePerNight: Number(e.target.value) })
          }
        />
        <StyledTextField
          placeholder="offer"
          style={TextFieldStyle}
          type="number"
          onChange={(e) =>
            setLocation({ ...location, offer: Number(e.target.value) })
          }
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StyledTextField
          placeholder="capacity"
          style={TextFieldStyle}
          onChange={(e) =>
            setLocation({ ...location, capacity: Number(e.target.value) })
          }
        />
        <input
          style={StyledInput}
          placeholder="image"
          type="file"
          name="image"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              setLocation({
                ...location,
                image: file,
              }); // Store the entire File object
            }
          }}
        />
        <StyledButton
          variant="contained"
          style={ButtonStyle}
          onClick={() => location && requests.add(location)}
        >
          Add
        </StyledButton>
        <StyledButton
          variant="contained"
          style={ButtonStyle}
          onClick={() => location && requests.update(location)}
        >
          Update
        </StyledButton>
        <StyledButton
          variant="contained"
          style={ButtonStyle}
          onClick={() => location && requests.remove(location)}
        >
          Delete
        </StyledButton>
      </div>
    </div>
  );
};

export default Admin;
