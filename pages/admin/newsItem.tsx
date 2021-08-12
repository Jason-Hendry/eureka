import React, {VFC} from "react"
import AdminLoading from "../../layout/Admin/AdminLoading";
import {useAdminEffects} from "../../effects/useAdminEffects";
import {AdminForm} from "../../components/form/AdminForm";
import {useRouterPush} from "../../effects/useRouterPush";
import {NewsCollectionApi} from "../../services/APIService";
import {TextField} from "@material-ui/core";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";
import {NewsData} from "../../models/News";

const blankNews = ():NewsData => ({
    Title: ""
})

const AdminIndex: VFC = ({}) => {
    const returnToList = useRouterPush('/admin/news')
    const {save, data: news, merge, isEdit, errors, deleteRecord} = useAdminEffects(NewsCollectionApi, blankNews, returnToList)

    if (!news) {
        return <AdminLoading/>
    }

    return <AdminForm label={'Course'} errors={errors} save={save} deleteRecord={deleteRecord} isEdit={isEdit}>
        <TextField {...defaultFieldProps}
                   label={'Title'}
                   id={'title'}
                   onChange={(e) => merge({Title: e.target.value})}
                   value={news?.Title || ""}
        />

        <TextField {...defaultFieldProps}
                   multiline={true}
                   label={'Teaser'}
                   id={'teaser'}
                   onChange={(e) => merge({Teaser: e.target.value})}
                   value={news?.Teaser || ""}
        />

        <TextField {...defaultFieldProps}
                   multiline={true}
                   label={'Content'}
                   id={'content'}
                   onChange={(e) => merge({Body: e.target.value})}
                   value={news?.Body || ""}
        />

        <TextField {...defaultFieldProps}
                   label={'News Date'}
                   id={'date'}
                   value={news.Date || ""}
                   onChange={(e) => merge({...news, Date: e.target.value})}
                   type={"date"}
        />
    </AdminForm>
}
export default AdminIndex