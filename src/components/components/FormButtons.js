import React, { Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { ButtonCreate, ButtonDelete, Checkbox } from "../../styled-components/common";

const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CheckboxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormButtons = ({ textFail, textSuccess, buttonSuccessFunction, handleButtonCancelClick }) => {
    const [hasDelay, setHasDelay] = useState(false);

    const handleButtonSuccessClick = useCallback(() => {
        buttonSuccessFunction(hasDelay);
    }, [hasDelay, buttonSuccessFunction]);

    const handleCheckBoxDelayChanged = useCallback(() => {
        setHasDelay(!hasDelay);
    }, [hasDelay]);

    return (
        <Fragment>
            <CheckboxContainer>
                <label>With delay</label>
                <Checkbox onChange={handleCheckBoxDelayChanged} type="checkbox" checked={hasDelay} />
            </CheckboxContainer>
            <OptionContainer>
                <ButtonCreate onClick={handleButtonSuccessClick}>{textSuccess}</ButtonCreate>
                {typeof handleButtonCancelClick === "function" && (
                    <ButtonDelete onClick={handleButtonCancelClick}>{textFail}</ButtonDelete>
                )}
            </OptionContainer>
        </Fragment>
    );
};

export default FormButtons;
