import React, {VFC} from "react";


export type StatsTableProps = {
    data: [label: string, stat: string][]
}

export const StatsTable: VFC<StatsTableProps> = ({data}) => {
    return <table>
        <tbody>
        {data.map(d => <tr key={d[0]}>
            <th>{d[0]}</th>
            <td>{d[1]}</td>
        </tr>)
        }
        </tbody>
    </table>
}