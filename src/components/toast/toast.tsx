import React from "react";
import {
    BaseToastProps,
    ErrorToast,
    SuccessToast,
} from "react-native-toast-message";

export const toastConfig = {
    success: (props: BaseToastProps) => (
        <SuccessToast
            {...props}
            text1Style={{ fontSize: 16, color: "white" }}
            text2Style={{ fontSize: 14 }}
            style={{ backgroundColor: "rgba(32, 32, 32, 1)" }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            text1Style={{ fontSize: 16, color: "white" }}
            text2Style={{ fontSize: 14 }}
            style={{ backgroundColor: "rgba(32, 32, 32, 1)" }}
        />
    ),
};
