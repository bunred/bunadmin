import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import CircularProgress from "@material-ui/core/CircularProgress"
import { EditComponentProps } from "material-table"
import Type from "@plugins/buncms-shop/product_category/types"
import queryParentSer from "./services/queryParentSer"
import { notice } from "@/core"

interface OptionType {
  id: string | number
  name: string
}

interface Props extends EditComponentProps<any> {
  label?: string
  schemaName: string
  parentName: string
  width?: string | number
}

export default function ParentSelector({
  label,
  schemaName,
  parentName,
  width,
  rowData,
  onChange
}: Props) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<OptionType[]>([])
  const [name, setName] = React.useState("")
  const [selected, setSelected] = useState(rowData[parentName])
  const loading = open && options.length === 0

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
    const { data: res, errors } = await queryParentSer(
      schemaName,
      parentName,
      rowData.id,
      name,
      30
    )

    if (errors) {
      return await notice({
        title: "Fetch error",
        severity: "error",
        content: JSON.stringify(errors)
      })
    }

    const resList: Type[] = res && res[schemaName]

    const options: OptionType[] = []
    resList.map(item => options.push({ id: item.id, name: item.name }))
    setOptions(options)
  }

  async function handleChange(e: {
    target: { value: React.SetStateAction<string> }
  }) {
    setName(e.target.value)
    await dataCtrl()
  }

  function handleSelect(_e: React.ChangeEvent<{}>, value: any) {
    onChange(value ? value.id : null)
    setSelected(value)
  }

  return (
    <Autocomplete
      id="parent-selector"
      style={{ width: width || 100 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      onChange={handleSelect}
      getOptionSelected={option => option.id === (selected && selected.id)}
      getOptionLabel={option => option.name}
      value={selected}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={label || undefined}
          variant="outlined"
          onChange={handleChange}
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