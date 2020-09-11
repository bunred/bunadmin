import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CircularProgress from "@material-ui/core/CircularProgress"
import {
  Column,
  EditComponentProps,
  Query,
  rxMtUpdateField
} from "material-table"
import { notice } from "@/core"

interface OptionType {
  id: string
  name: string
}

export type ListSelectorOnSelectProps = {
  selected: any
  options: OptionType[]
  index?: number
}

type Props = {
  columnDef: Column<any>
  // filterComponent
  filterProps?: {
    toLowerCase?: boolean
    replaceSpace?: boolean // replace ' ' with '_'
    onFilterChanged?: (rowId: string, value: any) => void
    onFilterField?: string
  }
  // editComponent
  editProps?: EditComponentProps<any>
  // ListSelector Props
  index?: number
  defaultSelected?: any
  width?: number | string
  label?: string
  querySer: (query: Query<any>) => Promise<any>
  dataField?: string
  optionField?: string
  onSelect?: ({ selected, options, index }: ListSelectorOnSelectProps) => void
}

export function ListSelector({
  columnDef,
  editProps,
  index,
  defaultSelected,
  width,
  label,
  querySer,
  dataField,
  optionField,
  onSelect
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<OptionType[]>([])
  const [search, setSearch] = React.useState("")
  const loading = open && options.length === 0

  let rowData = []
  if (editProps) {
    rowData = editProps.rowData
  }

  let resField = dataField ? dataField : columnDef.field || "id"
  if (!defaultSelected && resField) defaultSelected = rowData[resField]

  const [selected, setSelected] = useState(defaultSelected)

  React.useEffect(() => {
    if (!loading) {
      return undefined
    }

    ;(async () => {
      await dataCtrl()
    })()
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  async function dataCtrl() {
    const { data: res, errors } = await querySer({
      search: search,
      page: 0,
      pageSize: 30
    } as Query<any>)

    if (errors) {
      return await notice({
        title: "Fetch error",
        severity: "error",
        content: JSON.stringify(errors)
      })
    }

    let resList: any[] = res

    if (columnDef.field) {
      if (res && res[columnDef.field]) resList = res[columnDef.field]
    }

    const options: OptionType[] = []
    resList.map(item => {
      // if (!item.name) {
      //   return console.warn("item.name is null, use {optionField} instead!")
      // }

      const nameObj = optionField
        ? { [optionField.toString()]: item[optionField].toString() }
        : { name: item.name }
      options.push({ id: item.id.toString(), name: "", ...nameObj })
    })

    setOptions(options)
  }

  async function handleSearch(e: {
    target: { value: React.SetStateAction<string> }
  }) {
    setSearch(e.target.value)
    await dataCtrl()
  }

  async function handleSelect(_e: React.ChangeEvent<{}>, value: any) {
    setSelected(value)
    if (onSelect) {
      onSelect({ selected: value, options, index })
    }

    if (editProps) {
      editProps.onChange(value ? value.id : null)
    }

    if (!columnDef.field) return
    await rxMtUpdateField({
      name: columnDef.field.toString(),
      value: value ? value.id : null
    })
  }

  return (
    <Autocomplete
      id={`list-selector-${dataField}${index}`}
      style={{ width: width ? width : 135 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      onChange={handleSelect}
      getOptionSelected={option => option.id === (selected && selected.id)}
      getOptionLabel={option =>
        optionField ? option[optionField] : option.name
      }
      value={selected}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label || undefined}
          variant="outlined"
          onChange={handleSearch}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}
