import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    files: {
      display: "flex",
      justifyContent: "center"
    },
    filesItem: {
      marginRight: theme.spacing(4.5)
    },
    // draggable
    draggableList: {
      borderColor: theme.palette.primary.main,
      borderStyle: "dashed",
      display: "flex"
      // overflow: "auto",
      // overflowX: "auto"
    },
    draggableItem: {
      userSelect: "none",
      padding: 0,
      margin: 0
    }
  })
)
