import React from "react"
import { Box, Button, Typography } from "@material-ui/core"
import DefaultLayout from "../src/layouts/DefaultLayout"

interface Props {
  res: {
    statusCode: string
  }
  err: {
    statusCode: number
  }
}

type Msg = {
  title: string
  message: string
}

interface ErrorMessages {
  [key: number]: Msg
}

const errorMessages: ErrorMessages = {
  400: {
    title: "Bad Request",
    message:
      "The server cannot process the request due to something that is perceived to be a client error."
  },
  401: {
    title: "Unauthorized",
    message: "The requested resource requires an authentication."
  },
  403: {
    title: "Access Denied",
    message: "The requested resource requires an authentication."
  },
  404: {
    title: "Resource not found",
    message:
      "The requested resource could not be found but may be available again in the future."
  },
  500: {
    title: "Webservice currently unavailable",
    message:
      "An unexpected condition was encountered.\n" +
      "Our service team has been dispatched to bring it back online."
  },
  501: {
    title: "Not Implemented",
    message: "The Web Server cannot recognize the request method."
  },
  502: {
    title: "Webservice currently unavailable",
    message:
      "We've got some trouble with our backend upstream cluster.\n" +
      "Our service team has been dispatched to bring it back online."
  },
  503: {
    title: "Webservice currently unavailable",
    message:
      "We've got some trouble with our backend upstream cluster.\n" +
      "Our service team has been dispatched to bring it back online."
  },
  520: {
    title: "Origin Error - Unknown Host",
    message:
      "The requested hostname is not routed. Use only hostnames to access resources."
  },
  521: {
    title: "Webservice currently unavailable",
    message:
      "We've got some trouble with our backend upstream cluster.\n" +
      "Our service team has been dispatched to bring it back online."
  }
}

function Error({ statusCode }: { statusCode: number }) {
  const msg = (msg: Msg) => {
    return (
      <Box p={2} fontWeight="fontWeightLight">
        <Typography variant="h5" color="initial" display="inline">
          {msg.title}
        </Typography>{" "}
        -{" "}
        <Typography variant="h5" color="error" display="inline">
          <small>Error {statusCode}</small>
        </Typography>
        <Box p={1} />
        {msg.message}
        <Box p={1} />
        <Button
          size="small"
          variant="contained"
          color="primary"
          disableElevation
        >
          Take Me Home
        </Button>
      </Box>
    )
  }
  return (
    <DefaultLayout>
      <Box p={3}>
        {statusCode
          ? msg(errorMessages[statusCode])
          : "An error occurred on client"}
      </Box>
    </DefaultLayout>
  )
}

Error.getInitialProps = ({ res, err }: Props) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
