import { device, expect } from "detox";

describe("src/screens/home/<HomeScreen />", () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('renders "Hello Pedro" in the screen', async () => {
        await expect(element(by.text("Hello Pedro"))).toBeVisible();
    });

    it('navigates to Profile Screen when "Hello Pedro is pressed', async () => {
        await element(by.text("Hello Pedro")).tap();

        await expect(element(by.text("Profile"))).toBeVisible();
        await expect(element(by.text("Name"))).toBeVisible();
        await expect(element(by.text("E-mail"))).toBeVisible();
        await expect(element(by.text("Country"))).toBeVisible();
        await expect(element(by.text("Update Profile"))).toBeVisible();
    });
});
