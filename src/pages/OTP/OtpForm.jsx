import React, { useState } from "react";
import { Box } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

const OtpForm = () => {
    const [otp, setOtp] = useState("");

    const handleChange = (newValue) => {
        // أرقام بس
        if (/^\d*$/.test(newValue)) {
        setOtp(newValue);
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2, width: "30%" }}>
        <MuiOtpInput
            // sx={{ width: "50px"}}
            value={otp}
            onChange={handleChange}
            length={6}
            TextFieldsProps={{
            inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                },
            }}
        />
        </Box>
    );
};

export default OtpForm;