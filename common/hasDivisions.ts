import {RaceFormat} from "../models/Race";

export function hasDivisions(raceFormat?: RaceFormat) {
    if (raceFormat === undefined) {
        return false;
    }
    switch (raceFormat) {
        case RaceFormat.Criterium:
        case RaceFormat.GradedPointsRace:
        case RaceFormat.Graded:
            return true
        case RaceFormat.Handicap:
        case RaceFormat.TimeTrial:
            return false;
    }
    return false;
}