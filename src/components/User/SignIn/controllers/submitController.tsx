import { Values } from "../types"
import userSignInService from "../../../../services/user/signInService"
import bNotice from "../../../../modules/local_data/notice/controllers/notice"

const submitController = async (
  values: Values,
  { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
) => {
  const res = await userSignInService(values)
  console.log(res)
  setSubmitting(false)
  // Sign in successfully
  if (res && res.token) {
    // show notice
    await bNotice({ title: `Sign in successful` })
  } else {
    // show notice
    await bNotice({
      title: `Sign in failed`,
      severity: "error",
      content: JSON.stringify(res)
    })
  }
}

export default submitController
