import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    files: {
      display: "flex",
      justifyContent: "center"
    },
    filesItem: {
      marginRight: theme.spacing(4.5)
    }
  })
)
