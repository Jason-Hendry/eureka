import React, {FC} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    Typography
} from "@material-ui/core";
import {CoursesCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {RaceData, RaceFormat} from "../../models/Race";
import {useAdminEffects} from "../../effects/loadApiEffect";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import DateField from "../../components/form/DateField";
import SwitchField from "../../components/form/SwitchField";
import EnumSelectField from "../../components/form/EnumSelectField";
import TimeField from "../../components/form/TimeField";
import CollectionSelectField from "../../components/form/CollectionSelectField";
import {CourseData} from "../../models/Course";
import NumberField from "../../components/form/NumberField";
import MultiLineTextField from "../../components/form/MultiLineTextField";
import FileField from "../../components/form/FileField";

type RaceProps = {}

const AdminIndex: FC<RaceProps> = () => {
    const {save, merge, data: race} = useAdminEffects<RaceData>(RaceCollectionApi, () => ({Title: ""}))

    if (!race) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    function valueProps<T extends keyof RaceData, V = RaceData[T]>(field: T, defaultValue: RaceData[T]|null = null): {
        value: V|null
        onChange: (v: V) => void
    } {
        let value: V|null = defaultValue
        if (race && race?.[field]) {
            value = race[field]
        }
        return {
            value,
            onChange: (val: V) => merge({[field]: val})
        };
    }

    const RaceFormatSet = Object.keys(RaceFormat).map(k => RaceFormat[k])

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{document.location.hash.length ? 'Edit' : 'Create New '} Race</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <DateField label={'Race Date'} {...valueProps('Date')} />
                <SwitchField label={'Cancelled'} {...valueProps('Cancelled', false)} />
                <SwitchField label={'Postponed'} {...valueProps('Postponed', false)} />
                <EnumSelectField label={"Race Format"}
                                 enumSet={RaceFormatSet} {...valueProps('RaceFormat', RaceFormat.Handicap)} />
                <SingleLineTextField label={'Title'} {...valueProps('Title',)} />
                <TimeField
                    label={'Registration Cutoff'} {...valueProps('RegistrationCutoff')} />
                <TimeField label={'Race Start Time'} {...valueProps('RaceStartTime')} />
                <CollectionSelectField<CourseData, false> label={"Course"} collection={CoursesCollectionApi}
                                                          getLabel={(v) => v.Title} {...valueProps('Course')} />
                <NumberField label={"Course Laps"} {...valueProps('CourseLaps', 1)} />
                <MultiLineTextField label={'Marshals'} {...valueProps('Marshals')} />

                <SwitchField label={'Interclub'} {...valueProps('Interclub', false)} />
                <SwitchField label={'BSCC'} {...valueProps('BSCC', false)} />
                <SwitchField label={'Trophy'} {...valueProps('Trophy', false)} />
                <SwitchField label={'Club Championship'} {...valueProps('ClubChamps', false)} />

                <SingleLineTextField
                    label={'Registration URL'} {...valueProps('RegistrationURL')} />
                <MultiLineTextField label={'Notes'} {...valueProps('Notes')} />

                <FileField label={'Poster'} {...valueProps('Poster')} />
                <FileField label={'Map Image'} {...valueProps('MapImage')} />
                <FileField label={'Map PDF'} {...valueProps('MapDownload')} />

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"}
                            onClick={save}>{document.location.hash.length ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default AdminIndex
