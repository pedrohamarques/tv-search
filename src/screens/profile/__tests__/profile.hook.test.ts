import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useProfileScreen } from "../profile.hook";
import { RouteStackList } from "@typings/route";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const mockReplace = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        replace: mockReplace,
    }),
}));

const mockLaunchImage = jest.fn();

jest.mock("expo-image-picker", () => ({
    ...jest.requireActual("expo-image-picker"),
    launchImageLibraryAsync: () => mockLaunchImage(),
}));

const alertSpy = jest.spyOn(Alert, "alert");

const toastSpy = jest.spyOn(Toast, "show");

describe("screens/profile/useProfileScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("navigates to Home Screen when handleBackPress is called when it is not updating", () => {
        const { result } = renderHook(() => useProfileScreen());

        act(() => result.current.handleBackPress());

        expect(mockReplace).toHaveBeenCalledTimes(1);
        expect(mockReplace).toHaveBeenCalledWith(RouteStackList.DRAWER);
    });

    it("calls Alert when handleBackPress is pressed and it is updating", () => {
        const { result } = renderHook(() => useProfileScreen());

        act(() => result.current.handleEditingNamePress());
        act(() => result.current.handleBackPress());

        expect(alertSpy).toHaveBeenCalledTimes(1);
        expect(alertSpy).toHaveBeenCalledWith(
            "Unsaved changes",
            "Are you sure you want to go back? There are unsaved changes!",
            [
                {
                    text: "Yes, I want to go back",
                    style: "default",
                    onPress: expect.any(Function),
                },
                {
                    text: "Cancel",
                    style: "destructive",
                },
            ],
        );

        alertSpy.mock.calls[0][2]?.[0].onPress?.();

        expect(mockReplace).toHaveBeenCalledTimes(1);
        expect(mockReplace).toHaveBeenCalledWith(RouteStackList.DRAWER);
    });

    it("updates the avatar when handlePickImage is called successfully", async () => {
        mockLaunchImage.mockResolvedValueOnce({
            assets: [{ uri: "somePath" }],
        });

        const { result } = renderHook(() => useProfileScreen());

        await act(() => result.current.handlePickImage());

        await waitFor(() => expect(mockLaunchImage).toHaveBeenCalledTimes(1));
        expect(result.current.profileState.avatar).toEqual({
            data: "somePath",
            isEditing: true,
        });

        expect(toastSpy).not.toHaveBeenCalled();
    });

    it("does not update the avatar when handlePickImage is called with error", async () => {
        mockLaunchImage.mockRejectedValueOnce(new Error("error"));

        const { result } = renderHook(() => useProfileScreen());

        await act(() => result.current.handlePickImage());

        await waitFor(() => expect(mockLaunchImage).toHaveBeenCalledTimes(1));
        expect(result.current.profileState.avatar).toEqual({
            data: null,
            isEditing: false,
        });

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenCalledWith({
            type: "error",
            text1: "Couldn't pick image",
            text2: "Try again later",
            onPress: expect.any(Function),
        });
    });

    it("sets isEditing from name object to true when handleEditingNamePress is called", () => {
        const { result } = renderHook(() => useProfileScreen());

        act(() => result.current.handleEditingNamePress());

        expect(result.current.profileState.name).toEqual({
            data: null,
            isEditing: true,
        });
    });

    it("updates the profile name when handleChangeName is pressed", () => {
        const { result } = renderHook(() => useProfileScreen());

        act(() => result.current.handleChangeName("name"));

        expect(result.current.profileState.name).toEqual({
            data: "name",
            isEditing: false,
        });
    });

    it("updates the country object in profile state when handleChooseCountry is pressed", () => {
        const { result } = renderHook(() => useProfileScreen());

        const someCountry = {
            code: "SC",
            name: "Some Country 2",
        };

        act(() => result.current.handleChooseCountry(someCountry));

        expect(result.current.profileState.country).toEqual({
            isEditing: true,
            data: someCountry,
        });
    });

    it("does not update the country object in profile state when handleChooseCountry is pressed with the same initial country", () => {
        const { result } = renderHook(() => useProfileScreen());

        const sameCountry = {
            code: "SC",
            name: "Select Country",
        };

        act(() => result.current.handleChooseCountry(sameCountry));

        expect(result.current.profileState.country).toEqual({
            isEditing: false,
            data: sameCountry,
        });
    });

    it("shows a success toast when handleUpdateProfile is called with valid data", () => {
        const { result } = renderHook(() => useProfileScreen());

        act(() => result.current.handleChangeName("validName"));
        act(() => result.current.handleUpdateProfile());

        expect(result.current.profileState).toEqual({
            avatar: {
                data: null,
                isEditing: false,
            },
            name: {
                data: "validName",
                isEditing: false,
            },
            country: {
                data: {
                    code: "SC",
                    name: "Select Country",
                },
                isEditing: false,
            },
        });

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenCalledWith({
            type: "success",
            text1: "Profile updated successfully",
            onPress: expect.any(Function),
        });
    });

    it("shows a error toast when handleUpdateProfile is called with invalid data", () => {
        const { result } = renderHook(() => useProfileScreen());

        act(() => result.current.handleEditingNamePress());
        act(() => result.current.handleChangeName("no"));
        act(() => result.current.handleUpdateProfile());

        expect(result.current.profileState).toEqual({
            avatar: {
                data: null,
                isEditing: false,
            },
            name: {
                data: "no",
                isEditing: true,
            },
            country: {
                data: {
                    code: "SC",
                    name: "Select Country",
                },
                isEditing: false,
            },
        });

        expect(toastSpy).toHaveBeenCalledTimes(1);
        expect(toastSpy).toHaveBeenCalledWith({
            type: "error",
            text1: "Please, try another name",
            text2: "Name must be at least 3 characters long",
            onPress: expect.any(Function),
        });
    });
});
