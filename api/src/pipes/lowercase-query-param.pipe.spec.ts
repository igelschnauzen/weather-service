import { ToponimicNamePipe } from "./lowercase-query-param.pipe";

describe("ToponimicNamePipe", () => {
    it("should return a word with first capital letter, the rest should be regular", () => {
        let brokenName = "mOscOw";
        let normalName = "Moscow";

        const pipe = new ToponimicNamePipe();
        expect(pipe.transform(brokenName, null)).toEqual(normalName);
        expect(pipe.transform(normalName, null)).toEqual(normalName); //not to change the normal name
    });
});