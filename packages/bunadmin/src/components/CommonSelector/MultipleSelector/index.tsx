import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import ListItemText from "@material-ui/core/ListItemText"
import Checkbox from "@material-ui/core/Checkbox"
import { Column } from "material-table"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 200
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  })
)

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

type Props = {
  columnDef?: Column<any>
  onFilterChanged?: (rowId: string, value: any) => void
}

export default function MultipleSelector(props: Props) {
  const classes = useStyles()
  const [selectedName, setSelectedName] = React.useState<string[]>([])

  const { columnDef, onFilterChanged } = props
  let names: string[] = []

  if (columnDef) {
    if (columnDef.lookup) names = Object.values(columnDef.lookup)
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValues = event.target.value as string[]
    setSelectedName(selectedValues)

    // callback onFilterChanged function
    if (columnDef && onFilterChanged) {
      const replacedValues: string[] = []
      selectedValues.map(v => {
        // lowercase and space to _
        replacedValues.push(v.toLowerCase().replace(/ /g, "_"))
      })
      // @ts-ignore
      onFilterChanged(columnDef.tableData.id, replacedValues)
    }
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={selectedName}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => (selected as string[]).join(", ")}
          MenuProps={MenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
