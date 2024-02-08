import { useMemo } from "react";
import { RankData } from "../Interface/model";
import DataTable, { TableColumn } from "react-data-table-component";

export function RankComponent(props:any){
    const Rankcolumns: TableColumn<RankData>[] = useMemo(() =>
    [
      {
        name: 'Rank',
        cell:(row,index)=>index+1,
        width: "auto",
      },
      {
        name: 'Test Id',
        selector: row => row?.TestId,
        width: "auto",
      },
      {
        name: 'Name',
        selector: row => row?.CreatedBy,
        width: "auto",
        sortable: false,
      },
      {
        name: 'Email',
        selector: row => row?.Email,
        width: "auto",
      },
      {
        name: 'Correct Questions',
        selector: row => row?.NumberOfRecords,
        sortable: false,
        width: "auto",
      },
    ],
    []
  );
    

    return(
      <div className="mx-2">
        <DataTable
              // title={`${props?.topic} Rank List`}
              columns={Rankcolumns}
              data={props?.data}
              defaultSortFieldId={5}
              defaultSortAsc={false}
              pagination
              responsive
              highlightOnHover={true}
            />
        </div>
    )
}