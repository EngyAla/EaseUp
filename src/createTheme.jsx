import { createTheme } from "@mui/material/styles";

export const formsTheme = createTheme({
    palette: {
        primary: {
        main: "#00796B",
        },
    },
    components: {
        MuiOutlinedInput: {
        styleOverrides: {
            root: {
                transition: "all 0.2s ease-in-out",
                "& fieldset": {
                    borderColor: "#ccc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0a7a6d87",
                    borderWidth: "2px",
                    transition: "0.1s",
                },
                "&.Mui-focused": {
                    boxShadow: "0 0 0 0.2rem rgba(0, 121, 107, 0.4), 0 0 1px rgba(0, 121, 107, 0.6)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                    borderWidth: "1px",
                },
            },
        },
        },
    },
});