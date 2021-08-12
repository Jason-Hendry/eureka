import React, {VFC} from "react"
import {CoursesCollectionApi} from "../../services/APIService";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {useAdminEffects} from "../../effects/useAdminEffects";
import {AdminForm} from "../../components/form/AdminForm";
import {useRouterPush} from "../../effects/useRouterPush";


const AdminIndex: VFC = () => {
    const returnToList = useRouterPush('/admin/courses')
    const {save, data: course, merge, isEdit, errors, deleteRecord} = useAdminEffects(CoursesCollectionApi, () => ({Title: ""}), returnToList)

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
    </AdminForm>
}

export default AdminIndex
