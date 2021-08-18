import React, {VFC} from "react"
import {CoursesCollectionApi} from "../../services/APIService";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {useAdminEffects} from "../../effects/useAdminEffects";
import {AdminForm} from "../../components/form/AdminForm";
import {useRouterPush} from "../../effects/useRouterPush";
import NumberField from "../../components/form/NumberField";
import {Course, CourseData} from "../../models/Course";
import FileField from "../../components/form/FileField";


const BlankCourse = ():CourseData => ({Title: "", LapDistance:null, GPXFile:null})

const AdminIndex: VFC = () => {
    const returnToList = useRouterPush('/admin/courses')
    const {save, data: course, merge, isEdit, errors, deleteRecord} = useAdminEffects(CoursesCollectionApi, BlankCourse, returnToList)

    if (!course) {
        return <AdminLoading/>
    }

    return <AdminForm label={'Course'} errors={errors} save={save} deleteRecord={deleteRecord} isEdit={isEdit}>
                <SingleLineTextField
                    label={'Title'}
                    onChange={(e) => merge({Title: e || ''})}
                    value={course.Title}
                    id={'title'}
                />
        <NumberField id={'number'} value={course.LapDistance} label={'Lap Distance'} onChange={LapDistance => merge({LapDistance})} />
        <FileField id={'gpxfile'} value={course.GPXFile} label={"GPX File"} onChange={GPXFile => merge({GPXFile})}/>
    </AdminForm>
}

export default AdminIndex
