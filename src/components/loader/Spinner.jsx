import { Paper } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = () => {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          position: "relative",
          top: "25%",
          left: "50%",
          bgcolor: "#f2f2f2",
          borderRadius: "50%",
          height: 50,
          width: 50,
          transform: "translate(-50%, -50%)",
        
        }}
      >
        <Oval
          height={30}
          width={30}
          color="#00a884"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            left: "50%",            
            justifyContent:"center",
            transform: "translate(-50%, -50%)",
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#00a884"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
      </Paper>
    </>
  );
};

export default Spinner;
