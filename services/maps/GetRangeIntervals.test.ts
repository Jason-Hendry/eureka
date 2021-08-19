import {GetRangeIntervals} from "./GetRangeIntervals";

describe('GetRangeIntervals', () => {
    it('should provide intervals', () => {
        expect(GetRangeIntervals([2, 51], 10)).toEqual([10,20,30,40,50])
    });
});