import React, { useContext } from "react";
import { Box, styled, Typography, Skeleton } from "@mui/material";
import { AccountContext } from "../../context/AccountProvider";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;
const Image = styled(Box)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 25px 0;
  object-fit: "cover";
  cursor: pointer;
`;

const Container = styled(Box)`
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

  & :first-of-type {
    font-size: 14px;
    color: #20907c;
    font-weight: 300;
  }
  & :last-child {
    font-size: 16px;
    font-weight: 300;
    margin: 14px 0px;
  }
`;

const Discription = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    font-size: 14px;
    color: #8696a0;
  }
`;
const Profile = () => {
  const { account } = useContext(AccountContext);

  return (
    <>
      <ImageContainer>
        {`${account.picture}` ? (
          <Image
            component={"img"}
            src={account.picture}
            alt="dp"
            sx={{
              "&:hover": {
                filter: `contrast(70%)`,
              },
            }}
          />
        ) : (
          <Skeleton
            variant="circular"
            width={200}
            height={200}
            sx={{ margin: "25px 0" }}
          >
            <Image component={"img"} alt="dp" />
          </Skeleton>
        )}
      </ImageContainer>
      <Container>
        <Typography>Your name</Typography>
        <Typography> {account.name}</Typography>
      </Container>
      <Discription>
        <Typography>
          This is not your username or pin. This name will be visible to your
          whatsApp contacts.
        </Typography>
      </Discription>
      <Container>
        <Typography>About</Typography>
        <Typography>Hey! I am using whatsapp.</Typography>
      </Container>
    </>
  );
};

export default Profile;
