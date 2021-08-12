import React, {FC} from "react";

export const membershipRaceAllDiscipline = "https://www.auscycling.org.au/membership/race-all-discipline";
export const membershipOtherClubAdd = "https://www.auscycling.org.au/membership/other/club-add";

export const Join: FC<unknown> = () => {

    return (
        <>
            <p>To join and race with Eureka Cycling you will need an <a
                href={membershipRaceAllDiscipline}>AusCycling Race All Discipline
                Membership</a> and select &ldquo;Eureka Cycling Club&rdquo;.</p>

            <p>If you are a member of another AusCycling club you can
                join Eureka Cycling Club with a <a
                    href={membershipOtherClubAdd}>Race
                    Member Club Add-On.</a>
            </p>
        </>
    )
}
export default Join;
