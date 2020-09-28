import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(() =>
  createStyles({
    cardRoot: {
      borderRadius: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
    },
    cardActionArea: { height: "100%" },
    cardActions: {
      padding: 0,
      justifyContent: "center",
      height: "100%"
    },
    dialogActions: {
      justifyContent: "center"
    }
  })
)
