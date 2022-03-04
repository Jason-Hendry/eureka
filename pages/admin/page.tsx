import React, {FC} from "react"
import SingleLineTextField from "../../components/form/SingleLineTextField";
import EmailField from "../../components/form/EmailField";
import AdminLoading from "../../layout/Admin/AdminLoading";
import {AdminForm} from "../../components/form/AdminForm";
import {useAdminEffects} from "../../effects/useAdminEffects";
import {useRouterPush} from "../../effects/useRouterPush";
import {PageData} from "../../models/Page";
import {PageCollectionApi} from "../../services/APIService";
import {MarkdownEditorField} from "../../components/form/MarkdownEditorField";

const AdminIndex:FC<unknown> = () => {
    const returnToList = useRouterPush('/admin/users')
    const {save, data, errors, merge, isEdit, deleteRecord} = useAdminEffects<PageData>(PageCollectionApi, () => ({url: "/", title:"", content: ""}), returnToList)

    if (!data) {
        return <AdminLoading/>
    }

    return <AdminForm label={'User'} isEdit={isEdit} save={save} errors={errors} deleteRecord={deleteRecord}>
      <SingleLineTextField label={'Url'} onChange={(v) => merge({url: v || undefined})} value={data.url} id={'name'}/>
      <SingleLineTextField label={'Title'} onChange={(v) => merge({title: v || undefined})} value={data.title} id={'name'}/>
      <MarkdownEditorField label={'Content'} onChange={(v) => merge({content: v || undefined})} value={data.content} id={'email'}/>
    </AdminForm>

}

export default AdminIndex
