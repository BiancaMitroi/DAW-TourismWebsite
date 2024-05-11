import styled from "styled-components";

const SectionContainer = styled.section`
  position: relative;
  margin-top: 20px;
  margin-left: 0px;
  margin-right: 0px;
  align-items: center;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Contact = () => {
  return (
    <>
      <SectionContainer>
        <h1>Contact - Location address</h1>
        <p>Bulevardul A, nr. 1, etaj 3</p>
        <p>
          Go see location on Google Maps:{" "}
          <a href="https://www.google.com/maps">Maps location</a>
        </p>
      </SectionContainer>
      <SectionContainer>
        <h1>Contact - more info</h1>
        <p>Phone number: 0000 000 001</p>
        <p>
          Mail address: <a href="https://www.google.com/gmail">Email address</a>
        </p>
      </SectionContainer>
    </>
  );
};

export default Contact;
