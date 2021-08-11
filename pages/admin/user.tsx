import React, {FC} from "react"
import {UserCollectionApi} from "../../services/APIService";
import { useAdminEffects} from "../../effects/loadApiEffect";
import {UserData} from "../../models/User";
import SingleLineTextField from "../../components/form/SingleLineTextField";
import EmailField from "../../components/form/EmailField";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {AdminForm} from "../../components/form/AdminForm";

const AdminIndex:FC<unknown> = () => {
    const {save, data, merge, isEdit} = useAdminEffects<UserData>(UserCollectionApi, () => ({name: "", email: ""}))

    if (!data) {
        return <AdminLoading/>
    }

    return <AdminForm label={'User'} isEdit={isEdit} save={save}>
      <SingleLineTextField label={'Name'} onChange={(v) => merge({name: v || undefined})} value={data.name} id={'name'}/>
      <EmailField label={'Email'} onChange={(v) => merge({email: v || undefined})} value={data.email} id={'email'}/>
    </AdminForm>

}

export default AdminIndex
