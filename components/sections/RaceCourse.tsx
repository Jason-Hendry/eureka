import {useState, VFC} from "react";
import {PolyLineMapHolder} from "../maps/PolyLineMap";
import {Course} from "../../models/Course";
import {SiteSetting} from "../../models/SiteSetting";
import {CourseProfile} from "../profile/CourseProfile";
import {LatLng} from "../../services/getGPXPoints";

interface RaceCourseProps {
    course: Course | null
    siteSetting?: SiteSetting
}

export const RaceCourse: VFC<RaceCourseProps> = ({course, siteSetting}) => {

    const [profileLocation, setProfileLocation] = useState<LatLng|null>(null)

    const registrationLocation = course?.data?.RegistrationLocation || siteSetting?.data.EurekaClubHouseLocation || null
    const registrationInformation = course?.data?.RegistrationInformation || siteSetting?.data.EurekaClubHouseRegistration || null

    return (<>
        {course?.data.GPXData && <>
            <h3>Map</h3>
            <PolyLineMapHolder path={course?.data.GPXData?.latLong} width={800} height={400}
                               registrationLocation={registrationLocation} profileLocation={profileLocation}/>
            <CourseProfile elevation={course?.data.GPXData?.elevation} path={course?.data.GPXData?.latLong} showLocation={setProfileLocation}/>
        </>
        }
        {registrationInformation && <>
            <h3>Registration</h3>
            <p>{registrationInformation}</p>
        </>}
    </>)
}