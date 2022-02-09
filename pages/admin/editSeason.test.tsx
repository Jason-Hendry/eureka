import {BaseList} from "../../models/base";
import {RaceData} from "../../models/Race";
import {LastDatePlus7} from "./editSeason";

describe("editSeason", () => {
    it('should add 7 days to last date', () => {
        const date = LastDatePlus7([{data: {Date:"2022-02-01", Title:""}, id: ""}] as BaseList<RaceData>, 2022)
        expect(date).toEqual("2022-02-08")
    });
})