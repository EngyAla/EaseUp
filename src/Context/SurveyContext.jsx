import { createContext, useContext, useState, useEffect } from "react";

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {

    const [finalResult, setFinalResult] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const savedResult = localStorage.getItem("last_survey_result");
        const lastDate = localStorage.getItem("last_survey_date");

        if (savedResult) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFinalResult(JSON.parse(savedResult));
        }

        if (lastDate) {
            const oneWeek = 7 * 24 * 60 * 60 * 1000;
            const isExpired = Date.now() - parseInt(lastDate) > oneWeek;
            setIsBlocked(!isExpired);
        }
    }, []);

    const saveResult = (result) => {
        setFinalResult(result);
        localStorage.setItem("last_survey_result", JSON.stringify(result));
        localStorage.setItem("last_survey_date", Date.now().toString());
    };

    return (
        <SurveyContext.Provider value={{
            finalResult,
            setFinalResult,
            saveResult,
            isBlocked,
            setIsBlocked
        }}>
            {children}
        </SurveyContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSurvey = () => useContext(SurveyContext);