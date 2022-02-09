import {fireEvent, render} from "@testing-library/react";
import {RepeatSection} from "./RepeatSection";

describe("Repeat Section", () => {
    it("should render a section for each value in array", () => {
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2"]} label={"Repeat"} onChange={(v) => ({})} section={(v,m,i) => (
            <span>{v}</span>
        )} blank={()=>""}/>)
        expect(wrapper.getByText("item1")).toBeInTheDocument()
        expect(wrapper.getByText("item2")).toBeInTheDocument()
    })
    it("should update value when element item changes (string)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>""}/>)
        fireEvent.change(wrapper.getByLabelText("item1"), {target:{value:"new Item"}})
        expect(onChange).toHaveBeenCalledWith(["new Item","item2"])
    })
    it("should update value when element item changes (object)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={[{name: "item1"}, {name: "item2"}]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v.name}<input type={"text"} value={v.name} onChange={(v) => m({name: v.target.value})} /></label>
        )} blank={()=>({name: ""})}/>)
        fireEvent.change(wrapper.getByLabelText("item1"), {target:{value:"new Item"}})
        expect(onChange).toHaveBeenCalledWith([{name: "new Item"}, {name: "item2"}])
    })
    it("should update value when element item changes (array)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={[["item1"], ["item2"]]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v[0]}<input type={"text"} value={v[0]} onChange={(v) => m([v.target.value])} /></label>
        )} blank={()=>([])}/>)
        fireEvent.change(wrapper.getByLabelText("item1"), {target:{value:"new Item"}})
        expect(onChange).toHaveBeenCalledWith([["new Item"], ["item2"]])
    })
    it("should add item to end (append)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Append"))
        expect(onChange).toHaveBeenCalledWith(["item1", "item2", ""])
    })
    it("should add item to end (prepend)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Prepend"))
        expect(onChange).toHaveBeenCalledWith(["", "item1", "item2"])
    })
    it("should add item to end (insert after)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Insert after 1"))
        expect(onChange).toHaveBeenCalledWith(["item1", "", "item2"])
    })
    it("should reorder items (move up)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2", "item3"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Move item 3 up"))
        expect(onChange).toHaveBeenCalledWith(["item1", "item3", "item2"])
    })
    it("should reorder items (move up)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2", "item3"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Move item 1 down"))
        expect(onChange).toHaveBeenCalledWith(["item2", "item1", "item3"])
    })
    it("should reorder items (move to top)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2", "item3"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Move item 3 to top"))
        expect(onChange).toHaveBeenCalledWith(["item3", "item1", "item2"])
    })
    it("should reorder items (move to top)", () => {
        const onChange = jest.fn()
        const wrapper = render(<RepeatSection id={"test"} value={["item1", "item2", "item3"]} label={"Repeat"} onChange={onChange} section={(v,m,i) => (
            <label>{v}<input type={"text"} value={v} onChange={(v) => m(v.target.value)} /></label>
        )} blank={()=>("")}/>)
        fireEvent.click(wrapper.getByLabelText("Move item 3 to top"))
        expect(onChange).toHaveBeenCalledWith(["item3", "item1", "item2"])
    })

})