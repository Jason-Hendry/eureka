import {stringToLatLng} from "./LatLngField";

describe('LatLngField', () => {
    it('should convert string to LatLng', () => {
        expect(stringToLatLng("-37.436693, 143.724264")).toEqual([-37.436693, 143.724264])
    });
});