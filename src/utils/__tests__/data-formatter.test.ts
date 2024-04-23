import { returnGender } from "@utils/data-formatter";

describe("utils/data-formatter", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns "Female" when number 1 is provided', () => {
        expect(returnGender(1)).toBe("Female");

        expect(returnGender(1)).not.toBe("Male");
        expect(returnGender(1)).not.toBe("Other");
    });

    it('returns "Male" when number 2 is provided', () => {
        expect(returnGender(2)).toBe("Male");

        expect(returnGender(2)).not.toBe("Female");
        expect(returnGender(2)).not.toBe("Other");
    });

    it('returns "Other" when a number different from 1 and 2 is provided', () => {
        expect(returnGender(3)).toBe("Other");

        expect(returnGender(3)).not.toBe("Female");
        expect(returnGender(3)).not.toBe("Male");
    });
});
