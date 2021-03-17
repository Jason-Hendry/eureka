import React, {FC, useContext, useState} from "react"
import {
    Button,
    Container,
    FormControl, FormLabel, Paper, Select, Switch, TextareaAutosize,
    TextField, Theme,
    Typography, withTheme
} from "@material-ui/core";
import {RaceCollectionApi} from "../../services/APIService";
import {Secret} from "../../layout/Admin/Secret";
import {RaceData, RaceFormat} from "../../models/Race";
import ImageSelector from "../../layout/Admin/ImageSelector";
import {Image} from "../../models/Image";
import {makeStyles} from "@material-ui/styles";
import EnumSelect from "../../layout/Admin/EnumSelect";
import {loadApiEffectAndSave} from "../../effects/loadApiEffect";
import {defaultFieldProps} from "../../layout/Admin/defaultFieldProps";

const useStyles = (theme: Theme) => makeStyles({
    root: {
        padding: theme.spacing(4),
    },
    tableHeading: {
        padding: 0
    },
    raceImage: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
})
const inputProps = {
    step: 300,
};

type RaceProps = {
    theme: Theme;
}

const AdminIndex:FC<RaceProps> = ({theme}) => {
    const secret = useContext(Secret)
    const [race, setRace] = useState<RaceData|null>(null)
    const save = loadApiEffectAndSave(RaceCollectionApi, secret, race, setRace, () => ({Title: ""}))

    const classes = useStyles(theme)();

    const addImage = (image: Image) => {
        if(race) {
            const images = race.Images || [];
            images.push(image)
            setRace({...race, Images: images})
        }
    }

    if(!race) {
        return <Paper>
            <Container>Loading...</Container>
        </Paper>
    }

    return <Paper>
        <Container>
            <Typography variant={"h6"}>{document.location.hash.length ? 'Edit' : 'Create New '} Race</Typography>

            <form onSubmit={e => e.preventDefault()}>
                <TextField {...defaultFieldProps}
                           label={'Race Date'}
                           value={race.Date || ""}
                           onChange={(e) => setRace({...race, Date: e.target.value})}
                           type={"date"}
                />

                <FormControl margin={"normal"}>
                    <FormLabel>Cancelled</FormLabel>
                    <Switch
                        color={"secondary"}
                        checked={Boolean(race?.Cancelled || false)}
                        onChange={(e) => setRace({...race, Cancelled: e.target.checked, Postponed: false})}
                    />
                </FormControl>
                <FormControl margin={"normal"}>
                    <FormLabel>Postponed</FormLabel>
                    <Switch
                        color={"secondary"}
                        checked={Boolean(race?.Postponed || false)}
                        onChange={(e) => setRace({...race, Postponed: e.target.checked, Cancelled: false})}
                    />
                </FormControl>

                <FormControl fullWidth={true} margin={"normal"}>
                    <FormLabel>Race Format</FormLabel>
                    <EnumSelect<RaceFormat>
                        enumSet={Object.values(RaceFormat)}
                        fullWidth={true}
                        value={race.RaceFormat}
                        onChange={(val) => setRace({...race, RaceFormat: val})}>
                    </EnumSelect>
                </FormControl>

                <TextField {...defaultFieldProps}
                           label={'Title'}
                           onChange={(e) => setRace({...race, Title: e.target.value})}
                           value={race?.['Title'] || ""}
                />

                <TextField {...defaultFieldProps}
                           label={"Registration Cutoff"}
                           value={race?.['RegistrationCutoff'] || ""}
                           onChange={(e) => setRace({...race, RegistrationCutoff: e.target.value})}
                           type="time"
                           inputProps={inputProps}
                />
                <TextField {...defaultFieldProps}
                           label={"Race Start Time"}
                           value={race?.RaceStartTime || ""}
                           onChange={(e) => setRace({...race, RaceStartTime: e.target.value})}
                           type="time"
                           inputProps={inputProps}
                />

                <FormControl fullWidth={true} margin={"normal"}>
                    <FormLabel>Course</FormLabel>
                    <Select
                        fullWidth={true}
                        value={race?.Course || ""}
                        onChange={(e) => setRace({...race, Course: e.target.value as string})}>
                        {/*{CourseItemList}*/}
                    </Select>
                </FormControl>

                <TextField {...defaultFieldProps}
                           label={"Course Laps"}
                           value={race?.CourseLaps || ""}
                           onChange={(e) => setRace({...race, CourseLaps: Number.parseInt(e.target.value, 10)})}
                           type={"number"}
                           inputProps={inputProps}
                />

                <FormControl fullWidth={true} margin={"normal"}>
                    <FormLabel>Marshals</FormLabel>
                    <Select
                        fullWidth={true}
                        multiple={true}
                        value={race?.Marshals || []}
                        onChange={(e) => setRace({...race, Marshals: e.target.value as string[]})}>
                        {/*{UserItemList}*/}
                    </Select>
                </FormControl>


                <FormControl margin={"normal"}>
                    <FormLabel>Interclub</FormLabel>
                    <Switch
                        color={"primary"}
                        checked={Boolean(race?.Interclub || false)}
                        onChange={(e) => setRace({
                            ...race,
                            Interclub: e.target.checked,
                            ClubChamps: false,
                            Trophy: false
                        })}
                    />
                </FormControl>
                <FormControl margin={"normal"}>
                    <FormLabel>Trophy</FormLabel>
                    <Switch
                        color={"primary"}
                        checked={Boolean(race?.Trophy || false)}
                        onChange={(e) => setRace({
                            ...race,
                            Trophy: e.target.checked,
                            Interclub: false,
                            ClubChamps: false
                        })}
                    />
                </FormControl>
                <FormControl margin={"normal"}>
                    <FormLabel>Club Championship</FormLabel>
                    <Switch
                        color={"primary"}
                        checked={Boolean(race?.ClubChamps || false)}
                        onChange={(e) => setRace({
                            ...race,
                            ClubChamps: e.target.checked,
                            Interclub: false,
                            Trophy: false
                        })}
                    />
                </FormControl>

                <TextField {...defaultFieldProps}
                           label={"Registration URL"}
                           value={race?.RegistrationURL || ""}
                           onChange={(e) => setRace({...race, RegistrationURL: e.target.value})}
                />

                <TextField {...defaultFieldProps}
                           multiline={true}
                           inputProps={{inputComponent: TextareaAutosize}}
                           label={'Notes'}
                           helperText={"Use 2 new lines to create a new paragraph."}
                           onChange={(e) => setRace({...race, Notes: e.target.value})}
                           value={race?.['Notes'] || ""} InputLabelProps={{shrink: true}} fullWidth={true}/>


                <FormControl margin={"normal"}>
                    <FormLabel>Images</FormLabel>

                    {race.Images ? race.Images.map((i,k) => <img className={classes.raceImage} key={k} src={i.data.admin}/>) : null}

                    <ImageSelector addImage={addImage} />
                </FormControl>

                <FormControl fullWidth={true} margin={"normal"}>
                    <Button type={"submit"} variant={"contained"} color={"primary"} onClick={save}>{document.location.hash.length ? 'Save' : 'Create'}</Button>
                </FormControl>
            </form>
        </Container>
    </Paper>

}

export default withTheme(AdminIndex)
