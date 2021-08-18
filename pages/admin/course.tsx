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
import LatLngField from "../../components/form/LatLngField";


const BlankCourse = ():CourseData => ({Title: "", LapDistance:null, GPXFile:null, RegistrationLocation:null, RegistrationInformation:null})

const AdminIndex: VFC = () => {
    const returnToList = useRouterPush('/admin/courses')
    const {save, data: course, merge, isEdit, errors, deleteRecord} = useAdminEffects(CoursesCollectionApi, BlankCourse, returnToList)

    if (!course) {
        return <AdminLoading/>
    }

    return <AdminForm label={'Course'} errors={errors} save={save} deleteRecord={deleteRecord} isEdit={isEdit}>
        <SingleLineTextField label={'Title'} onChange={(e) => merge({Title: e || ''})} value={course.Title} id={'title'}/>
        <NumberField id={'number'} value={course.LapDistance} label={'Lap Distance'} onChange={LapDistance => merge({LapDistance})} />
        <FileField id={'gpx_file'} value={course.GPXFile} label={"GPX File"} onChange={GPXFile => merge({GPXFile})}/>
        <LatLngField id={"reg_location"} value={course.RegistrationLocation} label={"Map location for registration"} onChange={RegistrationLocation => merge({RegistrationLocation})} placeholder={"Leave blank for Eureka Clubhouse"} />
        <SingleLineTextField id={"reg_info"} value={course.RegistrationInformation} label={"Information about registration location"} onChange={RegistrationInformation => merge({RegistrationInformation})} placeholder={"Leave blank for default Eureka Clubhouse Information"}/>
    </AdminForm>
}

export default AdminIndex
