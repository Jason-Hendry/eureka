import React, {FC} from "react"
import {
    Button,
    Container,
    FormControl, Paper,
    Typography
} from "@material-ui/core";
import {CoursesCollectionApi, RaceCollectionApi, UserCollectionApi} from "../../services/APIService";
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
import {UserData} from "../../models/User";
import CollectionMultiSelectField from "../../components/form/CollectionMultiSelectField";
import MultiLineTextField from "../../components/form/MultiLineTextField";
import FileField from "../../components/form/FileField";

const inputProps = {
    step: 300,
};

type RaceProps = {}

const AdminIndex: FC<RaceProps> = () => {
    const {save, merge, data: race} = useAdminEffects<RaceData>(RaceCollectionApi, () => ({Title: ""}))

    if (!race) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    type DateF = Required<RaceData>["Date"]

    function valueProps<T extends keyof RaceData, V extends Required<RaceData>[T] = Required<RaceData>[T]>(field: T, defaultValue: V): {
        value: V
        onChange: (v: V) => void
    } {
        let value: V = defaultValue
        if (race && race?.[field]) {
            value = race[field] as unknown as V
        }
        return {
            value,
            onChange: (val: V) => merge({[field]: val})
        };
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{document.location.hash.length ? 'Edit' : 'Create New '} Race</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <DateField label={'Race Date'} {...valueProps<'Date'>('Date', '')} />
                <SwitchField label={'Cancelled'} {...valueProps('Cancelled', false)} />
                <SwitchField label={'Postponed'} {...valueProps('Postponed', false)} />
                <EnumSelectField label={"Race Format"}
                                 enumSet={Object.values(RaceFormat)} {...valueProps<'RaceFormat'>('RaceFormat', RaceFormat.Handicap)} />
                <SingleLineTextField label={'Title'} {...valueProps<'Title'>('Title', '')} />
                <TimeField
                    label={'Registration Cutoff'} {...valueProps<'RegistrationCutoff'>('RegistrationCutoff', '')} />
                <TimeField label={'Race Start Time'} {...valueProps<'RaceStartTime'>('RaceStartTime', '')} />
                <CollectionSelectField<CourseData, false> label={"Course"} collection={CoursesCollectionApi}
                                                          getLabel={(v) => v.Title} {...valueProps<'Course'>('Course', '')} />
                <NumberField label={"Course Laps"} {...valueProps<'CourseLaps'>('CourseLaps', 1)} />
                <MultiLineTextField label={'Marshals'} {...valueProps<'Marshalls'>('Marshalls', '')} />

                <SwitchField label={'Interclub'} {...valueProps('Interclub', false)} />
                <SwitchField label={'BSCC'} {...valueProps('BSCC', false)} />
                <SwitchField label={'Trophy'} {...valueProps('Trophy', false)} />
                <SwitchField label={'Club Championship'} {...valueProps('ClubChamps', false)} />

                <SingleLineTextField
                    label={'Registration URL'} {...valueProps<'RegistrationURL'>('RegistrationURL', '')} />
                <MultiLineTextField label={'Notes'} {...valueProps<'Notes'>('Notes', '')} />

                <FileField label={'Poster'} {...valueProps<'Poster'>('Poster', '')} />
                <FileField label={'Map Image'} {...valueProps<'MapImage'>('MapImage', '')} />
                <FileField label={'Map PDF'} {...valueProps<'MapDownload'>('MapDownload', '')} />

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"}
                            onClick={save}>{document.location.hash.length ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default AdminIndex
