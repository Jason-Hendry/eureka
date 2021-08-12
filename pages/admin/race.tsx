import React, {FC} from "react"
import {CoursesCollectionApi, RaceCollectionApi} from "../../services/APIService";
import {RaceData, RaceFormat} from "../../models/Race";
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
import {useAdminEffects} from "../../effects/useAdminEffects";
import {AdminForm} from "../../components/form/AdminForm";
import AdminLoading from "../../layout/Admin/AdminLoading";

type RaceProps = {}

const AdminIndex: FC<RaceProps> = () => {
    const {save, merge, data: race, isEdit, deleteRecord, errors} = useAdminEffects<RaceData>(RaceCollectionApi, () => ({Title: ""}))

    if (!race) {
        return <AdminLoading />
    }

    function fieldValueSet<T extends keyof RaceData>(fieldValue: RaceData[T]): fieldValue is Required<RaceData>[T] {
        return fieldValue !== undefined
    }

    function valueProps<T extends keyof RaceData>(field: T, defaultValue: Required<RaceData>[T]|null = null): {
        value: Required<RaceData>[T]|null
        id: string
        onChange: (v: Required<RaceData>[T]|null) => void
    } {
        let value: Required<RaceData>[T]|null = defaultValue
        const fieldValue = race ? race[field] : undefined
        if (fieldValue !== undefined && fieldValueSet<T>(fieldValue)) {
            value = fieldValue
        }
        return {
            value,
            id: field,
            onChange: (val: Required<RaceData>[T]|null) => merge({[field]: val})
        };
    }

    const RaceFormatSet = Object.keys(RaceFormat).map((k) => RaceFormat[k as keyof typeof RaceFormat])

    return <AdminForm label={'Race'} deleteRecord={deleteRecord} isEdit={isEdit} save={save} errors={errors}>
                <DateField label={'Race Date'} {...valueProps('Date', '')} />
                <SwitchField label={'Cancelled'} {...valueProps('Cancelled', false)} />
                <SwitchField label={'Postponed'} {...valueProps('Postponed', false)} />
                <EnumSelectField label={"Race Format"}
                                 enumSet={RaceFormatSet} {...valueProps('RaceFormat', RaceFormat.Handicap)} />
                <SingleLineTextField label={'Title'} {...valueProps('Title')} />
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

    </AdminForm>

}

export default AdminIndex
