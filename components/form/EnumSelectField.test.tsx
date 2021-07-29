import EnumSelectField from "./EnumSelectField";
import {render} from '@testing-library/react'

describe('EnumSelectField', () => {
    it('should render', () => {
        const Option1 = "Option 1"
        const Option2 = "Option 2"
        const change = jest.fn()
        const wrapper = render(<EnumSelectField value={Option2} label={"Enum"} onChange={change} enumSet={[Option1, Option2]} />)
        wrapper.getByLabelText("Enum")
    });
});