import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    files: {
      display: "flex",
      justifyContent: "center"
    },
    filesNoDrawer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start"
    },
    filesItem: {
      marginRight: theme.spacing(3)
    },
    // draggable
    draggableList: {
      borderColor: theme.palette.primary.main,
      borderStyle: "dashed",
      display: "flex",
      flexWrap: "wrap"
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
