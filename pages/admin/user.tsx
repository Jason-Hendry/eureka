import React, {FC} from "react"
import {UserCollectionApi} from "../../services/APIService";
import {UserData} from "../../models/User";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import EmailField from "../../components/form/EmailField";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {AdminForm} from "../../components/form/AdminForm";
import {useAdminEffects} from "../../effects/useAdminEffects";
import {useRouterPush} from "../../effects/useRouterPush";

const AdminIndex:FC<unknown> = () => {
    const returnToList = useRouterPush('/admin/users')
    const {save, data, errors, merge, isEdit, deleteRecord} = useAdminEffects<UserData>(UserCollectionApi, () => ({name: "", email: ""}), returnToList)

    if (!data) {
        return <AdminLoading/>
    }

    return <AdminForm label={'User'} isEdit={isEdit} save={save} errors={errors} deleteRecord={deleteRecord}>
      <SingleLineTextField label={'Name'} onChange={(v) => merge({name: v || undefined})} value={data.name} id={'name'}/>
      <EmailField label={'Email'} onChange={(v) => merge({email: v || undefined})} value={data.email} id={'email'}/>
    </AdminForm>

}

export default AdminIndex
